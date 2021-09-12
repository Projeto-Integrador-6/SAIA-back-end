const tipoQuestao = require ('../controllers/tipoQuestao.controller.js')

module.exports = app => {

    app.post('/tipoQuestao', (req, res) => {
        const novoTipoQuestao = req.body

        tipoQuestao.create(novoTipoQuestao, res)
    })

    app.get('/tipoQuestao', (req, res) =>
        tipoQuestao.read(res)
    )

}