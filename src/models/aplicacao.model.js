module.exports = (sequelize, DataTypes) => {
    const aplicacao = sequelize.define('aplicacao', 
    {
        idAplicacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dataInicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dataFim: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return aplicacao
}