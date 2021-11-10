module.exports = (sequelize, DataTypes) => {
    const aluno_disciplina = sequelize.define('aluno_disciplina', 
    {
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        disciplina_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return aluno_disciplina
}