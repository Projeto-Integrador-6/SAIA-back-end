const db = require('../models/index.js');

const Aluno_Disciplina = db.aluno_disciplina;

module.exports = {
    async create(req, res) {
        const aluno_disciplina = {
            usuario_id: req.body.usuario_id,
            disciplina_id: req.body.disciplina_id,
        }

        try {
            await Aluno_Disciplina.create(aluno_disciplina);
            res.status(200).json({ success: "Aluno foi vinculado com sucesso a disciplina." })

        } catch (err) {
            
        }
    },

    async findAll(req, res) {
        try {
            const aluno_disciplina = await Aluno_Disciplina.findAll();
            res.status(200).json({ result: aluno_disciplina });
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao realizar a busca." });
        }
    },
}