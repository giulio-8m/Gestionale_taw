const express = require('express');
const menuModel = require('../models/menu.model');
const controllerMenu = require ('../controllers/menu');
const router=express.Router();


router.get('/menu',controllerMenu.getMenu);

router.get('/menu/drinks',controllerMenu.getDrinks);

router.get('/menu/dishes',controllerMenu.getDishes);

router.get('/menu/first-dishes',controllerMenu.getFirstDishes);

router.get('/menu/second-dishes',controllerMenu.getSecondDishes);

router.post('/menu/generateItem',controllerMenu.generateMenuItem);

module.exports=router;