(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('shareACab', function(){
				return {
			 		restrict: 'E',
			 		scope: {
			 			data: '=data'
			 		},
			    	templateUrl: 'app/components/shareacab/shareacab.html'
			  	};
			});

})();
