const express = require('express');
const tablesModel = require('../models/table.model');
const controllerTables = require ('../controllers/tables');
const router=express.Router();


router.get('/tables',controllerTables.getTables);

router.post('/tables/generate',controllerTables.generateTable);

module.exports=router;