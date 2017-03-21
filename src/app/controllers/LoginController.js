(function(){

  angular
    .module('app')
    .controller('LoginController', [
      '$scope',
      LoginController
      
    ]);

  function LoginController($scope) {
	$scope.username = '';
	$scope.password = '';


	$scope.doLogin = function() {
		alert($scope.username, $scope.password);	
	}
  }

})();
