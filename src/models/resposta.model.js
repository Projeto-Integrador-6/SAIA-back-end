module.exports = (sequelize, DataTypes) => {
    const resposta = sequelize.define('resposta', 
    {
        resposta: {
            type: DataTypes.BOOLEAN,
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