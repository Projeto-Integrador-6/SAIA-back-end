const db = require('../models/index.js')
const Disciplina = db.disciplina

exports.create = (req, res) => {
    const disciplina = {
        nome: req.body.nome
        
    }

    Disciplina.create(disciplina)
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
    Disciplina.findAll()
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
  
    Disciplina.findByPk(id)
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
    Disciplina.destroy({
        where: {
            idDisciplina: req.body.idDisciplina
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