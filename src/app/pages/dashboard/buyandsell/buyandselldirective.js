angular.module('BlurAdmin.pages.dashboard')
  
  .directive('buySell', buyandsell);

  function buyandsell() {
    return {
      restrict: 'E',
      controller: 'myCtrl',
      templateUrl: 'app/pages/dashboard/buyandsell/buyandsell.html'
    };
  }
