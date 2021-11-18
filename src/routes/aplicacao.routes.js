const express = require('express');
const route = express.Router();

const Aplicacao = require('../controllers/aplicacao.controller.js')

route.post('/aplicacao', Aplicacao.create);
route.get('/aplicacao/user/:usuario', Aplicacao.findAll);
route.get('/aplicacao/disciplina/:usuario', Aplicacao.findByUser);
route.get('/aplicacao/avaliacao/:aplicacao', Aplicacao.findAvaliacaoByAplicacao);
route.put('/aplicacao/:id', Aplicacao.update)
route.delete('/aplicacao', Aplicacao.delete);
route.get('/aplicacao/:id', Aplicacao.findOne)

module.exports = route;