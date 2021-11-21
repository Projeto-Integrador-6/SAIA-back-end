const express = require('express');
const route = express.Router();

const Resposta = require('../controllers/resposta.controller.js')

route.post('/resposta', Resposta.create);
route.get('/resposta', Resposta.findAll);

module.exports = route;