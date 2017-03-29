
var Users = require('../models/users');
var mongoose = require( 'mongoose' );
var db = require('../models/db');


 module.exports.getEmployees = function(req, res) {
  Users.find(
  	{'organization': 'Adnate'},
  	{ first_name: 1, last_name: 1,job_title : 1,email : 1, role : 1, name : 1, organization : 1, joining_date  : 1})
   .exec(function(err, user)
		{
		console.log(user);
		if(err){
			return err;
		}
		if(user){
			console.log('userfound');
			res.status(200).send(user);
		}
		if(!user){
			console.log('user not found');
		}
	});

 	}

