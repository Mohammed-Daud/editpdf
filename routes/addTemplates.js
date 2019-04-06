
var express = require('express');
var router = express.Router();
const tplController = require('../controllers/templatesController');
const multer = require('multer');
const upload = multer();


router.get('/add', tplController.addTemplate);
//router.post('/save', upload.array(), tplController.saveTemplate);
router.post('/save', tplController.saveTemplate);

router.get('/view', tplController.viewTemplate);
router.get('/edit-info/:tempId', tplController.editTemplateInfo);

router.post('/edit-info-save', tplController.saveTemplateInfo);


module.exports = router;