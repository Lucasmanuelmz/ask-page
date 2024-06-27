const {DataTypes} = require('sequelize');
const sequelize = require('./database');

const Questions = sequelize.define('Questions', {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

async function createModel() {
    try {
        await Questions.sync()
        console.log('Tabela criada com sucesso')
    }catch(err) {
        console.error('Erro ao criar a tabela: '+err)
    }
}
createModel()

module.exports = Questions;