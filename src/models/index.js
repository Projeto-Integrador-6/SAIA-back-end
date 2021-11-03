const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT
});

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.tipoQuestao = require("./tipoQuestao.model.js")(sequelize, DataTypes);
db.tag = require("./tag.model.js")(sequelize, DataTypes)
db.questao = require("./questao.model.js")(sequelize, DataTypes)
db.alternativa = require("./alternativa.model.js")(sequelize, DataTypes)
db.avaliacao = require('./avalicao.model.js')(sequelize, DataTypes)
db.questao_tag = require('./questao_tag.model.js')(sequelize, DataTypes)
db.questao_avaliacao = require('./questao_avaliacao.model.js')(sequelize, DataTypes)
db.aplicacao = require('./aplicacao.model.js')(sequelize, DataTypes)

db.tipoQuestao.hasMany(db.questao, {foreignKey: 'idTipoQuestao'})
db.questao.belongsTo(db.tipoQuestao, {foreignKey: 'idTipoQuestao'})

db.questao.belongsToMany(db.tag, {
  through: "questao_tag",
  as: "questao",
  foreignKey: "questao_id",
});

db.tag.belongsToMany(db.questao, {
  through: "questao_tag",
  as: "tag",
  foreignKey: "tag_id",
});

db.questao.hasMany(db.alternativa, {foreignKey: 'idQuestao'})
db.alternativa.belongsTo(db.questao, {foreignKey: 'idQuestao'})

db.avaliacao.hasMany(db.aplicacao, {foreignKey: 'idAvaliacao'})
db.aplicacao.belongsTo(db.avaliacao, {foreignKey: 'idAvaliacao'})

db.questao.belongsToMany(db.avaliacao, {
  through: "questao_avaliacao",
  as: "questao_av",
  foreignKey: "questao_id",
});

db.avaliacao.belongsToMany(db.questao, {
  through: "questao_avaliacao",
  as: "avaliacao_av",
  foreignKey: "avaliacao_id",
});


module.exports = db;