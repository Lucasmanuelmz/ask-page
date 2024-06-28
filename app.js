const express = require("express");
const bodyParser = require("body-parser");
const Questions = require("./database/questionModel");
const Responses = require('./database/responseModel');
const { where } = require("sequelize");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/post-question", (req, res) => {
  let { question, description } = req.body;

  Questions.create({
    question: question,
    description: description,
  }).then(() => {
    res.redirect("/home");
  });
});

app.get("/home", (req, res) => {
  Questions.findAll({
    order: [['id',`DESC`]] 
  }).then((questions) => {
    res.render("home.ejs", {
      questions: questions,
    });
  });
});

app.get("/give-answer/:id", (req, res) => {
  let id = req.params.id;
  Questions.findOne({
    where: {
      id: id
    }
  }).then((question) => {
    if(question != undefined) {
      Responses.findAll({
        where: {
          question: question.id,
        },
        order: [['id', `DESC`]]
      }).then((response) => {
        if(response != undefined) {
          res.render("answer.ejs",{
          question: question,
          response: response
        });
        } else {
          console.log('Não encontramos nenhuma resposta')
        }
      }).catch((erro) => {
       console.log('Erro ao buscar respostas '+erro)
      })
    }
  }).catch((error) => { 
    console.log(error)  
  })
  
});

app.post('/response', (req, res) => {
  console.log(req.body)
  let { response, question } = req.body;
  if(response && question) {
     Responses.create({
    response: response,
    question: question
  }).then(() => {
    res.redirect('/give-answer/'+question)
  })
} else {
  console.log(`O Não recebemos a resposta para esta pergunta`)
}
})

app.listen(port, (error) => {
  function verifyConnection() {
    try {
      if (!error) {
        return "You connected successfull!";
      } else {
        return "Connection danied!";
      }
    } catch (err) {
      if (err) {
        console.error("Erro: " + err);
      }
    }
  }
  verifyConnection();
});
