const { ValidationError, UniqueConstraintError, Op } = require('sequelize');
const { user } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const { UniD, CDroles, cache, genEmail } = require('../../helper/helper');
const { emailConfirmationKey } = require('./cles_mail');
const mailBody = require('../../models/verifyEmail');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    function generateUniqueId() {
        return uuidv4();
    }
    app.post('/api/user', (req, res) => {
        if (req.query?.s) {
            const cachedData = cache.get(req.query.s);
            if (cachedData === undefined) {
                res.status(404).json({
                    msg: "temps écoulé"
                })
            }
            else {
                console.log(cachedData)
                var max_id = 1;
                user.max('id')
                    .then(ide => max_id = UniD("2K23", ide))
                    .catch(_ => max_id = UniD("2K23", "0"))
                const id = generateUniqueId();
                const roles = CDroles(cachedData.roles);
                bcrypt.hash(cachedData.mdp, 10)
                    .then(
                        hash => user.create({ ...cachedData, id: id, mdp: hash, user_uid: max_id, roles: roles }))
                    .then(User => {
                        const message = 'L\'utilisateur a bien été inserer.'
                        const mdp = cachedData.mdp;
                        cache.del(req.query.s)
                        res.json({ message, data: User, mdp: mdp })
                    })
                    .catch(error => {
                        if (error instanceof UniqueConstraintError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        if (error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        const message = 'La liste des client n\'a pas pu être récupérée. Réessayez dans quelques instaants.'
                        res.status(500).json({ message, data: error })
                    })
            }

        }
        else {
            user.findOne({
                where: {
                    [Op.or]: [

                        {
                            pseudo: {
                                [Op.eq]: req.body.pseudo
                            }
                        }, {
                            email: {
                                [Op.eq]: req.body.email
                            }
                        }
                    ]
                }
            })
                .then(user => {
                    if (user) {
                        // console.log("l' adresse email est déja utilisé")
                        return res.status(409).json({ msg: "l' adresse email est déja utilisé" })
                    }
                    else {
                        const emailKey = emailConfirmationKey();
                        const subject = "Veuillez vérifier votre adresse e-mail";
                        console.log(emailKey)
                        const useCred = req.body;
                        cache.set(emailKey, useCred);
                        const GEml = genEmail(req.body.email, mailBody(emailKey), subject)

                        return res.json(GEml);
                    }
                })
                .catch(error => console.log(error));
        }

    })
}