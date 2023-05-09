module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cencorshi',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4
            },
            message_id: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4

            },
            user_uid: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4

            }

        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        }
    )
}