'use strict'
var mongoose = require('mongoose');

var esquema = mongoose.Schema;
var VisitasSchema = esquema({

   // estatus: String,
    local: String,
    Fecha_Creada: String,
    Origen: String,
    IsActive: String,
   


});

module.exports = mongoose.model('visita', VisitasSchema);
