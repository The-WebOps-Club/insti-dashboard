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


	$scope.doLogin = function() {
        api.login($scope.username, $scope.password).then(function(data){
            $log.info(data);
        }).catch(function(error){
            $log.error(error);
        });
	}
  }

})();
