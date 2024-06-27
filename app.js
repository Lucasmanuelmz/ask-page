const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use();


app.listen(port, (error)=> {
     function verifyConnection() {
        try{
            if(!error) {
              return 'You connected successfull!'
            } else {
                return 'Connection danied!'
            }
        }catch (err) {
        if(err){
            console.error('Erro: '+err)
        }
        } 
    }
    verifyConnection()
})