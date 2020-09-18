require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



// Usuarios
app.get('/usuarios', function (req, res) {
    res.json('get Usuario')
});

app.post('/usuarios', function (req, res) {
    let persona = req.body;
    res.json({
        persona,
    })
});

app.put('/usuarios/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id,

    })
});

app.delete('/usuarios', function (req, res) {
    res.json('delete Usuario')
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en: ', process.env.PORT);
})

mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((res)=>{
    console.log('Base de datos online');
}).catch((err)=>{
console.log(err);
});