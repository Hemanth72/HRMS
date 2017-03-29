var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var routes = require('./app_api/routes/index');
var users = require('./app_api/routes/users');
var multer = require('multer');
var app = express();
var http = require('http');
var fs = require('fs');
var jsonString = fs.readFileSync('D:\\HRMS\\config.json', 'utf8');
var configurationJson = JSON.parse(jsonString);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set env variables for credentials logging
process.env.HOME = 'home';

require('./app_api/config/auth');
//require('./app_api/config/passport')(passport);
require('./app_api/config/passport');
require('./app_api/models/db');
app.use(passport.initialize());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.resolve('\\..\\HRMS_Uploads\\' + '\\task_attachment\\')));
app.use(express.static(path.resolve(configurationJson.uploadsPathDev + configurationJson.taskAttachmentpPath)));
app.use(express.static(path.resolve(configurationJson.uploadsPathDev + configurationJson.mtlAttachPath)));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use('/pFactory', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(1337);
//console.log('Server running at http://127.0.0.1:1337/ ... :)');


module.exports = app;
//TESTING GITHUB PULL
