module.exports = (sequelize, DataTypes) => {
    return sequelize.define('inbox',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING
            },
            user_uid: {
                type: DataTypes.STRING
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