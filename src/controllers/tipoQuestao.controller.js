const connection = require('../database/db.js')

class tipoQuestao {
    create(novoTipoQuestao, res) {
        const sql = 'INSERT INTO tipoQuestao SET ?'

        connection.query(sql, novoTipoQuestao, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    read(res) {
        const sql = 'SELECT * FROM tipoQuestao'

        connection.query(sql, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }
}

module.exports = new tipoQuestao