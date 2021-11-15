const { usuario, aplicacao, questao } = require('../models/index.js')
const db = require('../models/index.js')
const Usuario = db.usuario
const Aplicacao = db.aplicacao
const Questao = db.questao
const Resposta_Aberta = db.resposta_aberta

exports.create = async (req, res) => {
    const resposta_aberta = {
        idUsuario: req.body.idUsuario,
        idAplicacao: req.body.idAplicacao,
        idQuestao: req.body.idQuestao,
        resposta: req.body.resposta
    }
    
    const usuario = await Usuario.findOne({ where: { idUsuario: resposta_aberta.idUsuario } });
    if(!usuario){
        return res.status(404).send({
            message: "Usuário não encontrado!"
        })
    }
    const aplicacao = await Aplicacao.findOne({ where: { idAplicacao: resposta_aberta.idAplicacao } });
    if(!aplicacao){
        return res.status(404).send({
            message: "Aplicação não encontrada!"
        })
    }
    const questao = await Questao.findOne({ where: { idQuestao: resposta_aberta.idQuestao } });
    if(!questao){
        return res.status(404).send({
            message: "Questão não encontrada!"
        })
    }

    

    

    Resposta_Aberta.create(resposta_aberta)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred...'
            })
        })
}

exports.findAll = (req, res) => {
    Resposta_Aberta.findAll({
        include: [
            {
                model: usuario,
                as: 'usuario'
            },
            {
                model: aplicacao,
                as: 'aplicacao'
            },
            {
                model: questao,
                as: 'questao'
            }
        ]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'Some error occurred.'
        })
    })
}