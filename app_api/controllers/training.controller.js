var mongoose = require( 'mongoose' );
var Trainings = require('../models/trainings.model');
var multer = require('multer');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var router = express.Router();
var fs = require('fs');
var jsonString = fs.readFileSync('D:\\HRMS\\config.json', 'utf8');
var configurationJson = JSON.parse(jsonString);
console.log(configurationJson);
console.log(configurationJson.uploadsPathDev+'\\task_attachment');

/*get TrainingCOurses*/

module.exports.getTrainingCourse = function(req, res) {
      //Trainings.find({$and:[{$ne:{"draft" : true,"active": true}}]}).then(function(err, trainings){
      	Trainings.find({"$or": [{"draft": {"$ne": false}},{"active": {"$ne": false}}]}).then(function(err, trainings){
 		if(err){
 			res.send(err);
 			return err;
 		}
 		if(tasks.length > 0){
 			res.send(trainings);
 			
 		}
 		else
 			res.send("No Courses Found.")
 	});
}

//17/3/2017
module.exports.addTrainingCourse = function(req, res) {
try{
   	var newTrainingJson = {
 		"category" : req.body.category,
 		"course_name" : req.body.coursename,
 		"course_description" : req.body.desc,
 		//"Prerequisites" : [req.body.prereq],
 		"Prerequisites" : [],
 		"draft" : req.body.draft,
 		"active" : req.body.active,
 		"overall_duration" : ''
 	};
    newTrainingJson.task_list = [];
     	if(req.body.task_list != null){
    var total_value_hrs = 0;
    for(var i = 0;i<req.body.task_list.length;i++){
	    newTrainingJson.task_list.push({
	        "module_name" : req.body.task_list[i].name,
	        "module_summary" : req.body.task_list[i].summary,
	        "duration" : {
	        	"value" : req.body.task_list[i].duration.value,
	        	"unit" : req.body.task_list[i].duration.unit
	        },
	        //"content" : []
	        	"content_type" : req.body.task_list[i].conttype,
	            "content_data" : req.body.task_list[i].contdata
	    });
	       /* for(var j=0;j<req.body.task_list[i].content.length;j++){
	        	newTrainingJson.task_list[i].content.push({
	        	"content_type" : req.body.task_list[i].content[j].conttype,
	            "content_data" : req.body.task_list[i].content[j].contdata,
	            "content_name" : req.body.task_list[i].content[j].contname
	        });
	        }*/
	    var curr_value = newTrainingJson.task_list[i].duration.value;
	    var curr_unit = newTrainingJson.task_list[i].duration.unit;
	   if(curr_unit.toLowerCase() == 'days'){               //checking hours or days
	     total_value_hrs += parseFloat(curr_value) *24;   //if days convert to hours
	   }
	   if(curr_unit.toLowerCase() == 'weeks'){
	   	 total_value_hrs += parseFloat(curr_value) *24 * 7;
	   }
	   if(curr_unit.toLowerCase() == 'hours'){
	   	 total_value_hrs += parseFloat(curr_value);
	   } 
    }
}
   if(req.body.prereq != null){
   if(req.body.prereq.length != 0){
 			//newTrainingJson.Prerequisites = [req.body.prereq]
 			 newTrainingJson.Prerequisites = req.body.prereq;
 		}
	 	}

    newTrainingJson.overall_duration = total_value_hrs;
   
	var newTraining = new Trainings(JSON.parse(JSON.stringify(newTrainingJson)));
	console.log('newTraining :: ' + JSON.stringify(newTrainingJson));


	newTraining.save(function(err){
		if(err){
			res.status(500).send(err);
			console.log(err.errmsg);
			return err;		
		}
		res.status(200).send(newTraining);

	
	});

}

catch (err) {
    // handle the error safely
    console.log(err)
}
}





//get all categories
module.exports.getAllCategories = function(req,res){

 	Trainings.distinct("category",function(err,training)
 	{
 		console.log(training);
 		if(err){
 			return err;
 		}
 		if(training){
 			console.log('categories found');
 			res.status(200).send(training);
 		}
 		if(!training){
 			console.log('No categories found');
 		}
 	});
 


}


/*latest update training */


module.exports.updateTrainingCourse = function(req, res) {
	try{

 	Trainings.findOne({"_id" : mongoose.Types.ObjectId(req.body._id)}, function(err, training){
 		if(err){
 			console.log(err);
			return err;
 		}

 		if(training){
 	 	    if(req.body.category != null) training.category = req.body.category;

 			if(req.body.coursename != null) training.course_name = req.body.coursename;
 		       console.log(req.body.coursename);
 			if(req.body.desc != null) training.course_description = req.body.desc;
 			if(req.body.prereq != null){
 					console.log(req.body.prereq.length);
               if(req.body.prereq.length && req.body.prereq.length > 0){
 				training.Prerequisites = req.body.prereq;
 			    }
 		    }
              if(req.body.draft != null)training.draft =req.body.draft;
              if(req.body.active != null)training.active =req.body.active; 
 			
           //training.overall_duration = total_value_hrs1;
 			training.save(function(err){
 				if(err) return err;
 				res.status(200).send(training._id);
 			});
 		}
 		else
 			res.status(403).send("No Courses Found.");
 	});
}
catch(err){
	console.log(err);
}
}


