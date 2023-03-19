module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cencorshi',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            message_id: {
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