'use strict'

var expres = require('express');
var SolicitudPrimera = require('../controllers/solicitud');
var md_Auth = require('../midleware/autenticate');
var api = expres.Router();

api.post('/getordereasy/:typer/:Esta', SolicitudPrimera.GetInfo);
api.post('/VerifyCode/:code/:Local', SolicitudPrimera.VerifyCode);
module.exports = api;
