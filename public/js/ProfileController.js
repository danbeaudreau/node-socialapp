app.controller("profileController", function ($scope, $http) {
	$scope.message;
	$scope.userMessages;
	$scope.profileName = window.profileName;
	$scope.profileImageURL = window.profileImageURL;
	$scope.profileImageURLSettings;
	$scope.messagePostSuccess = false;
	$scope.settingPostSuccess = false;

	$scope.postMessage = function() {
		$http.post('/postMessage', {message: $scope.message}).success(function(data, status, headers, config){
			$scope.messagePostSuccess = true;
		});
	};

	$scope.getMessages = function() {
	$http.get('getMessages?user=' + $scope.profileName).success(function(data, status, headers, config){
			$scope.userMessages = data;
		});
	};

	$scope.changeSettings = function() {
	$http.post('/changeSettings', {profileImageURL : $scope.profileImageURLSettings}).success(function(data, status, headers, config){
			$scope.profileImageURL = $scope.profileImageURLSettings;
			$scope.settingPostSuccess = true;
		});
	};

	initializePage = function() {
		$scope.getMessages();
	};

	initializePage();

});