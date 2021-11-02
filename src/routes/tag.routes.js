const express = require('express');
const route = express.Router();

const tag = require('../controllers/tag.controller.js')

route.post('/tag', tag.create);
route.get('/tag', tag.findAll);
route.delete('/tag', tag.delete);

module.exports = route;