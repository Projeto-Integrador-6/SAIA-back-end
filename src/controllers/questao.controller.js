const db = require('../models/index.js')
const Sequelize = require('../database/db');

const Questao = db.questao;
const Alternativa = db.alternativa;

module.exports = {
    async create(req, res) {
        const {
            nome,
            enunciado,
            valor,
            idTipoQuestao,
            alternativas
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
            const newQuestao = await Questao.create({
                nome: nome,
                enunciado: enunciado,
                valor: valor,
                idTipoQuestao: idTipoQuestao
            })


            for (let i = 0; i < alternativas.length; i++) {
                await Alternativa.create({
                    descricao: alternativas[i].descricao,
                    isAlternativaCorreta: alternativas[i].isAlternativaCorreta,
                    idQuestao: newQuestao.idQuestao
                })
            }


            await transaction.commit();
            res.status(200).json({ sucess: "Questão e alternativas foram criadas com sucesso." });
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