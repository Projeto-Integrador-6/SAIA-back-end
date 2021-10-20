questao_tag = require('../controllers/questao_tag.controller.js')

module.exports = app => {
    
    app.post('/questao_tag', questao_tag.create)
    app.get('/questao_tag', questao_tag.findAll)
}