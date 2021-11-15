const express = require('express');
const route = express.Router();

const RespostaAberta = require('../controllers/resposta_aberta.controller.js')

route.post('/resposta_aberta', RespostaAberta.create);
route.get('/resposta_aberta', RespostaAberta.findAll);

module.exports = route;