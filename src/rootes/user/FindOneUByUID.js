const { user } = require('../../db/sequelize');

const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
const { Op } = require("sequelize");

module.exports = (app) => {
    app.post('/api/user/name', (req, res) => {
        console.log(req.body)
        const Wsear = req.body.userUId

        const cachedData = cache.get(Wsear);

        if (cachedData !== undefined) {
            const message = 'L\' utilisateur a été récuperer avec succès';
            res.json({ message, data: cachedData });

        } else {


            console.log("2222");

            user
                .findOne({
                    attributes: ['pseudo', 'user_uid'],
                    where: {
                        user_uid: Wsear
                    }

                })
                .then(User => {
                    cache.set(Wsear, User);
                    const message = 'L\' utilisateur a été récuperer avec succès';
                    return res.json({ message, data: User });

                })
                .catch(error => {
                    const message = 'L\'utilisateur n\'a pas pus être connecté. Réessayez dans quelques instants.';
                    return res.status(500).json({ message, data: error });
                })
        }
    })
}