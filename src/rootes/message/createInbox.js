const { ValidationError, UniqueConstraintError } = require('sequelize')
const { inbox, participe, sequelize } = require('../../db/sequelize');
const { findInbox, cache } = require('../../helper/helper');

module.exports = (app) => {


    app.post('/api/inbox', (req, res) => {


        const sender = req.body.userData.user_uid;//  "2K23/1" //
        const recever = req.body.listRecever[0].user_uid; //  "2K23/2"// 

        let mest = '';
        let message = "";

        if (req.body.listRecever.length === 1) {

            const cachedData = cache.get(sender + recever);

            if (cachedData !== undefined) {
                console.log(cachedData)
                const message = 'L\' utilisateur a été récuperer avec succès';
                res.json({ message, data: cachedData });

            } else {
                const part = findInbox(sender, recever)
                if (part) {
                    setTimeout(() =>
                        console.log("miandry fa gasy"), 5000
                    )

                }
                part
                    .then(participes => {

                        let n_inb = '';


                        if (!participes[0]) {
                            console.log('aaa');
                            inbox
                                .create({
                                    name: "", user_uid: sender, state: 0
                                })
                                .then(inboxes => {
                                    n_inb = inboxes.id;
                                    participe
                                        .create({ user_uid: sender, inbox_id: inboxes.id })
                                        .then((sender) => {
                                            message += `participant ajout ${sender.user_uid}`

                                        })
                                        .catch((error) => {
                                            mest += `erreur ajout ${sender.user_uid}`;
                                            //      return res.json(error)
                                        });

                                    participe
                                        .create({
                                            user_uid: recever,
                                            inbox_id: inboxes.id
                                        })
                                        .then((sender) => {
                                            message += `participant ajout ${sender.user_uid}`

                                        })
                                        .catch((error) => {
                                            mest += `erreur ajout ${sender.user_uid}`;
                                            //return res.status(500).json(error)
                                        });
                                    cache.set(sender + recever, n_inb);
                                    message += "inbox ajouter avec participant"
                                    return res.json({ message, data: n_inb })

                                })
                                .catch(error => {
                                    mest = "tonga teto ar"

                                    return res.json({ mest, data: error })
                                })


                        }
                        else if (participes[0].inbox_id) {

                            console.log("ts le niertr");
                            n_inb = participes[0].inbox_id;
                            cache.set(sender + recever, n_inb);
                            message += 'Chambre de discussion récupérer';
                            return res.json({ message, data: n_inb });
                        }




                    })
                    .catch((error) => {
                        if (error instanceof UniqueConstraintError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        if (error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        const message = mest + 'La liste des client n\'a pas pu être récupérée. Réessayez dans quelques instaants.'
                        res.status(500).json({ message, data: error })
                    })
            }

            /*
        inbox.findAll({
                            where: {
                                id: participes[0].inbox_id
                            }
                        })
                        .then(inboxes => console.log(inboxes))
        
        
        
             attributes: ['inbox_id'],
                where: {
                    user_uid: '2K23/1'
         
                },
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
         
         
             )*/

        }
        else {
            console.log('maro be');
            inbox
                .create({
                    name: "", user_uid: sender, state: 0
                })
                .then(inboxes => {
                    n_inb = inboxes.id;

                    req.body.listRecever.map(recev => {

                        participe
                            .create({ user_uid: recev.user_uid, inbox_id: inboxes.id })
                            .then((sender) => {
                                message += `participant ajout ${sender.user_uid}`

                            })
                            .catch((error) => {

                                mest += `erreur ajout ${sender.user_uid}`;
                                //      return res.json(error)
                            });

                    })
                    participe
                        .create({
                            user_uid: sender,
                            inbox_id: inboxes.id
                        })
                        .then((sender) => {
                            message += `participant ajout ${sender.user_uid}`

                        })
                        .catch((error) => {

                            mest += `erreur ajout ${sender.user_uid}`;
                            //return res.status(500).json(error)
                        });

                    message += "inbox ajouter avec participant"
                    return res.json({ message, data: n_inb })

                })
                .catch(error => {
                    mest = "tonga teto ar"

                    return res.status(500).json({ mest, data: error })
                })


        }
        /*  var max_id = 1;
         user.max('id')
             .then(ide => max_id = UniD("20K23", ide))
             .catch(_ => max_id = UniD("20K23", "0"))
 
 
         console.log(req.body)
          user.create({ ...req.body, mdp: hash, user_uid: max_id,
              roles: CDroles(req.body.roles) })
          )
         
          .then(User => {
              const message = 'L\'utilisateur a bien été inserer.'
              res.json({ message, data: User })
          })
         
          */
    })
}