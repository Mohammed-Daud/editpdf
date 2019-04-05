var express = require('express');
var router = express.Router();
const tplController = require('../controllers/templatesController');


router.get('/', tplController.addTemplate);

router.get('/view-templates', tplController.viewTemplate);


module.exports = router;