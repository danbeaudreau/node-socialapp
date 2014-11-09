app.controller("userRegistrationController", function ($scope, $http) {
	$scope.username;
	$scope.password;
	$scope.success = false;
	$scope.danger = false;

	$scope.createUser = function(){
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