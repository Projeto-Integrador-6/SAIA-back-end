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
            const [erroAcerto] = await Sequelize.query(`
                SELECT distinct ifnull(questao.nome,0) AS name,
                ifnull(sum(resposta.resposta = alternativa.idAlternativa
                    AND alternativa.isAlternativaCorreta = TRUE),0) AS Acertos,
                ifnull(sum(resposta.resposta = alternativa.idAlternativa
                AND alternativa.isAlternativaCorreta = FALSE),0) AS Erros
                FROM resposta
                INNER JOIN questao ON resposta.idQuestao = questao.idQuestao
                INNER JOIN alternativa ON resposta.idQuestao = alternativa.idQuestao
                WHERE idAplicacao = :idAplicacao
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

            res.status(200).json({ prova, resume: porcentagem, barChartData: erroAcerto, lineChartData: selecionaAlternativa})

        } catch (err) {
            res.status(200).json({ error: "Ocorreu um erro ao buscar os resultados da avaliação."})
        }
    }
}