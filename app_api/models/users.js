var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  userId : {
	  String
  },
  roles : [{ 
    domain : String,
    role : String
  }],
  mailVerified: {
    type: String,
    default: 'N'
  },
  token: {
    item: String,
    expires: Date
  },
  resetToken : {
    item: String,
    expires: Date
  },
  google : {
	  id : String,
	  token: String,
	  name: String,
	  email: String
  },
   first_name: {
    type: String,
    required: true
  },
   last_name: {
    type: String,
    required: true
  },
   job_title: {
    type: String,
    required: true
  },
    joining_date: {
      type: Date
    },
  txns : [{ 
	  txn :  {type : mongoose.Schema.Types.ObjectId, ref: 'txns'},
	  c_x : Number,
	  c_y : Number,
	  s_x : Number,
	  s_y : Number,
	  noOfHits : Number,
	  favor : Boolean
  }],
  userConfig : {type : Boolean, default : false}
});


userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);
