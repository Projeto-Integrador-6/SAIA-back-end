module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', 
  {
      idUsuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      nome: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      }
  }, 
  {
      freezeTableName: true,
      timestamps: false,
  })
  return usuario
}