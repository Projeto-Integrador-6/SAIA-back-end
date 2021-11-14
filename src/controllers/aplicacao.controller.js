const db = require('../models/index.js')
const Sequelize = require('../database/db');

const Aplicacao = db.aplicacao;
const Avaliacao = db.avaliacao;

module.exports = {
    async create (req, res) {
        const {
            valor,
            dataInicio,
            dataFim,
            idAvaliacao
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
            const newAplicacao = await Aplicacao.create({
                valor: valor,
                dataInicio: dataInicio,
                dataFim: dataFim,
                idAvaliacao: idAvaliacao,
                nome: `Aplicação da Avaliação ${idAvaliacao} - ${dataFim}`
            })
            nome = `Aplicação ${newAplicacao.dataInicio}`

            await transaction.commit();
            res.status(200).json({ sucess: "Aplicação criada com sucesso"})
        } catch (err) {
            transaction.rollback();
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro."})
        }
    },
    async findAll (req, res) {
        await Aplicacao.findAll()
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