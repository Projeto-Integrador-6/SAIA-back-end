const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');

const Usuario = db.usuario

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

      for(let i = 0; i < usuarios.length; i++){
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
        return res.status(400).send({ err: "Usuário não encontrada." });
      }

      usuario.password = undefined;

      res.status(200).json({ usuario });

    } catch (err) {
      console.log(err)
      res.status(400).json({ error: "Ocorreu um erro ao buscar o usuário." });
    }
  }

}