
(function(){

  angular
    .module('app')
    .controller('DashboardCtrl', [
      '$scope',
      DashboardController
      
    ]);

  function DashboardController($scope) {

    $scope.weatherGrid = {
      // maxSizeX: 4,
      // minSizeX: 4,
      draggable: false,
      resizable: false
    };
  }

})();
