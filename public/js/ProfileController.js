app.controller("profileController", function ($scope, $http) {
	$scope.message;
	$scope.usermessages;
	$scope.success = false;

	$scope.postMessage = function() {
		$http.post('/postMessage', {message: $scope.message}).success(function(data, status, headers, config){
			$scope.success = true;
		});
	};

	$scope.getMessages = function() {
//	$http.get('getMessages?user='+)


	};

});