module.exports = (sequelize, DataTypes) => {
    const resposta_aberta = sequelize.define('resposta_aberta', 
    {
        resposta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'usuario',
                key: 'idUsuario'
            }
        },
        idAplicacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'aplicacao',
                key: 'idAplicacao'
            }
        },
        idQuestao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'questao',
                key: 'idQuestao'
            }
        },
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return resposta_aberta
}