var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var timesheetSchema = new mongoose.Schema({
email : { 
	type:String,primaryKey: true
},
datestr : String,
daily_tasks : [
{
	date : Number,
	//tasks : [{type:String}]
	tasks : [{
		_id:0,
		label:String,
		hours:String
	}]
}
],
for_month : {
	year : String,
	month : String
}


	});
module.exports = mongoose.model('TimeSheet', timesheetSchema, 'timesheets');