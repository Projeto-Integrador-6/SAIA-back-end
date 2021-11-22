const db = require('../models/index.js');

const Disciplina = db.disciplina;
const Usuario = db.usuario;

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

    async findByDiscipline(req, res) {
        const id = req.params.id;
        const type = req.params.type;

        try {

            if(type == 'alunos'){
                const aluno_disciplina = await Disciplina.findOne({
                    where: { idDisciplina: id }, include: {
                        model: Usuario,
                        as: "disciplina_aluno",
                        attributes: {
                            exclude: ['password']
                        }
                    }
                });

                res.status(200).json({ result: aluno_disciplina });
            }

            if(type == 'professores'){
                const professor_disciplina = await Disciplina.findOne({
                    where: { idDisciplina: id }, include: {
                        model: Usuario,
                        as: "disciplina_professor",
                        attributes: {
                            exclude: ['password']
                        }
                    }
                });

                res.status(200).json({ result: professor_disciplina });
            }
             
            
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao realizar a busca." });
        }
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
