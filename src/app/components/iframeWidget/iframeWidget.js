(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('iframeWidget', function(){
				return {
			 		restrict: 'E',
			 		scope: {
			 			url: '@url'
			 		},
			    	templateUrl: 'app/components/iframeWidget/iframeWidget.html'
			  	};
			});

})();
