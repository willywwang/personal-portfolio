angular.module('websiteApp')
.controller('authController', ['$scope', '$rootScope', '$http', '$window', '$location', '$uibModal', 'authProvider',
	function($scope, $rootScope, $http, $window, $location, $uibModal, authProvider) {
		$scope.showErrors = false;

		$scope.user = {
			username: '',
			password: '',
			cookie: ''
		};

	    $scope.login = function() {
	    	$http.post('/auth/login', $scope.user).success(function(data) {
	    		if (data.state === 'success') {
	    			authProvider.setUser(data.user.username, data.user.cookie);
	    			$location.path('/');
	    		} else {
	    			$scope.error_message = data.message[0];
	    			$scope.showErrors = true;
	    		}
	    	});
	    }

	}]);