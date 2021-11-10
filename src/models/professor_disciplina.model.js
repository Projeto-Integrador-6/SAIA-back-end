module.exports = (sequelize, DataTypes) => {
    const professor_disciplina = sequelize.define('professor_disciplina', 
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
    return professor_disciplina
}