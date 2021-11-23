module.exports = (sequelize, DataTypes) => {
    const resposta = sequelize.define('resposta', 
    {
        resposta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              isAlphanumeric: {
                msg: "Resposta inválida!"
              },
            }
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return resposta
}