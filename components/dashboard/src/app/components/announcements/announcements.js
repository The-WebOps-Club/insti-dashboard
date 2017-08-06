(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('announcements', function(){
				return {
			 		restrict: 'E',
			 		controller: 'AnnouncementCtrl',
			    templateUrl: 'app/components/announcements/announcements.html'
			  };
			})
      .controller('AnnouncementCtrl', ['$scope', '$uibModal', function($scope, $uibModal){
        $scope.open = function (announcement) {
          $uibModal.open({
            animation: true,
            templateUrl: 'app/components/announcements/announcementModal.html',
            size: 'lg',
            controller: ['$scope', function ($scope) {
              $scope.message = announcement;
            }]
          });
        }
        $scope.feed = [
          {
            type: 'text-message',
            author: 'Secretary (Sports)',
            dauthor: 'Kostya',
            surname: 'Danovsky',
            subject: 'Mini-camp for 33rd Inter IIT Aquatics meet 2017',
            header: 'Posted new message',
            text: 'The Institute Aquatics Team will be commencing their practice for the 33rd Inter IIT Aquatics meet and a Water polo mini-camp is being organised for all the enthusiasts who want to try out the sport and have a shot at joining the institute team. The camp will be conducted from 6:00 to 8:00 PM, for a duration of 18 Days, beginning 27th March. Please note that the students with swimming card will only be allowed for the camp. All those who are interested, please fill out this form on or before 26th March. Come join the Madras Sharks in their quest for ultimate glory!For further queries, please contact Sriram Ganesh at 9790999366 or Ananda Krishnan at 9176195100.',
            time: 'Today 11:55 pm',
            ago: '25 minutes ago',
            expanded: false,
          }, {
            type: 'video-message',
            dauthor: 'Andrey',
            subject: 'Choreo Club Spark Workshop on March 29 8 PM at SAC',
            author: 'Secretary (Cultural Affairs Arts)',
            surname: 'Hrabouski',
            header: '',
            text: 'Are you bored preparing for Quizzes ? Well worry not because SPARK is coming to your rescue! Lots of foot thumping music and amazing dance moves to look forward to. SO get your swagger on and get ready to break a leg! From March 29th , SAC , 8 PM Dance First, Think Later',
            preview: 'app/feed/vader-and-me-preview.png',
            link: 'https://www.youtube.com/watch?v=IfcpzBbbamk',
            time: 'Today 9:30 pm',
            ago: '3 hrs ago',
            expanded: false,
          }, {
            type: 'image-message',
            dauthor: 'Vlad',
            author: 'ANKIT JAIN',
            subject: 'MEAs Initiative - Clean Energy Yatra Applications',
            surname: '',
            header: 'Added new image',
            text: 'Are you bored preparing for Quizzes ? Well worry not because SPARK is coming to your rescue! Lots of foot thumping music and amazing dance moves to look forward to. SO get your swagger on and get ready to break a leg! From March 29th , SAC , 8 PM Dance First, Think Later',
            preview: 'app/feed/my-little-kitten.png',
            link: 'http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg',
            time: 'Today 2:20 pm',
            ago: '10 hrs ago',
            expanded: false,
          }
        ];

        $scope.expandMessage = function(message){
          message.expanded = !message.expanded;
        }
      }]);

})();
