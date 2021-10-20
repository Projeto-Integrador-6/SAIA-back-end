questao = require('../controllers/questao.controller.js')

module.exports = app => {
    
    app.post('/questao', questao.create)
    app.get('/questao', questao.findAll)
    app.delete('/questao', questao.delete)
    
}