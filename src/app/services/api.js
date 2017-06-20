(function () {
  'use strict';

  angular.module('BlurAdmin')
    .service('api', api);

  /** @ngInject */
  function api($q, $http, $log) {
    this.user = undefined;
    var user = undefined;
    var hostname = "hasura.dashboard.iitm.ac.in";
    var scheme = 'http';
    var endpoints = {
        'auth': scheme + '://auth.' + hostname,
        'data': scheme + '://data.' + hostname,
    }

    this.isSignedIn = function() {
      var _this = this;
      var deferred = $q.defer();
      if (user) {
          deferred.resolve(user);
      } else {
          $http.get(endpoints.auth + '/user/account/info').then(function(response){
              user = response.data;
              _this.user = response.data;
              deferred.resolve(response.data);
          }).catch(function(response){
              deferred.reject(response.data.message);
              $log.error(response);
          });
      }
      return deferred.promise;
    };
    this.login = function(username, password) {
      var _this = this;
      var deferred = $q.defer();
      $http.post(endpoints.auth + '/login', {username: username, password: password}).then(
          function(response) {
            user = response.data;
            _this.user = response.data;
            console.log(response.data);
            deferred.resolve(response.data);
          }
      ).catch(function(response){
          deferred.reject(response.data.message);
          $log.error('from service', response);
      });
      return deferred.promise;
    };

    this.logout = function() {
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
    };

    this.query = function(type, args){
      var defer = $q.defer(),
          query_params = angular.toJson({
            "type": type,
            "args": args
          });

      $http.post(endpoints.data + '/v1/query', query_params)
        .success(function(data){
          defer.resolve(data);
        })
      .error(function(data){
        defer.reject(data)
      })
      return defer.promise;
    };

    this.userProfile = function() {
      var _this = this;
      return this.query('select', {
        table: 'user',
        columns: ['id', 'username', 'full_name', 'email', 'mobile', 'iitm_id'],
        where: {id: _this.user.hasura_id}
      });
    };
  }

})();
