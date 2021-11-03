const db = require('../models/index.js')
const Sequelize = require('../database/db');

const Questao = db.questao;
const Alternativa = db.alternativa;
const Tag = db.questao_tag;

module.exports = {
    async create(req, res) {
        const {
            nome,
            enunciado,
            valor,
            idTipoQuestao,
            alternativas,
            tags
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
            const newQuestao = await Questao.create({
                nome: nome,
                enunciado: enunciado,
                valor: valor,
                idTipoQuestao: idTipoQuestao
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
                    await Tag.create({
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
                res.status(200).json({ sucess: "Questão e alternativas foram criadas com sucesso." });
            }
        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro durante a criação da questão ou alternativa." });
        }
    },

    async findAll(req, res) {
        await Questao.findAll()
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