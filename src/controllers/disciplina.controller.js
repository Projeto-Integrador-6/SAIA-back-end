const db = require('../models/index.js')
const Disciplina = db.disciplina

module.exports = {
    async create(req, res) {
        const disciplina = {
            nome: req.body.nome
        }

        await Disciplina.create(disciplina)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred...'
                })
            })
    },

    async findAll(req, res) {
        await Disciplina.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred.'
                })
            })
    },

    async findOne(req, res) {
        const id = req.params.id;

        await Disciplina.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `${id}`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error:" + id
                });
            });
    },

    async delete(req, res) {
        await Disciplina.destroy({
            where: {
                idDisciplina: req.body.idDisciplina
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
}
