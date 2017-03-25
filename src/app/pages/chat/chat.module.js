/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.chat', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('chat', {
          url: '/chat',
          templateUrl: 'app/pages/chat/chat.html',
          controller: "ChatCtrl",
          controllerAs: "vm",
          title: 'Chat',
          sidebarMeta: {
            order: 0,
            icon: 'ion-android-chat'
          }
        }).state('chat.conversation', {
          url: '/:id',
          templateUrl: 'app/pages/chat/conversation/conversation-new.html',
          title: 'Chat',
          controller: "ConversationCtrl",
          controllerAs: "convCtrl"
        });


  }

})();
