app.controller("profileController", function ($scope, $http) {
	$scope.message;
	$scope.userMessages;
	$scope.profileName = window.profileName;
	$scope.user = window.user;
	$scope.success = false;

	$scope.postMessage = function() {
		$http.post('/postMessage', {message: $scope.message}).success(function(data, status, headers, config){
			$scope.success = true;
		});
	};

	$scope.getMessages = function() {
	$http.get('getMessages?user=' + $scope.profileName).success(function(data, status, headers, config){
			$scope.userMessages = data;
		});
	};

	initializePage = function() {
		$scope.getMessages();
	};

	initializePage();

});