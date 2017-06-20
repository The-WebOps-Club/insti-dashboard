/**
 * @file NetworkPageCtrl.js
 * @author Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
 * Date: 19.06.2017
 * Last Modified: 19.06.2017
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.network')
    .controller('NetworkPageCtrl', NetworkPageCtrl);

  /** @ngInject */
  function NetworkPageCtrl($scope, fileReader, $filter, $uibModal, api, toastr, $timeout) {

    $scope.showModal = function () {
      $uibModal.open({
        animation: true,
        controller: 'AuthzDeviceModalCtrl',
        templateUrl: 'app/pages/network/authzDeviceModal.html'
      }).result.then(function () {
        $timeout(loadDevices, 1000);
    	checkInternet();
      });
    };

    var loadDevices = function loadDevices() {
      api.query('select', {
        table: 'ipv4',
        columns: ['id', 'ip', 'associated_at', 'valid_till', {'name':'device', 'columns':['*']}],
        where: {device:{user:{id: api.user.hasura_id}}}
      }).then(function(data){
        console.log(data);
        $scope.devices = data;
      }).catch(function(error){
        console.log(error);
        toastr.error(error, 'Error');
      });
    }
    loadDevices();

    api.getIp().then(function(data){
      $scope.ip = data.ipv4;
      $scope.intranet = api.intranet;
    }).catch(function(error){
      toastr.error(error, 'Unable to fetch IP address');
      $scope.intranet = api.intranet;
    });


    var checkInternet = function checkInternet() {
	  api.getPublicIp().then(function(data){
		$scope.publicIp = data.ip;
		$scope.internet = api.internet;
	  }).catch(function(error){
		toastr.error(error, 'Unable to connect to internet');
		$scope.internet = api.internet;
	  });
	};
    checkInternet();

    $scope.removeDevice = function(id) {
	  var r = confirm("Are you sure you want to remove this device?");
	  if (r == true) {
		api.removeDevice({'device_id': id}).then(function(data){
		  toastr.success('Device removed');
		  $timeout(loadDevices, 1000);
		  $timeout(checkInternet, 500);
      }).catch(function(error){
        toastr.error(error, 'Unable to remove device');
        console.log(error);
      });
	  } else {
		//nothing
	  }
    };


  }

})();
