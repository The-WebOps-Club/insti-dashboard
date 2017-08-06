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

    $scope.showModal = function(modal, params) {
      if (modal == 'registerDevice') {
        $uibModal.open({
          animation: true,
          controller: 'RegisterDeviceModalCtrl',
          templateUrl: 'app/components/networkModals/registerDeviceModal.html'
        }).result.then(function () {
          $timeout(loadDevices, 1000);
          checkInternet();
        });
      } else if (modal == 'authorizeDevice') {
        $uibModal.open({
          animation: true,
          controller: 'AuthzDeviceModalCtrl',
          templateUrl: 'app/components/networkModals/authzDeviceModal.html',
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
        table: 'registered_device',
        columns: ['ipv4', 'mac', 'user_id', 'nick', 'registered_at', 'authorized_at', 'valid_till'],
        where: {user_id: api.user.hasura_id}
      }).then(function(data){
        console.log(data);
        $scope.devices = data;
      	var i = 0;
      	for(;i<$scope.devices.length;){
          var item = $scope.devices[i];
          item.status = 'inactive';

      	  item.registered_at_moment = moment(item.registered_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
          var itemIsValid = item.valid_till && item.authorized_at && moment().isBefore(moment(item.valid_till));

          if (itemIsValid) {
      	    item.valid_till_moment = moment(item.valid_till).format("dddd, MMMM Do YYYY, h:mm:ss a");
      	    item.authorized_at_moment = moment(item.authorized_at).format("dddd, MMMM Do YYYY, h:mm:ss a");
            if (moment(item.authorized_at).isBefore(moment(item.valid_till))) {
              item.status = 'active';
            }
          }
      	  i++;
      	}
      }).catch(function(error){
        console.log(error);
        toastr.error(error, 'Error');
      });
    };
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
