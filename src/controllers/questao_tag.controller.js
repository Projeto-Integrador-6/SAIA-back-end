const db = require('../models/index.js')
const Questao_Tag = db.questao_tag

exports.create = (req, res) => {
    const questao_tag = {
        questao_id: req.body.questao_id,
        tag_id: req.body.tag_id
    }

    Questao_Tag.create(questao_tag)
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
    Questao_Tag.findAll()
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