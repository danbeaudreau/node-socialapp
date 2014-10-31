app.controller("profileController", function ($scope, $http) {
	$scope.message;
	$scope.success;

	$scope.postMessage = function() {
		$http.post('/api/postMessage', {message: $scope.message}).success(function(data, status, headers, config){
			$scope.success = true;
		});
	};

});