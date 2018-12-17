'use strict'


var comanda=require('../models/comandas');
var MenuCode=require('../models/Menu');
var locproces=require('../models/procesoloc');
var bcrypt=require('bcrypt-nodejs');
var Cookies = require( 'cookies' );
var jwt=require('../services/jwt');
var Codigos=require('../models/Codigo');
var mongoose = require('mongoose');


function cambiaTipo(fechaResolve) {
    var fecha = fechaResolve.replace('|', '/').replace('|', '/').replace('-', ':').replace('_', ' ')
    return fecha;
}

function getComandsCuenta(req,res){
  var parametros =req.body;
  //console.log(parametros);
  if(parametros.codigo=='0'){

    var dateObj = new Date();
    var d = new Date(dateObj.toString().replace("GMT+0000","").replace("GMT+0100","")),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour= '' +d.getHours(),
        minute='' +d.getMinutes();


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;

    var newdate= cambiaTipo(parametros.timer).split(' '); //[day,month,year ].join('/');
console.log(newdate[0] +' is may time');
    //var este='26/01/2018';//new Date('2018','01','25');
  comanda.find({$or:[{local: parametros.Local, Estatus:4,fecha_Entrega:{ $regex: '.*' + newdate[0]  + '.*' }},{local: parametros.Local, Estatus:7,fecha_Entrega:{ $regex: '.*' + newdate[0]  + '.*' }}]}, function(err, Comanda) {
      if (err) throw err;
    else
      res.status('200').send({comanda:Comanda});
  }).sort({ 'fecha_Entrega': -1 }).limit(50);
}
else {

  comanda.find({$or:[{local: parametros.Local, Estatus:4,codigoStr:parametros.codigo},{local: parametros.Local, Estatus:7,codigoStr:parametros.codigo}]}, function(err, Comanda) {
      if (err) throw err;
    else{
    //  console.log(Comanda);
      res.status('200').send({comanda:Comanda});
    }
  });
}
}

function MetePlatoExtra(req,res){
  //var Comandas=new comanda();
  var parametros=req.body;
 // console.log(parametros);
  //var objectId = new mongoose.ObjectID;
  comanda.findByIdAndUpdate(parametros.id,
  // {_id: },
   { $push : { platillos: {id:new mongoose.Types.ObjectId(),isCode: true, fechaCreado: parametros.fechaCreado,Platillo:parametros.Platillo,Mesa:parametros.Mesa,Estatus:parametros.Estatus,Cantidad:parametros.Cantidad, precio:parametros.precio}}},
    (err,PlatoGuarda)=>{
  // function(err, PlatoGuarda){
          if(err){
              res.send(err);
          }else{
              res.status('200').send({PlatoGuarda});
          }
});
}

function payComand(req, res){
  var parametros=req.body;
  //console.log(parametros);
  comanda.findByIdAndUpdate(parametros.id,{Estatus:7},(err, Comand)=>{
    if(err)
    res.status(500).send({message:'error al actualizar la comanda'});
    else{
      Codigos.findByIdAndUpdate(parametros.Codigo,{status:'Cerrado'},(err,Code)=>{
        if(err)
        res.status(500).send({message:'error al actualizar el Codigo'});
      });
    }
  });
}

function GetComandByCode(req,res){
  var parames = req.body;
  var codigo=parames.code;
  var Local=parames.Local;
    console.log('x aca');
  console.log(codigo+'---'+Local);
  if(codigo!=''){
      var Codigoget = comanda.findOne({ codigoStr:  new RegExp(codigo, 'i'),local:Local  },(err,ComandFounder)=>{
          if (err)
              res.status(500).send({ message: 'Error en Peticion' });
          else {
              if (!ComandFounder)
                 // res.status(404).send({ message: 'No existen locales' });
              res.status(200).send({ComandFounder});
              else {
                  console.log(ComandFounder);
                  res.status(200).send({ComandFounder});
              }
          }
      });
  }
}

