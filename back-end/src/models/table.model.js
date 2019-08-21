const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tableSchemaProva2= new Schema({

    code:{
        type:String,
        required: true,
        unique:true
    },
    clientsNumber:Number,
    seats:Array,
    prova:String
});

module.exports = mongoose.model('TableProva2',tableSchemaProva2);