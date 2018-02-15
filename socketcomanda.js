'use strict'


//app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/index.html');
//});

//io.on('connection', function (socket) {
//    socket.on('chat message', function (msg) {
//        io.emit('chat message', msg);
//    });
//});

//http.listen(port, function () {
//    console.log('listening on *:' + port);
//});
//module.exports.entraaqui = function(io) {
var comands=require('./models/comandas');
var Codigos=require('./models/Codigo');
    var MenuCode=require('./models/Menu');
    var bcrypt=require('bcrypt-nodejs');
    var Cookies = require( 'cookies' );
    var express = require('express')();
    var app=express;
    var servidor = require('http').Server(app);
    var io = require('socket.io')(servidor);
    var jwt=require('./services/jwt');


    function hasalgo(idEncript){    
        console.log(jsonvalue);
        MenuCode.findOne({proces_Loc:jsonvalue, is_Active:1}, function(err, MenuCom)
        { 
             console.log(MenuCom.id_Local);
            //bcrypt.compare(local[0],MenuCom.id_Local, function(err, check)
            //{
                
                if(err)
                {
                    console.log(err);
                    return null;

                }
            //    else{
            //comands.findById('59139a1e26db2209ccca7232').populate({path:'Codigosident', model: 'Codigo'}).exec((err,Comandar)=>{ 
            comands.find({local: MenuCom.id_Local, estatus:'Solicitado'}).populate({path:'Codigosident', model: 'Codigo'}).exec((err,Comandar)=>{                 
                        if (err) throw err;
                        else 
                        {                            
                            console.log(Comandar);
                            //if(Comanda.length>0)
                                return idEncript(null,Comandar);
                            //else
                            //    return idEncript(null,null);
                        }
                    });
                //}
          //  });
        });
    }
    app.get('/setingProces', function (req, res) {
        console.log(req.query.LocProces);
        MenuCode.findOne({proces_Loc:req.query.LocProces, is_Active:1}, function(err, MenuCom)
        {
            if (err) throw err;       
            if(MenuCom!=null)
            {           
                var categorias='';
                var locProces='';
                var onlyMenu=MenuCom.menu;                
                if(onlyMenu!=null)
                {                
                    for(var i=0; i<onlyMenu.length;i++)
                    {                   
                        categorias+='_'+onlyMenu[i].Categoria;
                    }                
                }

                bcrypt.hash(MenuCom.id_Local,null,null,function(err,hash){                    
                    locProces=hash;

                    res.cookie('Proceso',req.query.LocProces,{ expires: new Date(Date.now() + 20000) }).cookie('categoria', categorias).cookie('ProcesLoc', locProces, { expires: new Date(Date.now() + 20000) }).status('200').sendFile(__dirname + '/Command_View.html');
                
                });            
            }
        });
        // res.status('200').sendFile(__dirname + '/Command_View.html');
    });

    //io.on('connection', function (socket) {
    //    socket.on('mensaje', function (msg) {
    //        //var jsonvalue=hasalgo(msg);
    //        console.log(hasalgo(msg));
    //        io.emit('mensaje', msg);
          
    //       // res.status('200').sendFile(__dirname + '/Command_View.html');
    //    });
//});
    var jsonvalue='';
    io.on('connection', function (socket) {
        socket.on('mensaje', function (msg) {
            jsonvalue=msg;            
            hasalgo(function(err,callback){
                //console.log();
                io.emit('mensaje', callback);
          
            });  // res.status('200').sendFile(__dirname + '/Command_View.html');
        });
    });

    servidor.listen(3000, function () {
        console.log('listening on *:3000');
    });

    module.exports = {io};
//}

