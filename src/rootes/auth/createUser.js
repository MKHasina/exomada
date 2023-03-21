const { ValidationError, UniqueConstraintError } = require('sequelize')
const { user } = require('../../db/sequelize')
const bcrypt = require('bcrypt');
const { UniD, CDroles } = require('../../helper/helper');

module.exports = (app) => {
    app.post('/api/user', (req, res) => {
        var max_id = 1;
        user.max('id')
            .then(ide => max_id = UniD("20K23", ide))
            .catch(_ => max_id = UniD("20K23", "0"))

        const roles = CDroles(req.body.roles);
        bcrypt.hash(req.body.mdp, 10)
            .then(hash => user.create({ ...req.body, mdp: hash, user_uid: max_id, roles: roles }))
            .then(User => {
                const message = 'L\'utilisateur a bien été inserer.'
                res.json({ message, data: User })
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
    })
}