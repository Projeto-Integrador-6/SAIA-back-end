module.exports = (sequelize, DataTypes) => {
    const alternativa = sequelize.define('alternativa', 
    {
        idAlternativa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAlternativaCorreta: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    
    return alternativa
}