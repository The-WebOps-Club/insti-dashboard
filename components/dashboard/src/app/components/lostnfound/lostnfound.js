(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('lostNFound', function(){
				return {
			 		restrict: 'E',
			 		scope: {
			 			data: '=data'
			 		},
			    	templateUrl: 'app/components/lostnfound/lostnfound.html'
			  	};
			})
      .directive('lostListing', function(){
				return {
			 		restrict: 'E',
			 		controller: 'LostListingCtrl',
			    templateUrl: 'app/components/lostnfound/lostlisting.html'
			  };
			})
      .controller('LostListingCtrl',['$scope', LostListingCtrl]);

      /** @ngInject */
      function LostListingCtrl($scope) {
        $scope.item = {};

        $scope.feed = [
          {
            type: 'text-message',
            author: 'Laptop - Lenovo',
            surname: '',
            header: 'Posted new message',
            text: '.',
            time: 'Today 11:55 pm',
            ago: '25 minutes ago',
            expanded: false,
          },  {
            type: 'image-message',
            author: 'Badminton racket - ',
            surname: 'Artengo BR 900P Lite',
            header: 'Added new image',
            text: '"Badminton racket"',
            preview: 'app/feed/badminton-racket.jpg',
            link: 'https://media.decathlon.in/235191/br-900-p-lite-adult-badminton-racket-blue-white.jpg',
            time: 'Today 2:20 pm',
            ago: '10 hrs ago',
            expanded: false,
          }, {
            type: 'text-message',
            author: 'Kostya',
            surname: 'Danovsky',
            header: 'Posted new message',
            text: 'Why did the CoffeeScript developer keep getting lost? Because he couldn\'t find his source without a map',
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
