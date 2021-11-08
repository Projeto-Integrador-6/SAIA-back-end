const express = require('express');
const route = express.Router();

const Alternativa = require('../controllers/alternativa.controller.js')

route.post('/alternativa', Alternativa.create);
route.get('/alternativa', Alternativa.findAll);
route.delete('/alternativa', Alternativa.delete);
route.get('/alternativa/:id', Alternativa.findOne)

module.exports = route;