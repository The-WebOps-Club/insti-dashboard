(function(){

  angular
    .module('app')
    .controller('LoginController', [
      '$scope',
      'api',
      '$log',
      '$state',
      LoginController
      
    ]);

  function LoginController($scope, api, $log, $state) {
    api.isSignedIn().then(function(user){
       $log.info(user) ;
       $state.go('home.dashboard');
    }).catch(function(error){
       $log.info(error); 
    });  
	$scope.username = '';
	$scope.password = '';
    $scope.loginText = 'Login';

	$scope.doLogin = function() {
        api.login($scope.username, $scope.password).then(function(data){
            $log.info(data);
            $state.go('home.dashboard');
        }).catch(function(message) {
            $scope.loginText = message;
            $log.error(status, message);
        });
	}
  }

})();
