var app = angular.module('websiteApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.run(['$rootScope', '$http', '$window', '$location',
 function($rootScope, $http, $window, $location) {
}]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'home.html',
		controller: 'homeController'
	})
});