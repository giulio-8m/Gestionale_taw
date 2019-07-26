const express = require('express');
const ordersModel = require('../models/order.model');
const controllerOrders = require ('../controllers/orders');
const router=express.Router();


router.get('/orders',controllerOrders.getOrders);

router.get('/orders/:id',controllerOrders.getOrder);

router.get('/orders/drinks',controllerOrders.getDrinks);

router.get('/orders/dishes',controllerOrders.getDishes);

router.post('/orders/newOrder',controllerOrders.newOrder);

module.exports=router;