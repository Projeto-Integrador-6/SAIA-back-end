const express = require('express');
const route = express.Router();

const Auth = require('../controllers/auth.controller.js')

route.post('/login', Auth.login);
route.post('/cadastro', Auth.cadastro);

module.exports = route;