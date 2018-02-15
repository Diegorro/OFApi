'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mi_secretillo';


exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization)
    {
        res.status(403).send({ message: 'La peticion no tiene formato correcto' });
    }
    var token = req.headers.authorization.replace(/['"]+g/,'');
    try{
        var payload=jwt.decode(token,secret);
        if(payload.exp<=moment.unix())
        {
            res.status(401).send({message:'el token expiro'});
        }
    }
    catch(ex){//console.log('no se pudo decodificar el token')
        res.status(404).send({ message: 'Token no valido' });
    }

    req.user=payload;
    next();
};