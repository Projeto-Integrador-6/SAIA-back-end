module.exports = (sequelize, DataTypes) => {
    const disciplina = sequelize.define('disciplina', 
    {
        idDisciplina: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: {
                args: [2, 255],
                msg: "O nome deve ter um mínimo de 2 caracteres!"
              }
            }
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return disciplina
  }