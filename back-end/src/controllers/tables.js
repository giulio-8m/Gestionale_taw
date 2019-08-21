const mongoose = require('mongoose');
const Table = mongoose.model('TableProva2');


const getTables= (req,res)=>{
    Table.find({}).then(function(tables){
        res.status(200).json(tables);
    });
};

const generateTable = (req,res)=>{
    let table=new Table();
    table.code="11SB1";
    table.clientsNumber=0;
    table.seats=[1,2,3,4,5,6];
    table.prova="prova2";
    //console.log(table);
    table.save((err)=>{
        if(err){
            return res.status(500).json(err);
        }else{
            return res.status(200).json(table);
        }
    });
};

const getTable=(req,res)=>{

    res.status(200).json(res.params.id);

}

const bookTable=(req,res)=>{
    Table.findOne({code:req.params.id},(err,table)=>{
        if(err){
            return err;
        }else{
            table.clientsNumber=req.body.clients;
            table.save();
        } 
    });
}

module.exports = {
   getTables,
   getTable,
   bookTable,
   generateTable
};