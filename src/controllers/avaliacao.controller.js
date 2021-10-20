const db = require('../models/index.js')
const Avaliacao = db.avaliacao

exports.create = (req, res) => {
    const avaliacao = {
        nome: req.body.nome,
        descricao: req.body.descricao,
    }

    Avaliacao.create(avaliacao)
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
    Avaliacao.findAll()
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
    const avaliacao = {
        idAvaliacao: req.body.idAvaliacao
    }
  
    Avaliacao.destroy({
        where: {
            idAvaliacao: req.body.idAvaliacao
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