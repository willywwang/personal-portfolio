angular.module('websiteApp')
.controller('modalController', ['$scope', '$rootScope','$uibModal', '$uibModalInstance',
	function($scope, $rootScope, $uibModal, $uibModalInstance) {
		$scope.close = function() {
			$uibModalInstance.close();
		}
	}]);