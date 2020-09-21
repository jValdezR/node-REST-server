require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
    console.log('Escuchando en: ', process.env.PORT);
});

// Rutas de usuario 
app.use(require('./routes/usuario'));

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