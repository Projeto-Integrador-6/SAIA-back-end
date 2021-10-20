aplicacao = require('../controllers/aplicacao.controller.js')

module.exports = app => {
    
    app.post('/aplicacao', aplicacao.create)
    app.get('/aplicacao', aplicacao.findAll)
    app.delete('/aplicacao', aplicacao.delete)
}