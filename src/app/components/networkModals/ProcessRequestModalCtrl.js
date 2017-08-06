/**
 * @file src/app/components/networkModals/ProcessRequestModalCtrl.js
 * @author Chinni Chaitanya <chchaitanya95@gmail.com>
 * Date: 26.07.2017
 * Last Modified: 26.07.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.components')
    .controller('ProcessRequestModalCtrl', ProcessRequestModalCtrl);

  /** @ngInject */
  function ProcessRequestModalCtrl($scope, $uibModalInstance, api, toastr, params) {
    $scope.params = params;
    $scope.params.validity_option = '0';

    $scope.approveRequest = function() {
      api.approveRequest(params.id).then(function(data){
        $scope.data = data;
        console.log(data);
        toastr.success('Device authorized for internet access');
      }).catch(function(error){
        toastr.error(error, 'Authorization failed, delete the device and try again');
      });
      $uibModalInstance.close();
    };

    $scope.rejectRequest = function() {
      api.rejectRequest(params.id).then(function(data){
        $scope.data = data;
        console.log(data);
        toastr.success('Device authorized for internet access');
      }).catch(function(error){
        toastr.error(error, 'Authorization failed, delete the device and try again');
      });
      $uibModalInstance.close();
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
