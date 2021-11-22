const db = require('../models/index.js');
const Sequelize = require('../database/db');

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
        return res.status(400).send({ err: "Usuário não encontrado." });
      }

      usuario.password = undefined;

      res.status(200).json({ usuario });

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

      for(let i = 0; i < usuarios.length; i++){
        usuarios[i].password = undefined;
      }

      res.status(200).json({ result: usuarios });

    } catch (err) {
      res.status(400).json({ error: "Ocorreu um erro durante a busca." });
    }
  },


  async update(req, res){
    const id = req.params.id;

    const {
        nome,
        email,
        tipoUsuario,
        password
    } = req.body

    const transaction = await Sequelize.transaction();

    try {
        const usuario = await Usuario.findOne({ where: { idUsuario: id }})

        if (usuario == null) {
            return res.status(400).send({ err: "Usuário não encontrado." });
        }            

        await Usuario.update({
            nome: nome,
            email: email,
            tipoUsuario: tipoUsuario,
            password: password
        }, { where: { idUsuario: id } });

        await transaction.commit();
        res.status(200).json({ success: "Usuário foi atualizado com sucesso." });
        
    } catch (err) {
        transaction.rollback();
        res.status(400).json({ error: "Ocorreu um erro ao editar o usuário." });
    }
},

}