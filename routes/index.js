var express = require('express');
var router = express.Router();
const { knex } = require("./../config/database");

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log('The value for FOO is:', process.env.AT);
 knex.select(knex.raw("* from users"))
  .debug()
    .then(result => {
      console.log('result: ', result);
     return  res.send(result);
    })
    .catch(err => {
      console.log("TCL: err", err);
      throw err;
    })
});

module.exports = router;
