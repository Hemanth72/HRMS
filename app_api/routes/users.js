var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* get all employee details */
var ctrlOnboard = require('../controllers/onBoarding.controller');
router.get('/getEmployees', ctrlOnboard.getEmployees);

/* add task */
var ctrlTask = require('../controllers/task.controller');
router.post('/addTask', ctrlTask.addTask);


/* get all tasks */
router.get('/getTasks', ctrlTask.getTasks);


/* update task */
router.post('/updateTaskStatus', ctrlTask.updateTaskStatus);


/* delete tasks */
router.get('/deleteTask', ctrlTask.deleteTask);

/*complete task */
/*router.post('/completeTask', ctrlTask.completeTask);*/

/*add training*/
var ctrlTraining = require('../controllers/training.controller');
router.post('/addTrainingCourse', ctrlTraining.addTrainingCourse);

/*get TrainingCourse*/
router.get('/getTrainingCourse', ctrlTraining.getTrainingCourse);

/*update courses*/
router.post('/updateTrainingCourse', ctrlTraining.updateTrainingCourse);

/*get all categories*/

router.get('/getAllCategories', ctrlTraining.getAllCategories);

/*delete training course*/
router.get('/deleteTrainingCourse', ctrlTraining.deleteTrainingCourse);
/*delete specific lessons*/
router.get('/deleteLessons', ctrlTraining.deleteLessons);

/*update Lesson*/
router.post('/updateLesson', ctrlTraining.updateLesson);
/*add Lesson*/
router.post('/addLesson', ctrlTraining.addLesson);
/*upload a file into a a server*/
//router.post('/upload', ctrlTraining.upload);

router.post('/taskUpload', ctrlTraining.customUploadRouter('task_attachment'));
/*upload file to material folder*/
router.post('/materialUpload', ctrlTraining.customUploadRouter('Material'));
/*get lesson by id*/
router.get('/getCourseByID', ctrlTraining.getCourseByID);
/*lesson order*/
router.post('/lessonOrder', ctrlTraining.lessonOrder);


/*log in to timesheet*/
var ctrlTimeSheet = require('../controllers/timeSheet.controller');
router.post('/logInToTimeSheet', ctrlTimeSheet.logInToTimeSheet);

module.exports = router;

