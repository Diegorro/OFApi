'use strict'
var mongoose = require('mongoose');

var esquemaMenu = mongoose.Schema;
var MenuSchema = esquemaMenu({
    _id: String ,
    id_Local: Number,  // { type: schema.ObjecId, ref: 'Codigos' },
    is_Active: Number,
    date_Create: String,
    need_Code: Number,
    proces_Loc: String,
    menu: [{
        id: String,
        Nombre: String,
        Descripcion: String,
        precio: Number,
        Nom_Img : String,
        Categoria: String,
        Descripcion_Cate : String,
            Tiempo   : String,
        etiquetas : String,
        Piezas: Number,
        tama_Price: String
    }]
    
     
});

module.exports = mongoose.model('menu', MenuSchema);
