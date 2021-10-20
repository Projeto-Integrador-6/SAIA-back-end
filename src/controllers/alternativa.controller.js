const db = require('../models/index.js')
const Alternativa = db.alternativa

exports.create = (req, res) => {
    const alternativa = {
        descricao: req.body.descricao,
        isAlternativaCorreta: req.body.isAlternativaCorreta,
        idQuestao: req.body.idQuestao
    }

    Alternativa.create(alternativa)
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
    Alternativa.findAll()
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
    const alternativa = {
        idAlternativa: req.body.idAlternativa
    }
  
    Alternativa.destroy({
        where: {
            idAlternativa: req.body.idAlternativa
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