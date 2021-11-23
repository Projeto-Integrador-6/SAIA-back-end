const db = require('../models/index.js')
const Sequelize = require('../database/db');

const Avaliacao = db.avaliacao;
const Questao = db.questao;
const QuestaoAvaliacao = db.questao_avaliacao;
const Alternativa = db.alternativa;

module.exports = {
    async create(req, res) {
        const {
            idUsuario,
            nome,
            descricao,
            questoes
        } = req.body

        const transaction = await Sequelize.transaction();

        try {

            if (idUsuario == null) {
                res.status(400).json({ error: "Insira o id do usuário para criar uma avaliação." });
            }

            const avaliacao = await Avaliacao.create({
                idUsuario: idUsuario,
                nome: nome,
                descricao: descricao
            })

            for (let j = 0; j < questoes.length; j++) {
                const questao = await Questao.findOne({ where: { idQuestao: questoes[j].idQuestao } });

                if (questao == null) {
                    res.status(400).json({ error: "Ocorreu um erro." });
                }

                await QuestaoAvaliacao.create({
                    questao_id: questoes[j].idQuestao,
                    avaliacao_id: avaliacao.idAvaliacao
                })
            }

            await transaction.commit();

            res.status(200).json({ sucess: "Avaliação criada com sucesso" })
        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro." })
        }
    },

    async findAll(req, res) {
        const usuario = req.params.usuario;

        try {
            const avaliacao = await Avaliacao.findAll({ where: { idUsuario: usuario } });
            res.status(200).json({ result: avaliacao });
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro durante a busca." });
        }
    },

    async findOne(req, res) {
        const id = req.params.id;

        try {
            const avaliacao = await Avaliacao.findOne({
                where: {
                    idAvaliacao: id
                },
                include: [{
                    model: Questao,
                    attributes: {
                        exclude: ['idUsuario']
                    },
                    include: [{
                        model: Alternativa,
                        attributes: {
                            exclude: ['idQuestao']
                        }
                    }]
                }]

            })

            if (avaliacao == null) {
                return res.status(400).send({ err: "Avaliação não encontrada." });
            }
            res.status(200).json({ avaliacao });

        } catch (err) {
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro ao buscar a avaliação." });
        }

    },

    async update(req, res) {
        const id = req.params.id;

        const {
            nome,
            descricao
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
            const avaliacao = await Avaliacao.findOne({ where: { idAvaliacao: id } })

            if (avaliacao == null) {
                return res.status(400).send({ err: "Avaliação não encontrada." });
            }

            await Avaliacao.update({
                idUsuario: avaliacao.idUsuario,
                nome: nome,
                descricao: descricao
            }, { where: { idAvaliacao: id } });

            await transaction.commit();
            res.status(200).json({ success: "Avaliação foi atualizada com sucesso." });

        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro ao editar a avaliação." });
        }
    },

    async delete(req, res) {
        await Avaliacao.destroy({
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
                        err.message || 'Ocorreu um erro.'
                })
            })

    }

}
