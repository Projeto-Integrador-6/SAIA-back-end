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
    },


    async update(req, res) {
        const id = req.params.id;
        const nome = req.body.nome;

        Disciplina.update(
            { nome: nome },
            {
                where: { idDisciplina: id }
            })
            .then(data => {
                res.status(200).json({
                    success: "Avaliação foi atualizada com sucesso."
                })
            })
            .catch(err => {
                res.status(500).send({
                    error: "Ocorreu um erro ao editar a disciplina."
                })
            })

    },

    async delete(req, res) {
        Disciplina.destroy({
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
                    .catch(err => {
                        res.status(500).send({
                            message: "Error:" + id
                        });
                    });
            })
    }

}
