var express = require('express');
var router = express.Router();
const ep1Controller = require('../controllers/ep1Controller');

/* GET users listing. */
router.get('/ep1', ep1Controller.mt1);
router.get('/ep2', function (req, res) {
    res.send('End Point 2');
});
router.get('/ep3', function (req, res) {
    res.send('End Point 3');
});

module.exports = router;