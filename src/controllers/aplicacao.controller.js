const db = require('../models/index.js')
const Aplicacao = db.aplicacao

exports.create = (req, res) => {
    const aplicacao = {
        valor: req.body.valor,
        nome: req.body.nome,
        dataInicio: req.body.dataInicio,
        dataFim: req.body.dataFim,
        idAvaliacao: req.body.idAvaliacao,
        
    }

    Aplicacao.create(aplicacao)
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
    Aplicacao.findAll()
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
  
    Aplicacao.findByPk(id)
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
    const aplicacao = {
        idAplicacao: req.body.idAplicacao
    }
  
    Aplicacao.destroy({
        where: {
            idAplicacao: req.body.idAplicacao
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