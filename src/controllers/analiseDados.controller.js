const { sequelize } = require('../models/index.js');
const db = require('../models/index.js')

exports.analise = async (req, res) => {
    //const idUsuario = req.body.idUsuario;
    const idAplicacao = req.params.id;

    const [Prova] = await sequelize.query(`select valor as value,nome as label from aplicacao where idAplicacao = :idAplicacao`,
    {
        replacements: { idAplicacao: idAplicacao }
    })
    const [erroAcerto] = await sequelize.query(`
        SELECT distinct(questao.nome) AS name,
        sum(resposta.resposta = alternativa.idAlternativa
            AND alternativa.isAlternativaCorreta = TRUE) AS Acertos,
        sum(resposta.resposta = alternativa.idAlternativa
        AND alternativa.isAlternativaCorreta = FALSE) AS Erros
        FROM resposta
        INNER JOIN questao ON resposta.idQuestao = questao.idQuestao
        LEFT JOIN alternativa ON resposta.idQuestao = alternativa.idQuestao
        WHERE idAplicacao = :idAplicacao
        GROUP BY name`
    ,{
        replacements: { idAplicacao: idAplicacao }
    })
    const [porcentagem] = await sequelize.query(`select
        aplicacao.nome as name,
        concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') AS hitPercentage,
        concat(round(( sum(resposta.resposta <> alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') AS errorPercentage,
        case
        when concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') <= 40 then "RUIM"
        when concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') > 40
        and concat(round(( sum(resposta.resposta = alternativa.isAlternativaCorreta)/count(resposta) * 100 ),2),'%') <= 80  then "BOM"
        else "EXCELENTE"
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
    const [selecionaAlternativa] = await sequelize.query(`select  
        distinct(questao.nome) as name, 
        sum(resposta = 0) as "Alternativa A", 
        sum(resposta = 1) as "Alternativa B",
        sum(resposta = 2) as "Alternativa C", 
        sum(resposta = 3) as "Alternativa D"
        from resposta
        inner join questao on resposta.idQuestao = questao.idQuestao 
        where resposta.idAplicacao = :idAplicacao 
        group by name`
    ,{
        replacements: { idAplicacao: idAplicacao }
    })

    //console.log(data)
    return res.json({ Prova, resume: porcentagem, barChartData: erroAcerto, lineChartData: selecionaAlternativa})
}