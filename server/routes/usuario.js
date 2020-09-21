const express = require('express');

const bcrypt =  require('bcrypt');

const Usuario = require('../models/usuario');

const app = express();

// Usuarios
app.get('/usuarios', function (req, res) {
    res.json('get Usuario')
});

app.post('/usuarios', function (req, res) {
    
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    usuario.save((err,usuarioDB)=>{
        if (err) {
            res.status(400).json({
                ok:false,
                err
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok:true,
            usuario: usuarioDB,
        })
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

module.exports = app;