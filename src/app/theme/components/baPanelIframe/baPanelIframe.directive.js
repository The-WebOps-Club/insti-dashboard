/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  /**
   * Includes basic panel layout inside of current element.
   */
  angular.module('BlurAdmin.theme')
      .directive('baPanelIframe', baPanelIframe);

  /** @ngInject */
  function baPanelIframe(baPanelIframe, baConfig) {
    return angular.extend({}, baPanelIframe, {
      template: function(el, attrs) {
        var res = '<div  class="panel ' + (baConfig.theme.blur ? 'panel-blur' : '') + ' full-invisible ' + (attrs.baPanelIframeClass || '');
        res += '" zoom-in ' + (baConfig.theme.blur ? 'ba-panel-blur' : '') + '>';
        res += baPanelIframe.template(el, attrs);
        res += '</div>';
        return res;
      }
    });
  }
})();
