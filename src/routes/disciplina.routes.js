const express = require('express');
const route = express.Router();

const Disciplina = require('../controllers/disciplina.controller.js')

route.post('/disciplina', Disciplina.create);
route.get('/disciplina', Disciplina.findAll);
route.delete('/disciplina', Disciplina.delete);
route.get('/disciplina/:id', Disciplina.findOne)

module.exports = route;