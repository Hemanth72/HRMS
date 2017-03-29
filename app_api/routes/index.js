var express = require('express');
var router = express.Router();
var Txns = require('../models/txns');
var Users = require('../models/users');
var multer = require('multer');
require('../config/passport');
var _ = require('underscore');
var mongoose = require( 'mongoose' );
var passport = require('passport');
var fs = require('fs');
var path = require('path');

//var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlMail = require('../controllers/mailer');
// profile
//router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
//multer

/*var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, 'D:/HRMS/uploads/');
	  },
	  filename: function (req, file, callback) {
	    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	  }
	});
	var upload = multer({ storage : storage}).single('file');
	//var upload = multer({ storage : storage }).array('userPhoto',2);
 //GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/abcd', function(req,res){
	console.log(req.body.hemanth);
	res.send('Hi Hemanth');
});






router.post('/upload', function(req, res) {
	console.log('in upload');
	upload(req,res,function(err) {
        if(err) {
        	console.log(err);
            return res.end("Error");
        }
        //res.end("File is uploaded");
        console.log(JSON.stringify(req.file));
        res.send(req.file);
    });
	});*/

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//the callback after google has authenticated the user
router.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
        }));












module.exports = router; 





























