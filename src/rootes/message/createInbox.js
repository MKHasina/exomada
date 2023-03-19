/*const { ValidationError, UniqueConstraintError } = require('sequelize')
const { user, inbox, participe } = require('../../db/sequelize')
const { UniD, CDroles } = require('../../helper/helper');

module.exports = (app) => {
    app.post('/api/inbox', (req, res) => {
        if (req.body.listRecever.length === 1) {
            participe.findAll({
                where: {
                    [Op.and]: [


                        {
                            user_uid: { [Op.eq]: req.body.userData.user_uid }
                        }, {

                            user_uid: { [Op.eq]: req.body.listRecever.user_uid }
                        }
                    ]
                }
            }


            )

        }
        var max_id = 1;
        user.max('id')
            .then(ide => max_id = UniD("20K23", ide))
            .catch(_ => max_id = UniD("20K23", "0"))


        console.log(req.body)
        /* user.create({ ...req.body, mdp: hash, user_uid: max_id, roles: CDroles(req.body.roles) }))
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
*/