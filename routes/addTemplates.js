var express = require('express');
var router = express.Router();
const tplController = require('../controllers/templatesController');


router.get('/add', tplController.addTemplate);
router.post('/save', tplController.saveTemplate);

router.get('/view', tplController.viewTemplate);


module.exports = router;