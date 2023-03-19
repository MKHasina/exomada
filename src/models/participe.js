module.exports = (sequelize, DataTypes) => {
    return sequelize.define('participe',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            inbox_id: {
                type: DataTypes.INTEGER,

            },
            user_uid: {
                type: DataTypes.STRING,

            }

        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        }
    )
}