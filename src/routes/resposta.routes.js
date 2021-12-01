const express = require('express');
const route = express.Router();

const Resposta = require('../controllers/resposta.controller.js')

route.post('/resposta', Resposta.create);
route.get('/resposta', Resposta.findAll);
route.get('/resposta/procurar_pessoas/:id', Resposta.findUsers);
route.get('/resposta/:idUsuario/:idAplicacao', Resposta.findResponseByUser);

module.exports = route;