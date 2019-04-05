var express = require('express');
var router = express.Router();
const tplController = require('../controllers/templatesController');


router.get('/', tplController.addTemplate);
router.post('/save', tplController.saveTemplate);


module.exports = router;