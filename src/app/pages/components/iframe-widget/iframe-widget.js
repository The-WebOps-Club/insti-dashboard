angular.module('BlurAdmin.pages.components', [])

.directive('iframeWidget', function() {
 return {
 	restrict: 'E',
 	scope: {
 		title:'@title',
 		url: '@url'
 	},
    templateUrl: 'app/pages/components/iframe-widget/iframe.html'
  };
})
.config(function($sceDelegateProvider){
	$sceDelegateProvider.resourceUrlWhitelist([
		'self', 'https://hospital.iitm.ac.in/**'
	]);
});