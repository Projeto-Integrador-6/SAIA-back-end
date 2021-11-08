const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//parse requests of content-type: application/json
app.use(cors());
app.use(express.json());
app.use(routes);

const db = require('./models/index.js');

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const porta = 3002;
app.listen(porta, () => {console.log(`Aplicação rodando com SUCESSO na porta ${porta}! 🚀`)});