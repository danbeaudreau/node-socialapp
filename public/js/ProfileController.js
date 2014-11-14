app.controller("profileController", function ($scope, $http) {
	$scope.message;
	$scope.userMessages;
	$scope.userFriends;
	$scope.friendsCount;
	$scope.successMessage;

	$scope.user = window.user;
	$scope.profileName = window.profileName;
	$scope.profileImageURL = window.profileImageURL;
	$scope.joinDate = window.joinDate;
	$scope.bio = window.bio;
	$scope.profileImageURLSettings = window.profileImageURL;
	$scope.bioSettings = window.bio;

	$scope.friendRequestLinkIsVisible = true;
	$scope.friendsModuleIsVisible = true;
	$scope.friendRequestSuccess = false;
	$scope.messagePostSuccess = false;
	$scope.settingPostSuccess = false;

	$scope.postMessage = function() {
		$http.post('/postMessage', {message: $scope.message, username: $scope.profileName}).success(function(data, status, headers, config){
			$scope.messagePostSuccess = true;
			$scope.getMessages();
		});
	};

	$scope.getMessages = function() {
		$http.get('getMessages?user=' + $scope.profileName).success(function(data, status, headers, config){
			if(data.length > 6) { //limit the amount of messages to 6
				data = data.splice(data.length - 6, 6);
			}
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
			if(data.length > 6) { //limit the amount of friends to 6
				data = data.splice(0, 6);
			}
			if(data.length === 0){
				$scope.friendsModuleIsVisible = false;
			}
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
			$scope.successMessage = "Your request has been sent successfully.";
			$scope.friendRequestSuccess = true;
			$scope.friendRequestLinkIsVisible = false;
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
		if($scope.user != $scope.profileName) {
			$http.get('/getFriendRequestStatus' + '?recipient=' + $scope.profileName).success(function(data, status, headers, config){
				if(data.length > 0) {
					$scope.friendRequestLinkIsVisible = false;
				}
			});
		}
	};

	initializePage();

});