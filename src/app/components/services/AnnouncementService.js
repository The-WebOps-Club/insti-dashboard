'use strict';

var announcement = angular.module('announcementApp', []);

announcement.controller('AnnouncementCtrl', function($scope) {
    $scope.title = 'Announcements';

    $scope.announcements = [
        {
            title: 'Sample',
            description: 'Lorel ipsum asdasdjfiadasd',
            done: false 
        },
        {
            title: 'Sample',
            description: 'Lorel ipsum asdasdjfiadasd',
            done: false 
        },
        {
            title: 'Sample',
            description: 'Lorel ipsum asdasdjfiadasd',
            done: false 
        },
        {
            title: 'Sample',
            description: 'Lorel ipsum asdasdjfiadasd',
            done: false 
        },
        {
            title: 'Sample',
            description: 'Lorel ipsum asdasdjfiadasdLorel ipsum asdasdjfiadasdLorel ipsum asdasdjfiadasdLorel ipsum asdasdjfiadasdLorel ipsum asdasdjfiadasdLorel ipsum asdasdjfiadasd',
            done: false 
        }
    ];
});
