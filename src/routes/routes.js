const express = require('express');
const routes = express.Router();

const Auth = require('./auth.routes');
const Usuario = require('./usuario.routes');
const Disciplina = require('./disciplina.routes');
const AlunoDisciplina = require('./aluno_disciplina.routes');
const ProfessorDisciplina = require('./professor_disciplina.routes');
const TipoQuestaoRoutes = require('./tipoQuestao.routes');
const QuestaoRoutes = require('./questao.routes');
const AlternativaRoutes = require('./alternativa.routes');
const Avaliacao = require('./avaliacao.routes');
const QuestaoAvaliacao = require('./questao_avaliacao.routes');
const Aplicacao = require('./aplicacao.routes');
const Tag = require('./tag.routes');
const QuestaoTag = require('./questao_tag.routes');

routes.use(Auth);
routes.use(Usuario);
routes.use(Disciplina);
routes.use(AlunoDisciplina);
routes.use(ProfessorDisciplina);
routes.use(TipoQuestaoRoutes);
routes.use(QuestaoRoutes);
routes.use(AlternativaRoutes);
routes.use(Avaliacao);
routes.use(QuestaoAvaliacao);
routes.use(Aplicacao);
routes.use(Tag);
routes.use(QuestaoTag);

module.exports = routes;