
var express = require('express');
var router = express.Router();
const multer = require('multer');
const pdfFilter = require('../utils');
//const upload = multer({ dest: 'uploads/', fileFilter: pdfFilter });
const upload = multer({ dest: 'uploads/' });
const tplController = require('../controllers/templatesController');


router.get('/add', tplController.addTemplate);
router.post('/save', upload.array('pdf_name[]', 12), tplController.saveTemplate);


router.get('/view', tplController.viewTemplate);
router.get('/edit-info/:tempId', tplController.editTemplateInfo);


module.exports = router;