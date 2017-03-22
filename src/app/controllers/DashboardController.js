
(function(){

  angular
    .module('app')
    .controller('DashboardCtrl', [
      '$scope',
      DashboardController
      
    ]);

  function DashboardController($scope) {
    $scope.gridsterOpts = {
			margins: [10, 10],
			columns: 6,
			draggable: {
				handle: 'md-toolbar'
			},
			defaultSizeX: 2, // the default width of a gridster item, if not specifed
			defaultSizeY: 1, // the default height of a gridster item, if not specified
			minSizeX: 1, // minimum column width of an item
			maxSizeX: null, // maximum column width of an item
			minSizeY: 1, // minumum row height of an item
			maxSizeY: null, // maximum row height of an item
			resizable: {
				enabled: true 
			} 
		};


    
    $scope.weatherGrid = {
      // maxSizeX: 4,
      // minSizeX: 4,
      draggable: false,
      resizable: false
    };
  }

})();
