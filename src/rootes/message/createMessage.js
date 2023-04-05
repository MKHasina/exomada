const { ValidationError, UniqueConstraintError } = require('sequelize');
const { chat } = require('../../db/sequelize');
//set state inbox mbola tsy vita
module.exports = (app) => {
    app.post('/api/message', (req, res) => {

        // console.log(req.body.userData)

        const inboxId = req.body.inboxId
        const messageE = req.body.value.message//"Salut!"//req.body.roles;
        const sender = req.body.userData.user_uid;

        chat.create({ inbox_id: inboxId, user_uid: sender, message: messageE })
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