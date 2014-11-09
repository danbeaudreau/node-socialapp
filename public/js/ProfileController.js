app.controller("profileController", function ($scope, $http) {
	$scope.message;
	$scope.userMessages;
	$scope.userFriends;
	$scope.friendsCount;
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
			location.reload();
		});
	};

	$scope.getMessages = function() {
		$http.get('getMessages?user=' + $scope.profileName).success(function(data, status, headers, config){
			$scope.userMessages = data;
			for(var key in $scope.userMessages) {
				 if (!$scope.userMessages.hasOwnProperty(key)) {
        			continue;
    		 	}
    		 getUserImage(key, $scope.userMessages, "author");
    		 //this is handled in another function due to async requests
			}
		});
	};

	$scope.getFriends = function() {
		$http.get('getFriends?user=' + $scope.profileName).success(function(data, status, headers, config){
			$scope.userFriends = data;
			$scope.friendsCount = ' (' + data.length + ')';
			for(var key in $scope.userFriends) {
				if(!$scope.userFriends.hasOwnProperty(key)) {
					continue;
				}
			    getUserImage(key, $scope.userFriends, "friend");
			}
		});
	};

	$scope.addFriend = function() {
		$http.post('/makeFriendReqest', {recipient: $scope.profileName}).success(function(data, status, headers, config){
			//[todo] implement success message, remove link if friend request is pending
		});
	}

	$scope.changeSettings = function() {
	$http.post('/changeSettings', {profileImageURL : $scope.profileImageURLSettings, bio : $scope.bioSettings}).success(function(data, status, headers, config){
			$scope.profileImageURL = $scope.profileImageURLSettings;
			$scope.bio = $scope.bioSettings;
			$scope.settingPostSuccess = true;
		});
	};

	$scope.reverse = function(array) {
         var copy = [].concat(array);
         return copy.reverse();
	}

	getUserImage = function(key, arrayType, userType) {
		$http.get('/getImage?user=' + arrayType[key][userType]).success(function(data, status, headers, config){
				arrayType[key].profileImageURL = data;
		});
	};

	initializePage = function() {
		$scope.getMessages();
		$scope.getFriends();
	};

	initializePage();

});