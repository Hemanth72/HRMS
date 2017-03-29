(function() {
  
  angular
    .module('HRMS')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['$http','$scope'];
  function HomeController ($http,$scope) {
  	$scope.pms=["overview","Gayatri","Prabhudesai"]
  }

 })();
  
  	