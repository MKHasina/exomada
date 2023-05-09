
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('user',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize.UUIDV4
            },
            pseudo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: { msg: 'le pseudo est déjà pris' },
                validate: {
                    notEmpty: { msg: 'Le pseudo ne peut pas être vide' },
                    notNull: { msg: 'Le pseudo est une propriété requise' }
                }
            },
            mdp: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: { msg: 'le adresse est déjà pris' },
                validate: {
                    isUrl: { msg: 'Utilisez des lien' },
                    notNull: { msg: 'Les points de vie sont une propriété requise' }
                }

            },
            user_uid: {
                type: DataTypes.STRING,
                allowNull: false
            },
            roles: {
                type: DataTypes.INTEGER,
                allowNull: false
            }

        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        }
    )
}