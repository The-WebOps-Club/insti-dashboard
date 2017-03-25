'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  'xeditable',
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'gridster',

  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.components'
])
.config(function($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://hospital.iitm.ac.in/**'
  ]);
});
