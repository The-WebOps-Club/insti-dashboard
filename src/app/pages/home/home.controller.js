/**
 * @author chinnichaitanya
 * created on 25.03.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.home')
      .controller('HomeCtrl', ['$scope', HomeCtrl]);

  /** @ngInject */
  function HomeCtrl($scope) {

    $scope.gridsterOpts = {
      margins: [10, 10],
      columns: 6,
      draggable: {
        handle: 'div.panel-heading'
      },
      defaultSizeX: 2, // the default width of a gridster item, if not specifed
      defaultSizeY: 2, // the default height of a gridster item, if not specified
      minSizeX: 1, // minimum column width of an item
      maxSizeX: null, // maximum column width of an item
      minSizeY: 1, // minumum row height of an item
      maxSizeY: null, // maximum row height of an item
      resizable: {
        enabled: true
      }
    };

    $scope.gridsterTodo = {
      sizeX: 2,
      sizeY: 2,
    };

    $scope.gridsterAnnouncements = {
      sizeX: 2,
      sizeY: 2,
    };
    $scope.gridsterEvents = {
      sizeX: 2,
      sizeY: 2,
    };

    $scope.gridsterCalendar = {
      sizeX: 3,
      sizeY: 2,
    };

    $scope.gridsterWeather = {
      sizeX: 1,
      sizeY: 1,
    };

    $scope.gridsterStudents = {
      sizeX: 2,
      sizeY: 2
    };

    $scope.gridsterShareacab = {
      sizeX: 2,
      sizeY: 2
    };

    $scope.gridsterBuynSell = {
      sizeX: 2,
      sizeY: 2
    };

    $scope.gridsterLostnfound = {
      sizeX: 2,
      sizeY: 2
    };

  }

})();
