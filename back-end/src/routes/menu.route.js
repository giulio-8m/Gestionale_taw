const express = require('express');
const menuModel = require('../models/menu.model');
const controllerMenu = require ('../controllers/menu');
const router=express.Router();
const passport=require('passport');
// Passport settings
//require('../config/passport.config');
// Include in path's middlewares for jwt authentication
const passportJwtAuth = passport.authenticate('jwt', {session: false});

router.get('/menu',passportJwtAuth,controllerMenu.getMenu);

router.get('/menu/drinks',passportJwtAuth,controllerMenu.getDrinks);

router.get('/menu/dishes',passportJwtAuth,controllerMenu.getDishes);

router.get('/menu/first-dishes',passportJwtAuth,controllerMenu.getFirstDishes);

router.get('/menu/second-dishes',passportJwtAuth,controllerMenu.getSecondDishes);

router.post('/menu/generateItem',passportJwtAuth,controllerMenu.generateMenuItem);

module.exports=router;