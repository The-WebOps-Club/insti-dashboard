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
  function AuthzDeviceModalCtrl($scope, $uibModalInstance) {
    $scope.link = '';
    $scope.ok = function () {
      $uibModalInstance.close($scope.link);
    };
    $scope.validityOptions = [
      '1 hour',
      '1 day',
      '1 week',
      '1 month',
      '1 semester',
      '1 year'
    ];
  }

})();
