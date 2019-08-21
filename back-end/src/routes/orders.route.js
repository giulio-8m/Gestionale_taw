const express = require('express');
const barOrdersModel = require('../models/barOrder.model');
const kitchenOrdersModel = require('../models/kitchenOrder.model');
const controllerOrders = require ('../controllers/orders');
const router=express.Router();


router.post('/orders/kitchen',controllerOrders.newKitchenOrder);
router.get('/orders/kitchen',controllerOrders.getKitchenOrders);

router.post('/orders/bar',controllerOrders.newBarOrder);
router.get('/orders/bar',controllerOrders.getBarOrders);

router.put('/orders/bar/:id',controllerOrders.updateBarOrder);
router.put('/orders/kitchen/:id',controllerOrders.updateKitchenOrder);

router.delete('/orders/bar',controllerOrders.deleteBarOrders);

router.delete('/orders/kitchen',controllerOrders.deleteKitchenOrders);

router.get('/orders/bar/ready/:waiter',controllerOrders.getReadyBarOrders);

router.get('/orders/kitchen/ready/:waiter',controllerOrders.getReadyKitchenOrders);

module.exports=router;