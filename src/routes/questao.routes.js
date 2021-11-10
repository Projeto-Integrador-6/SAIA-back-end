const express = require('express');
const route = express.Router();

const Questao = require('../controllers/questao.controller.js')
    
route.post('/questao', Questao.create);
route.get('/questao', Questao.findAll);
route.delete('/questao', Questao.delete);
route.get('/questao/:id', Questao.findOne)


module.exports = route;