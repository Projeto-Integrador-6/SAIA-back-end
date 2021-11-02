const express = require('express');
const route = express.Router();

const QuestaoAvaliacao = require('../controllers/questao_avaliacao.controller.js')

route.post('/questao_avaliacao', QuestaoAvaliacao.create);
route.get('/questao_avaliacao', QuestaoAvaliacao.findAll);

module.exports = route;