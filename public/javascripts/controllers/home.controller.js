angular.module('websiteApp')
.controller('homeController', ['$scope', '$rootScope', '$http', '$window',
	function($scope, $rootScope, $http, $window) {
    	$scope.date = new Date();

		$scope.name = $window.sessionStorage.getItem('name') || "";
		$scope.email = $window.sessionStorage.getItem('email') || "";
		$scope.message = $window.sessionStorage.getItem('message') || "";
		$scope.showErrors = false;
		$scope.showSuccess = false;
		$scope.didUserSubmit = false;

		$scope.expected_action_labels = ["Sleep", "School", "Food", "Leisure", "Housework", "General"];
		$scope.expected_action_percentages = [33, 33, 9, 17, 4, 4];
		$scope.expected_graph_override = { 
			borderColor: ['#008080', '#008080', '#008080', '#008080', '#008080', '#008080', '#008080']
		};

		$scope.actual_action_labels = ["Sleep", "School", "Food", "Leisure", "Housework", "General"];
		$scope.actual_action_percentages = [40, 20, 15, 20, 1, 4];
		$scope.actual_graph_override = { 
			borderColor: ['#008080', '#008080', '#008080', '#008080', '#008080', '#008080', '#008080']
		};

		$scope.updateName = function() {
			$window.sessionStorage.setItem('name', $scope.name);
		}

		$scope.updateEmail = function() {
			$window.sessionStorage.setItem('email', $scope.email);
		}

		$scope.updateMessage = function() {
			$window.sessionStorage.setItem('message', $scope.message);
		}

		$scope.submit = function() {
			$scope.didUserSubmit = true;
			var request = {
				name: $scope.name,
				email: $scope.email,
				message: $scope.message
			};

			$http.post('/contact/email', request).success(function(data) {
				if (data.state === "success") {
					$scope.showSuccess = true;
					$window.sessionStorage.clear();
				} else {
					$scope.showErrors = true;
				}

				$scope.didUserSubmit = false;
			});
		}
	}]);