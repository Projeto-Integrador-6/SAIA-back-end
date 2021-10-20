tag = require('../controllers/tag.controller.js')

module.exports = app => {
    
    app.post('/tag', tag.create)
    app.get('/tag', tag.findAll)
    app.delete('/tag', tag.delete)
}