'use strict'
var mongoose = require('mongoose');
var app=require('./app');





mongoose.connect('mongodb://DiegoR:SALINIDAD1*@ds231568.mlab.com:31568/heroku_7xdfk9c8', (err,res) => {
    if(err)
    {
    throw err;
}
else
{
    console.log('Register Bd correct');
 
}
});

