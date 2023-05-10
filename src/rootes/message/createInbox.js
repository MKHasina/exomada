const { ValidationError, UniqueConstraintError } = require('sequelize')
const { inbox, participe, sequelize } = require('../../db/sequelize');
const { findInbox, cache, insertInbox } = require('../../helper/helper');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {

    function generateUniqueId() {
        return uuidv4();
    }

    app.post('/api/inbox', (req, res) => {


        const sender = req.body.userData.id;   //"2K23/1" //
        const recever = req.body.listRecever[0].id;  //"2K23/2"// 

        let mest = '';
        let message = "";
        let n_inb = '';
        //
        const aoait = async(sender, recever)=>{

            const inbo = await insertInbox(sender, recever)
          
           await  res.json(inbo);
        }

        if (req.body.listRecever.length === 1) {

        console.log('uuuuuuuuuuu')
            findInbox(sender)
                .then((participes) => {

                    if (participes[0] !== undefined) {
                        const participe = participes?.find(par => 
            ((par.p2.length === 2) && (par.p2.find(pa => pa.user_uid === recever))))
                        if (participe) {
                            console.log('aaaaaaaaaaaaaaaaa')
                            res.json({ data: participe.inbox_id })
                        }
                        else {
                            console.log('iiiiiiiiiiiiii')
                      
                       
                        aoait(sender, recever);
                        }
                    }
                    else {
                        console.log('iiiiiiiiiiiiii')
                       
                       
                        aoait(sender, recever);
                    }
                }

                )


        }


        else {
            const inboxId = generateUniqueId();
            inbox
                .create({
                    id: inboxId, name: "", user_uid: sender, state: 0
                })
                .then(inboxes => {
                    n_inb = inboxes.id;

                    req.body.listRecever.map(recev => {
                        const partiId = generateUniqueId();
                        participe
                            .create({ id: partiId, user_uid: recev.id, inbox_id: inboxes.id })
                            .then((sender) => {
                                message += `participant ajout ${sender.id}`

                            })
                            .catch((error) => {

                                mest += `erreur ajout ${sender.id}`;
                                //      return res.json(error)
                            });

                    })
                    const partiUId = generateUniqueId();
                    participe
                        .create({
                            id: partiUId,
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
    })
}
