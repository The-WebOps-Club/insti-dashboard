(function () {
  'use strict';

	angular.module('BlurAdmin.components')
			.directive('events', function(){
				return {
			 		restrict: 'E',
			 		controller: 'EventCtrl',
			    templateUrl: 'app/components/events/events.html'
			  };
			})
      .controller('EventCtrl', ['$scope', function($scope){
        $scope.feed = [
          {
            type: 'text-message',
            author: 'Kostya',
            surname: 'Danovsky',
            title: 'NSS Movie Screening: Ek Hazarachi Note',
            header: 'Posted new message',
            text: "Cinema as a visual medium has always held unparalleled power in capturing the popular imagination by acting as a mirror held against the ills and qualms of society. We, the National Service Scheme IIT Madras, proudly invite all of you to the screening of the award-winning Marathi movie​ Ek Hazarachi Note. We aim to provide a reel experience of the society in its raw form apart from the real experience of the same that we facilitate through our various activities. As Anthony Burgess said, 'the colours of the real world only seem really real when you watch them on a screen'. The movie portrays burning societal issues such as police brutality through the life of a poor Indian woman and her unsettling encounter with money. The movie will have subtitles in English. All are welcome. ",
            ago: '25 minutes ago',
            time: 'March 31st Friday 8pm at OAT',
            expanded: false,
          },
          {
            type: 'text-message',
            author: 'Kostya',
            surname: 'Danovsky',
            title: 'Talk by Shri. Tanmai Gopal (DD-CS/12), Head Engineering & Co-Founder, Hasura, core-tech startup',
            header: 'Posted new message',
            text: "As an introduction, and to set context, I shall briefly talk about my journey as an entrepreneur. The main goal of my session will be to motivate how to find problems that have great business or social impact, along with some specific examples. I will also share my experience and learnings of how to start the journey of solving a problem and starting a company.",
            ago: '25 minutes ago',
            time: 'March 24th Friday 5:30pm at IC&SR Auditorium',
            expanded: false,
          }
        ];

        $scope.expandMessage = function(message){
          message.expanded = !message.expanded;
        }
      }]);

})();
