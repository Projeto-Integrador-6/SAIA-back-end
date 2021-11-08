const db = require('../models/index.js')
const Sequelize = require('../database/db');


const Avaliacao = db.avaliacao;
const Questao = db.questao_avaliacao;

module.exports = {
    async create(req, res) {
        const {
            nome,
            descricao,
            questoes
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
            const newAvaliacao = await Avaliacao.create({
                nome: nome,
                descricao: descricao
            })

            for(let j = 0; j < questoes.length; j++) {
                await Questao.create({
                    questao_id: questoes[j].idQuestao,
                    avaliacao_id: newAvaliacao.idAvaliacao
                })
            }

            await transaction.commit();

            res.status(200).json({ sucess: "Avaliação criada com sucesso"})
        } catch (err) {
            transaction.rollback();
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro."})
        }
    },

    async findAll (req, res) {
        await Avaliacao.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || 'Ocorreu um erro.'
                })
            })
    },

    async findOne (req, res) {
        const id = req.params.id;
      
        Avaliacao.findByPk(id)
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
