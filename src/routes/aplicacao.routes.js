const express = require('express');
const route = express.Router();

const Aplicacao = require('../controllers/aplicacao.controller.js')

route.post('/aplicacao', Aplicacao.create);
route.get('/aplicacao', Aplicacao.findAll);
route.delete('/aplicacao', Aplicacao.delete);

module.exports = route;