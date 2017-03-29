(function() {
  
  angular
    .module('HRMS')
    .controller('TrainingController', ['$http','$scope', '$state',
    	function($http, $scope, $state){

    		$scope.title="Training";
			$scope.ip_hemanth="http://192.168.100.8:1339/";
            $scope.loggedUser_role="admin";
 $scope.getTrainingCourses= function ()
        {
            $http.get(ip_hemanth+'users/getTrainingCourse').success(function (data)
            {
              debugger;
                $scope.courses = data;
            });
        }
$scope.showSearchBox=false;
$scope.toggleSearch=function(){debugger;
  if($scope.showSearchBox)
    $scope.showSearchBox=false;
  else $scope.showSearchBox=true;
}


    	}])
})();
