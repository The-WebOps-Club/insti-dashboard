/**
 * @file src/app/pages/network/NetworkModalCtrl.js
 * @author Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
 * Date: 19.06.2017
 * Last Modified: 19.06.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.network')
    .controller('AuthzDeviceModalCtrl', AuthzDeviceModalCtrl);

  /** @ngInject */
  function AuthzDeviceModalCtrl($scope, $uibModalInstance, api, toastr) {
    $scope.ip = api.ip;
    $scope.params = {};
    $scope.params.mac_addr = 'mac-' + api.ip;
    $scope.params.nick = 'machine-' + api.ip;
    $scope.params.validity_option = '0';
    $scope.ok = function () {
      api.authorizeDevice($scope.params).then(function(data){
        $scope.data = data;
        console.log(data);
        toastr.success('Device authorized for internet access');
      }).catch(function(error){
        toastr.error(error, 'Authorization failed');
      });
      $uibModalInstance.close($scope.data);
    };
    $scope.validityOptions = [
      {
        value: 0,
        text: '1 hour'
      },
      {
        value: 1,
        text: '1 day'
      },
      {
        value: 7,
        text: '1 week'
      },
      {
        value: 30,
        text: '1 month'
      },
      {
        value: 72,
        text: '1 semester'
      },
      {
        value: 365,
        text: '1 year'
      }
    ];


  }

})();
