/**
 * @file src/app/pages/network/network.module.js
 * @author Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
 * Date: 19.06.2017
 * Last Modified: 19.06.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.network', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('network', {
          url: '/network',
          title: 'Network Access',
          sidebarMeta: {
            icon: 'ion-android-wifi',
            order: 0,
          },
          templateUrl: 'app/pages/network/network.html',
          controller: 'NetworkPageCtrl',
        });
  }

})();
