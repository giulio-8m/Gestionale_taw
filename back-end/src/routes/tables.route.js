const express = require('express');
const tablesModel = require('../models/table.model');
const controllerTables = require ('../controllers/tables');
const router=express.Router();
const passport=require('passport');
// Passport settings
//require('../config/passport.config');
// Include in path's middlewares for jwt authentication
const passportJwtAuth = passport.authenticate('jwt', {session: false});

router.get('/tables',passportJwtAuth,controllerTables.getTables);

router.get('/tables/:id',passportJwtAuth,controllerTables.getTable);

router.post('/tables/generate',passportJwtAuth,controllerTables.generateTable);

router.put('/tables/:id',passportJwtAuth,controllerTables.bookTable);

module.exports=router;