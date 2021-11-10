const db = require('../models/index.js')
const Usuario = db.usuario

exports.findAll = (req, res) => {
    Usuario.findAll()
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
  
    Usuario.findByPk(id)
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
    Usuario.destroy({
        where: {
            idUsuario: req.body.idUsuario
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