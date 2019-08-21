const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


let barOrderSchema= new Schema({

    table:String,
    waiter_id:String,
    status:Number,
    barOrderNumber:Number,
    items:Array,
});

barOrderSchema.plugin(AutoIncrement,{inc_field: 'barOrderNumber'});
module.exports = mongoose.model('BarOrder',barOrderSchema);