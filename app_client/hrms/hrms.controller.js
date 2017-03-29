(function() {
  
  angular
    .module('HRMS')
    .controller('hrmsController', hrmsController);
  hrmsController.$inject = ['$http','$scope','$state'];
  function hrmsController ($http,$scope,$state) {
  	$state.go('hrms.overview');
  	 $('li').on('click', function(){
    debugger;
   $('li').removeClass('activeh');
   $(this).addClass('activeh');
})
  }

 })();
  
  	