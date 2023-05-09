module.exports = (sequelize, DataTypes) => {
    return sequelize.define('inbox',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: sequelize.UUIDV4
            },
            name: {
                type: DataTypes.STRING
            },
            user_uid: {
                type: DataTypes.UUID,//one day baby
                defaultValue: sequelize.UUIDV4
            },
            state: {
                type: DataTypes.INTEGER
            }

        },
        {
            timestamps: true,
            createdAt: 'created',
            updatedAt: false
        }
    )
}