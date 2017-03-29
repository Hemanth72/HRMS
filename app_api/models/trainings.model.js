var mongoose = require( 'mongoose' );
var crypto = require('crypto');


/*var trainingSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  code : {
	  type : String
  },
  task_list :[
  { 
    caption : String,
    duration : { value:Number , unit:String },
    content_type : String,
    content_link : String
  }
  ],

  overall_duration :{
     type: Number
  }
});
*/

var trainingSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  course_name : {
    type : String , unique: true ,  index: true
  },
  course_description : {
     type : String
  },
  Prerequisites :[{type: String}],

  //active : Boolean,
  active : { type : Boolean},
  draft : { type : Boolean},
  //draft : Boolean,


  task_list :[

  { 
    module_name : {type:String,unique: false},
    module_summary : String,
    duration : { value:Number , unit:String },
     content_type : String,
    content_data : String
   /* content:[{
      content_type : String,
      content_data : String,
      content_name : String
    }]*/
    
  }
  ],

  overall_duration :{
     type: Number
  }
});


module.exports = mongoose.model('Training', trainingSchema, 'trainings');