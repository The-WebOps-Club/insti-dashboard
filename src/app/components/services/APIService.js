(function(){
  'use strict';

  angular.module('app')
          .service('apiService', [
          '$http',
          apiService
  ]);

  function apiService($https){
    var user = {};  
    var hostname = "dashboard.webops.club";
    var scheme = 'https';
    var endpoints = {
        'auth': scheme + '://auth' + hostname,
        'data': scheme + '://data' + hostname,
    }

    return {
      isLoggedIn: function() {
        return user.isLoggedIn;
      },
      login: function(username, password) {
        $http.post(endpoints.auth, {username: username, password: password}).then(
            function(data) {
                console.log(data);
            }
        )
      }
    };
  }

})();
