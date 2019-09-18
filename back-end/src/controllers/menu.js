const mongoose = require('mongoose');
const Menu = mongoose.model('Menu');


const getMenu= (req,res)=>{
    Menu.find({}).then(function(menu){
        res.status(200).json(menu);
    });
};

const generateMenuItem = (req,res)=>{
    let menuItem=new Menu();
        menuItem.name=req.body.name;
        menuItem.type=req.body.type;
        menuItem.price=req.body.price;
        menuItem.preparationTime=req.body.preparationTime;

        console.log("i'm trying to setmenuItem right now before save!!\n");
      //  console.log(menuItem.toJSON());
        menuItem.save((err) => {
            if (err){
                return res.status(400).json(err);
            }else{
                console.log("salvato con successo yaaay!\n");
                return res.status(200).json("salvato menu");
            }
        });
    
};

const getDrinks=(req,res)=>{
    Menu.find({type:'drink'}).then(function(menu){
        res.status(200).json(menu);
    });
};

const getDishes=(req,res)=>{
    Menu.find().or({type:'second-dish'}).or({type:'first-dish'}).then(function(menu){
        res.status(200).json(menu);
    });
};

const getFirstDishes=(req,res)=>{
    Menu.find({type:'first-dish'}).then(function(menu){
        res.status(200).json(menu);
    });
};

const getSecondDishes=(req,res)=>{
    Menu.find({type:'second-dish'}).then(function(menu){
        res.status(200).json(menu);
    });
};




module.exports = {
  getMenu,
  getDrinks,
  getDishes,
  getFirstDishes,
  getSecondDishes,
  generateMenuItem
};