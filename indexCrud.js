const express = require('express')
const app = express()
const PORT = 3333

let usuarios = []

app.use(express.json())

//POST
app.post('/users', (req, res) => {
const usuario = req.body
    if(usuarios.length > 0) {
        usuario.id = usuarios[usuarios.length - 1].id + 1
    } else {
        usuario.id = 1
    }
usuarios.push(usuario);
res.status(201).send('Created')
})

//GET
app.get('/users', (req, res) => {
     res.json(usuarios)
})

//GET QUERY
app.get('/users/:id', (req, res) => {
    const { id } = req.params
    const usuario = usuarios.find(usuario => usuario.id === parseInt(id))
        if(!usuario){
            res.status(404).send('Not Found');
            return;
        }
    res.json(usuario)
})

//PUT
app.put('/users/:id', (req, res) => {
const { id } = req.params
const newData = req.body
const index = usuarios.findIndex(usuario => usuario.id === parseInt(id))
    if(index === -1){
        res.status(404).send('Not Found')
        return;
    }
//Adicionar o novo dado no lugar do antigo no array, usando id como parâmetro de busca
usuarios[index] = {...usuarios[index], ...newData }
res.status(200).send('OK')
})

//DELETE
app.delete('/users/:id', (req, res) => {
const { id } = req.params;
const index = usuarios.findIndex(usuario => usuario.id === parseInt(id));
    if(index === -1){
        res.status(404).send('Not Found');
        return;
    }
//Remover um item de um array, o primeiro indica o indice do elemento em que inicia o "corte", o segundo o número de itens removidos
usuarios.splice(index, 1);
res.status(200).send('OK')
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em ${PORT}`)
})