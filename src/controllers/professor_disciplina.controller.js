const db = require('../models/index.js')
const Professor_Disciplina = db.professor_disciplina;

module.exports = {
    async create(req, res) {
        const {
            professores
        } = req.body;

        try {

            for(let i = 0; i < professores.length; i++){
                await Professor_Disciplina.create({
                    usuario_id: professores[i].usuario_id,
                    disciplina_id: professores[i].disciplina_id,
                });
            }

            res.status(200).json({ success: "O professor foi vinculado com sucesso a disciplina." })

        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao vincular o professor a disciplina." });
        }
    },

    async findAll(req, res) {
        try {
            const professor_disciplina = await Professor_Disciplina.findAll();
            res.status(200).json({ result: professor_disciplina });
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao realizar a busca." });
        }
    },

    async delete(req, res){
        const idUsuario = req.params.usuario;
        const idDisciplina = req.params.disciplina;

        try {
            await Professor_Disciplina.destroy({ where: { usuario_id: idUsuario, disciplina_id: idDisciplina }})
            res.status(200).json({ success: "Professor foi desvinculado a disciplina"});
        } catch (err) {
            res.status(400).json({ error: "Ocorreu um erro ao desvincular o professor da disciplina." });
        }
    }
}