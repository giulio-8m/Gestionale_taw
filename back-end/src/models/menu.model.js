const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let menuSchema= new Schema({

    name:{
        type:String,
        unique:true,
        required:true
    },
    type:String,
    price:Number,
    preparationTime:Number,
});

module.exports = mongoose.model('Menu',menuSchema);