angular.module('websiteApp')
.controller('blogController', ['$scope', '$rootScope', '$uibModal', '$http', '$location', '$window', 'authProvider',
	function($scope, $rootScope, $uibModal, $http, $location, $window, authProvider) {
		$scope.blogPosts = [];
		$scope.filteredBlogPosts = [];

		$scope.date = new Date();

		$scope.subscribe = function() {
			$uibModal.open({
				templateUrl: 'subscribe.template.html',
				controller: 'modalController'
			});
		};

		// TODO: Add filtering
		function filterPosts() {
			$scope.filteredBlogPosts = _.chain($scope.blogPosts)
			.filter(filterByCategory)
			.value();
		}

		function filterByCategory(post) {
			if ($scope.updatedFilters.category.length === 0){
				return true;
			}

			return _.contains($scope.updatedFilters.category, post.category);
		}

		function loadPosts() {
			$http.post('/blog/all').success(function(data) {
				if(data.state === 'success') {
					$scope.filteredBlogPosts = data.posts;
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

					$scope.filteredBlogPosts.push(errorBlogPost);
				}
			})
		};

		function loadCategories() {
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

					$scope.filteredBlogPosts.push(errorBlogPost);
				}
			})
		};

		function loadKeywords() {
			$http.get('/blog/all/keywords').success(function(data) {
				if(data.state === 'success') {
					$scope.keywords = data.keywords;
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

					$scope.filteredBlogPosts.push(errorBlogPost);
				}
			})
		};

		function loadData() {
			loadPosts();
			//loadKeywords();
			//loadCategories();
		}

		loadData();

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
				loadData();
			});
		}

		$scope.onCategoryFilterChanged = function() {
			$scope.updatedFilters.category = _.map($scope.filters.category, function(category) {
				return category.trim();
			});

			filterPosts();
		}
	}]);