const express = require('express')

const app = express()

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//parse requests of content-type: application/json
app.use(express.json())

const porta = 3000;
app.listen(porta, () => {console.log(`Aplicação rodando com SUCESSO na porta ${porta}! 🚀`)});