 'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Imagene = Schema({
    Nombre: String,
    IsActivo: Number,
    Local: Number,
    tipo: Number
});

module.exports = mongoose.model('image', Imagene);