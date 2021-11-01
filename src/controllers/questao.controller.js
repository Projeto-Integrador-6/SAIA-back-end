const db = require('../models/index.js')
const Sequelize = require('sequelize')

const Questao = db.questao

exports.create = async = (req, res) => {
    const {
        nome,
        enunciado,
        valor,
        alternativa
    } = req.body

    const questaoData = {
        nome,
        enunciado,
        valor
    }

    const transaction = await Sequelize.Transaction();

    try {
        const questao = await Questao.create({
            ...questaoData
        })

        for(let i = 0; i <= alternativa.lenght; i++) {
            console.log(i)
        }
        await transaction.commit();
        res.status(200).json(questao)
    } catch (err) {
        transaction.rollback();
        res.status(400).json({err: message})
    }
    
}

exports.findAll = (req, res) => {
    Questao.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'Some error occurred.'
        })
    })
}

exports.delete = (req, res) => {
    const questao = {
        idQuestao: req.body.idQuestao
    }
  
    Questao.destroy({
        where: {
            idQuestao: req.body.idQuestao
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred...'
            })
        })

}