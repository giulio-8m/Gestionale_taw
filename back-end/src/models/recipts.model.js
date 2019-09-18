const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let recipt= new Schema({
    date:String,
    table:String,
    ordersBarItems:Array,
    ordersKitchenItems:Array,
    totalBar:Number,
    totalKitchen:Number,
    total:Number,
});

module.exports = mongoose.model('Recipt',recipt);