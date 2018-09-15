'use strict'

var expres = require('express');
var SolicitudPrimera = require('../controllers/solicitud');
var md_Auth = require('../midleware/autenticate');
var api = expres.Router();

api.post('/getordereasy/:typer/:Esta', SolicitudPrimera.GetInfo);
api.post('/VerifyCode/:code/:Local', SolicitudPrimera.VerifyCode);
api.post('/CheckOptions/:hash/:numericSet', SolicitudPrimera.makeToken);
api.post('/searchGet/:typer/:Busqueda', SolicitudPrimera.GetBusca);
api.post('/SearchNear/', SolicitudPrimera.getActives);
api.post('/Vigenciacheck/:Token/', SolicitudPrimera.validateToken);
api.post('/newValidateUser/:mail/:pass/:LocalContact', SolicitudPrimera.creauser);
//api.post('/saverComent', SolicitudPrimera.guardaComentarios);
//api.post('/getdash/:typer/:Esta', SolicitudPrimera.getdashbord);
//api.post('/rankeo', SolicitudPrimera.GuardaRank);


module.exports = api;
