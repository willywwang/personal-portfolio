angular.module('websiteApp')
.controller('headerController', ['$scope', '$rootScope', '$http', '$location', '$anchorScroll', '$window', '$uibModal',
	function($scope, $rootScope, $http, $location, $anchorScroll, $window, $uibModal) {
		$scope.openContactModal = function() {
			$uibModal.open({
	    		templateUrl: 'contact.template.html',
	    		controller: 'contactController'
			});
		}

		$scope.getActiveMenuLinkClass = function(path) {
			if (!path) {
				return '';
			}
			
			return ($location.path() === path) ? 'active' : '';
		}
	}]);