/* delete courses */
module.exports.deleteTrainingCourse = function(req, res) {
	////will be changed as we need to soft delete only
 /*	Trainings.remove({"_id" : mongoose.Types.ObjectId(req.query._id)}).then(function(err){
 		if(err){
 			res.send(err);
 			return err;
 		}
 		res.status(200).send(req.query._id);
     });*/
Trainings.update({'_id': mongoose.Types.ObjectId(req.query._id)}, { $set: { "draft" : false ,"active" : false} }).then(function(err){
	if(err){
 			res.send(err);
 			return err;
 		}
 		res.status(200).send(req.query._id);
     });
//deleted : true;
}

module.exports.deleteLessons = function(req, res) {
/*Trainings.update({"_id" : mongoose.Types.ObjectId(req.query._id),"task_list._id" : mongoose.Types.ObjectId(req.query.lessonid)}, {$unset: {"task_list.$._id":1,"task_list.$.module_name":1,"task_list.$.module_summary":1,"task_list.$.content_type":1,"task_list.$.content_data":1,"task_list.$.duration":1}}).then(function(err){
	if(err){
		res.send(err);
		return err;
	}
	res.status(200).send(req.query._id);
});*/

Trainings.update(
    {'_id': mongoose.Types.ObjectId(req.query._id)}, 
    { $pull: { "task_list" : { _id: mongoose.Types.ObjectId(req.query.lessonid) } } }).then(function(err){ //$pull:remove object from array           	
    	if(err){
    		res.send(err);
    		console.error(err);
    		return err;
    	}
    res.status(200).send(req.query._id);	
    });
	
}

	



                                                                                                  
 // file filter
/* function fileFilter (req, file, cb){
  var type = file.mimetype;
  var typeArray = type.split("/");
  if (typeArray[0] == configurationJson.fileType) {
    cb(null, true);
  }else {
    cb(null, false);
  }
}*/

module.exports.customUploadRouter = function(subfolder){
	return function(req,res){
		console.log("upload req"+JSON.stringify(req.body));
		 	try{
 		/*upload a file into a server*/
var storage =   multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, configurationJson.uploadsPathDev+'\\' +subfolder+ '\\');
	    
	  },
	  filename: function (req, file, callback) {
	  callback(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
	  //callback(null, Date.now() + file.originalname);
	/*   crypto.pseudoRandomBytes(16, function (err, raw) {
      callback(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });*/
	  }
	});
	console.log('in upload');
	var uploader = multer({ storage : storage}).single('file');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});  
	 //var type = req.file.mimetype;
     //if (type == configurationJson.fileType) {
	uploader(req,res,function(err) {
        if(err) {
        	console.log(err);
            return res.status(500).end("Error");
        }
        //res.end("File is uploaded");
        console.log(JSON.stringify(req.file));
        //res.send("filename :"+ req.file.originalname+","+"filepath :"+ req.file.path+","+"filesize :"+ req.file.size);
        res.send("filepath :"+ req.file.path);
        //res.send(req.file);
        //res.json({"msg" : "OK"});
    });
//}
	//});
}
catch(err){
	console.log(err);
}
	}
}

 // testing





/*get lesson by id*/
module.exports.getCourseByID = function(req, res) {
 	Trainings.find({"_id":mongoose.Types.ObjectId(req.query._id)}).then(function(err, trainings){
 		//Trainings.find({'_id': mongoose.Types.ObjectId(req.query._id)},{_id: 0,task_list: {$elemMatch: {module_name: req.query.modulename }}}).then(function(err, training){
 		if(err){
 			res.send(err);
 			return err;
 		}
 		 res.status(200).send(req.query._id);	
 	});
}






module.exports.updateLesson = function(req,res){
Trainings.update({"_id" :mongoose.Types.ObjectId(req.body._id), "task_list._id" : mongoose.Types.ObjectId(req.body.taskid)},
{ $set : {"task_list.$.module_summary" : req.body.modulesummary,"task_list.$.module_name" :req.body.modulename,"task_list.$.content_type" :req.body.conttype,"task_list.$.content_data" :req.body.contdata,"task_list.$.duration.value" :req.body.value,"task_list.$.duration.unit" :req.body.unit}},function(err,updated){
	if(err){
		return err;
	}
	res.status(200).send("Updated Sucessfully");
});
}

module.exports.addLesson = function(req,res){
Trainings.update({"_id" :mongoose.Types.ObjectId(req.body._id)},
{$push: {task_list :  {"module_name":req.body.modulename,"module_summary":req.body.modulesummary,"content_type":req.body.conttype,"content_data":req.body.contdata,"duration":{"value":req.body.duration.value,"unit":req.body.duration.unit}}}},function(err,inserted){
	if(err){
		return err;
	}
	res.status(200).send("Inserted Sucessfully");
});

}

//lesson order
module.exports.lessonOrder = function(req, res) {

 	Trainings.findOne({"_id" :mongoose.Types.ObjectId(req.body._id)},function(err, training){
      
 		if(err){
 			console.error("error :"+err);
 			res.send(err);
 			return err;
 		}
 		if(training){
 		//console.log("result :"+ training);
 		var db_task = training.task_list.length;
 		console.log("db_task result :"+ db_task);
 		training.task_list= req.body.task_list;
 		var client_task = req.body.task_list.length;
 		console.log("client_task result:"+ client_task);

 		for(var i=0;i<client_task.length;i++){
 			for(var j=0;j<db_list.length;j++){
        if(req.body.task_list[i]._id == training.task_list[j]._id){
        	training.task_list.splice(i,0,training.task_list[j]._id);
        	  
        	 break;
        }
       
 		}
 	}
         //console.log("ordered lesson :"+ training.task_list);
         training.save(function(err){
 				if(err) return err;
 				res.status(200).send(training._id);
 			});
 		}
 		else
 			res.status(403).send("Unable to order");

 		 //res.status(200).send("sucess");	

 	});
}


