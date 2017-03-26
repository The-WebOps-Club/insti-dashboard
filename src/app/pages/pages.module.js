/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.home',
    'BlurAdmin.pages.chat',
    'BlurAdmin.pages.videochat',
    'BlurAdmin.pages.dashboard',
    // 'BlurAdmin.pages.ui',
    // 'BlurAdmin.pages.components',
    // 'BlurAdmin.pages.form',
    // 'BlurAdmin.pages.tables',
    // 'BlurAdmin.pages.charts',
    'BlurAdmin.pages.maps',
    'BlurAdmin.pages.profile',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/home');

    baSidebarServiceProvider.addStaticItem({
      title: 'The Fifth Estate',
      icon: 'ion-document',
      fixedHref: 'http://www.t5eiitm.org/',
      external: true
    });
    baSidebarServiceProvider.addStaticItem();
  }

})();
