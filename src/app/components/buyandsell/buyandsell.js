(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('buySell', function(){
				return {
			 		restrict: 'E',
			 		controller: 'myCtrl',
			 		templateUrl: 'app/components/buyandsell/buyandsell.html'
			  	};
			})
			.controller("myCtrl", function($scope) {
				  $scope.buy = [
				    {
			        type: 'text-message',
			        name: 'Kostya',
			        price: '20000',
			        surname: 'Danovsky',
			        product: 'Laptop',
			        description: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
			        time: 'Today 11:55 pm',
			        ago: '25 minutes ago',
			        expanded: false,
			      }, {
			        type: 'video-message',
			        name: 'Andrey',
			        price: '1000',
			        surname: 'Hrabouski',
			        product: 'Food Court Coupons',
			        description: '"Vader and Me xsads d sda d sad asd sad sa das d asd as d sad asd sa d sad sa fa f a sfas f sa fsa f saf saf af  fa fa fa fa f af f fa f af f f  fa fa fa f f f  fs f f f f f ff a f dfsrg fg rd g r g ee h gh h h dh h h  h"',
			        link: 'https://www.youtube.com/watch?v=IfcpzBbbamk',
			        time: 'Today 9:30 pm',
			        ago: '3 hrs ago',
			        expanded: false,
			      }, {
			        type: 'image-message',
			        name: 'Vlad',
			        price: '8000',
			        surname: 'Lugovsky',
			        product: 'Mi Mobile Phone',
			        description: '"My little kitten"',
			        link: 'http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg',
			        time: 'Today 2:20 pm',
			        ago: '10 hrs ago',
			        expanded: false,
			      }
				 ]
				 
				 $scope.type = [
			      	{ label: 'Buy', value: 1 },
				    { label: 'Sell', value: 2 },
				  ]
				 $scope.sell = [
			      {
			        type: 'text-message',
			        name: 'Kostya',
			        price: '20000',
			        surname: 'Danovsky',
			        product: 'Laptop',
			        description: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
			        time: 'Today 11:55 pm',
			        ago: '25 minutes ago',
			        expanded: false,
			      }, {
			        type: 'video-message',
			        name: 'Andrey',
			        price: '1000',
			        surname: 'Hrabouski',
			        product: 'Food Court Coupons',
			        description: '"Vader and Me xsads d sda d sad asd sad sa das d asd as d sad asd sa d sad sa fa f a sfas f sa fsa f saf saf af  fa fa fa fa f af f fa f af f f  fa fa fa f f f  fs f f f f f ff a f dfsrg fg rd g r g ee h gh h h dh h h  h"',
			        link: 'https://www.youtube.com/watch?v=IfcpzBbbamk',
			        time: 'Today 9:30 pm',
			        ago: '3 hrs ago',
			        expanded: false,
			      }, {
			        type: 'image-message',
			        name: 'Vlad',
			        price: '8000',
			        surname: 'Lugovsky',
			        product: 'Mi Mobile Phone',
			        description: '"My little kitten"',
			        link: 'http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg',
			        time: 'Today 2:20 pm',
			        ago: '10 hrs ago',
			        expanded: false,
			      }
			     ]
				$scope.expandMessage = function(message){
			      message.expanded = !message.expanded;
			    }
			});
})();
