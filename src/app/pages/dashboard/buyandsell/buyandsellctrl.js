angular.module('BlurAdmin.pages.dashboard', [])

.controller("myCtrl", function($scope) {
  $scope.records = [
    {
    	"name" : "John",
    	"product" : "Laptop",
    	"price" : "30000",
    	"description" : "It is an awesome gaming laptop with 8GB RAM and 4GB AMD RADEON Graphic card.Intel CORE i7 inside."
    },
    {
    	"name" : "Doe",
    	"product" : "Food Court Coupons",
    	"price" : "1000",
    	"description" : "I have Food Court Coupons of worth 2000.I can sell it for 1000."
    }
  ]
});