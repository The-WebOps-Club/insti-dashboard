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
  function NetworkPageCtrl($scope, fileReader, $filter, $uibModal) {

    $scope.showModal = function () {
      $uibModal.open({
        animation: true,
        controller: 'AuthzDeviceModalCtrl',
        templateUrl: 'app/pages/network/authzDeviceModal.html'
      }).result.then(function (link) {
        var href = link;
      });
    };

    $scope.devices = [
      {
	id: 1,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 2,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 3,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active',
	current: true
      },
      {
	id: 4,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 5,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 6,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 1,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 2,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 3,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 4,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 5,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      },
      {
	id: 6,
	mac: 'c8:ff:28:78:51:27',
	ip: '10.21.90.113',
	nick: 'Dell XPS 13',
	validTill: 'Mon Jul 19 2018, 20:00:00',
	status: 'active'
      }
    ]

  }

})();
