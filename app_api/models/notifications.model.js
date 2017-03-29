
var mongoose = require( 'mongoose' );
var crypto = require('crypto');
//var jwt = require('jsonwebtoken');

var notificationSchema = new mongoose.Schema({
  from : {
    type: String,
  },
  to : {
	  type : String
  },
  text : {
    type : String
  }
  
});

module.exports = mongoose.model('Notification', notificationSchema, 'notifications');