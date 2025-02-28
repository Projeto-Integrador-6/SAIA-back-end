const { aplicacao } = require('../models/index.js')
const db = require('../models/index.js');
const Sequelize = require('../database/db');
const Aplicacao = db.aplicacao;


module.exports = {
    async analise(req, res) {
        const idAplicacao = req.params.id;

        try {
            const [prova] = await Sequelize.query(`select valor as value, nome as label from aplicacao where idAplicacao = :idAplicacao`,
                {
                    replacements: { idAplicacao: idAplicacao }
                })

            const [porcentagem] = await Sequelize.query(`select
                    ifnull(aplicacao.nome,0) as name,
                    ifnull(concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%'),0) AS hitPercentage,
                    ifnull(concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = FALSE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%'),0) AS errorPercentage,
                    case
                        when concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') > 0 
                        and concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') <= 40 then "RUIM"
                        when concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') > 40
                        and concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') <= 80  then "BOM"
                        when concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') > 80 then "EXCELENTE" 
                        else 0
                        end as performance
                    from resposta
                    inner join aplicacao on resposta.idAplicacao = aplicacao.idAplicacao
                    left join questao on resposta.idQuestao = questao.idQuestao
                    left join alternativa on resposta.idQuestao = alternativa.idQuestao
                    where 
                    resposta.idAplicacao = :idAplicacao`
                , {
                    replacements: { idAplicacao: idAplicacao }
                })

            const [erroAcerto] = await Sequelize.query(`SELECT 
                questao.nome AS name,
                sum(resposta.resposta = alternativa.idAlternativa
                AND alternativa.isAlternativaCorreta = TRUE) AS Acertos,
                sum(resposta.resposta = alternativa.idAlternativa
                AND alternativa.isAlternativaCorreta = FALSE) AS Erros
                FROM resposta
                INNER JOIN questao ON resposta.idQuestao = questao.idQuestao
                INNER JOIN alternativa ON resposta.idQuestao = alternativa.idQuestao
                WHERE idAplicacao = :idAplicacao
                group by name`
                , {
                    replacements: { idAplicacao: idAplicacao }
                })

            const [selecionaAlternativa] = await Sequelize.query(`select  
                    distinct ifnull(questao.nome,0) as name, 
                    ifnull(sum(alternativa.sequencia = 0),0) as "Alternativa A", 
                    ifnull(sum(alternativa.sequencia = 1),0) as "Alternativa B",
                    ifnull(sum(alternativa.sequencia = 2),0) as "Alternativa C", 
                    ifnull(sum(alternativa.sequencia = 3),0) as "Alternativa D",
                    ifnull(sum(alternativa.sequencia = 4),0) as "Alternativa E",
                    ifnull(sum(alternativa.sequencia = 5),0) as "Alternativa F"
                    from resposta
                    inner join questao on resposta.idQuestao = questao.idQuestao 
                    inner join alternativa on resposta.resposta = alternativa.idAlternativa
                    where resposta.idAplicacao = :idAplicacao
                    group by name`
                , {
                    replacements: { idAplicacao: idAplicacao }
                })

            const [radarTag] = await Sequelize.query(`select
                    tag.descricao as Conteúdo,
                    concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa)* 100),2)) as Porcentagem
                    from resposta
                    inner join aplicacao on resposta.idAplicacao = aplicacao.idAplicacao
                    inner join questao on resposta.idQuestao = questao.idQuestao
                    inner join alternativa on resposta.idQuestao = alternativa.idQuestao
                    inner join questao_tag on questao_tag.questao_id = resposta.idQuestao
                    inner join tag on tag.idTag = questao_tag.tag_id
                    where
                    resposta.idAplicacao = :idAplicacao
                    group by Conteúdo`
                , {
                    replacements: { idAplicacao: idAplicacao }
                })

            res.status(200).json({ prova, resume: porcentagem, barChartData: erroAcerto, lineChartData: selecionaAlternativa, radarChartData: radarTag })

        } catch (err) {
            res.status(200).json({ error: "Ocorreu um erro ao buscar os resultados da avaliação." })
        }
    },

    async analiseIndividual(req, res) {
        const idAplicacao = req.params.idAplicacao;
        const idUsuario = req.params.idUsuario

        try {
            const [porcentagem] = await Sequelize.query(`
            select
            ifnull(aplicacao.nome,0) as name,
            ifnull(concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%'),0) AS hitPercentage,
            ifnull(concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = FALSE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%'),0) AS errorPercentage,
            case
                when concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') > 0 
                and concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') <= 40 then "RUIM"
                when concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') > 40
                and concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') <= 80  then "BOM"
                when concat(round(( sum(resposta.resposta = alternativa.idAlternativa AND alternativa.isAlternativaCorreta = TRUE)/sum(resposta.resposta = alternativa.idAlternativa) * 100 ),2),'%') > 80 then "EXCELENTE" 
                else 0
                end as performance
            from resposta
            inner join aplicacao on resposta.idAplicacao = aplicacao.idAplicacao
            left join questao on resposta.idQuestao = questao.idQuestao
            left join alternativa on resposta.idQuestao = alternativa.idQuestao
            where 
            resposta.idAplicacao = :idAplicacao AND resposta.idUsuario = :idUsuario`
            , {
                replacements: { idAplicacao: idAplicacao, idUsuario: idUsuario }
            })

            res.status(200).json({ resume: porcentagem })

        } catch (err) {
            res.status(200).json({ error: "Ocorreu um erro ao buscar os resultados da avaliação do aluno." })
        }
        
    }
}