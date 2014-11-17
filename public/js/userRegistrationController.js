app.controller("userRegistrationController", function ($scope, $http) {
	$scope.username;
	$scope.password;
	$scope.passwordConfirmation;
	$scope.success = false;
	$scope.passwordWarning = false;

	$scope.createUser = function(){
		if($scope.password !== $scope.passwordConfirmation) {
			$scope.passwordWarning = true;
			return;
		}

		$http.post('/api/create', {username: $scope.username.toLowerCase(), password: $scope.password}).success(function(data){
   			$scope.success = true;
		});
	};

	$scope.login = function(){
		$http.post('/login', {username: $scope.username.toLowerCase(), password: $scope.password}).success(function(data, status, headers, config) {
   			window.location = '/' + $scope.username;
		});;
	};

});