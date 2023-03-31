const { user, inbox, chat } = require('../../db/sequelize');
const { Op } = require("sequelize");

module.exports = (app) => {
    app.get('/api/inbox/:id', (req, res) => {

        //const myInbox =
        inbox.findOne(
            {
                where: {
                    id: req.params.id
                },
                include: [{
                    model: chat,
                    as: 'm3'


                }]
            }
        )
            // const message = myInbox.getMessages();
            .then(inb => {

                const message = 'Les message sont récuperer avec succès';
                return res.json({ message, inbox: inb });

            })





            .catch(error => {
                const message = 'L\'utilisateur n\'a pas pus être connecté. Réessayez dans quelques instants.';
                return res.status(500).json({ message, data: error });
            })
    })
}