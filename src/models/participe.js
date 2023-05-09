module.exports = (sequelize, DataTypes) => {
    return sequelize.define('participe',
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