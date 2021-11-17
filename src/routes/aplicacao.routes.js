const express = require('express');
const route = express.Router();

const Aplicacao = require('../controllers/aplicacao.controller.js')

route.post('/aplicacao', Aplicacao.create);
<<<<<<< HEAD
route.get('/aplicacao/user/:usuario', Aplicacao.findAll)
route.put('/aplicacao/:id', Aplicacao.update)
=======
route.get('/aplicacao/user/:usuario', Aplicacao.findAll);
>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
route.delete('/aplicacao', Aplicacao.delete);
route.get('/aplicacao/:id', Aplicacao.findOne)

module.exports = route;