const { participe, inbox, chat, sequelize } = require('../db/sequelize');
const { Op } = require("sequelize");
const NodeCache = require('node-cache');
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const { v4: uuidv4 } = require('uuid');
const config = require('../../config/config');

exports.UniD = (cle, id_max) => {

    return cle + "/" + ((isNaN(parseInt(id_max)) ? 0 : parseInt(id_max)) + 1);
}

exports.CDroles = (roles) => {

    if (roles === 5000) {

        return 411;
    }else if (roles === 2001) {

        return 71;
    }else if (roles === 6666) {

        return 401;
    }else{

        return 404;
    }


}
exports.messageReC = (userUid) => {

    return inbox.findAll({
        where: {
            id: {
                [Op.in]: sequelize.literal(
                    `(SELECT inbox_id FROM participes AS p5 WHERE p5.user_uid = '${userUid}')`
                )
            }
        },
        include: [{
            model: chat,
            as: 'm3',
            where: {
                created: {

                    [Op.in]: sequelize.literal(' (SELECT MAX(created) FROM messages AS m4 WHERE m4.inbox_id = m3.inbox_id)')
                }
            }

        }],
        attributes: {
            include: [[sequelize.literal(`(SELECT user_uid FROM participes AS p WHERE p.inbox_id = inbox.id AND p.user_uid <> '${userUid}' LIMIT 1)`), 'other_user']]
        }
    }
    )
}

exports.findInbox = (sender) => {

    return participe.findAll({

        attributes: ['inbox_id'],
        where: {
            user_uid: sender
        },
        include: [{
            model: participe,
            as: 'p2'
        }]
    })

}
exports.insertInbox = (sender, recever) => {

    let mest = '';
    let message = "";
    let me = "";
    let n_inb = '';
    const inboxId = generateUniqueId();

    function generateUniqueId() {

        return uuidv4();
    }
    
    return inbox
        .create({

            id: inboxId, name: "", user_uid: sender, state: 0
        })
        .then(inboxes => {
            n_inb =  inboxes.id ;
           
            const partId = generateUniqueId();
            participe.create({
                    id: partId, user_uid: sender, inbox_id: inboxes.id 
                })
                .then((sender) => {

                    message += `participant ajout ${sender.user_uid}`
                })
                .catch((error) => {

                    mest += `erreur ajout ${sender.user_uid}`;
                });
            const partUId = generateUniqueId();
            participe.create({

                    id: partUId,
                    user_uid: recever,
                    inbox_id: inboxes.id
                })
                .then((sender) => {

                    message += `participant ajout ${sender.id}`
                })
                .catch((error) => {

                    mest += `erreur ajout ${sender.id}`;
                });

            message += "inbox ajouter avec participant"
            me = message;
            return { me,  data:n_inb }

        })
        .catch(error => {

            mest = "tonga teto ar";
            me = mest;
            n_inb = error;
            return { me,  data: n_inb }
        })  
}

exports.cache = new NodeCache({ stdTTL: 600, checkperiod: 180 });

exports.genEmail = (userEmail, response, Subject) => {
   
    let config = {

        service: 'gmail',
        auth: {
            user: config.production.server.email,
            pass: config.production.server.password
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({

        theme: "default",
        product: {
            name: "Equipe Exomada",
            link: 'https://exomada.netlify.app/'
        }
    })



    let mail = MailGenerator.generate(response)

    let emailText = MailGenerator.generatePlaintext(response);

    let message = {

        to: userEmail,
        subject: Subject,
        html: mail,
        text: emailText,
        from: {
            name: 'Support Exomada',
            email: 'mk.one.rh@gmail.com'
        }

    }

    transporter.sendMail(message).then(() => {

        return {
            msg: "you should receive an email"
        }
    })
    .catch(error => {

            return { error }
    })
}