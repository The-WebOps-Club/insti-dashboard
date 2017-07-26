/**
 * @file src/app/pages/network/NetworkPageCtrl.js
 * @author Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
 * @author Chinni Chaitanya <chchaitanya95@gmail.com>
 * Date: 19.06.2017
 * Last Modified: 26.07.2017
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.network')
    .controller('NetworkPageCtrl', NetworkPageCtrl);

  /** @ngInject */
  function NetworkPageCtrl($scope, fileReader, $filter, $uibModal, api, toastr, $timeout) {

    $scope.showModal = function(modal, params={}) {
      if (modal == 'registerDevice') {
        $uibModal.open({
          animation: true,
          controller: 'RegisterDeviceModalCtrl',
          templateUrl: 'app/pages/network/registerDeviceModal.html'
        }).result.then(function () {
          $timeout(loadDevices, 1000);
          checkInternet();
        });
      } else if (modal == 'authorizeDevice') {
        $uibModal.open({
          animation: true,
          controller: 'AuthzDeviceModalCtrl',
          templateUrl: 'app/pages/network/authzDeviceModal.html',
          resolve: {
            params: function() {
              return params;
            }
          }
        }).result.then(function () {
          $timeout(loadDevices, 1000);
          checkInternet();
        });        
      } else {
        // do nothing
      }
    };

    var loadDevices = function loadDevices() {
      api.query('select', {
        table: 'ipv4',
        columns: ['id', 'ip', 'associated_at', 'valid_till', {'name':'device', 'columns':['*']}],
        where: {device:{user:{id: api.user.hasura_id}}}
      }).then(function(data){
        console.log(data);
        $scope.devices = data;
      	var i = 0;
      	for(;i<$scope.devices.length;){
      	  $scope.devices[i].associated_at = moment($scope.devices[i].associated_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
      	  $scope.devices[i].valid_till = moment($scope.devices[i].valid_till).format("dddd, MMMM Do YYYY, h:mm:ss a");
      	  i++;
      	}
      }).catch(function(error){
        console.log(error);
        toastr.error(error, 'Error');
      });
    }
    loadDevices();

    $scope.devices = [
      {
        id: 'AS3dasdj3ASdasd',
        mac_addr: 'ab:cd:ef:gh',
        ip: '10.20.30.40',
        nick: 'device-1',
        status: 'active', // running
        associated_at: '26.07.2017 14:46:14',
        valid_till: '26.07.2017 14:46:14',
      },
      {
        id: 'bashdq@SASDd',
        mac_addr: 'az:cz:ez:gz',
        ip: '12.22.32.42',
        nick: 'device-2',
        status: 'inactive', // not running
        associated_at: '26.07.2017 14:46:14',
        valid_till: '26.07.2017 14:46:14',
      },
      {
        id: 'dacajdQEaSDAlfasd',
        mac_addr: 'a5:c4:e3:g2',
        ip: '14.24.34.44',
        nick: 'device-2',
        status: 'pending', // pending
        associated_at: '26.07.2017 14:46:14',
        valid_till: '26.07.2017 14:46:14',
      }
    ];

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

    $scope.revokeConnection = function(id) {
      var r = confirm("Are you sure you want to revoke connection to this device?");
      // if (r == true) {
      //   api.removeDevice({'device_id': id}).then(function(data){
      //     toastr.success('Device removed');
      //     $timeout(loadDevices, 1000);
      //     $timeout(checkInternet, 500);
      //   }).catch(function(error){
      //     toastr.error(error, 'Unable to remove device');
      //     console.log(error);
      //   });
      // } else {
      //   //nothing
      // }
    };

    $scope.authorize = function(id) {
      var r = confirm("Are you sure you want to authorize connection to this device?");
      // if (r == true) {
      //   api.removeDevice({'device_id': id}).then(function(data){
      //     toastr.success('Device removed');
      //     $timeout(loadDevices, 1000);
      //     $timeout(checkInternet, 500);
      //   }).catch(function(error){
      //     toastr.error(error, 'Unable to remove device');
      //     console.log(error);
      //   });
      // } else {
      //   //nothing
      // }
    };

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
