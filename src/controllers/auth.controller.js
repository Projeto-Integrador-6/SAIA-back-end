const db = require('../models/index.js');
const Usuario = db.usuario
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {

    //Login
    async login(req, res){

        let { email, password } = req.body;

        //Verifica dados do usuário para login
        Usuario.findOne({where:{ email: email}}).then(usuario => {
            if(!usuario){
                res.status(404).json({
                    error: 'Usuário não encontrado!'
                })
            }else{
                if(bcrypt.compareSync(password, usuario.password)) {
                    //Devolver Token
                    let token = jwt.sign({ usuario: usuario}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    usuario.password = undefined;

                    res.json({
                        usuario: usuario,
                        token: token
                    });
                }else{
                    res.status(401).json({
                        error: 'Senha incorreta!'
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
                    error: 'Email já existe.'
                })
            }else{
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
                    let token = jwt.sign({ usuario: usuario}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    
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

        
    }
}