const express = require('express');
const route = express.Router();

const Avaliacao = require('../controllers/avaliacao.controller.js')

route.post('/avaliacao', Avaliacao.create);
route.get('/avaliacao/user/:usuario', Avaliacao.findAll);
route.put('/avaliacao/:id', Avaliacao.update);
route.delete('/avaliacao', Avaliacao.delete);
route.get('/avaliacao/:id', Avaliacao.findOne)


module.exports = route;