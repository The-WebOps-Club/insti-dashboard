/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  /**
   * Represents current element as panel, adding all necessary classes.
   */
  angular.module('BlurAdmin.theme')
      .directive('baPanelIframeSelf', baPanelIframeSelf);

  /** @ngInject */
  function baPanelIframeSelf(baPanelIframe) {
    return angular.extend({}, baPanelIframe, {
      link: function(scope, el, attrs) {
        el.addClass('panel panel-white');
        if (attrs.baPanelIframeClass) {
          el.addClass(attrs.baPanelIframeClass);
        }
      }
    });
  }

})();
