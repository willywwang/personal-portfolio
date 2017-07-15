angular.module('websiteApp')
.controller('homeController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		$scope.date = new Date();

		$scope.landingDescriptors = ['Computer Science Student', 'Web Development', 'Android Development', 'Colliegiate eSports', 'Customer Support', 'Computer Builder'];

		$scope.name = $window.sessionStorage.getItem('name') || "";
		$scope.email = $window.sessionStorage.getItem('email') || "";
		$scope.message = $window.sessionStorage.getItem('message') || "";

		$scope.showErrors = false;
		$scope.showSuccess = false;
		$scope.didUserSubmit = false;
		
		$scope.isProjectModalOpen = false;

		// initializing donut graph data
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

		$scope.average_labels = ["Plan", "Design", "Develop", "Review", "Fix", "Deploy"];
		$scope.average_colors = ["rgba(151,187,205)", "rgba(220,220,220)", "rgba(70,191,189)", "rgba(253,180,92)", "rgba(148,159,177)", "rgba(77,83,96)"];
		$scope.average_percentages = [15, 20, 35, 13, 12, 5];

		$scope.average_override = { 
			borderColor: ['#ED6A5A', '#ED6A5A', '#ED6A5A', '#ED6A5A', '#ED6A5A', '#ED6A5A', '#ED6A5A']
		};

		// initializing line graph data
		$scope.line_labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		$scope.line_data = [1, 4, 2, 2, 1, 0, 0];
		$scope.line_options = {
			tooltips: {
				enabled: false
			},
			hover: {
				mode: null
			},
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					}
				}],
				yAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						stepSize: 1,
						beginAtZero: true
					}
				}]
			}
		};

		$scope.updateName = function() {
			$window.sessionStorage.setItem('name', $scope.name);
		};

		$scope.updateEmail = function() {
			$window.sessionStorage.setItem('email', $scope.email);
		};

		$scope.updateMessage = function() {
			$window.sessionStorage.setItem('message', $scope.message);
		};

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
		};

		$scope.openEDPModal = function() {
			$uibModal.open({
				templateUrl: 'edp.template.html',
				controller: 'modalController'
			});
		};

		$scope.openAffModal = function() {
			$uibModal.open({
				templateUrl: 'affinity.template.html',
				controller: 'modalController'
			});
		};

		$scope.openKumonModal = function() {
			$uibModal.open({
				templateUrl: 'kumon.template.html',
				controller: 'modalController'
			});
		};

		$scope.openPythonProjectModal = function() {
			$uibModal.open({
				templateUrl: 'python.project.template.html',
				controller: 'modalController'
			});
		};

		$scope.openWebProjectModal = function() {
			$uibModal.open({
				templateUrl: 'web.project.template.html',
				controller: 'modalController'
			});
		};
	}]);