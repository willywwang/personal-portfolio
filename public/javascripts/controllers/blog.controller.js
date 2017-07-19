angular.module('websiteApp')
.controller('blogController', ['$scope', '$rootScope', '$uibModal', '$http', '$location', '$window', 'authProvider',
	function($scope, $rootScope, $uibModal, $http, $location, $window, authProvider) {
		$scope.blogPosts = [];
		$scope.filters = {
			category: [],
			keyword:[]
		};
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
						title: "An error occured. Pleaes try again later",
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