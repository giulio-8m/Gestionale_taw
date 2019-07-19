const mongoose = require('mongoose');
const Table = mongoose.model('TableProva2');


const getTables= (req,res)=>{
    Table.find({}).then(function(tables){
        res.status(200).json(tables);
    });
};

const generateTable = (req,res)=>{
    let table=new Table();
    table.code="10SA2";
    table.waiter=null;
    table.clientsNumber=0;
    table.orders={};
    table.seats=[1,2,3,4,5,6,7,8,9,10,11];
    table.prova="prova2";
    console.log(table);
    table.save((err)=>{
        if(err){
            return res.status(500).json(err);
        }else{
            return res.status(200).json(table);
        }
    });
};

module.exports = {
   getTables,
   generateTable
};