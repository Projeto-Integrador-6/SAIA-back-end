const db = require('../models/index.js')
const Aluno_Disciplina = db.aluno_disciplina

exports.create = (req, res) => {
    const aluno_disciplina = {
        usuario_id: req.body.usuario_id,
        disciplina_id: req.body.disciplina_id,
    }

    Aluno_Disciplina.create(aluno_disciplina)
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
    Aluno_Disciplina.findAll()
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