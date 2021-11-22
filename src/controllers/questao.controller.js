const db = require('../models/index.js')
const Sequelize = require('../database/db');

const Questao = db.questao;
const Alternativa = db.alternativa;
const Tag = db.tag;
const TagQuestao = db.questao_tag;

module.exports = {
    async create(req, res) {
        const {
            nome,
            enunciado,
            valor,
            alternativas,
            tags
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
            const newQuestao = await Questao.create({
                nome: nome,
                enunciado: enunciado,
                valor: valor,
            })

            if (alternativas !== undefined) {
                for (let i = 0; i < alternativas.length; i++) {
                    await Alternativa.create({
                        descricao: alternativas[i].descricao,
                        isAlternativaCorreta: alternativas[i].isAlternativaCorreta,
                        idQuestao: newQuestao.idQuestao
                    })
                }
            }

            if (tags !== undefined) {
                for (let j = 0; j < tags.length; j++) {
                    await TagQuestao.create({
                        questao_id: newQuestao.idQuestao,
                        tag_id: tags[j].idTag
                    })
                }
            }

            await transaction.commit();

            if (alternativas === undefined) {
                res.status(200).json({ sucess: "Questão foi criada com sucesso." });
            }
            else {
                res.status(200).json({ success: "Questão e alternativas foram criadas com sucesso." });
            }
        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro durante a criação da questão ou alternativa." });
        }
    },

    async findAll(req, res) {
        try {
            const questao = await Questao.findAll();
            res.status(200).json({ result: questao });
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro durante a busca." });
        }
    },

    async findOne(req, res) {
        const id = req.params.id;

        try {
            const questao = await Questao.findOne({ where: { idQuestao: id }, include: Tag })

            if (questao == null) {
                return res.status(400).send({ err: "Questão não encontrada." });
            }

            const alternativas = await Alternativa.findAll({ where: { idQuestao: id } })
            res.status(200).json({ questao, alternativas });

        } catch (err) {
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro ao buscar a questão." });
        }

    },

    async update(req, res) {
        const id = req.params.id;

        const {
            nome,
            enunciado,
            valor,
            alternativas,
            tags
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
            const questao = await Questao.findOne({ where: { idQuestao: id } });

            if (questao == null) {
                return res.status(400).send({ err: "Questão não encontrada." });
            }

            await Questao.update({
                nome: nome,
                enunciado: enunciado,
                valor: valor
            }, { where: { idQuestao: id } });


            if (alternativas !== undefined) {
                for (let i = 0; i < alternativas.length; i++) {
                    if (alternativas[i].idAlternativa == undefined) {
                        await Alternativa.create({
                            descricao: alternativas[i].descricao,
                            isAlternativaCorreta: alternativas[i].isAlternativaCorreta,
                            idQuestao: id
                        })
                    } else {
                        const idAlternativa = await Alternativa.findOne({ where: { idAlternativa: alternativas[i].idAlternativa } })

                        if (idAlternativa == null) {
                            await Alternativa.create({
                                descricao: alternativas[i].descricao,
                                isAlternativaCorreta: alternativas[i].isAlternativaCorreta,
                                idQuestao: id
                            })
                        } else {
                            await Alternativa.update({
                                descricao: alternativas[i].descricao,
                                isAlternativaCorreta: alternativas[i].isAlternativaCorreta,
                                idQuestao: id
                            }, { where: { idAlternativa: idAlternativa.idAlternativa } })
                        }
                    }
                }
            }

            if (tags !== undefined) {
                for (let j = 0; j < tags.length; j++) {
                    const tagVinculada = await TagQuestao.findOne({ where: { questao_id: questao.idQuestao, tag_id: tags[j].idTag } })

                    if (tagVinculada == null) {
                        await TagQuestao.create({
                            questao_id: questao.idQuestao,
                            tag_id: tags[j].idTag
                        })
                    }
                }
            }

            await transaction.commit();
            res.status(200).json({ success: "Questão foi atualizada com sucesso." });
        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro ao editar a questão." });
        }

    },

    async delete(req, res) {
        await Questao.destroy({
            where: {
                idQuestao: req.body.idQuestao
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