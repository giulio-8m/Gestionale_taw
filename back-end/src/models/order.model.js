const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


let orderSchema= new Schema({

    code:{
        type:String,
        required: true,
        unique:true
    },
    type:String,
    waiter_id:String,
    preparer_id:String,
    elements:Array,
    status:Number,
    orderNumber:Number,
});

orderSchema.plugin(AutoIncrement,{inc_field: 'orderNumber'});

module.exports = mongoose.model('Order',orderSchema);