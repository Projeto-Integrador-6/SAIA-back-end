const express = require('express');
const route = express.Router();

const Usuario = require('../controllers/usuario.controller.js')

route.get('/usuario', Usuario.findAll);
route.delete('/usuario', Usuario.delete);
route.get('/usuario/:id', Usuario.findOne)

module.exports = route;