avaliacao = require('../controllers/avaliacao.controller.js')

module.exports = app => {
    
    app.post('/avaliacao', avaliacao.create)
    app.get('/avaliacao', avaliacao.findAll)
    app.delete('/avaliacao', avaliacao.delete)
}