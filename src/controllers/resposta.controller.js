const { usuario, aplicacao, questao } = require('../models/index.js')
const db = require('../models/index.js');
const Sequelize = require('../database/db');

const Usuario = db.usuario
const Aplicacao = db.aplicacao
const Questao = db.questao
const Resposta = db.resposta
const Acesso = db.acesso;
const Avaliacao = db.avaliacao;
const Alternativa = db.alternativa;

module.exports = {
    async create(req, res) {
        const {
            idAplicacao,
            idUsuario,
            resposta
        } = req.body;

        const transaction = await Sequelize.transaction();

        try {
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

            await Acesso.create({
                isFinalizado: true,
                idAplicacao: idAplicacao,
                idUsuario: idUsuario
            })

            await transaction.commit();

            res.status(201).json({ sucess: "Respostas registradas com sucesso!" })

        } catch (err) {
            transaction.rollback();
            res.status(400).json({ error: "Ocorreu um erro durante o salvamento das respostas." });
        }

    },

    async findUsers(req, res) {
        const id = req.params.id;

        const aplicacao = await Aplicacao.findOne({ where: { idAplicacao: id } })

        if (aplicacao == null) {
            res.status(400).json({ error: "Aplicação não encontrada." });
        }

        const respondeu = await Sequelize.query(`
          SELECT distinct U.idUsuario, U.nome FROM aluno_disciplina AS AD
          INNER JOIN disciplina AS D ON D.idDisciplina = AD.disciplina_id
          INNER JOIN usuario AS U ON U.idUsuario = AD.usuario_id
          LEFT JOIN resposta AS R ON R.idUsuario = AD.usuario_id
          WHERE D.idDisciplina = ${aplicacao.idDisciplina}
          AND U.idUsuario IN (SELECT idUsuario FROM resposta where idAplicacao = ${aplicacao.idAplicacao})
        `, { type: Sequelize.QueryTypes.SELECT })

        const nao_respondeu = await Sequelize.query(`
          SELECT distinct U.idUsuario, U.nome FROM aluno_disciplina AS AD
          INNER JOIN disciplina AS D ON D.idDisciplina = AD.disciplina_id
          INNER JOIN usuario AS U ON U.idUsuario = AD.usuario_id
          LEFT JOIN resposta AS R ON R.idUsuario = AD.usuario_id
          WHERE D.idDisciplina = ${aplicacao.idDisciplina}
          AND U.idUsuario NOT IN (SELECT idUsuario FROM resposta where idAplicacao = ${aplicacao.idAplicacao})
        `, { type: Sequelize.QueryTypes.SELECT })

        res.status(200).json({ aplicacao: aplicacao.nome, respondeu: respondeu, nao_respondeu: nao_respondeu });
    },

    async findResponseByUser(req, res){
        const idUsuario = req.params.idUsuario;
        const idAplicacao = req.params.idAplicacao;

        const aplicacao = await Aplicacao.findOne({
            where: { idAplicacao: idAplicacao },
            include: {
                model: Avaliacao,
                include: {
                    model: Questao,
                    include: {
                        model: Alternativa
                    }
                }
            }
         })

         const resposta = await Sequelize.query(`
            SELECT DISTINCT A.idAlternativa, A.descricao, A.idQuestao, a.isAlternativaCorreta as correta FROM resposta AS R
            INNER JOIN alternativa AS A ON A.idAlternativa = R.resposta
            WHERE idUsuario = ${idUsuario} AND idAplicacao = ${idAplicacao}    
         `, { type: Sequelize.QueryTypes.SELECT })

         res.status(200).json({ aplicacao: aplicacao, respostas_usuario: resposta  });

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
