var mongoose = require( 'mongoose' );
var crypto = require('crypto');
//var jwt = require('jsonwebtoken');

var taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description : {
	  type : String
  },
  due_date : {
    type : Date
  },

  created_by :{
     type: String
  },
  assigned_to : {type : String},
  completed : { type : Boolean, default : false},
  last_modified : {
    type: Date
  }
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');
