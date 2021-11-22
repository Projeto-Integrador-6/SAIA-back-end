const express = require('express');
const route = express.Router();

const Usuario = require('../controllers/usuario.controller.js')

route.post('/usuario', Usuario.create);
route.get('/usuario', Usuario.findAll);
route.get('/usuario/:id', Usuario.findOne);
route.get('/usuario/type/:type', Usuario.findByType)
route.put('/usuario/:id', Usuario.update);

module.exports = route;