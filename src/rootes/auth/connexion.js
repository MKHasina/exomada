const { user } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('./cles_prive');
const { Op } = require('sequelize');

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        user
            .findOne({
                where: {
                    [Op.or]: [
                        { pseudo: req.body.pseudo },
                        { email: req.body.pseudo }
                    ]
                }
            })
            .then(User => {
                if (!User) {
                    const message = 'L\'utilisateur demanddé n\'existe pas';
                    return res.status(404).json({ message });
                }
                bcrypt
                    .compare(req.body.mdp, User.mdp)
                    .then(isPasswordValid => {

                        if (!isPasswordValid) {
                            const message = 'Les identifant sont inccorrect';
                            return res.status(401).json({ message });
                        }

                        const token = jwt.sign(
                            {
                                userId: User.user_uid
                            },
                            privateKey,
                            {
                                expiresIn: '4h'
                            }
                        )

                        const message = 'L\'utilisateur a été connecté avec succès';
                        return res.json({ message, data: User, token });
                    })
            })
            .catch(error => {
                const message = 'L\'utilisateur n\'a pas pus être connecté. Réessayez dans quelques instants.';
                return res.status(500).json({ message, data: error });
            })
    })
}