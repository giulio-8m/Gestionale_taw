const express = require('express');
const barOrdersModel = require('../models/barOrder.model');
const kitchenOrdersModel = require('../models/kitchenOrder.model');
const controllerOrders = require ('../controllers/orders');
const router=express.Router();
const passport=require('passport');

// Passport settings
//require('../config/passport.config');
// Include in path's middlewares for jwt authentication
const passportJwtAuth = passport.authenticate('jwt', {session: false});


router.get('/orders',passportJwtAuth,controllerOrders.getOrders);

router.post('/orders/kitchen',passportJwtAuth,controllerOrders.newKitchenOrder);
router.post('/orders/bar',passportJwtAuth,controllerOrders.newBarOrder);

router.get('/orders/kitchen',passportJwtAuth,controllerOrders.getKitchenOrders);
router.get('/orders/bar',passportJwtAuth,controllerOrders.getBarOrders);

router.put('/orders/kitchen/:id',passportJwtAuth,controllerOrders.updateKitchenOrder);
router.put('/orders/bar/:id',passportJwtAuth,controllerOrders.updateBarOrder);

router.delete('/orders/kitchen',passportJwtAuth,controllerOrders.deleteKitchenOrders);
router.delete('/orders/bar',passportJwtAuth,controllerOrders.deleteBarOrders);



//router.get('/orders/bar/:param',controllerOrders.getBarOrdersByWaiter);

//router.get('/orders/kitchen/:param',controllerOrders.getKitchenOrdersByWaiter);


module.exports=router;