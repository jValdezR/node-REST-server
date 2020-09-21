const express = require('express');

const bcrypt =  require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();

// Usuarios
app.get('/usuarios', function (req, res) {
    
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({
        // Filtros de lo que se quiere obtener de la db
        estado:true
    })/* }, 'nombre, email') *///filtros de lo que se quiere mostrar solamente
    .skip(desde) // Salta los primeros 5
    .limit(limite) //Muestra solo 5
    .exec((err,usuarios) =>{
        if (err) {
            res.status(400).json({
                ok:false,
                err
            });
        }
        Usuario.count({},(err,conteo)=>{
            res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            })
        })
        
    })
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
    let body = _.pick(req.body,['nombre','email','img','role','estado']);
    Usuario.findByIdAndUpdate(id,body,{new: true,runValidators:true},(err,usuarioDB) =>{
        
        if (err) {
            res.status(400).json({
                ok:false,
                err
            });
        }
        


        res.json({
            ok: true,
            usuario: usuarioDB
    
        })
    })
    
});

app.delete('/usuarios/:id', function (req, res) {
    let id = req.params.id;
    // Eliminacion fisica

    /* Usuario.findByIdAndRemove(id,{},(err,usuarioBorrado)=>{ */

        // Eliminacion por estado

        let cambiaEstado = {
            estado: false
        }
        Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true},(err,usuarioBorrado)=>{
        if (err) {
            res.status(400).json({
                ok:false,
                err
            });
        }
        if (!usuarioBorrado) {
            res.status(400).json({
                ok:false,
                error: {message: 'Usuario no encontrado'}
            });
        }
        res.json({
            ok: true,
            usuario:usuarioBorrado
        });
    });
});

module.exports = app;