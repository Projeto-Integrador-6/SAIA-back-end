const express = require('express');
const route = express.Router();

const Avaliacao = require('../controllers/avaliacao.controller.js')

route.post('/avaliacao', Avaliacao.create);
route.get('/avaliacao', Avaliacao.findAll);
route.delete('/avaliacao', Avaliacao.delete);

module.exports = route;