const {DataTypes} = require('sequelize');
const sequelize = require('./database');

const Responses = sequelize.define('response', {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
})

async function createResponseModel() {
    try {
        await Responses.sync();
        console.log('Tabela "Resposta" criada com sucesso!')
    }catch(error) {
        console.log('Erro ao criar a tabela de respostas')
    }
}

createResponseModel()

module.exports = Responses;