const db = require('../models/index.js');
const Usuario = db.usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {

    //Login
    async login(req, res){

        let { email, senha } = req.body;

        //Verifica dados do usuário para login
        Usuario.findOne({where:{ email: email}}).then(usuario => {
            if(!usuario){
                res.status(404).json({
                    message: 'Usuário não encontrado'
                })
            }else{
                if(bcrypt.compareSync(senha, usuario.senha)) {
                    //Devolver Token
                    let token = jwt.sign({ usuario: usuario}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        usuario: usuario,
                        token: token
                    });
                }else{
                    res.status(401).json({
                        message: 'Senha incorreta!'
                    });
                }
            }
        })

    },

    //Cadastro
    async cadastro(req, res){

        Usuario.findOne({where:{email:req.body.email}}).then(result => {
            if(result){
                res.status(409).json({
                    message: 'Email já existe.'
                })
            }else{
                //Criptografar com Bcrypt
                let { nome, email } = req.body;
                let senha = bcrypt.hashSync(req.body.senha, Number.parseInt(authConfig.rounds));

                //Criar Usuário
                Usuario.create({
                    nome: nome,
                    email: email,
                    senha: senha
                }).then(usuario => {
                    let token = jwt.sign({ usuario: usuario}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                
                    res.json({
                        usuario: usuario,
                        token: token
                    });
                
                }).catch(err => {
                    res.status(500).json({
                        message: 'Erro ao cadastrar usuário'
                    });
                });

            }
        }).catch(err => {
            res.status(500).json({
                message: 'Erro ao cadastrar usuário'
            });
        });

        
    }
}