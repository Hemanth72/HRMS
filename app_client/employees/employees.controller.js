(function() {
  
  angular
    .module('HRMS')
    .controller('EmployeesController', EmployeesController);
  EmployeesController.$inject = ['$http','$scope','$state','$mdPanel','$mdDateLocale','SharedService'];
  function EmployeesController ($http,$scope,$state,$mdPanel,$mdDateLocale,SharedService) {
  $scope.class = "btn-group";
  var _this = this;
  $scope.val=false;
  $scope.grid=false;
$scope.list=true;
$scope.orderList="name";
var xyz=SharedService;
$mdDateLocale.formatDate = function(date) {
    return date ? moment(date).format('DD-MM-YYYY'):'';
  };
  $mdDateLocale.parseDate = function(dateString) {
  var m = moment(dateString, 'DD-MM-YYYY', true);
  return m.isValid() ? m.toDate() : new Date(NaN);
};

$scope._mdPanel = $mdPanel;
  $scope.btndesc="Name";
  $scope.groupList="name.charAt(0)";
var ip="http://192.168.100.16:1337/users/";
  var req = {
method: 'GET',
url: ip+ 'getEmployees',
headers: {
 'Content-Type': 'application/json; charset=UTF-8'

},
data: {}
}
debugger;
$http(req).success(function(data) {

 debugger;
 $scope.users=data;
 
});
var req1={
method: 'GET',
url: ip+ 'getSupervisors',
headers: {
 'Content-Type': 'application/json; charset=UTF-8'

},
data: {}
}

$http(req1).success(function(data) {

 debugger;
 $scope.reportingManagers=data;
 
});

$scope.getUserDetails=function(user)
{
  debugger;
  xyz.useremail=user.email;
  $state.go('hrms.employeedetails');
}
$scope.redefine=function(val)
{
  debugger;
  if(val.split("-").length>1)
  {
return moment(val).format('MMM DD,YYYY');
  }
  else
  {
    return val;
  }
}

  $scope.changeval=function(val)
  {
    debugger;
 $scope.btndesc=val;
 $scope.class = "btn-group";
 if(val=='Date Of Joining')
 {
  $scope.orderList="joining_date";
  $scope.groupList="joining_date";
  //moment(doj).format('MMM DD,YYYY')
 }
 else if(val=='Name')
 {
$scope.orderList="name";
$scope.groupList="name.charAt(0)";
 }
 else if(val=='Job Title')
 {
  $scope.orderList="job_title";
  $scope.groupList="job_title";
 }
  }
  //$scope.users=[{'name':'Gayatri Prabhudesai','job_title':'Consultant','doj':'2017-03-01T07:19:10.000Z'},{'name':'Srikrishna Paliwal','job_title':'Associate Consultant','doj':'2017-03-02T07:19:10.000Z'},{'name':'Pavitra Rastogi','job_title':'Consultant','doj':'2017-03-03T07:19:10.000Z'},{'name':'Gaurav Gupta','job_title':'BDM','doj':'2017-03-04T07:19:10.000Z'}];
  $scope.gridclass=function()
  {
//$('#container ul').removeClass('list').addClass('grid');
$scope.grid=true;
$scope.list=false;
  }
  $scope.listclass=function()
  {
  	 //$('#container ul').removeClass('grid').addClass('list');
  	 $scope.grid=false;
$scope.list=true;
  }
  $scope.splitfun=function(val)
  {
  	return val.replace(/[^A-Z]/g, '');
    //return (val1.charAt(0)+val2.charAt(0));
  }
  $scope.changeClass = function(){
    if ($scope.class === "btn-group")
    {
      $scope.class = "btn-group open";
    
  $scope.val=true;
  }
    else
    {
      $scope.class = "btn-group";
   
  $scope.val=false;
   }
  };
  $scope.saveBoardData=function(form)
  {
    
    debugger;
    if(form.$valid)
    {
      debugger;
       $scope.errorform=false;
       /*var dateval = ("0" + $scope.joindate.getDate()).slice(-2);
            var monthval = ("0" + ($scope.joindate.getMonth() + 1)).slice(-2);
            var jdate=$scope.joindate.getFullYear()+ "-" + monthval + "-" +dateval;*/
            var jdate=$scope.joindate.toISOString();
      var req = {
method: 'POST',
url: ip+ 'onBoarding',
headers: {
 'Content-Type': 'application/json; charset=UTF-8'

},
data: {'fname':$scope.fname,'lname':$scope.lname,'jtitle':$scope.jobtitle,'email':$scope.email,'joining_date':jdate,'reporting_to':$scope.empmanager,'employee_type':$scope.emptype}
}
debugger;
$http(req).success(function(data) {

 debugger;
 $scope.dupemail=false;
 $scope.closeDialog();
 
})
.error(function(data, status, headers, config) {
    if(status == 400)
    {
         $scope.dupemail=true;
    }
    
});

      
    }
    else
    {
      $scope.errorform=true;
       
    }
    
  }
$scope.closeDialog=function()
{
  debugger;
	 $scope._panelRef && $scope._panelRef.close().then(function() {
        angular.element(document.querySelector('.demo-dialog-open-button')).focus();
        $scope._panelRef.destroy();
       
      });
}
// $scope.reportingManagers=[{"_id":"58b7e3e7edbefd04c89a98cb","name":"Pavitra Rastogi","job_title":"Consultant","email":"pavitra.rastogi@adnatesolutions.com"},{"_id":"58b7f1d60abd43120ce505ae","name":"Archana Sharma","job_title":"Associate Consultant","email":"archana.sharma@adnatesolutions.com"},{"_id":"58b7f2ba0abd43120ce505af","name":"Sumedha Rapkal","job_title":"Associate Consultant","email":"sumedha.rapkal@adnatesolutions.com"},{"_id":"58b7f4c70abd43120ce505b0","name":"Trupti Kaskar","job_title":"HR","email":"trupti.kaskar@adnatesolutions.com"},{"_id":"58b7f5ac862101164c5960cb","name":"Dipti Kulkarni","job_title":"Associate Consultant","email":"dipti.kulkarni@adnatesolutions.com"}];
  $scope.addEmployee=function()
  {
  	var position = $scope._mdPanel.newPanelPosition()
     .absolute()
     .center();


  

 var config = {
   attachTo: angular.element(document.body),
   controller: function(mdPanelRef){  debugger;
     $scope._mdPanelRef = mdPanelRef;
     $scope.dupemail=false;
     $scope.errorform=false;
     $scope.fname="";
     $scope.lname="";
     $scope.jobtitle="";
      $scope.email="";
     $scope.joindate=null;

     return $scope;
   },
   controllerAs: 'ctrl',
   disableParentScroll: $scope.disableParentScroll,
   templateUrl: 'employees/onboard.html',
   hasBackdrop: true,
       //panelClass: 'demo-menu-example',
    
   position: position,
   trapFocus: true,

   zIndex: 150,
   clickOutsideToClose: true,
   escapeToClose: true,
   focusOnOpen: true
 };

 $scope._panelRef = $scope._mdPanel.create(config);
 
 $scope._panelRef.open();
  }

  }

 })();
  
  	