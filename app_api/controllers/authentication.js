var passport = require('passport');
var mongoose = require('mongoose');
//var User = mongoose.model('User');
var User = require('../models/users');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var ctrlMail = require('../controllers/mailer');

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var userToken = ctrlMail.generateToken();

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.organization = req.body.organization;
  user.token = userToken;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if(err){
      res.status(400).send(err);
      return err;
    }
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
    var mailOptions = {
      from: 'pavitra.rastogi@adnatesolutions.com', // sender address
      to: user.email, // list of receivers
      subject: 'Welcome to Process Factory', // Subject line
      text: 'Verify Mail', // plaintext body
      html: '<a href="http://localhost:1337/pFactory/verifyMail/'+userToken.item+'">Please click here to verify your email address</a><p>Your link will expire in 6 hours.</p>' // html body
  };
    ctrlMail.sendMail(mailOptions);
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      console.log('passport error');
      res.status(404).json('passport err: ' + err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};