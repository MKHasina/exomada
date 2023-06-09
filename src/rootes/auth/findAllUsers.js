const { user } = require('../../db/sequelize');
const { Op } = require("sequelize");
const auth = require('./auth');

module.exports = (app) => {
    app.post('/api/users', auth, (req, res) => {
        const queryerData = req.body.id;
        const Wsearch = req.query.name;
        user
            .findAll({
                attributes: ['pseudo', 'id'],
                where: {
                    [Op.and]: [

                        {
                            id: {
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