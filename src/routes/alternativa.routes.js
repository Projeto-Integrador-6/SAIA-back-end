alternativa = require('../controllers/alternativa.controller.js')

module.exports = app => {
    
    app.post('/alternativa', alternativa.create)
    app.get('/alternativa', alternativa.findAll)
    app.delete('/alternativa', alternativa.delete)
}