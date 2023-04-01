const { participe, inbox, chat, sequelize } = require('../db/sequelize');
const { Op } = require("sequelize");

exports.UniD = (cle, id_max) => {
    return cle + "/" + ((isNaN(parseInt(id_max)) ? 0 : parseInt(id_max)) + 1);
}
exports.CDroles = (roles) => {
    if (roles === 5000) {
        return 411;
    }
    if (roles === 2001) {
        return 71;
    }
    if (roles === 6666) {
        return 401;
    }
    {
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