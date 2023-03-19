const { user } = require('../../db/sequelize');
const { Op } = require("sequelize");

module.exports = (app) => {
    app.post('/api/users', (req, res) => {
        const queryerData = req.body.user_uid;
        const Wsearch = req.query.name
        user
            .findAll({
                attributes: ['pseudo', 'user_uid'],
                where: {
                    [Op.and]: [

                        {
                            user_uid: {
                                [Op.not]: queryerData
                            }
                        }, {
                            pseudo: {
                                [Op.like]: '%' + Wsearch + '%'
                            }
                        }
                    ]
                }
            })
            .then(User => {
                const message = 'Les utilisateurs ont été récuperer avec succès';
                return res.json({ message, data: User });

            })
            .catch(error => {
                const message = 'L\'utilisateur n\'a pas pus être connecté. Réessayez dans quelques instants.';
                return res.status(500).json({ message, data: error });
            })
    })
}