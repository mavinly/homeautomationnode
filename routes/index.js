var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SensorReading = mongoose.model('SensorReading');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

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

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
