const db = require('../models/index.js')
const Tag = db.tag

exports.create = (req, res) => {
    const tag = {
        descricao: req.body.descricao
    }

    Tag.create(tag)
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
    Tag.findAll()
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
    const tag = {
        idTag: req.body.idTag
    }
  
    Tag.destroy({
        where: {
            idTag: req.body.idTag
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