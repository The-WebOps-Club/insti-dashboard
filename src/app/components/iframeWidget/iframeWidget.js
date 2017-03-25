(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('iframeWidget', function(){
				return {
			 		restrict: 'E',
			 		scope: {
			 			title: '@title',
			 			url: '@url',
			 			gridsterData: '@gridsterData'
			 		},
			    	templateUrl: 'app/components/iframeWidget/iframeWidget.html'
			  	};
			});

})();
