//Exercicio 1
const express = require('express')
const path = require('path');
const app = express()
const PORT = 3000


app.use(express.json())

let produtos = []

//Exercicio 3
const logHorarios = (req, res, next) => {
    const horarioAtual = new Date().toISOString();
console.log(
`[${horarioAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
);
    next();
}


//Exercicio 2
app.get('/sobre', (req, res) => {
    res.send('Bem vindo ao nosso aplicativo! Conheça um pouco mais sobre aqui:')
})

app.get('/contato', (req, res) => {
    res.send('Contato: Email: Whatsapp: Endereço:')
})

//Exercicio 4
app.get('/produtos:id', (req, res) => {
    const produtoId = req.params.id
   res.send(`Sobre o produto de ID: ${produtoId}`) 
})
//Exercicio 5
app.get('/static/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use(logHorarios);

app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`)
})