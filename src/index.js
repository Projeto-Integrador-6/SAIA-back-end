const { response } = require('express');
const express = require('express')

const app = express()

const porta = 3000;
app.listen(porta, () => {console.log(`Aplicação rodando com SUCESSO na porta ${porta}! 🚀`)});