const express = require('express');
const route = express.Router();

const TipoQuestao = require ('../controllers/tipoQuestao.controller.js')

route.post("/tipoQuestao", TipoQuestao.create)
route.get("/tipoQuestao", TipoQuestao.findAll)
route.delete('/tipoQuestao', TipoQuestao.delete)

module.exports = route;