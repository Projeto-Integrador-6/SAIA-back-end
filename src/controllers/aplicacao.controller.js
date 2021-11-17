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
                nome: `Aplicação da Avaliação: ${avaliacao.nome} - ${dataFim}`
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

    async findAll(req, res) {
        const usuario = req.params.usuario;

        try {
            const aplicacao = await Aplicacao.findAll({ where: { idUsuario: usuario }});
            res.status(200).json({ result: aplicacao });
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro durante a busca." });
        }
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

        const {
            valor,
            dataInicio,
            dataFim,
            idAvaliacao
        } = req.body

        const transaction = await Sequelize.transaction();

        try {

            const avaliacao = await Avaliacao.findOne({ where: { idAvaliacao: idAvaliacao }})

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
                nome: `Aplicação da Avaliação: ${avaliacao.nome} - ${dataFim}`
            }, { where: { idAplicacao: id } });

            await transaction.commit();
            res.status(200).json({ success: "Aplicação foi atualizada com sucesso." });
            
        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro ao editar a aplicação." });
        }
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