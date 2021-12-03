const express = require('express');
const route = express.Router();

const AnaliseDados = require('../controllers/analiseDados.controller.js')

route.get('/analise/:id', AnaliseDados.analise);
route.get('/analise/:idAplicacao/:idUsuario', AnaliseDados.analiseIndividual);

module.exports = route;