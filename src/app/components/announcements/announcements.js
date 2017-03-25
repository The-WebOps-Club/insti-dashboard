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
            dauthor: 'Secretary (Sports)',
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
            text: "Dear students Greetings from Mechanical Engineering Association! Last month, we floated an idea of conducting an educational trip on the theme of Clean Energy and Environment to gauge the enthusiasm of people for which we have got an overwhelming response Hence we are set for the weekend trip after Quiz 2 where we would be visiting Kamuthi Solar Power Plant, Kayathar Wind Farms and Pichavaram Mangrooves Forest.  Our objectives with such an initiative is to enable energy enthusiasts to understand the clean energy landscape of Tamil Nadu and get a first hand experience of the execution of the projects in that domain.  Around 40 students will be selected by us who will depart from the campus in a bus on the evening of 30th March and will return by the night of 2nd April. It will involve 2 overnight travel and one night stay. The trip is only partially sponsored and the participants will be required to contribute Rs.1500. Accommodation will be taken care by us.  PFA: Itinerary and brief about locations Note: As it is conducted by MEA, the preference would be given to students from Mechanical Engineering. But students from other branches who think can add a lot of value to the trip are encouraged to apply.  Applications will be closed by Sunday night. Interested student are requested to fill the form: Regards MEA Secretaries",
            preview: 'app/feed/my-little-kitten.png',
            link: 'http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg',
            time: 'Today 2:20 pm',
            ago: '10 hrs ago',
            expanded: false,
          }, {
            type: 'text-message',
            dauthor: 'Nasta',
            surname: 'Linnie',
            subject: 'Police officer',

            header: 'Posted new message',
            text: 'Haha lol',
            time: '11.11.2015',
            ago: '2 days ago',
            expanded: false,
          }, {
            type: 'geo-message',
            dauthor: 'Nick',
            surname: 'Cat',
            subject: 'Police officer',
            header: 'Posted location',
            text: '"New York, USA"',
            preview: 'app/feed/new-york-location.png',
            link: 'https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z',
            time: '11.11.2015',
            ago: '2 days ago',
            expanded: false,
          }, {
            type: 'text-message',
            dauthor: 'Vlad',
            subject: 'Police officer',
            surname: 'Lugovsky',
            header: 'Posted new message',
            text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!",
            time: '12.11.2015',
            ago: '3 days ago',
            expanded: false,
          }, {
            type: 'text-message',
            dauthor: 'Andrey',
            surname: 'Hrabouski',
            subject: 'Police officer',
            header: 'Posted new message',
            text: 'How do you smuggle an elephant across the border? Put a slice of bread on each side, and call him "lunch".',
            time: '14.11.2015',
            ago: '5 days ago',
            expanded: false,
          }, {
            type: 'text-message',
            dauthor: 'Nasta',
            subject: 'Police officer',
            surname: 'Linnie',
            header: 'Posted new message',
            text: 'When your hammer is C++, everything begins to look like a thumb.',
            time: '14.11.2015',
            ago: '5 days ago',
            expanded: false,
          }, {
            type: 'text-message',
            dauthor: 'Alexander',
            surname: 'Demeshko',
            header: 'Posted new message',
            subject: 'Police officer',
            text: '“I mean, they say you die twice. One time when you stop breathing and a second time, a bit later on, when somebody says your name for the last time." ©',
            time: '15.11.2015',
            ago: '6 days ago',
            expanded: false,
          }, {
            type: 'image-message',
            subject: 'Police officer',
            surname: 'Cat',
            dauthor: 'Nick',
            header: 'Posted photo',
            text: '"Protein Heroes"',
            preview: 'app/feed/genom.png',
            link: 'https://dribbble.com/shots/2504810-Protein-Heroes',
            time: '16.11.2015',
            ago: '7 days ago',
            expanded: false,
          },
          {
            type: 'text-message',
            dauthor: 'Kostya',
            surname: 'Danovsky',
            subject: 'Police officer',
            text: 'Why did the CoffeeScript developer keep getting lost? Because he couldn\'t find his source without a map',
            header: 'Posted new message',
            time: '18.11.2015',
            ago: '9 days ago',
            expanded: false,
          }
        ];

        $scope.expandMessage = function(message){
          message.expanded = !message.expanded;
        }
      }]);

})();
