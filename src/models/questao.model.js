module.exports = (sequelize, DataTypes) => {
    const questao = sequelize.define('questao', 
    {
        idQuestao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enunciado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return questao
}