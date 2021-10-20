module.exports = (sequelize, DataTypes) => {
    const tag = sequelize.define('tag', 
    {
        idTag: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return tag
}