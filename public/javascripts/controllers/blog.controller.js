angular.module('websiteApp')
.controller('blogController', ['$scope', '$rootScope', '$http', '$window',
	function($scope, $rootScope, $http, $window) {
		$scope.blogPosts = [];
		$scope.date = new Date();

		// todo: do an http get to Mongo.

		// todo: store in mongodb
		var defaultBlogPost = {
			title: "Coming Soon",
			type: "TBD",
			summary: "",
			post: "",
			created_by: "Will",
			created_on: $scope.date
		};

		$scope.blogPosts.push(defaultBlogPost);
	}]);