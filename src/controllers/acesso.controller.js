const db = require('../models/index.js')
const Acesso = db.acesso

exports.create = (req, res) => {
    const acesso = {
        isFinalizado: req.body.isAcessoCorreta,
        idAplicacao: req.body.idAplicacao
    }

    Acesso.create(acesso)
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
    Acesso.findAll()
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
  
    Acesso.findByPk(id)
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
    const acesso = {
        idAcesso: req.body.idAcesso
    }
  
    Acesso.destroy({
        where: {
            idAcesso: req.body.idAcesso
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