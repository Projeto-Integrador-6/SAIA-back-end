const { aplicacao } = require('../models/index.js')
const db = require('../models/index.js');
const Sequelize = require('../database/db');
const Aplicacao = db.aplicacao;


module.exports = {
    async analise(req,res) {
        const idAplicacao = req.params.id;

        try {
            const [prova] = await Sequelize.query(`select valor as value, nome as label from aplicacao where idAplicacao = :idAplicacao`,
            {
                replacements: { idAplicacao: idAplicacao }
            })
            
            const [porcentagem] = await Sequelize.query(`select
                ifnull(aplicacao.nome,0) as name,
                ifnull(concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%'),0) AS hitPercentage,
                ifnull(concat(round(( sum(resposta.resposta <> alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%'),0) AS errorPercentage,
                case
                when concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') > 0 
                and concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') <= 40 then "RUIM"
                when concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') > 40
                and concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') <= 80  then "BOM"
                when concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') > 80 then "EXCELENTE" 
                else 0
                end as performance
                from resposta
                inner join aplicacao on resposta.idAplicacao = aplicacao.idAplicacao
                left join questao on resposta.idQuestao = questao.idQuestao
                left join alternativa on resposta.idQuestao = alternativa.idQuestao
                where 
                resposta.idAplicacao = :idAplicacao`   
            ,{
                replacements: { idAplicacao: idAplicacao}
            })

            const [erroAcerto] = await Sequelize.query(`SELECT 
                questao.nome AS name,
                sum(resposta.resposta = alternativa.sequencia
                AND alternativa.isAlternativaCorreta = TRUE) AS Acertos,
                sum(resposta.resposta = alternativa.sequencia
                AND alternativa.isAlternativaCorreta = FALSE) AS Erros
                FROM resposta
                INNER JOIN questao ON resposta.idQuestao = questao.idQuestao
                INNER JOIN alternativa ON resposta.idQuestao = alternativa.idQuestao
                WHERE idAplicacao = 1
                group by name`
            ,{
                replacements: { idAplicacao: idAplicacao }
            })

            const [selecionaAlternativa] = await Sequelize.query(`select  
                distinct ifnull(questao.nome,0) as name, 
                ifnull(sum(resposta = 0),0) as "Alternativa A", 
                ifnull(sum(resposta = 1),0) as "Alternativa B",
                ifnull(sum(resposta = 2),0) as "Alternativa C", 
                ifnull(sum(resposta = 3),0) as "Alternativa D"
                from resposta
                inner join questao on resposta.idQuestao = questao.idQuestao 
                where resposta.idAplicacao = :idAplicacao`
            ,{
                replacements: { idAplicacao: idAplicacao }
            })

            const [radarTag] = await Sequelize.query(`select
                ifnull(tag.descricao, 0) as Conteúdo,
                ifnull(concat(round((count(questao_tag.tag_id)/(select 
                    count(questao_avaliacao.questao_id) 
                    from questao_avaliacao 
                    inner join aplicacao on aplicacao.idAvaliacao = questao_avaliacao.avaliacao_id 
                    where aplicacao.idAplicacao = 1)* 100),2), '%'), 0) as Porcentagem
                from questao_tag
                inner join tag on questao_tag.tag_id = tag.idTag
                inner join questao_avaliacao on questao_avaliacao.questao_id = questao_tag.questao_id
                inner join aplicacao on aplicacao.idAvaliacao = questao_avaliacao.avaliacao_id
                where aplicacao.idAplicacao = 1
                group by Conteúdo`
            ,{
                replacements: { idAplicacao: idAplicacao }
            })

            res.status(200).json({ prova, resume: porcentagem, barChartData: erroAcerto, lineChartData: selecionaAlternativa, radarChartData: radarTag})

        } catch (err) {
            res.status(200).json({ error: "Ocorreu um erro ao buscar os resultados da avaliação."})
        }
    }
}