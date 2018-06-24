var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET archi page. */
router.get('/archi', function(req, res, next) {
  res.render('archi', { title: 'Express' });
});
/* GET term page. */
router.get('/term', function(req, res, next) {
  res.render('term', { title: 'Express' });
});
/* GET iot page. */
router.get('/iot', function(req, res, next) {
  res.render('iot', { title: 'Express' });
});


module.exports = router;
