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
			})
      .directive('shareacabListing', function(){
        return {
          restrict: 'E',
          controller: 'shareacabListingCtrl',
          templateUrl: 'app/components/shareacab/shareacablisting.html'
        };
      })
      .controller('shareacabListingCtrl',['$scope', shareacabListingCtrl]);

      /** @ngInject */
      function shareacabListingCtrl($scope) {
        $scope.item = {};

        $scope.feed = [
          {
            type: 'text-message',
            author: 'Kostya',
            surname: 'Danovsky',
            header: 'Posted new message',
            text: 'To Airport at 6 am',
            time: '18.11.2015',
            ago: '9 days ago',
            expanded: false,
          }
        ];

        $scope.expandMessage = function(message){
          message.expanded = !message.expanded;
        }
        $scope.ReportItem = function (event, clickPlus) {
          if (clickPlus || event.which === 13) {
            $scope.feed.unshift({
              text: $scope.newItem,
            });
            $scope.newTodoText = '';
          }
        };
      }

})();
