const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


let kitchenOrderSchema= new Schema({

    table:String,
    waiter_id:String,
    status:String,
    progress:Number,
    kitchenOrderNumber:Number,
    items:Array,
    date:Date
});

kitchenOrderSchema.plugin(AutoIncrement,{inc_field: 'kitchenOrderNumber'});
module.exports = mongoose.model('KitchenOrder',kitchenOrderSchema);