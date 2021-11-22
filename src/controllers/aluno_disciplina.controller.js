const db = require('../models/index.js');

const Aluno_Disciplina = db.aluno_disciplina;

module.exports = {
    async create(req, res) {
        const {
            alunos
        } = req.body

        try {

            for(let i = 0; i < alunos.length; i++){
                await Aluno_Disciplina.create({
                    usuario_id: alunos[i].usuario_id,
                    disciplina_id: alunos[i].disciplina_id,
                });
            }

            res.status(200).json({ success: "Aluno foi vinculado com sucesso a disciplina." })

        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao desvincular o aluno a disciplina." });
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

    async delete(req, res){
        const idUsuario = req.params.usuario;
        const idDisciplina = req.params.disciplina;

        try {
            await Aluno_Disciplina.destroy({ where: { usuario_id: idUsuario, disciplina_id: idDisciplina }})
            res.status(200).json({ success: "Aluno foi desvinculado a disciplina"});
        } catch (err) {
            console.log(err)
            res.status(400).json({ error: "Ocorreu um erro ao desvincular o aluno da disciplina." });
        }
    }
}