var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var fs = require('fs');
var User = mongoose.model('User');
var Player = mongoose.model('Player');

var auth = jwt({
  secret: 'SECRET',
  userProperty: 'payload'
});

/*
 *Add functions to read a JSON file where the options config is saved
 */
function readJsonFileSync(filepath, encoding) {
  if (typeof(encoding) == 'undefined') {
    encoding = 'utf8';
  }
  var file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getFile(file) {
  // var filepath = __dirname + '/' + file;
  var filepath = './' + file;
  return readJsonFileSync(filepath);
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


/* Players API*/
router.get('/options', function(req, res, next) {
  var options = getFile('config/options.json');
  res.json(options);
});

/* Players API*/
router.get('/players', function(req, res, next) {
  Player.find(function(err, players) {
    if (err) {
      return next(err);
    }
    res.json(players);
  });
});

router.get('/players/:player', function(req, res, next) {
  // res.send('hello ' + req.params.player + '!');
  next();
});

router.param('player', function(req, res, next, username) {
  Player.findOne({
    username: username
  }, function(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
});

router.post('/players', auth, function(req, res, next) {
  var player = new Player(req.body);
  player.save(function(err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

router.put('/players/:id/incrementwins', auth, function(req, res, next) {
  Player.findById(req.params.id, function(err, player) {
    player.incrementwins();
    if (err) {
      return next(err);
    }
    res.json(player);
  });
});

router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function(err) {
    if (err) {
      return next(err);
    }

    return res.json({
      token: user.generateJWT()
    })
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill out all fields'
    });
  }

  console.log('calling passport)');
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.json({
        token: user.generateJWT()
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
