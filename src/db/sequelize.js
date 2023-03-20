const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const CensorModel = require('../models/cencorshi');
const InboxrModel = require('../models/inbox');
const MessageModel = require('../models/message');
const ParticipeModel = require('../models/participe');
const config = require('../../config/config');




const sequelize = new Sequelize(config.production.db.database, config.production.db.username, config.production.db.password, config.production.db);

const user = UserModel(sequelize, DataTypes);
const inbox = InboxrModel(sequelize, DataTypes);
const chat = MessageModel(sequelize, DataTypes);
const participe = ParticipeModel(sequelize, DataTypes);
const cencorshi = CensorModel(sequelize, DataTypes);

const initDb = () => {
    return sequelize.sync()
        .then(_ => {
            /*user.create({
                pseudo: "MKHasina",
                mdp: "motdepasse",
                email: "MKHasina@exomada.com",
                user_uid: "mk_1",
                roles: 5000

            }).then(pokemon => console.log(pokemon.toJSON()))
*/
            console.log('La base de donnée a bien été initialisée !')

        })
}

module.exports = {
    initDb, user, inbox, chat, participe, cencorshi
}