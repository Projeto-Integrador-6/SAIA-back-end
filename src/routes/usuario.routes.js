const express = require('express');
const route = express.Router();

const Usuario = require('../controllers/usuario.controller.js')

route.get('/usuario', Usuario.findAll);
route.get('/usuario/:id', Usuario.findOne)
route.post('/cadastro', Usuario.create);

module.exports = route;