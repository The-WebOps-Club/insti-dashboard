/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', pageTop)
      .controller('pageTopCtrl', ['$scope', 'api', '$log', '$window', 'toastr', function($scope, api, $log, $window, toastr){
        $scope.logout= function() {
          $log.info('logout');
          api.logout().then(function(data){
              $window.location.href = '/auth.html';
          }).catch(function(error){
            toastr.error('message', 'Error', {
              "autoDismiss": false,
              "positionClass": "toast-top-right",
              "type": "error",
              "timeOut": "5000",
              "extendedTimeOut": "2000",
              "allowHtml": false,
              "closeButton": true,
              "tapToDismiss": true,
              "progressBar": false,
              "newestOnTop": true,
              "maxOpened": 0,
              "preventDuplicates": false,
              "preventOpenDuplicates": false
            });
          })
      };
      }]);

  /** @ngInject */
  function pageTop() {
    return {
      restrict: 'E',
      controller: 'pageTopCtrl',
      templateUrl: 'app/theme/components/pageTop/pageTop.html'
    };
  }

})();
