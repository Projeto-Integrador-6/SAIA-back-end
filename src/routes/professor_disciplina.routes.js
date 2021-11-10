const express = require('express');
const route = express.Router();

const ProfessorDisciplina = require('../controllers/professor_disciplina.controller.js')

route.post('/professor_disciplina', ProfessorDisciplina.create);
route.get('/professor_disciplina', ProfessorDisciplina.findAll);

module.exports = route;