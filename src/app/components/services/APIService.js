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
            $http.get(endpoints.auth + '/user/account/info').then(function(response){
                user = response.data;
                deferred.resolve(response.data);
            }).catch(function(response){
                deferred.reject(response.data.message);
                $log.error(response);
            });
        }
        return deferred.promise;
      },
      login: function(username, password) {
        var deferred = $q.defer();
        $http.post(endpoints.auth + '/login', {username: username, password: password}).then(
            function(response) {
				user = response.data;
                console.log(response.data);
                deferred.resolve(response.data);
            }
        ).catch(function(response){
            deferred.reject(response.data.message);
            $log.error('from service', response);
        });
        return deferred.promise;
      },
      logout: function() {
        var deferred = $q.defer();
        $http.get(endpoints.auth + '/user/logout').then(
            function(response) {
                $log.info(response.data);
				user = undefined;
                deferred.resolve(response.data);
            }
        ).catch(function(response){
            deferred.reject(response.data.message);
            $log.error('from service', response);
        });
        return deferred.promise;
      }
    };
  }

})();
