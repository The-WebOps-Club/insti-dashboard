/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .factory('baPanelIframe', baPanelIframe);

  /** @ngInject */
  function baPanelIframe() {

    /** Base baPanelIframe directive */
    return {
      restrict: 'A',
      transclude: true,
      template: function(elem, attrs) {
        var res = '<div class="panel-body-iframe" ng-transclude></div>';
        if (attrs.baPanelIframeTitle) {
          var titleTpl = '<div class="panel-heading clearfix"><h3 class="panel-title">' + attrs.baPanelIframeTitle + '</h3></div>';
          res = titleTpl + res; // title should be before
        }

        return res;
      }
    };
  }

})();
