const express = require('express');
const barOrdersModel = require('../models/barOrder.model');
const kitchenOrdersModel = require('../models/kitchenOrder.model');
const controllerOrders = require ('../controllers/orders');
const router=express.Router();


router.post('/orders/kitchen',controllerOrders.newKitchenOrder);
router.post('/orders/bar',controllerOrders.newBarOrder);

router.get('/orders/kitchen',controllerOrders.getKitchenOrders);
router.get('/orders/bar',controllerOrders.getBarOrders);

router.put('/orders/kitchen/:id',controllerOrders.updateKitchenOrder);
router.put('/orders/bar/:id',controllerOrders.updateBarOrder);

router.delete('/orders/kitchen',controllerOrders.deleteKitchenOrders);
router.delete('/orders/bar',controllerOrders.deleteBarOrders);



//router.get('/orders/bar/:param',controllerOrders.getBarOrdersByWaiter);

//router.get('/orders/kitchen/:param',controllerOrders.getKitchenOrdersByWaiter);


module.exports=router;