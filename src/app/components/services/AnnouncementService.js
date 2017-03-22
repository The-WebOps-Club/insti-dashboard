'use strict';

var announcement = angular.module('announcementApp', []);

announcement.controller('AnnouncementCtrl', function($scope) {
    $scope.title = 'Announcements';
});
