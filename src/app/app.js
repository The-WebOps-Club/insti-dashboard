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
  //'angular-progress-button-styles',
  'angular-loading-bar',

  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.components'
])
.config(function($sceDelegateProvider, $httpProvider){
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://hospital.iitm.ac.in/**',
    'https://students.iitm.ac.in:444/**',
    'https://students.iitm.ac.in/**',
    'http://www.t5eiitm.org/**'
  ]);
  $httpProvider.defaults.withCredentials = true;
})
.run([
    '$state', 'api', '$window', function($state, api, $window) {
        api.isSignedIn().then(function(data){
          console.log('Logged in', data);
          api.userProfile().then(function(data){
            if(data.length === 0){
              //create profile
              api.query('insert', {
                table: 'user',
                objects: [{
                  id: api.user.hasura_id,
                  username: api.user.username,
                  iitm_id: api.user.username
                }],
                returning: ['id', 'username', 'full_name', 'email', 'mobile', 'iitm_id']
              }).then(function(data){
                api.profile = data.returning[0];
              }).catch(function(error){
                console.log(error);
              });
            } else {
              api.profile = data[0];
            }
          }).catch(function(error){
            console.log(error);
          })
        }).catch(function(error){
          console.log(error);

          $window.location.href = '/auth.html';
        });
    }
  ]);
