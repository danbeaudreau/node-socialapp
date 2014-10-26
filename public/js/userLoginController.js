app.controller("userLoginController", function ($scope, $http) {
	$scope.username;
	$scope.password;


	$scope.createUser = function(){
		$http.post('/login', {username: $scope.username, password: $scope.password}).success(function(data, status, headers, config) {
   			window.location = '/profile';
		});;
	};
});