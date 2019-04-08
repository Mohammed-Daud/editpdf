
var express = require('express');
var router = express.Router();
const multer = require('multer');
const pdfFilter = require('../utils');
//const upload = multer({ dest: 'uploads/', fileFilter: pdfFilter });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });
const tplController = require('../controllers/templatesController');


router.get('/add', tplController.addTemplate);
router.post('/save', upload.array('pdf_name[]', 12), tplController.saveTemplate);

router.get('/delete/:tempId', tplController.deleteTemplate);

router.get('/view', tplController.viewUserTemplates);
router.get('/edit-info/:tempId', tplController.editTemplateInfo);

router.post('/edit-info-save', tplController.saveTemplateInfo);
router.get('/generate/:tempId', tplController.generate);



module.exports = router;