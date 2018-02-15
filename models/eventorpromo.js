'use strict'
var mongoose = require('mongoose');

var Event = mongoose.Schema;
var eventorpromos = Event({
  //  _id: String,
    Titulo: String,
    Desc: String,
    Comienza: String,
    Termina: String,
    Local: Number,
    Typo: Number,
    image: String,
    IsActive: Number,
   
});

module.exports = mongoose.model('eventorpromo', eventorpromos);