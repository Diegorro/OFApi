'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret='mi_secretillo';


exports.createToken = function (user) {
    var pailoat = {
        sub: user._id,
        nombre:user.nombre,
        appell:user.surname,
        mai:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(30,'days').unix(),
    }
    return jwt.encode(pailoat,secret);
};