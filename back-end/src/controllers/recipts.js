const mongoose = require('mongoose');
const Recipt = mongoose.model('Recipt');

const newRecipt=(req,res)=>{
    let recipt=new Recipt();
    recipt.date=req.body.date;
    recipt.table=req.body.table;
    recipt.ordersBarItems=req.body.ordersBarItems;
    recipt.ordersKitchenItems=req.body.ordersKitchenItems;
    recipt.totalBar=req.body.totalBar;
    recipt.totalKitchen=req.body.totalKitchen;
    recipt.total=req.body.total;

    recipt.save((err)=>{
        if(err){
            return res.status(500).json(err);
        }else{
            return res.status(200).json(table);
        }
    });
}

const getRecipts=(req,res)=>{

    if(req.query.date){
        Recipt.find({date:req.query.date}).then(function(recipts){
            res.status(200).json(recipts);
        })
    }else{
        Recipt.find({}).then(function(recipts){
            res.status(200).json(recipts);
        })
    }
}

module.exports = {
  newRecipt,
  getRecipts
};