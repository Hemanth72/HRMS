var mongoose = require( 'mongoose' );
var Timesheets = require('../models/timesheets.model');
var bodyParser = require('body-parser');

//add timesheet
module.exports.logInToTimeSheet = function(req, res) {

	console.log('in timesheet controller');
	var monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
	];	
	var dateMatchFlag = false;
	var x = new Date(Date.now());
	var b= x.toString();
 	var a = b.split(' ')[0];//it gives day
 	var y = x.getFullYear();
 	var z = x.getMonth();
 	console.log("year :" + y );
 	console.log("day :" + a );
 	try{
 		Timesheets.findOne({ for_month:{year: y.toString() ,month: monthNames[z]},email: req.body.email},function(err, docs){
 			console.log(JSON.stringify(req.body.email));
 			console.log(JSON.stringify(y.toString()));
	//console.log(docs);
	if(err){
		console.log(err);
		return err;
	}
	if(!docs){
		console.log("check inside");
		var newTimeSheetJson = {
			"email" : req.body.email,
			"datestr" : req.body.datestr,
			"for_month" : {
				"year" : y,
				"month" : monthNames[z]
			}
		};
		var dateObj = new Date(req.body.datestr);
		var date = dateObj.getDate();
		console.log("date :"+ date)
		newTimeSheetJson.daily_tasks = [];
		for(var i = 0;i<req.body.daily_tasks.length;i++){
			newTimeSheetJson.daily_tasks.push({
				"date" : date,
				"tasks" : req.body.daily_tasks[i].tasks
			});
		}
		console.log('newTimeSheet :: ' + JSON.stringify(newTimeSheetJson));
		var newTimeSheet = new Timesheets(JSON.parse(JSON.stringify(newTimeSheetJson)));
		newTimeSheet.save(function(err){
			if(err){
				return err;
			}
			res.status(200).send(newTimeSheet);
		});
	}
	if(docs){

	//var stringify = JSON.stringify(docs);
	var t = docs;
	console.log(t);
	console.log("dt length"+t.daily_tasks);
	console.log(t.daily_tasks[0].date);
	var dateObj1 = new Date(req.body.datestr);
	var date1 = dateObj1.getDate();
	console.log("todaydate:"+date1);
	for(var j=0;j<t.daily_tasks.length;j++){
	//for (var j = t.daily_tasks.length ; j >= 0 ; j--) {
		if(t.daily_tasks[j].date == date1){
			console.log("if date match");
			dateMatchFlag = true;
		/*Timesheets.findOne({"email": req.body.email,"daily_tasks.date":date1}, function(err,result) {
				console.log("result"+result);
				if (err){
					return err;
				}
				if(result){
					result.daily_tasks.tasks = req.body.tasks;
					result.save(function(err){
						if(err) return err;
						dateMatchFlag = true;
						res.status(200).send(result._id);
					});
				}else
				res.status(403).send("Not Found.");db.nested.findOne({"level1":{"$elemMatch":{"$in":['item00']}} })
			});*/
 //Timesheets.findOne({"email": req.body.email,"daily_tasks":{"elemMatch":{"$in":{date:date1}}}}, function(err,result) {
 	//Timesheets.aggregate({"$match": {"$daily_tasks.date" : "date1"}}, function(err,result) {

					Timesheets.update({"email":req.body.email,"daily_tasks.date": date1},{ $addToSet:{'daily_tasks.$.tasks': {$each : req.body.daily_tasks[0].tasks}} },function(err,updated){
						//{daily_tasks:{date: date1,_id: mongoose.Types.ObjectId(req.query.taskid) }} 
						if(err) {
							console.error(err);
							return err
						};
						console.log("updatedresult :"+JSON.stringify(updated));

						res.status(200).json(updated);

				        });

					
    
		}
	}
	if(!dateMatchFlag){
		console.log("date not match")
		console.log(req.body.daily_tasks[0].tasks);
		Timesheets.update({email: req.body.email}, {$push: {daily_tasks :  {"date":date1,"tasks": req.body.daily_tasks[0].tasks}}}, function(err,result) {
			if (err){
				return err;
			}
			res.status(200).send(result); 
		});

	}
}

});
}
catch(err){
	console.log(err);
}


}



