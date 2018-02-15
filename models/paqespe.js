'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var paqespe = Schema({
  _id:String,
    Desc: String,
    Nombre: String,
    precio: String,
    Typo: Number,
    Local:Number,
    imagen: String,
    etiquetas: String,
    Is_Active: Number
});

module.exports = mongoose.model('paqespe', paqespe);
