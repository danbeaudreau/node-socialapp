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
		$http.post('/postMessage', {message: $scope.message, username: $scope.profileName}).success(function(data, status, headers, config){
			$scope.messagePostSuccess = true;
		});
	};

	$scope.getMessages = function() {
	$http.get('getMessages?user=' + $scope.profileName).success(function(data, status, headers, config){
			$scope.userMessages = data;
			for(var key in $scope.userMessages) {
			 if (!$scope.userMessages.hasOwnProperty(key)) {
        		continue;
    		 }
    		 getUserImage(key);
    		 //this is handled in another function due to async requests
		}
		});
	};

	$scope.changeSettings = function() {
	$http.post('/changeSettings', {profileImageURL : $scope.profileImageURLSettings, bio : $scope.bioSettings}).success(function(data, status, headers, config){
			$scope.profileImageURL = $scope.profileImageURLSettings;
			$scope.bio = $scope.bioSettings;
			$scope.settingPostSuccess = true;
		});
	};

	getUserImage = function(key) {
		$http.get('/getImage?user=' + $scope.userMessages[key].author).success(function(data, status, headers, config){
				$scope.userMessages[key].profileImageURL = data;
		});
	};

	initializePage = function() {
		$scope.getMessages();
	};

	initializePage();

});