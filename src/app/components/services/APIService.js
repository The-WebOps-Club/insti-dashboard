(function(){
  'use strict';

  angular.module('app')
          .service('api', [
          '$http',
          '$q',
          '$log',
          apiService
  ]);

  function apiService($http, $q, $log){
    var user = undefined 
    var hostname = "dashboard.webops.club";
    var scheme = 'https';
    var endpoints = {
        'auth': scheme + '://auth.' + hostname,
        'data': scheme + '://data.' + hostname,
    }

    return {
      isSignedIn: function() {
        var deferred = $q.defer();
        if (user) {  
            deferred.resolve(user);
        } else {
            $http.get(endpoints.auth + '/user/account/info').then(function(data){
                user = data;
                deferred.resolve(data);
            }).catch(function(msg){
                deferred.reject(msg);
                $log.error(msg);
            });
        }
        return deferred.promise;
      },
      login: function(username, password) {
        var deferred = $q.defer();
        $http.post(endpoints.auth + '/login', {username: username, password: password}).then(
            function(data) {
                console.log(data);
                deferred.resolve(data);
            }
        ).catch(function(msg){
            deferred.reject(msg);
            $log.error(msg);
        });
        return deferred.promise;
      }
    };
  }

})();
