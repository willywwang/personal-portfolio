angular.module('websiteApp')
.controller('postController', ['$scope', '$rootScope', '$http', '$location', '$window', '$routeParams',
	function($scope, $rootScope, $http, $location, $window, $routeParams) {
		$scope.showErrors = false;
		$scope.post = null;
		$scope.keyWords = "";

		function retrieveAndLoadPost() {
			if ($routeParams.postid) {
				$http.get('blog/find/post/' + $routeParams.postid).success(function(data) {
					if (data.state === 'success') {
						$scope.post = data.post;

						if ($scope.post.keyWords) {
							$scope.keyWords = $scope.post.keyWords.join();
						}
					}
				})
			}
		}

		retrieveAndLoadPost();

		$scope.submit = function() {
			$scope.showErrors = false;

			if ($scope.keyWords) {
				$scope.post.keyWords = $scope.keyWords.split(",");
			}

			if ($scope.post.postId) {
				$http.post('/blog/post/update/' + $scope.post.postId, $scope.post).success(function(data) {
					if (data.state === 'failure') {
						$scope.showErrors = true;

						if (data.errorMessage) {
							$scope.error_message = data.errorMessage;
						} else {
							$scope.error_message = 'An error occured. Please try again';
						}
					} else {
						$location.path('/blog');
					}
				});
			} else {
				$http.post('/blog/post/add', $scope.post).success(function(data) {
					if (data.state === 'failure') {
						$scope.showErrors = true;

						if (data.errorMessage) {
							$scope.error_message = data.errorMessage;
						} else {
							$scope.error_message = 'An error occured. Please try again';
						}
					} else {
						$location.path('/blog');
					}
				});
			}
		}
	}]);