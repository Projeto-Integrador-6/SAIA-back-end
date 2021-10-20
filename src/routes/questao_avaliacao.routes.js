questao_avaliacao = require('../controllers/questao_avaliacao.controller.js')

module.exports = app => {
    
    app.post('/questao_avaliacao', questao_avaliacao.create)
    app.get('/questao_avaliacao', questao_avaliacao.findAll)
}