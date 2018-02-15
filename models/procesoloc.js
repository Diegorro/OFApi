'use strict'
var mongoose = require('mongoose');

var locesquem = mongoose.Schema;
var locesquema = locesquem({    
    idLocal: Number,
    locproces: String,
    datecreate: String,
    isactive:Number
});

module.exports = mongoose.model('procesoloc', locesquema);