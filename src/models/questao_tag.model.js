module.exports = (sequelize, DataTypes) => {
    const questao_tag = sequelize.define('questao_tag', 
    {
        questao_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        timestamps: false,
    })
    return questao_tag
}