'use strict';

var announcement = angular.module('eventApp', []);

announcement.controller('EventCtrl', function($scope) {
    $scope.title = 'Announcements';

    $scope.events = [
		{
			who: "WebOps Club",
			what: "Android Workshop",
			notes: "All are welcome"
		},
		{
			who: "WebOps Club",
			what: "Android Workshop",
			notes: "All are welcome"
		},
		{
			who: "WebOps Club",
			what: "Android Workshop",
			notes: "All are welcome"
		},
		{
			who: "WebOps Club",
			what: "Android Workshop",
			notes: "All are welcome"
		},
		{
			who: "WebOps Club",
			what: "Android Workshop",
			notes: "All are welcome"
		}	
    ];
});
