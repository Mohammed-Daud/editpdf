
var express = require('express');
var router = express.Router();
const docController = require('../controllers/documentsController');


router.get('/', docController.index);


module.exports = router;