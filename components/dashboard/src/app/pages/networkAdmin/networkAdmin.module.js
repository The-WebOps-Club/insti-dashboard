/**
 * @file src/app/pages/network/network.module.js
 * @author Chinni Chaitanya <chchaitanya95@gmail.com>
 * Date: 26.07.2017
 * Last Modified: 26.07.2017
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.networkAdmin', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('networkAdmin', {
          url: '/network-admin',
          title: 'Network Admin',
          sidebarMeta: {
            icon: 'ion-android-wifi',
            order: 0,
          },
          templateUrl: 'app/pages/networkAdmin/networkAdmin.html',
          controller: 'NetworkAdminPageCtrl',
        });
  }

})();
