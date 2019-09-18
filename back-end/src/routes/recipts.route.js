const express = require('express');
const reciptsModel = require('../models/recipts.model');
const controllerRecipts = require ('../controllers/recipts');
const router=express.Router();
const passport=require('passport');
// Passport settings
//require('../config/passport.config');
// Include in path's middlewares for jwt authentication
const passportJwtAuth = passport.authenticate('jwt', {session: false});



router.post('/recipts',passportJwtAuth,controllerRecipts.newRecipt);

router.get('/recipts',passportJwtAuth,controllerRecipts.getRecipts);


module.exports=router;