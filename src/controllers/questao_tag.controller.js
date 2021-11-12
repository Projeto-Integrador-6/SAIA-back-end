const db = require('../models/index.js');
const Tag = db.Tag
const Questao_Tag = db.questao_tag

module.exports = {
    async create(req, res) {
        const {
            questao_id,
            tag_id
        } = req.body;

        try {
            await Questao_Tag.create({
                questao_id,
                tag_id
            });

            res.status(200).json({ success: "Ok!" });

        } catch (err) {
            res.status(400).json({ error: "Erro!" });
        }
    },

    async findAll(req, res){
        try{
            const questaoTag = await Questao_Tag.findAll();
            res.status(400).json({ result: questaoTag});
        } catch (err){
            res.status(400).json({ error: "Ocorreu um erro durante a busca."});
        }
        
    }

}