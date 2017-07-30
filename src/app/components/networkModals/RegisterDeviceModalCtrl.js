/**
 * @file src/app/components/networkModals/RegisterDeviceModalCtrl.js
 * @author Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
 * @author Chinni Chaitanya <chchaitanya95@gmail.com>
 * Date: 26.07.2017
 * Last Modified: 26.07.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.components')
    .controller('RegisterDeviceModalCtrl', RegisterDeviceModalCtrl);

  /** @ngInject */
  function RegisterDeviceModalCtrl($scope, $uibModalInstance, api, toastr) {
    $scope.ip = api.ip;
    $scope.params = {};
    $scope.params.mac_addr = 'mac-' + api.ip;
    $scope.params.nick = 'machine-' + api.ip;
    $scope.params.validity_option = '0';
    
    $scope.registerDevice = function() {
      api.authorizeDevice($scope.params).then(function(data){
        $scope.data = data;
        console.log(data);
        toastr.success('Device authorized for internet access');
      }).catch(function(error){
        toastr.error(error, 'Authorization failed, delete the device and try again');
      });
      // toastr.error('API to register device not there!');
      $uibModalInstance.close();
    };
  }

})();
