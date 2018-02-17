angular.module('websiteApp')
.controller('authController', ['$scope', '$rootScope', '$http', '$window', '$location', '$uibModal', 'authProvider',
	function($scope, $rootScope, $http, $window, $location, $uibModal, authProvider) {
		$scope.showErrors = false;
		$scope.isAuthenticated = false;

		$scope.user = {
			username: '',
			password: '',
			cookie: ''
		};

		$scope.login = function() {
			$scope.showErrors = false;
			$http.post('/auth/login', $scope.user).success(function(data) {
				if (data.state === 'success') {
					authProvider.setUser(data.user.username, data.user.cookie);
					$location.path('/');
				} else {
					$scope.error_message = data.message[0];
					$scope.showErrors = true;
				}
			});
		};

		function checkAuthentication() {
			var user = authProvider.getUser();

			$http.post('/auth/isAuthenticated', user).success(function(data) {
				if (data.state === 'failure') {
					$scope.showErrors = true;
					$scope.error_message = data.errorMessage;
				} else {
					$scope.isAuthenticated = data.status;

					if ($scope.isAuthenticated) {
						$scope.showErrors = true;
						$scope.error_message = "You are already logged in";
					}
				}
			});
		}

		checkAuthentication();
	}]);