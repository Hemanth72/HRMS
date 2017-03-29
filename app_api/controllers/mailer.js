var passport = require('passport');
var mongoose = require('mongoose');
//var User = mongoose.model('User');
var User = require('../models/users');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



var nodemailer = require('nodemailer');


module.exports.sendMail = function(mailOptions){
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://pavitra.rastogi%40adnatesolutions.com:Sodrivehome@smtp.gmail.com');

  /*// setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
      to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world 🐴', // plaintext body
      html: '<b>Hello world 🐴</b>' // html body
  };*/

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};

module.exports.generateToken = function(){
  //create random 16 character token
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var token = '';
      for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
      }
   
  // create expiration date
  var expires = new Date();
  expires.setHours(expires.getHours() + 6);
   
  return {'item' : token, 'expires' : expires};
};