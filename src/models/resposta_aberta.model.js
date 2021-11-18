module.exports = (sequelize, DataTypes) => {
    const resposta_aberta = sequelize.define('resposta_aberta', 
    {
        resposta: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return resposta_aberta
}