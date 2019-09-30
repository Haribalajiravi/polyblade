var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.type("text/html");
  res.render('welcome', { title: 'Home - Polyblade', layout: 'welcome' });
});

module.exports = router;
