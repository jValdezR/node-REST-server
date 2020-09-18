const express = require('express');
const app = express();
const port = 8080;
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

app.listen(8080, () =>{
    console.log('Escuchando en: ', port);
})