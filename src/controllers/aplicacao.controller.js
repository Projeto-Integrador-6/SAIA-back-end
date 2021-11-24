const db = require('../models/index.js');
const Sequelize = require('../database/db');

const Aplicacao = db.aplicacao;
const Avaliacao = db.avaliacao;
const Questao = db.questao;
const Alternativa = db.alternativa;
const Disciplina = db.disciplina;
const AlunoDisciplina = db.aluno_disciplina;

module.exports = {
    async create(req, res) {
        const {
            valor,
            dataInicio,
            dataFim,
            idAvaliacao,
            idUsuario,
            idDisciplina
        } = req.body

        const transaction = await Sequelize.transaction();

        try {

            const avaliacao = await Avaliacao.findOne({ where: { idAvaliacao: idAvaliacao } })

            let data = new Date(dataInicio);
            let dataFormatada = ((data.getDate() + '-' + (data.getMonth()) + '-' + data.getFullYear()));

            await Aplicacao.create({
                idUsuario: idUsuario,
                valor: valor,
                dataInicio: dataInicio,
                dataFim: dataFim,
                idAvaliacao: idAvaliacao,
                idDisciplina: idDisciplina,
                nome: `${avaliacao.nome} - ${dataFormatada}`
            })


            await transaction.commit();
            res.status(200).json({ success: "Aplicação criada com sucesso" })
        } catch (err) {
            transaction.rollback();
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro." })
        }
    },

    async findAll(req, res) {
        const usuario = req.params.usuario;

        try {
            const aplicacao = await Aplicacao.findAll({ where: { idUsuario: usuario } });
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
            res.status(400).json({ error: "Ocorreu um erro ao buscar a aplicação." });
        }

    },

    async findByUser(req, res) {
        const idUsuario = req.params.usuario;

        try {
            const aluno_disciplina = await AlunoDisciplina.findAll({ where: { usuario_id: idUsuario } });

            const idDisciplinas = []

            for (let i = 0; i < aluno_disciplina.length; i++) {
                idDisciplinas.push(aluno_disciplina[i].disciplina_id);
            }

            const aplicacao = await Sequelize.query(`
                SELECT 
                A.idAplicacao,
                A.nome,
                A.valor,
                A.dataInicio,
                A.dataFim,
                D.nome AS disciplina,
                (CASE
                    WHEN idAcesso IS NULL THEN 0
                    WHEN idAcesso IS NOT NULL THEN 1
                END
                ) as participacao
                FROM Aplicacao AS A
                INNER JOIN disciplina AS D on D.idDisciplina = A.idDisciplina
                LEFT JOIN acesso AS AC ON AC.idAplicacao = A.idAplicacao
                WHERE A.idDisciplina IN (${idDisciplinas})
            `, { type: Sequelize.QueryTypes.SELECT })

            res.status(200).json({ result: aplicacao });

        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao buscar as avaliações aplicadas." });
        }
    },

    async findAvaliacaoByAplicacao(req, res) {
        const idAplicacao = req.params.aplicacao;

        try {
            const aplicacao = await Aplicacao.findOne({
                where: {
                    idAplicacao: idAplicacao
                },
                attributes: {
                    exclude: ['idUsuario']
                },
                include: [{
                    model: Avaliacao,
                    include: [{
                        model: Questao,
                        attributes: {
                            exclude: ['valor', 'idUsuario']
                        },
                        include: [{
                            model: Alternativa,
                            attributes: {
                                exclude: ['isAlternativaCorreta', 'idQuestao']
                            }
                        }]
                    }]
                }]
            });

            res.status(200).json({ result: aplicacao });

        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao buscar a avaliação." });
        }
    },

    async update(req, res) {
        const id = req.params.id;

        const {
            valor,
            dataInicio,
            dataFim
        } = req.body

        const transaction = await Sequelize.transaction();

        try {
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
                idDisciplina: aplicacao.idDisciplina
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