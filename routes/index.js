var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SensorReading = mongoose.model('SensorReading');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/doorsensorreadings', function(req, res, next) {
  SensorReading.find(function(err, sensorReading) {
    if(err){return next(err); }
    
    res.json(sensorReading);
  });
});

module.exports = router;
