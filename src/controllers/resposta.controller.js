const { usuario, aplicacao, questao } = require('../models/index.js')
const db = require('../models/index.js');
const Sequelize = require('../database/db');

const Usuario = db.usuario
const Aplicacao = db.aplicacao
const Questao = db.questao
const Resposta = db.resposta

module.exports = {
    async create(req, res) {
        const {
            idAplicacao,
            idUsuario,
            resposta
        } = req.body;

        const transaction = await Sequelize.transaction();

        try{
            const aplicacao = await Aplicacao.findOne({ where: { idAplicacao: idAplicacao } });

            if (!aplicacao) {
                return res.status(404).send({
                    message: "Aplicação não encontrada!"
                })
            }
            
            const usuario = await Usuario.findOne({ where: { idUsuario: idUsuario } });

            if (!usuario) {
                return res.status(404).send({
                    message: "Usuário não encontrado!"
                })
            }

            for (let i = 0; i < resposta.length; i++) {

                const questao = await Questao.findOne({ where: { idQuestao: resposta[i].idQuestao } });
                if (!questao) {
                    return res.status(404).send({
                        message: "Questão não encontrada!"
                    })
                }

                await Resposta.create({
                    idAplicacao: idAplicacao,
                    idUsuario: idUsuario,
                    idQuestao: resposta[i].idQuestao,
                    resposta: resposta[i].resposta
                })
             }

             await transaction.commit();

             res.status(201).json({ sucess: "Respostas registradas com sucesso!" })

        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro durante o salvamento das respostas." });
        }
    
    },

    async findAll(req, res) {
        Resposta.findAll({
            include: [
                {
                    model: usuario,
                    as: 'usuario'
                },
                {
                    model: aplicacao,
                    as: 'aplicacao'
                },
                {
                    model: questao,
                    as: 'questao'
                }
            ]
        })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred.'
                })
            })
    }
}