//guarda comanda
function SetComandas(req,res)
{
    var Comandas=new comanda();
    var params=req.body;
     console.log(params);
    Comandas.codigoStr=params.codigoStr;
    Comandas.local=params.local;
    Comandas.Fecha_Creada=params.Fecha_Creada;
    Comandas.platillos=params.platillos;
    Comandas.fecha_Entrega=params.fecha_Entrega;
    Comandas.Estatus=params.Estatus;

  var newdate=Comandas.Fecha_Creada.split(' ');

  comanda.find({codigoStr:Comandas.codigoStr,Fecha_Creada: { $regex: '.*' + newdate[0] + '.*' }}, function(err, Comandexistente) {
  console.log(Comandexistente);
    if(Comandexistente!=''){
console.log( params.platillos[0].fechaCreado);
for(var e=0;e<params.platillos.length;e++){
      comanda.findByIdAndUpdate(Comandexistente[0].id,
       { $push : { platillos: {id:new mongoose.Types.ObjectId(),isCode: true, fechaCreado: params.platillos[e].fechaCreado,Platillo:params.platillos[e].Platillo,Mesa:params.platillos[e].Mesa,Estatus:params.platillos[e].Estatus,Cantidad:params.platillos[e].Cantidad, precio:params.platillos[e].precio}}},
        (err,PlatoGuarda)=>{
               //res.status('200').send({Comandas:PlatoGuarda});
        });
      }
    }
    else {

  
    Comandas.save((err,ComandaGuardada) =>{
if(err)
  res.status('500').send({message:'error al guardar'+err});
else{
if(!ComandaGuardada)
res.status('500').send({message:'no se registro el usuario'});
else
{
  console.log('si guarda a segun');
    console.log(ComandaGuardada);
     res.status('200').send({Comandas:ComandaGuardada});
}
}

});
}
});
}

//busca comanda
function verifycode(req, res)
{
    //console.log(req.query.Local);
    comanda.find({local: req.query.Local, status:'Solicitado'}, function(err, Comanda) {
        if (err) throw err;

        // object of all the users
      //  console.log(Comanda);
        res.status('200').send({comanda:Comanda});
    });
}

//busca menu
function setloc(req, res)
{
    MenuCode.findOne({proces_Loc:req.query.LocProces, is_Active:1}, function(err, MenuCom)
    {
        if (err) throw err;
        //  res.status('200').sendFile(__dirname+'/Command_View.html');
        var locProces='';
        if(MenuCom!=null)
        {

            var categorias='';

            var onlyMenu=MenuCom.menu;
           // console.log(onlyMenu);
            if(onlyMenu!=null)
            {
                for(var i=0; i<onlyMenu.length;i++)
                {
                    categorias+='|'+onlyMenu[i].Categoria;
                }
               // localStorage.setItem('keyProces', locProces+categorias);
            }

            bcrypt.hash(MenuCom.id_Local,null,null,function(err,hash){
             //   console.log(hash);
                locProces=hash;


                //res.cookie('ProcesLoc',locProces+categorias,{ expires: new Date(Date.now() + 2000) }).status('200').sendFile(__dirname+'../Command_View.html');
                res.cookie('ProcesLoc',locProces+categorias,{ expires: new Date(Date.now() + 2000) }).status('200').sendFile('C:/Users/QUENU_000/Desktop/VERSIONES_PIXKY/OrdenoFacil200117/FacilOrdeno/ApiNode/apiordenofacil/Command_View.html');

            });



        }
    });

}

//Busca  en otro diria que no sirve
function GetComand(req, res)
{
    //var params=req.query;
    //console.log(req.query.LocProces);
    var idlocal=0;
    locproces.findOne({locproces:req.query.LocProces,isactive:1}, function(err, loc) {
        if (err) throw err;
        //  res.status('200').sendFile(__dirname+'/Command_View.html');
        if(loc!=null)
        {
          //  console.log(loc);
            //idlocal=loc.idLocal;
            res.status('200').send({locer:loc});
        }
        else
        {
            res.status('500').send({message:'Existe un problema por favor contacte al administrador'});
        }

    });



}

function EntregaCOmanda(req,res)
{
    var Idcmanda=req.params.id;
    console.log(Idcmanda);
    var params=req.body;
    comanda.findByIdAndUpdate(Idcmanda,params, (err, CamandaActual)=>
        {
            if(err)
            res.status(500).send({message:'error al actualizar la comanda'});
else
{
    if(!CamandaActual)
    res.status(404).send({message:'no se actualizo la comanda'});
else
    res.status(200).send({CamandaActual});
}
});
}

module.exports = {GetComand,
       SetComandas,
    verifycode,
        setloc,    
        EntregaCOmanda,
        MetePlatoExtra,
        getComandsCuenta,
        GetComandByCode,
        payComand
      };
//};
