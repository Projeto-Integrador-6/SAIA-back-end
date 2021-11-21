const express = require('express');
const route = express.Router();

const AlunoDisciplina = require('../controllers/aluno_disciplina.controller.js')

route.post('/aluno_disciplina', AlunoDisciplina.create);
route.get('/aluno_disciplina', AlunoDisciplina.findAll);
route.delete('/aluno_disciplina/:usuario/:disciplina', AlunoDisciplina.delete);

module.exports = route;