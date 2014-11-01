app.controller("profileController", function ($scope, $http) {
	$scope.message;
	$scope.userMessages;
	$scope.profileName = window.profileName;
	$scope.profileImageURL = window.profileImageURL;
	$scope.joinDate = window.joinDate;
	$scope.bio = window.bio;
	$scope.profileImageURLSettings = window.profileImageURL;
	$scope.bioSettings = window.bio;
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
	$http.post('/changeSettings', {profileImageURL : $scope.profileImageURLSettings, bio : $scope.bioSettings}).success(function(data, status, headers, config){
			$scope.profileImageURL = $scope.profileImageURLSettings;
			$scope.bio = $scope.bioSettings;
			$scope.settingPostSuccess = true;
		});
	};


	initializePage = function() {
		$scope.getMessages();
	};

	initializePage();

});