const db = require('../models/index.js')
const Questao = db.questao

exports.create = (req, res) => {
    const questao = {
        nome: req.body.nome,
        enunciado: req.body.enunciado,
        valor: req.body.valor,
        idTipoQuestao: req.body.idTipoQuestao
    }

    Questao.create(questao)
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
    Questao.findAll()
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

exports.delete = (req, res) => {
    const questao = {
        idQuestao: req.body.idQuestao
    }
  
    Questao.destroy({
        where: {
            idQuestao: req.body.idQuestao
        }
    })
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