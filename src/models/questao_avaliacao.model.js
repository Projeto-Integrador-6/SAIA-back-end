module.exports = (sequelize, DataTypes) => {
    const questao_avaliacao = sequelize.define('questao_avaliacao', 
    {
        questao_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        avaliacao_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return questao_avaliacao
}