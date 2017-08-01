(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('genericWidget', function(){
				return {
			 		restrict: 'E',
			 		scope: {
			 			data: '=data'
			 		},
			    	templateUrl: 'app/components/genericWidget/genericWidget.html'
			  	};
			});

})();
