const { participe } = require('../../db/sequelize');
const { Op } = require("sequelize");

module.exports = (app) => {
    app.post('/api/listrecever/:id', (req, res) => {
        const queryerData = req.body.user_uid;
        const Wsearch = parseInt(req.params.id);
        participe
            .findAll({
                attributes: ['user_uid'],
                where: {
                    [Op.and]: [

                        {
                            user_uid: {
                                [Op.not]: queryerData
                            }
                        }, {
                            inbox_id: {
                                [Op.eq]: Wsearch
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