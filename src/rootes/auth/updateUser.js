const { emailConfirmationKey } = require("./cles_mail");
const mailBody = require('../../models/validatePwd');
const { genEmail, cache } = require("../../helper/helper");
const { user } = require("../../db/sequelize");
const bcrypt = require('bcrypt');


module.exports = (app) => {
    app.post('/api/user/modifier', (req, res) => {
        console.log(req.body.email)
        if (req.query?.s) {
            const cachedData = cache.get(req.query.s);
            if (cachedData === undefined) {
                res.status(404).json({
                    msg: "temps écoulé"
                })
            }
            else {
                const mdp = req.body.mdp;
                bcrypt.hash(mdp, 10)
                    .then(
                        hash => {

                            user.update({ 'mdp': hash }, {
                                where: {
                                    email: cachedData.email
                                }
                            })
                        })
                    .then(_ => {
                        const message = "mot de passe modifie"
                        const useCred = cachedData;
                        cache.del(req.query.s)
                        res.json({ message, data: useCred, 'mdp': mdp })
                    })
                    .catch(error => {
                        const message = 'La liste des utilisateur n\'a pas pu être modifiée. Réessayez dans quelques instaants.'
                        res.status(500).json({ message, data: error })
                    })
            }
        }
        else {



            user.findOne({
                where: {
                    email: req.body.email
                }
            })
                .then((User) => {

                    const emailKey = emailConfirmationKey();
                    const subject = "Veuillez confirmer la modification de votre mot de passe";
                    //console.log(emailKey)
                    const useCred = req.body;
                    cache.set(emailKey, useCred);
                    const GEml = genEmail(req.body.email, mailBody(emailKey, User.pseudo), subject)



                    // res.json(GEml);
                    res.json({ 'io': 'mety lesy dada a' })
                })
                .catch(error => {
                    const message = 'La liste des utilisateur n\'a pas pu être récupérée. Réessayez dans quelques instaants.'
                    res.status(500).json({ message, data: error })
                })
        }
    })
}