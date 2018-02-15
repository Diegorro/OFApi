'use strict'
var express = require('express');
var bodyparser = require('body-parser');
//var http = require('http').Server(app);
var app = express();
//cargar rutas

var comanda_route = require('./Routes/comandas');
var primerrequest = require('./Routes/firstreq');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//configurar cabeceras http
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
//res.header('Access-Control-Allow-Headers','Authorization,X-API_KEY,Origin,X-Requested-With,Accept,Access-Control-Allow-Request-Method');
res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
next();
});

//rutas base

app.use('/api', comanda_route);
app.use('/api', primerrequest);
//app.get('/Probando',function(req,res){
//res.status(200).send({message:'bienvenido wey'});
//});

module.exports = app;