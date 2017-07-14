var app = angular.module('websiteApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'chart.js']);

app.run(['$rootScope', '$http', '$window', '$location',
	function($rootScope, $http, $window, $location) {
	}]);

app.config(function($routeProvider, $locationProvider)	 {
	$routeProvider.when('/', {
		templateUrl: 'home.html',
		controller: 'homeController'
	})
	.when('/experience', {
		templateUrl: 'experience.html',
		controller: 'experienceController'
	})

	$locationProvider.html5Mode(true);
});