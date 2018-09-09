'use strict'
var mongoose = require('mongoose');

var esquema = mongoose.Schema;
var ComentSchema = esquema({

   // estatus: String,
    local: String,
    Fecha_Creada: String,
    Nombre: String,
    mail: String,
    comentario: String,



});

module.exports = mongoose.model('comentario', ComentSchema);
