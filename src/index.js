const express = require('express')

const app = express()
const cors = require('cors');

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//parse requests of content-type: application/json
app.use(cors());
app.use(express.json())

const db = require('./models/index.js')
// db.sequelize.sync({ force: true }).then(() => {
//      console.log("Drop and re-sync db.");
//  });


require('./routes/tipoQuestao.routes')(app)
require('./routes/questao.routes')(app)
require('./routes/alternativa.routes')(app)
require('./routes/avaliacao.routes')(app)
require('./routes/questao_avaliacao.routes')(app)
require('./routes/aplicacao.routes')(app)


const porta = 3002;
app.listen(porta, () => {console.log(`Aplicação rodando com SUCESSO na porta ${porta}! 🚀`)});