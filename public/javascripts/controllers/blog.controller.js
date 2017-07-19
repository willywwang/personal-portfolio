angular.module('websiteApp')
.controller('blogController', ['$scope', '$rootScope', '$uibModal', '$http', '$location', '$window', 'authProvider',
	function($scope, $rootScope, $uibModal, $http, $location, $window, authProvider) {
		$scope.blogPosts = [];
		$scope.filters = {
			category: [],
			keyword:[]
		};

		$scope.categories = [];
		$scope.keywords = [];

		$scope.showErrors = false;
		$scope.date = new Date();

		(function loadPosts() {
			// filter first

			$http.get('/blog/all').success(function(data) {
				if(data.state === 'success') {
					$scope.blogPosts = data.posts;
				} else {
					var errorBlogPost = {
						postId: 0,
						title: "An error occured retriving blog posts. Please try again later",
						summary: "",
						post: "",
						created_by: "System",
						keyWords: ["Error", "Bug"],
						created_on: $scope.date
					}

					$scope.blogPosts.push(errorBlogPost);
				}
			})
		})();

		(function loadCategories() {
			$http.get('/blog/all/category').success(function(data) {
				if(data.state === 'success') {
					$scope.categories = data.categories;
				} else {
					var errorBlogPost = {
						postId: 0,
						title: "An error occured retrieving cateogry filter. Please try again later",
						summary: "",
						post: "",
						created_by: "System",
						keyWords: ["Error", "Bug"],
						created_on: $scope.date
					}

					$scope.blogPosts.push(errorBlogPost);
				}
			})
		})();

		(function loadKeywords() {
			$http.get('/blog/all/keywords').success(function(data) {
				if(data.state === 'success') {
					$scope.keywords = data.keyWords;
				} else {
					var errorBlogPost = {
						postId: 0,
						title: "An error occured retrieving keywords filter. Pleaes try again later",
						summary: "",
						post: "",
						created_by: "System",
						keyWords: ["Error", "Bug"],
						created_on: $scope.date
					}

					$scope.blogPosts.push(errorBlogPost);
				}
			})
		})();

		$scope.isAuthenticated = false;

		(function checkAuthentication() {
			var user = authProvider.getUser();

			$http.post('/auth/isAuthenticated', user).success(function(data) {
				$scope.isAuthenticated = data.status;
			});
		})();

		$scope.addPost = function() {
			$location.path('/blog/add/post');
		}

		$scope.updatePost = function(post) {
			$location.path('/blog/edit/post/' + post.postId);
		}

		$scope.deletePost = function(post) {
			$http.get('/blog/post/remove/' + post.postId).success(function(data) {
				return;
			})
		}
	}]);