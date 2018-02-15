'use strict'
var mongoose = require('mongoose');
var app=require('./app');
var Socket=require('./socketcomanda');



var port=process.env.PORT||3977;
mongoose.connect('mongodb://localhost:27017/OrderEasyMon', (err,res) => {
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

