const Dbconfig = require('../config/db.config.js')
const { Sequelize } = require('sequelize');

//cria uma conexão com o banco de dados
const sequelize = new Sequelize(Dbconfig.DATABASE, Dbconfig.USER, Dbconfig.PASSWORD, {
    host: Dbconfig.HOST,
    dialect: 'mysql'
})

//abre uma conexão com o banco de dados
async function testConn() {
  try {   
    // await sequelize.sync({ alter: true })
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}

testConn();

module.exports = sequelize;