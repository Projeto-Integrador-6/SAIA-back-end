const db = require('../models/index.js')
const TipoQuestao = db.tipoQuestao

exports.create = (req, res) => {
    const tipoQuestao = {
        descricao: req.body.descricao,
    }

    TipoQuestao.create(tipoQuestao)
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
    TipoQuestao.findAll()
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
  
    TipoQuestao.findByPk(id)
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
    const tipoQuestao = {
        idTipoQuestao: req.body.idTipoQuestao
    }
  
    TipoQuestao.destroy({
        where: {
            idTipoQuestao: req.body.idTipoQuestao
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