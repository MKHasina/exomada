

const { messageReC } = require('../../helper/helper');

exports.FindAllInboxes = (app) => {

    app.post('/api/inboxes', (req, res) => {

        const limit = 10; // Limite de 10 résultats
        const offset = 0;


        messageReC(req.body.user_uid)
            .then(inb => {
                res.json(inb);
            }
            )


    })
}







/*,

.then(participes => {S
                console.log(participes)
                [''];

                participes.map((part, index) => {

                    inbox
                        .findOne({

                            where: {
                                id: part.inbox_id
                            }
                        })

                        .then(inb => {

                            if (inb) {
                                resu.push(inb)
                                console.log(participes[index].inbox_id)


                            } else { }

                        })
                })
                const message = 'Les inbox sont récuperer avec succès';
                return res.json({ inbox: participes });
            })
            .catch(error => {
                const message = 'L\'utilisateur n\'a pas pus être connecté. Réessayez dans quelques instants.';
                return res.status(500).json({ message, data: error });
            })
                       include: [{
                           model: chat,
                           as: 'm3',
                           where: sequelize.literal('m3.created= (SELECT MAX(created) FROM messages AS m4 WHERE m4.inbox_id = m3.inbox_id)')

                           setTimeout(() => {
                             console.log("5 secondes se sont écoulées depuis la réponse");
                         }, 5000);
                       }]*/
                        // const message = myInbox.getMessages();

                          //console.log(inb.user_uid)