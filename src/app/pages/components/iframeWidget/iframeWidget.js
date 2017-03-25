(function () {
  'use strict';

	angular.module('BlurAdmin.pages.components', [])
			.directive('iframeWidget', function(){
				return {
			 		restrict: 'E',
			 		scope: {
			 			title: '@title',
			 			url: '@url',
			 			gridsterData: '@gridsterData'
			 		},
			    	templateUrl: 'app/pages/components/iframeWidget/iframeWidget.html'
			  	};
			});

})();
