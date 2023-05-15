module.exports = (sequelize, DataTypes) => {
    return sequelize.define('message',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4
            },
            inbox_id: {
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4
            },
            user_uid: {
                type: DataTypes.UUID,//one day baby
                defaultValue: sequelize.UUIDV4
            },
            message: {
                type: DataTypes.STRING
            },
            attachement: {
                type: DataTypes.STRING
            }

        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        }
    )
}