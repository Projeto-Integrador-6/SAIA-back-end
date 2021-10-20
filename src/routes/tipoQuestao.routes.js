const tipoQuestao = require ('../controllers/tipoQuestao.controller.js')

module.exports = app => {

    app.post("/tipoQuestao", tipoQuestao.create)
    app.get("/tipoQuestao", tipoQuestao.findAll)
    app.delete('/tipoQuestao', tipoQuestao.delete)

  }