'use strict'
var mongoose = require('mongoose');
var app=require('./app');



var port=process.env.PORT||3977;

//mongoose.connect('mongodb://DiegoR:SALINIDAD1*@ds231568.mlab.com:31568/heroku_7xdfk9c8', (err,res) => {
mongoose.connect('mongodb://DiegoR:DEFTONES1*@dds245210.mlab.com:45210/heroku_bql92j6t', (err,res) => {
    if(err)
    {
    throw err;
}
else
{
    console.log('Register Bd correct');
    app.listen(port,function(){console.log('Server is run correct port:'+port);});
 
}
});

