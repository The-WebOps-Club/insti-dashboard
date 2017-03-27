/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';
  //
  // angular.module('BlurAdmin.componenets')
  // .directive('weatherComp', function () {
  //   return {
  //     restrict: 'EA',
  //     controller: 'WeatherAppCtrl',
  //     templateUrl: 'app/componenets/weather/weather.html'
  //   };
  // })
  // .factory('weatherService', ['$http', function($http) {
  //   return {
  //     getWeather: function() {
  //       var weather = { temp: {}, clouds: null };
  //       //$http.get('http://api.openweathermap.org/data/2.5/weather?q=Chennai&APPID=0176c3c79e07573c35c6a1ed8ac6a485&units=metric').then(function(data) {
  //       $http({method: 'GET', url: 'https://api.apixu.com/v1/current.json?key=908ba54ba3ce41839ab80259172203&q=Chennai',
  //           withCredentials: false}).then(function(response) {
  //           if (response.data) {
  //               var data = response.data;
  //               if (data.current) {
  //                   weather.temp.current = data.current.temp_c;
  //                   weather.temp.feelslike= data.current.feelslike_c;
  //
  //                   weather.temp.wind_kph = data.current.wind_kph;
  //                   weather.temp.wind_degree= data.current.wind_degree;
  //                   weather.temp.wind_dir = data.current.wind_dir;
  //
  //                   weather.temp.condition = data.current.condition;
  //
  //               }
  //               weather.clouds = data.current.cloud;
  //           }
  //       }).catch(function(error){
  //           console.log(error);
  //       });
  //
  //       return weather;
  //     }
  //   };
  // }])
  //
  // .filter('temp', [ '$filter', function($filter) {
  //   return function(input, precision) {
  //       if (!precision) {
  //           precision = 1;
  //       }
  //       var numberFilter = $filter('number');
  //       return numberFilter(input, precision) + '\u00B0C';
  //   };
  // }])
  //
  // .controller('WeatherAppCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {
  //   $scope.weather = weatherService.getWeather();
  // }])
  //
  // .directive('weatherIcon', function() {
  //   return {
  //       restrict: 'E', replace: true,
  //       scope: {
  //           cloudiness: '@'
  //       },
  //       controller: function($scope) {
  //           $scope.imgurl = function() {
  //               var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
  //               if ($scope.cloudiness < 20) {
  //                   return baseUrl + 'sunny.png';
  //               } else if ($scope.cloudiness < 90) {
  //                  return baseUrl + 'partly_cloudy.png';
  //               } else {
  //                   return baseUrl + 'cloudy.png';
  //               }
  //           };
  //       },
  //       template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
  //   };
  // });

})();
