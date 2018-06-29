'use strict'

var solicitudfood = require('../models/solicitudFood');
var eventorpromo = require('../models/eventorpromo');
var paqespe = require('../models/paqespe');
var images = require('../models/img');
var Coders = require('../models/Codigo');
var bcrypt = require('bcrypt-nodejs');
var Cookies = require('cookies');
var jwt = require('../services/jwt');
var onlysix = require('../models/onlysix');

//var express = require('express')();
//var app = express;


function GetBusca(req, res) {
    var parames = req.params;
    var tipo = parames.typer;
    var prefix = parames.Busqueda;
    if (tipo == 1) {
        //nombre lugar
        console.log(prefix);

        var getSearch = solicitudfood.find({ isActive: 1, Nombre: new RegExp(prefix, 'i') }).sort({ 'Nombre': 1 }).limit(10);
        getSearch.populate({ path: 'id_Imgs', model: 'image' }).exec((err, Searching) => {
            if (err)
                res.status(500).send({ message: 'Error en Peticion de los seis' });
    else {
                if (Searching) {
                    console.log(Searching);
                    res.status(200).send({ Searching });
                }
    else {
                    console.log('no hay');
    }
}
});
         
}
else {
    //nombre comida
    var myLocal = solicitudfood.find({ isActive: 1 });
    myLocal.populate({ path: 'id_Menu', model: 'menu', match: { 'menu.Nombre': new RegExp(prefix, 'i') } }).populate({ path: 'id_Imgs', model: 'image' }).exec((err, Searching) => {
        if (err)
            res.status(500).send({ message: 'Error en Peticion de los seis' });
else {
            if (Searching) {
                console.log(Searching);
                res.status(200).send({ Searching });
            }
else {
                console.log('no hay');
}
}
});
}
}


function GetInfo(req, res)
{
    var parames = req.params;
    var tipo=parames.typer;//.replace('_','=').replace('-','/').replace('!','+');
    var idLocal=parames.Esta;//.replace('_','=').replace('-','/').replace('!','+');
    //idLocal=idLocal.replace('_','=').replace('-','/').replace('!','+');
  //  tipo=tipo.replace('_','=').replace('-','/').replace('!','+');
    console.log(idLocal);
    switch (tipo)
    {
        case ('hEJ03PTQrcU='):
              //plazas
            break;
        case ('dnE6XnhrjrU_'):
            //Establecimientos Food
            //console.log('entra');
            var myLocal = solicitudfood.findOne({ id_Hashed: idLocal, isActive:1  });
            myLocal.populate({ path: 'id_Menu', model: 'menu' }).populate({ path: 'id_EvenPromo', model: 'eventorpromo'}).populate({ path: 'id_PaqEspe', model: 'paqespe' }).populate({ path: 'id_Imgs', model: 'image' }).exec((err, local) => {
                if (err)
                    res.status(500).send({ message: 'Error en Peticion --'+err });
                else {
                    if (!local){
                       // res.status(404).send({ message: 'No existen locales' });
                  var soloseis=solicitudfood.find({isActive:1}).sort({'Nombre':1}).limit(6);
                    soloseis.populate({ path: 'id_Imgs', model: 'image' }).exec((err, firtsSix) => {
                    if(err)
                    res.status(500).send({ message: 'Error en Peticion de los seis' });
                    else{
                      if(firtsSix){
                        console.log(firtsSix);
                        res.status(200).send({firtsSix});
                      }
                      else {
                        console.log('no hay');
                      }
                    }
                    });

                  }
                    else {
                       // console.log(local);
                        res.status(200).send({local});
                    }
                }
            });
            break;
        case ('Ig7ftmO2dbo='):
            //hoteles  5
            console.log('hotel');
            break;
        case ('zgCfiWxaDeo='):
            //locales
            break;
        default:
        res.status(404).send({ message: 'no hay Establecimientos de este tipo' });
    }
    //res.status('500').send({ message: 'no se encontro el tipo' });
}

function VerifyCode(req,res){
  var parames = req.params;

  console.log(parames);
  var codigo=parames.code;
  var Local=parames.Local;
  if(codigo!=''){
      var Codigoget = Coders.findOne({ Codigo: codigo, status:'creado',Local:Local  },(err,coderFound)=>{
          if (err)
              res.status(500).send({ message: 'Error en Petici�n' });
          else {
              if (!coderFound){
                 // res.status(404).send({ message: 'No existen locales' });
                 console.log(coderFound);
              res.status(200).send({coderFound});
            }
              else {
                 // console.log(local);
                  res.status(200).send({coderFound});
              }
          }
      });
  }
}



function validateToken(req, res) {
    var parames = req.params;
    console.log(parames.Token);
    var tok = jwt.valida(parames.Token);
    if (tok != '') {
        solicitudfood.findOne({ id_Hashed: tok.sub, isActive: 1, id_SQL: tok.Numericparam }, (err, LocalFound) => {
            if (err) {
                console.log(err);
        res.status(500).send({ message: 'Error' + err });
    }
    else {
        console.log(LocalFound);
        if (LocalFound) {
            res.status(200).send({ token: true })
        }
        else {
            res.status(500).send(null);
        }
    }
});
}
else {
    res.status(500).send(null);
}
console.log(tok);
}


function makeToken(req,res){
    var parames = req.params;
    console.log(parames);
    var id=parames.hash;//.replace('_','=').replace('-','/').replace('!','+');
    //  var nombre=parames.name;
    var intId=Number(parames.numericSet);
    solicitudfood.findOne({ id_Hashed: id, isActive:1, id_SQL:intId  },(err,LocalFound)=>{
        if(err){
        console.log(err);
    res.status(500).send({ message: 'Error'+ err });
}
else {
       console.log(LocalFound);
if(LocalFound){
    res.status(200).send({token:jwt.createToken(id,intId)})
}
else {
    res.status(500).send(null);
}
}
});

}




module.exports = { GetInfo, VerifyCode, makeToken, GetBusca, validateToken};

