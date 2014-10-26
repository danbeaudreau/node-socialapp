app.controller("userRegistrationController", function ($scope, $http) {
	$scope.username;
	$scope.password;


	$scope.createUser = function(){
		$http.post('/api/create', {name: $scope.username, password: $scope.password});
	};
});