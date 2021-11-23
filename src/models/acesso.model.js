module.exports = (sequelize, DataTypes) => {
    const acesso = sequelize.define('acesso', 
    {
        idAcesso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        isFinalizado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    
    return acesso
}