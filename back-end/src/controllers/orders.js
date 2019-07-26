const mongoose = require('mongoose');
const Order = mongoose.model('Order');


const getOrder=(req,res)=>{
    Order.find({code:req.params.code}).then(function(order){
        res.status(200).json(order);
    });
};

const getOrders=(req,res)=>{
    Order.find({}).then(function(orders){
        res.status(200).json(orders);
    });
};

const newOrder=(req,res)=>{
    
    let order=new Order();
        order.code=req.code;
        order.type=req.type;
        order.waiter_id=req.waiter_id;
        order.elements=req.elements;
        order.status=0;

        console.log("i'm trying to setOrder right now before save!!\n");
        console.log(order.toJSON());
        order.save((err) => {
            if (err){
                return res.status(400).json(err);
            }else{
                console.log("salvato con successo yaaay!\n");
                return res.status(200).json("ordinato correttamente");
            }
        });
};

const getDishes=(req,res)=>{
    Order.find({type:'dishes'}).then(function(orders){
        res.status(200).json(orders);
    });
};

const getDrinks=(req,res)=>{
    Order.find({type:'drinks'}).then(function(orders){
        res.status(200).json(orders);
    });
};

module.exports = {
    getOrder,
    getOrders,
    getDishes,
    getDrinks,
    newOrder
 };