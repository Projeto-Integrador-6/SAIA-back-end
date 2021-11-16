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

    }
}