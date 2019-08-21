const mongoose = require('mongoose');
const BarOrder = mongoose.model('BarOrder');
const KitchenOrder = mongoose.model('KitchenOrder');


const getOrder=(req,res)=>{
    /*
    Order.find({code:req.params.code}).then(function(order){
        res.status(200).json(order);
    });*/
};

const getOrders=(req,res)=>{
    /*
    Order.find({}).then(function(orders){
        res.status(200).json(orders);
    });*/
};

const newBarOrder=(req,res)=>{
    
    let order=new BarOrder();
        order.table=req.body.table;
        order.waiter_id=req.body.waiter_id;
        order.status=req.body.status;
        order.items=req.body.items;

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
        order.items=req.body.items;



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

const getKitchenOrders=(req,res)=>{
    console.log("hello kitchen");
    KitchenOrder.find({}).then(function(orders){
      // console.log(orders);
        res.status(200).json(orders);
   });
};

const getBarOrders=(req,res)=>{
    console.log("hello bar");
    BarOrder.find({}).then(function(orders){
      //  console.log(orders);
        res.status(200).json(orders);
    });
};


const updateBarOrder=(req,res)=>{
    console.log('updating bar Order');
    BarOrder.findById(req.params.id,(err,order)=>{
        if(err){
            console.log(err);
        }else{
            order.status=req.body.status;
            order.items=req.body.items;

            

            order.save();
        }
    })
}

const updateKitchenOrder=(req,res)=>{
    console.log('updating kitchen Order');
    KitchenOrder.findById(req.params.id,(err,order)=>{
        order.status=req.body.status;
        order.items=req.body.items;

        console.log(req.body.items);
        console.log(order.items);
        order.save();
    });
}

const deleteBarOrders=(req,res)=>{
    console.log('deleting bar orders');
    BarOrder.deleteMany({},(err)=>{
       console.log(err);
    });
}

const deleteKitchenOrders=(req,res)=>{
    console.log('deleting bar orders');
    KitchenOrder.deleteMany({},(err)=>{
       console.log(err);

    });
}

const getReadyBarOrders=(req,res)=>{
    console.log('getting ready bar orders');
    BarOrder.find({waiter_id:req.waiter_id}).then(function(orders){
        res.status(200).json(orders);
    })
}

const getReadyKitchenOrders=(req,res)=>{
    console.log('getting ready bar orders');
    KitchenOrder.find({waiter_id:req.waiter_id}).then(function(orders){
        res.status(200).json(orders);
    })
}


module.exports = {
    getBarOrders,
    newBarOrder,
    getKitchenOrders,
    newKitchenOrder,
    updateBarOrder,
    updateKitchenOrder,
    deleteKitchenOrders,
    deleteBarOrders,
    getReadyKitchenOrders,
    getReadyBarOrders
    
 };