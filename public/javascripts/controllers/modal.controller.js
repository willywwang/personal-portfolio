angular.module('websiteApp')
.controller('modalController', ['$scope', '$rootScope','$uibModal', '$uibModalInstance', '$http', 'data',
	function($scope, $rootScope, $uibModal, $uibModalInstance, $http, data) {
		$scope.didUserSubmit = false;
		$scope.showErrors = false;
		$scope.showSuccess = false;
		$scope.subscriptionError = "";

		(function init() {
			$scope.title = data.title;

			if (data.type === 'job') {
				$scope.description = data.description;
			}
		})();

		$scope.close = function() {
			$uibModalInstance.close();
		};

		$scope.subscribe = function() {
			$scope.didUserSubmit = true;
			$scope.showErrors = false;
			$scope.showSuccess = false;
			$scope.subscriptionError = "";

			if (!$scope.email) {
				$scope.didUserSubmit = false;
				$scope.showErrors = true;
				$scope.subscriptionError = "Subscription failed. Please try again.";
				return;
			}

			var request = {
				email: $scope.email,
				email_lower: $scope.email.toLowerCase()
			};

			$http.post('/blog/subscribe', request).success(function(data) {
				if (data.state === 'success') {
					$scope.showSuccess = true;
				} else {
					$scope.showErrors = true;
					$scope.subscriptionError = data.error;
				}

				$scope.didUserSubmit = false;
			})
		}
	}]);