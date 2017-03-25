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
.config(function($sceDelegateProvider, $httpProvider){
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://hospital.iitm.ac.in/**'
  ]);
  $httpProvider.defaults.withCredentials = true;
})
.run([
    '$state', 'api', '$window', function($state, api, $window) {
        api.isSignedIn().then(function(data){
          console.log('Logged in', data);
        }).catch(function(error){
            $window.location.href = '/auth.html';
        });
    }
  ]);
