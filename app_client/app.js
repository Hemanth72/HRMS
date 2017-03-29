
var app = angular.module('HRMS', ['ui.router','ngAvatar','ngRoute','ngMaterial','datatables','ngResource','ngMessages', 'datatables.buttons','ng-breadcrumbs','angular.filter','angularTrix','angular-timeline']);
app.config(function($routeProvider,$stateProvider) {
  $stateProvider

 .state('home', {
 	url: '/',
    templateUrl : 'home/home.html',
    controller  : 'HomeController'
     
  })
   .state('hrms', {
   	url: '/hrms',
    templateUrl : 'hrms/hrms.html',
    controller  : 'hrmsController'
     
  })
   .state('hrms.overview', {
 	url: '/overview',
    templateUrl : 'hrms/overview.html'
    
     
  })
    .state('hrms.employees', {
 	url: '/employees',
    templateUrl : 'employees/employees.html',
    controller  : 'EmployeesController'
     
  })
     .state('hrms.employeedetails', {
  url: '/employees/employeedetails',
    templateUrl : 'empdetails/details.html',
    controller  : 'EmployeeDetailsController'
     
  })
      .state('hrms.tasks', {
  url: '/tasks',
    templateUrl : 'hrms/tasks/tasks.html',
    controller  : 'TasksController'
     
  })

    .state('hrms.training', {
    url: '/training',
    templateUrl : 'training/training.html',
    controller  : 'TrainingController'
     
  })


   .state('hrms.managetraining', {
    url: '/training',
    templateUrl : 'training/manageTraining/managetraining.html',
    controller  : 'TrainingController'
     
  })
    ;




  $routeProvider.otherwise({redirectTo: '/'});
});
app.filter('friendlyDate1', function() {
     return function(date) {
       return moment(date).format('MMM DD,YYYY');
}
});
