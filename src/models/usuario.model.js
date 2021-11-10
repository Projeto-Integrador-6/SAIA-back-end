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
          allowNull: false,
          validate: {
            len: {
              args: [2, 255],
              msg: "O nome deve ter um mínimo de 2 caracteres!"
            }
          }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "O e-mail deve ser um correio eletrônico válido!"
          }
        }
      },
      tipoUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            msg: "Tipo de usuário inválido"
          },
          len: {
            args: [1, 2],
            msg: "Tipo de usuário inválido"
          }
        }
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: "O password deve ter um mínimo de 6 caracteres!"
          }
        }
      },
  },
  {
      freezeTableName: true,
      timestamps: false,
  })
  return usuario
}