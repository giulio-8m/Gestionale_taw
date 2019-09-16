const mongoose = require('mongoose');
const BarOrder = mongoose.model('BarOrder');
const KitchenOrder = mongoose.model('KitchenOrder');



const newBarOrder=(req,res)=>{
    
    let order=new BarOrder();
        order.table=req.body.table;
        order.waiter_id=req.body.waiter_id;
        order.status=req.body.status;
        order.progress=req.body.progress;
        order.items=req.body.items;
        order.items=req.body.date;

        console.log("i'm trying to setOrder right now before save!!\n");
      //  console.log(order.toJSON());
        order.save((err) => {
            if (err){
                return res.status(400).json(err);
            }else{
                console.log("salvato con successo yaaay!\n");
                return res.status(200).json("ordinato correttamente");
            }
        });
};

const newKitchenOrder=(req,res)=>{

    let order=new KitchenOrder();
        order.table=req.body.table;
        order.waiter_id=req.body.waiter_id;
        order.status=req.body.status;
        order.progress=req.body.progress;
        order.items=req.body.items;
        order.date=req.body.date;

        console.log("i'm trying to setOrder right now before save!!\n");
       // console.log(order.toJSON());
        order.save((err) => {
            if (err){
                return res.status(400).json(err);
            }else{
                console.log("salvato con successo yaaay!\n");
                return res.status(200).json("ordinato correttamente");
            }
        });
}



const getOrder=(req,res)=>{
    /*
    Order.find({code:req.params.code}).then(function(order){
        res.status(200).json(order);
    });*/
};


const getOrders=(req,res)=>{
    console.log("querying orders");
    if(req.query.waiter){
        let ord = [];
        BarOrder.find({waiter_id:req.query.waiter}).then(function(orders){
            ord = ord.concat(orders);
            KitchenOrder.find({waiter_id:req.query.waiter}).then(function(orders){
                ord=ord.concat(orders);
                res.status(200).json(ord);
            });
        }); 
    }else if(req.query.table){
        let ord = [];
        BarOrder.find({table:req.query.table}).then(function(orders){
            ord = ord.concat(orders);
            KitchenOrder.find({table:req.query.table}).then(function(orders){
                ord=ord.concat(orders);
                res.status(200).json(ord);
            });
        }); 
    }else if(req.query.status){
        let ord = [];
        BarOrder.find({status:req.query.status}).then(function(orders){
            ord = ord.concat(orders);
            KitchenOrder.find({table:req.query.table}).then(function(orders){
                ord=ord.concat(orders);
                res.status(200).json(ord);
            });
        });  
    }else{
        let ord = [];
        BarOrder.find({}).then(function(orders){
            ord = ord.concat(orders);
            KitchenOrder.find({}).then(function(orders){
                ord=ord.concat(orders);
                res.status(200).json(ord);
            });
        });        
    }  
};


const getKitchenOrders=(req,res)=>{
    console.log("querying kitchen orders");
    if(req.query.waiter){
        KitchenOrder.find({waiter_id:req.query.waiter}).then(function(orders){
            res.status(200).json(orders);
        });
    }else if(req.query.table){
        KitchenOrder.find({table:req.query.table}).then(function(orders){
            res.status(200).json(orders);
        });
    }else if(req.query.status){
        KitchenOrder.find({status:req.query.status}).then(function(orders){
            res.status(200).json(orders);
        });
    }else{
        KitchenOrder.find({}).then(function(orders){
            res.status(200).json(orders);
        });
    }
};

const getBarOrders=(req,res)=>{
    console.log("querying bar orders");
    if(req.query.waiter){
        BarOrder.find({waiter_id:req.query.waiter}).then(function(orders){
            res.status(200).json(orders);
        });
    }else if(req.query.table){
        BarOrder.find({table:req.query.table}).then(function(orders){
            res.status(200).json(orders);

        });
    }else if(req.query.status){
        BarOrder.find({status:req.query.table}).then(function(orders){
            res.status(200).json(orders);
        });
    }else{
        BarOrder.find({}).then(function(orders){
            res.status(200).json(orders);
        });
    }  
};


const updateBarOrder=(req,res)=>{
    console.log('updating bar Order');
    BarOrder.findById(req.params.id,(err,order)=>{
        if(err){
            console.log(err);
        }else{
            order.status=req.body.status;
            order.progress=req.body.progress;
            order.items=req.body.items;
            order.save((err) => {
                if (err){
                    return res.status(400).json(err);
                }else{
                    return res.status(200).json("updated order");
                }
            });
        }
    });
}

const updateKitchenOrder=(req,res)=>{
    console.log('updating kitchen Order');
    KitchenOrder.findById(req.params.id,(err,order)=>{
        if(err){
            console.log(err);
        }else{
            order.status=req.body.status;
            order.progress=req.body.progress;
            order.items=req.body.items;
            order.save((err) => {
                if (err){
                    return res.status(400).json(err);
                }else{
                    return res.status(200).json("updated order");
                }
            });
        }
    });
}

const deleteBarOrders=(req,res)=>{
    console.log('deleting bar orders');
    BarOrder.deleteMany({},(err)=>{
       if(err){
        console.log("err");
       }else{
           res.status(200).json("eliminati correttamente ");
       }
    });
}

const deleteKitchenOrders=(req,res)=>{
    console.log('deleting bar orders');
    KitchenOrder.deleteMany({},(err)=>{
        if(err){
            console.log("err");
        }else{
            res.status(200).json("eliminati correttamente ");
        }
    });
}

module.exports = {
    getOrders,
    getBarOrders,
    newBarOrder,
    getKitchenOrders,
    newKitchenOrder,
    updateBarOrder,
    updateKitchenOrder,
    deleteKitchenOrders,
    deleteBarOrders,
 };