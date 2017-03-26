/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.videochat', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('videochat', {
          url: '/videochat',
          templateUrl: 'app/pages/videochat/chat.html',
          title: 'Video Chat',
          sidebarMeta: {
            order: 3,
            icon: 'ion-android-camera'
          }
        });


  }

})();
