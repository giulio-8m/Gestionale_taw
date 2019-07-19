const express = require('express');
const userModel= require ('../models/user.model');
const controllerAuth = require ('../controllers/authentication');
const router=express.Router();


/*
// localhost:3000/users?name=cane&age=22
router.get('/users',(req,res)=>{
    if(req.query.name){
        res.send("you have requested"+req.query.name+req.query.age);
    }
    res.send('You have requested a person');
});

router.get('/users/:name',(req,res)=>{
    res.send("you have requested"+req.params.name);
});

router.get('/error',(req,res)=>{
    //res.send("you have requested errore");
    throw new Error("errore di errori");
});*/

router.post('/users/sign-in',controllerAuth.signIn);

router.post('/users/sign-up',controllerAuth.signUp);

router.get('/users/all',controllerAuth.getUsers);

module.exports=router;
