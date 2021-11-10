const db = require('../models/index.js')
const Professor_Disciplina = db.professor_disciplina

exports.create = (req, res) => {
    const professor_disciplina = {
        usuario_id: req.body.usuario_id,
        disciplina_id: req.body.disciplina_id,
    }

    Professor_Disciplina.create(professor_disciplina)
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
    Professor_Disciplina.findAll()
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