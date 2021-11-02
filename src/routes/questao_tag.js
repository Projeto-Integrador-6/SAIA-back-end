const express = require('express');
const route = express.Router();

const QuestaoTag = require('../controllers/questao_tag.controller.js')

route.post('/questao_tag', QuestaoTag.create);
route.get('/questao_tag', QuestaoTag.findAll);

module.exports = route;