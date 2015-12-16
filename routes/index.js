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

router.post('/doorsensorreadings', function(req, res, next) {
  var reading = new SensorReading(req.body);
  reading.save(function(err, reading){
    if(err){return next(err);}
    
    res.json(reading);
  })
})

module.exports = router;
