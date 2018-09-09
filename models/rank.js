'use strict'
var mongoose = require('mongoose');

var Ranking= mongoose.Schema;
var myRank = Ranking({
  //  _id: String,
    Idusuario:String,
    Calificacion:String,
    Local:String,
    fecha:String,
    //sendMail:Boolean,



});

module.exports = mongoose.model('rankings', myRank);
