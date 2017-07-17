var app = angular.module('websiteApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'chart.js']);

app.run(['$rootScope', '$http', '$window', '$location',
	function($rootScope, $http, $window, $location) {
	}]);

app.config(function($routeProvider, $locationProvider)	 {
	$routeProvider.when('/', {
		templateUrl: 'home.html',
		controller: 'homeController'
	})
	.when('/blog', {
		templateUrl: 'blog.html',
		controller: 'blogController'
	})
	.otherwise({redirectTo: '/'})

	$locationProvider.html5Mode(true);
});