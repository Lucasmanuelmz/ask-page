const express = require('express');
const bodyParser = require('body-parser');
const Questions = require('./database/questionModel');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    let {question, description} = req.body;

    Questions.create({
        question: question,
        description: description
    }).then(() => {
        res.render('index')
    })

})


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