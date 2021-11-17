const db = require('../models/index.js')
const Sequelize = require('../database/db');

const Aplicacao = db.aplicacao;
const Avaliacao = db.avaliacao;

module.exports = {
    async create(req, res) {
        const {
            valor,
            dataInicio,
            dataFim,
            idAvaliacao,
            idUsuario
        } = req.body

        const transaction = await Sequelize.transaction();

        try {

            const avaliacao = await Avaliacao.findOne({ where: { idAvaliacao: idAvaliacao }})

            const newAplicacao = await Aplicacao.create({
                idUsuario: idUsuario,
                valor: valor,
                dataInicio: dataInicio,
                dataFim: dataFim,
                idAvaliacao: idAvaliacao,
<<<<<<< HEAD
                idUsuario: idUsuario,
                nome: `Aplicação da Avaliação ${idAvaliacao} - ${dataFim}`
=======
                nome: `Aplicação da Avaliação: ${avaliacao.nome} - ${dataFim}`
>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
            })
            nome = `Aplicação ${newAplicacao.dataInicio}`

            await transaction.commit();
            res.status(200).json({ sucess: "Aplicação criada com sucesso" })
        } catch (err) {
            transaction.rollback();
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro." })
        }
    },
<<<<<<< HEAD
=======

>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
    async findAll(req, res) {
        const usuario = req.params.usuario;

        try {
<<<<<<< HEAD
            const aplicacao = await Aplicacao.findAll({ where: { idUsuario: usuario } });
=======
            const aplicacao = await Aplicacao.findAll({ where: { idUsuario: usuario }});
>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
            res.status(200).json({ result: aplicacao });
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro durante a busca." });
        }
<<<<<<< HEAD
    },

    async findOne(req, res) {
        const id = req.params.id;

        Aplicacao.findByPk(id)
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
    async update(req, res) {
        const id = req.params.id;

=======
    },


    async findOne(req, res) {
        const id = req.params.id;

        try {
            const aplicacao = await Aplicacao.findOne({ where: { idAplicacao: id } })

            if (aplicacao == null) {
                return res.status(400).send({ err: "Aplicação não encontrada." });
            }            
            res.status(200).json({ aplicacao });

        } catch (err) {
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro ao buscar a aplicação." });
        }

    },

    async update(req, res){
        const id = req.params.id;

>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
        const {
            valor,
            dataInicio,
            dataFim,
<<<<<<< HEAD
            nome
=======
>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
<<<<<<< HEAD
            const aplicacao = await Aplicacao.findOne({ where: { idAplicacao: id } });

            if (aplicacao == null) {
                return res.status(400).send({ err: "Aplicação não encontrada." });
            }

            await Aplicacao.update({
                valor: valor,
                dataInicio: dataInicio,
                dataFim: dataFim,
                idAvaliacao: aplicacao.idAvaliacao,
                idUsuario: aplicacao.idUsuario,
                nome: nome
=======
            const aplicacao = await Aplicacao.findOne({ where: { idAplicacao: id }})

            if (aplicacao == null) {
                return res.status(400).send({ err: "Avaliação não encontrada." });
            }            

            await Aplicacao.update({
                idUsuario: aplicacao.idUsuario,
                valor: valor,
                dataInicio: dataInicio,
                dataFim: dataFim,
                nome: aplicacao.nome
>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
            }, { where: { idAplicacao: id } });

            await transaction.commit();
            res.status(200).json({ success: "Aplicação foi atualizada com sucesso." });
<<<<<<< HEAD
=======
            
>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro ao editar a aplicação." });
        }
<<<<<<< HEAD

=======
>>>>>>> 602819245b766abee6ac2d771c28b6417926cf18
    },

    async delete(req, res) {
        await Aplicacao.destroy({
            where: {
                idAplicacao: req.body.idAplicacao
            }
        })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || 'Ocorreu um erro.'
                })
            })
    }
}