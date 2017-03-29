var mongoose = require( 'mongoose' );
var Tasks = require('../models/tasks.model');
var Notifications = require('../models/notifications.model');
var io = require('socket.io');

 module.exports.addTask = function(req, res) {
 	console.log('in task controller');
 	var newTaskJson = {
 		"title" : req.body.title,
 		"description" : req.body.description,
 		"due_date"  : new Date(req.body.ddte),
 		"created_by" : req.body.createdby,
 		"assigned_to" : req.body.user,
 		"last_modified" : Date.now()
 	};
 	console.log('newTask :: ' + JSON.stringify(newTaskJson));
	var newTask = new Tasks(JSON.parse(JSON.stringify(newTaskJson)));
	newTask.save(function(err){
		if(err){
			return err;
		}
		res.status(200).send(newTask);
	});
}


module.exports.getTasks = function(req, res) {
 	Tasks.find({}).then(function(err, tasks){
 		if(err){
 			res.send(err);
 			return err;
 		}
 		if(tasks.length > 0){
 			res.send(tasks);
 		}
 		else
 			res.send("No Tasks Found.")
 	});
}


/*module.exports.updateTaskStatus = function(req, res) {
 	Tasks.findOne({"_id" : mongoose.Types.ObjectId(req.body._id)}, function(err, task){
 		if(err){
 			console.log(err);
 			//res.send(err);
 			return err;
 		}

 		if(task){
 			console.log(req.body.completed);
 			if(req.body.description) task.description = req.body.description;
 			if(req.body.duedate) task.due_date =  new Date(req.body.duedate);
 			if(req.body.completed != null){
 				task.last_modified = Date.now();
 				task.completed = req.body.completed;
 			}

 			task.save(function(err){
 				if(err) return err;
 				res.status(200).send(task._id);
 			});
 		}
 		else
 			res.status(403).send("No Tasks Found.");
 	});*/
 	  //send notification when task is completed.
/* 	 	if(task.completed == 'true'){

 		var newNotificationJson = {
 		"from_notification" : req.body.from_notification,
 		"to_notification" : req.body.to_notification,
 		"description"  : req.body.description
 	}
 	var newNotification = new Notifications(JSON.parse(JSON.stringify(newNotificationJson)));
	newNotification.save(function(err){
		if(err){
			return err;
		}
		socket.emit('notifactionEvent', newNotification);
		res.status(200).send(newNotification);
	});
}

}*/

module.exports.deleteTask = function(req, res) {
 	Tasks.remove({"_id" : mongoose.Types.ObjectId(req.query._id)}).then(function(err){
 		if(err){
 			res.send(err);
 			return err;
 		}
 		res.status(200).send(req.query._id);
     });
}


/*module.export.completeTask = function(req,res){
 io.on('connection', function(socket){
  console.log('A user connected');
  setTimeout(function(){
  socket.emit('notifactionEvent', {from_notification: from_notification, sent_to: sent_to, description : 'New Notification'});
	}, 4000);

}
}*/

//var socket = io();
//socket.on('notifactionEvent', function(data){document.write(data.description)});
				





module.exports.updateTaskStatus = function(req, res) {
 	Tasks.findOne({"_id" : mongoose.Types.ObjectId(req.body._id)}, function(err, task){
 		if(err){
 			console.log(err);
 			//res.send(err);
 			return err;
 		}

 		if(task){
 			console.log(req.body.completed);
 			if(req.body.description) task.description = req.body.description;
 			if(req.body.duedate) task.due_date =  new Date(req.body.duedate);
 			if(req.body.completed != null){
 				task.last_modified = Date.now();
 				task.completed = req.body.completed;
 			}

 			task.save(function(err){
 				if(err) return err;
 				res.status(200).send(task._id);
 				if(task.completed == 'true'){
					generateNotification(task.assigned_to,task.created_by,"completed task " + task.title);
			 	}
			 	else if(task.completed == 'false'){
					generateNotification(task.created_by,task.assigned_to,"reopened task " + task.title);
		       	}
 				});
 		} 
 		else
 			res.status(403).send("No Tasks Found.");

 			
 	});
 	
 	
 }





  //send notification when task was completed
  //generic function

  function generateNotification(from,to,text){
  	console.log("in generateNotification");
  	  try{

	var newNotification = new Notifications(JSON.parse(JSON.stringify(newNotificationJson)));
		newNotification.save(function(err){
		if(err){
				return err;
		}
			res.status(200).send(newNotification);
		}).then(socket.emit('notificationEvent', newNotification.text));
    }

	catch(err){
		console.error(err);
	}
}

