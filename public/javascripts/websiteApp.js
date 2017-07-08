var app = angular.module('sampleApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

app.run(['$rootScope', '$http', '$window', '$location',
 function($rootScope, $http, $window, $location) {
}]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'home.html',
		controller: 'homeController'
	})
});