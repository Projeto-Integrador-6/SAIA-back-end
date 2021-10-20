module.exports = (sequelize, DataTypes) => {
    const tipoQuestao = sequelize.define('tipoQuestao', 
    {
        idTipoQuestao: {
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
    return tipoQuestao
}