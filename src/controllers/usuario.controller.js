const db = require('../models/index.js');
const Sequelize = require('../database/db');

const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');

const Usuario = db.usuario;
const AlunoDisciplina = db.aluno_disciplina;

module.exports = {
  async create(req, res) {
    Usuario.findOne({ where: { email: req.body.email } }).then(result => {
      if (result) {
        res.status(409).json({
          error: 'Email já existe.'
        })
      } else {

        //Criptografar com Bcrypt
        let { nome, email, tipoUsuario } = req.body;
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        //Criar Usuário
        Usuario.create({
          nome: nome,
          email: email,
          tipoUsuario: tipoUsuario,
          password: password
        }).then(usuario => {

          usuario.password = undefined;

          res.json({
            usuario: usuario
          });

        }).catch(err => {
          res.status(500).json({
            error: 'Erro ao cadastrar usuário'
          });
        });

      }
    }).catch(err => {
      res.status(500).json({
        error: 'Erro ao cadastrar usuário'
      });
    });
  },

  async findAll(req, res) {
    try {
      const usuarios = await Usuario.findAll();

      for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].password = undefined;
      }

      res.status(200).json({ result: usuarios });
    } catch (err) {
      res.status(400).json({ error: "Ocorreu um erro durante a busca." });
    }
  },

  async findOne(req, res) {
    const id = req.params.id;

    try {
      const usuario = await Usuario.findOne({ where: { idUsuario: id } })

      if (usuario == null) {
        return res.status(400).send({ err: "Usuário não encontrado." });
      }

      const disciplina = await Sequelize.query(`
        SELECT 
        d.nome
        FROM usuario AS U
        LEFT JOIN aluno_disciplina AS AD ON AD.usuario_id = U.idUsuario
        LEFT JOIN professor_disciplina AS PD ON PD.usuario_id = U.idUsuario
        INNER JOIN disciplina AS D ON D.idDisciplina = AD.disciplina_id OR D.idDisciplina = PD.disciplina_id
        WHERE U.idUsuario = :idUsuario
      `, { replacements: { idUsuario: id }, type: Sequelize.QueryTypes.SELECT })

      usuario.password = undefined;

      res.status(200).json({ usuario, disciplinas: disciplina });

    } catch (err) {
      console.log(err)
      res.status(400).json({ error: "Ocorreu um erro ao buscar o usuário." });
    }
  },

  async findByType(req, res) {
    const type = req.params.type;

    try {
      const usuarios = await Usuario.findAll({ where: { tipoUsuario: type } })

      if (usuarios == null) {
        return res.status(400).send({ err: "Usuário não encontrado." });
      }

      for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].password = undefined;
      }

      res.status(200).json({ result: usuarios });

    } catch (err) {
      res.status(400).json({ error: "Ocorreu um erro durante a busca." });
    }
  },

  async status(req, res) {
    const id = req.params.id;

    try {
      const usuario = await Usuario.findOne({ where: { idUsuario: id } })

      const aluno_disciplina = await AlunoDisciplina.findAll({ where: { usuario_id: id } });

      const idDisciplinas = []

      for (let i = 0; i < aluno_disciplina.length; i++) {
        idDisciplinas.push(aluno_disciplina[i].disciplina_id);
      }

      if (usuario == null) {
        return res.status(400).send({ err: "Usuário não encontrado." });
      }

      const avaliacoes = await Sequelize.query(`
        SELECT count(idAvaliacao) as AvaliacoesCriadas 
        FROM avaliacao
        WHERE idUsuario = ${id}
      `, { type: Sequelize.QueryTypes.SELECT })

      const aplicacoes = await Sequelize.query(`
        SELECT count(idAplicacao) as AvaliacoesEmAndamento
        FROM aplicacao
        WHERE idDisciplina IN (${idDisciplinas})
        AND dataFim >= Now()
      `, { type: Sequelize.QueryTypes.SELECT })

      res.status(200).json({ avaliacoes, aplicacoes });

    } catch (err) {
      return res.status(400).send({ err: "Erro ao buscar os dados." });
    }

  },

  async update(req, res) {
    const id = req.params.id;

    const {
      nome,
      email,
      tipoUsuario,
      password
    } = req.body

    const transaction = await Sequelize.transaction();

    try {
      const usuario = await Usuario.findOne({ where: { idUsuario: id } })

      if (usuario == null) {
        return res.status(400).send({ err: "Usuário não encontrado." });
      }


      if (password != null) {
        var passwordCrypt = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));

        await Usuario.update({
          nome: nome,
          email: email,
          tipoUsuario: tipoUsuario,
          password: passwordCrypt
        }, { where: { idUsuario: id } });

      } else {
        await Usuario.update({
          nome: nome,
          email: email,
          tipoUsuario: tipoUsuario
        }, { where: { idUsuario: id } });

      }

      await transaction.commit();
      res.status(200).json({ success: "Usuário foi atualizado com sucesso." });

    } catch (err) {
      transaction.rollback();
      res.status(400).json({ error: "Ocorreu um erro ao editar o usuário." });
    }
  },

}