const express = require('express');
const routes = express.Router();

const TipoQuestaoRoutes = require('./tipoQuestao.routes');
const QuestaoRoutes = require('./questao.routes');
const AlternativaRoutes = require('./alternativa.routes');
const Avaliacao = require('./alternativa.routes');
const QuestaoAvaliacao = require('./questao_avaliacao.routes');
const Aplicacao = require('./aplicacao.routes');
const Tag = require('./tag.routes');

routes.use(TipoQuestaoRoutes);
routes.use(QuestaoRoutes);
routes.use(AlternativaRoutes);
routes.use(Avaliacao);
routes.use(QuestaoAvaliacao);
routes.use(Aplicacao);
routes.use(Tag);

module.exports = routes;