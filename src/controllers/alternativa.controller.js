const db = require('../models/index.js')
const Alternativa = db.alternativa

exports.create = (req, res) => {
    const alternativa = {
        descricao: req.body.descricao,
        sequencia: req.body.sequencia,
        isAlternativaCorreta: req.body.isAlternativaCorreta,
        idQuestao: req.body.idQuestao
    }

    Alternativa.create(alternativa)
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

exports.findAll = (req, res) => {
    Alternativa.findAll()
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

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Alternativa.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error:" + id
        });
      });
  };

exports.delete = (req, res) => {
    const alternativa = {
        idAlternativa: req.body.idAlternativa
    }
  
    Alternativa.destroy({
        where: {
            idAlternativa: req.body.idAlternativa
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