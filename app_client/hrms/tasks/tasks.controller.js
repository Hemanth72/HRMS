(function() {
  
  angular
    .module('HRMS')
    .controller('TasksController', ['$http','$scope', '$mdToast', '$mdDialog',
   
 /*TasksController.$inject = ['$http','$scope','$state'];
  function TasksController ($http,$scope,$state) {
*/ 
    	function($http, $scope, $mdToast, $mdDialog){
	//		$scope.breadcrumbs = breadcrumbs;
			var ip_hemanth="http://192.168.100.8:1339/";
      var ip_pavitra="http://192.168.100.16:1337/";
 $scope.addCard=false;
$scope.add=false;
$scope.edit=false;
$scope.addTask={};
$scope.logged_user="Shrikrishna Paliwal";
$scope.selected=[];

//$scope._mdPanel = $mdPanel;
$scope.addTasks=function(choice, dat){
    debugger;
    if(choice=="add"){$scope.add=true;$scope.edit=false;$scope.addTask=[];}
    else if(choice=="edit"){
      $scope.edit=true;$scope.add=false;
      $scope.addTask._id=dat._id;
        $scope.addTask.title=dat.title;
        $scope.addTask.assigned_to=dat.assigned_to;

/*
function convertISO8601toDate(dtstr) {
debugger;
  // replace anything but numbers by spaces
  dtstr = dtstr.replace(/\D/g," ");

  // trim any hanging white space
  dtstr = dtstr.replace(/\s+$/,"");

  // split on space
  var dtcomps = dtstr.split(" ");

  // not all ISO 8601 dates can convert, as is
  // unless month and date specified, invalid
  if (dtcomps.length < 3) return "invalid date";
  // if time not provided, set to zero
  if (dtcomps.length < 4) {
    dtcomps[3] = 0;
    dtcomps[4] = 0;
    dtcomps[5] = 0;
  }

  // modify month between 1 based ISO 8601 and zero based Date
  dtcomps[1]--;

  var convdt = new
Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));

  return convdt;
}*/

           $scope.addTask.due_date=new Date(dat.due_date);
      $scope.addTask.created_by=$scope.logged_user;
      $scope.addTask.description=dat.description;

      }
      else{}

    $scope.addCard=true;
  }
  $scope.closeAdd=function(){
    debugger;
    $scope.addCard=false;
  }

  $scope.tasks=[];
 $scope.getTasks = function ()
        {
            $http.get(ip_hemanth+'users/getTasks').success(function (data)
            {
              debugger;
                $scope.tasks = data;
            });
        }

  $scope.delObj={};
$scope.deletebox=function(data){  debugger;
  $mdDialog.show({
    controller:function(){
      $scope.params={};
      $scope.params.id=data._id;
      return $scope;
    },
    controllerAs:'ctrld',
    templateUrl:'hrms/tasks/deletetaskDialog.tmpl.html',
    parent: angular.element(document.body),

    clickOutsideToClose:true
  });
 
}


$scope.sameecord=function(ch,da){  debugger;
  $mdDialog.hide();
 /* if(ch=='incomplete'){
     //document.getElementById("checkbox").checked = false;
    //$scope.w.checked=false;  
    //da.completed=false;
    }
  else{ debugger;
   //document.getElementById("checkbox1").checked = true;
   // $scope.v=true;
   // $scope.v.checked=false;
    }*/
    $scope.getTasks();

}

$scope.delID;
$scope.deleteTasks = function (delObj)
        { debugger;
           $scope.delID = delObj.id;
        
           var req = {
           method: 'GET',
          url: ip_hemanth+ 'users/deleteTask?_id='+$scope.delID,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        //  data: { '_id': $scope.delID}
}
debugger;
$http(req).success(function(data) {
 debugger;
 // $scope.selected=[];
 $mdDialog.hide();
 $scope.getTasks();
});

   // $scope.showSimpleToast("delete");     
    
  }
  //$scope.completedTasksTempArray=[];
$scope.taskCompleted=function(data){
  debugger;
 // $scope.completedTasksTempArray=data;
  $mdDialog.show({
    controller:function(){
      $scope.params={};
      $scope.params=data;
      return $scope;
    },
    controllerAs:'ctrld',
    templateUrl:'hrms/tasks/completetaskDialog.tmpl.html',
    parent: angular.element(document.body),

    clickOutsideToClose:true
  });
 
}


$scope.employees=[];
 $scope.getEmployees = function ()
        { debugger;
            $http.get(ip_pavitra+'users/getEmployees').success(function (data)
            {
              debugger;
                $scope.employees = data;
            });
        }


$scope.showSimpleToast = function(choice) {
    var pinTo = $scope.getToastPosition();
    if(choice=="add"){
      var toast= $mdToast.simple()
        .textContent('New Task has been created!')
        .action('Close')
        .highlightAction(true)
       
        .position(pinTo )
        .hideDelay(3000)
       ;

      $mdToast.show(toast).then(function(response) {
      if ( response == 'close' ) {
        $mdToast.hide();
      }
    });
     
      
    }
    else if(choice=="edit"){
      var toast= $mdToast.simple()
        .textContent('Task has been updated!')
        .action('Close')
        .highlightAction(true)
       
        .position(pinTo )
        .hideDelay(3000)
       ;
      $mdToast.show(toast).then(function(response) {
      if ( response == 'close' ) {
        $mdToast.hide();
      }
    });
    }
   /*  else if(choice=="delete"){

      $mdToast.show(
      $mdToast.simple()
        .textContent('Task has been deleted!')
        .position(pinTo )
        .hideDelay(2000)
      );
    }*/
    else{}
  };
  $scope.toastPosition={right:true,top:true};
  $scope.getToastPosition = function() {
    var current = $scope.toastPosition;

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

/* var socket = io();
socket.on('notifactionEvent', function(data){document.write(data.description)});
*/

 $scope.saveTask = function (choice, d)
        {
          debugger;
          var dat=[];
          dat=d;
    
 

  debugger;

  if(choice=="add"){
    var addData={
      'title':dat.title,
      'description':dat.description,
      'ddte':dat.due_date,
      'createdby':$scope.logged_user,
      'user': dat.assigned_to,
    };
    var req = { 
      method: 'POST',
      url: ip_hemanth+"users/addTask",
      data:addData,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }
  }
  else{
    if(choice=="edit"){
      var editData={
        '_id':dat._id,
        'description':dat.description,
        'duedate':dat.due_date,
      };
    }
    else if(choice=="taskComplete"){
      if(dat.completed==true)
        dat.completed=false;
      else dat.completed=true;
      var editData={
        '_id':dat._id,
        'completed':dat.completed
      };
    }
      var req = { 
        method: 'POST',
        url: ip_hemanth+"users/updateTaskStatus",
        data:editData,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    }

    
 
debugger;
$http(req).success(function(data) {
  
   debugger;
   $scope.closeAdd();
    $mdDialog.hide();
$scope.getTasks();
$scope.showSimpleToast(choice);
 /*  $scope.closeDialog();
   $scope.dtInstance._renderer.rerender();*/
 });




  }

$scope.dayDifference=-1;
$scope.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  $scope.dayDifference= Math.round(difference_ms/one_day); 
}

$scope.descriptionbox=function(data){  debugger;
  $mdDialog.show({
    controller:function(){
      $scope.params={};
      $scope.params=data;
      return $scope;
    },
    controllerAs:'ctrll',
    templateUrl:'hrms/tasks/taskdescriptionDialog.tmpl.html',
    parent: angular.element(document.body),

    clickOutsideToClose:true
  });
  
 
}
$scope.showSearchBox=false;
$scope.toggleSearch=function(){debugger;
  if($scope.showSearchBox)
    $scope.showSearchBox=false;
  else $scope.showSearchBox=true;
}

/*$scope.descriptionbox=function(data){  
   debugger;
    var position = $scope._mdPanel.newPanelPosition()
     .absolute()
     .center();
$scope.editData1=data;
 var config = {
   attachTo: angular.element(document.body),
   controller: function(mdPanelRef){  debugger;
     $scope._mdPanelRef = mdPanelRef;
     $scope.editData1;
       
$scope.params=$scope.editData1;

     return $scope;
   },
   controllerAs: 'ctrll',
   disableParentScroll: true,
   templateUrl: 'hrms/tasks/taskdescriptionDialog.tmpl.html',
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
  }*/
/*$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});*/

    	
    /*.filter('employeeName',function(){  debugger;
      return function(itm){ debugger;
        return [itm.first_name, itm.last_name].join(" ");
      };
    });*/

}])
/*app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
*/
  })  ();




/*
(function() {
  
  angular
    .module('HRMS')
    .controller('TasksController', TasksController);
  TasksController.$inject = ['$http','$scope'];
  function TasksController ($http,$scope) {
  debugger;
   $scope.addCard=false;

$scope.addTask=function(){
    debugger;
    $scope.addCard=true;
  }
  $scope.closeAdd=function(){
    debugger;
    $scope.addCard=false;
  }
  }

 })();*/