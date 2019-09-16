const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let desk= new Schema({
    totalOrders:Number,
    totalEarnings:Number,
    reports:Array,

});

module.exports = mongoose.model('Desk',desk);