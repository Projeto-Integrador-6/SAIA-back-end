const db = require('../models/index.js')
const Questao_Avaliacao = db.questao_avaliacao

exports.create = (req, res) => {
    const questao_avaliacao = {
        questao_id: req.body.questao_id,
        avaliacao_id: req.body.avaliacao_id,
    }

    Questao_Avaliacao.create(questao_avaliacao)
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
    Questao_Avaliacao.findAll()
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