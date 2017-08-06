/**
 * @author shahidhk
 * created on 24.03.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.chat')
      .controller('ChatCtrl', ChatCtrl);

  /** @ngInject */
  function ChatCtrl() {
    var vm = this;
    this.conversations = [
      {
        id: '918372e8-4ec6-4586-86b5-0bbe18365cc3',
        label: 'Shahidh',
        newMessages: 10
      },
      {
        id: '7f364e93-13d9-4e29-af87-7c6080f52d7d',
        label: 'IITM',
        newMessages: 112
      },
      {
        id: '44ab7d52-b575-4c05-8732-616f1e814a0a',
        label: 'Aswin',
        newMessages: 11
      },
      {
        id: 'b873309b-3cf9-4006-80b1-ddddade31a1a',
        label: 'ED 2012',
        newMessages: 0
      },
      {
        id: 'a4f35b5d-16d0-4a54-8570-a005c178019e',
        label: 'Minu',
        newMessages: 3
      },
      {
        id: 'fe8fcc69-1697-44e4-8f13-9acab2d1e7d9',
        label: 'Random',
        newMessages: 1
      }
    ];
    this.navigationCollapsed = true;

  }

})();
