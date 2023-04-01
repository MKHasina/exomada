const { participe, inbox, chat, sequelize } = require('../db/sequelize');
const { Op } = require("sequelize");
const NodeCache = require('node-cache');

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

/*exports.findInbox = async (sender, recever) => {
    return await participe.findAll({
        attributes: ['inbox_id',
            [sequelize.literal('(SELECT COUNT(*) FROM participes AS p3 where p3.inbox_id = participe.inbox_id)'),
                'count']],
        where: {
            user_uid: sender
        },
        include: [{
            model: participe,
            as: 'p2',
            where: {
                user_uid: recever
            }
        }],
        having: sequelize.literal('count = 2')
    })

}*/

exports.findInbox = async (sender, receiver) => {
    const result = await participe.findAll({
        attributes: ['inbox_id', [sequelize.fn('COUNT', sequelize.col('p2.id')), 'count']],
        where: {
            user_uid: sender
        },
        include: [{
            model: participe,
            as: 'p2',
            where: {
                user_uid: receiver
            }
        }],
        group: ['participe.inbox_id'],
        having: sequelize.literal('count = 2')
    });

    return result;
};


exports.cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });