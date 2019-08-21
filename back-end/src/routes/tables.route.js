const express = require('express');
const tablesModel = require('../models/table.model');
const controllerTables = require ('../controllers/tables');
const router=express.Router();


router.get('/tables',controllerTables.getTables);

router.get('/tables/:id',controllerTables.getTable);

router.post('/tables/generate',controllerTables.generateTable);

router.put('/tables/:id',controllerTables.bookTable);

module.exports=router;