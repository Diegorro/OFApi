'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var socket = io.connect('http://localhost:3977', { 'forceNew': true });

socket.on('messages', function (data) {
    console.log(data);
    alert(data);
});