app.controller("inboxController", function ($scope, $http) {
	$scope.recipient;
	$scope.currentMessage;
	$scope.selectedTab = 1; //[todo] implement lazy loading here?

	$scope.privateMessages;
	$scope.drafts;
	$scope.sentMessages;

	$scope.messageSentSuccess = false;
	$scope.draftSavedSuccess = false;
	$scope.messageDeleteSuccess = false;


	$scope.getPrivateMessages = function() {
		$http.get('/getPrivateMessages').success(function(data, status, headers, config){
			$scope.privateMessages = data;
		});
	};

	$scope.getDrafts = function() {
		$http.get('/getDrafts').success(function(data, status, headers, config){
			$scope.drafts = data;
		});
	};

	$scope.getSentMessages = function() {
		$http.get('/getSentMessages').success(function(data, status, headers, config){
			$scope.sentMessages = data;
		});
	}

	$scope.sendPrivateMessage = function() {
		$http.post('/sendPrivateMessage', {recipient: $scope.recipient, message: $scope.currentMessage}).success(function(data, status, headers, config){
			$scope.messageSentSuccess = true;
			window.reload();
		});
	};

	$scope.saveDraft = function() {
		$http.post('/sendPrivateMessage', {recipient: $scope.recipient, message: $scope.currentMessage}).success(function(data, status, headers, config){
			$scope.draftSavedSuccess = true;
			window.reload();
		});
	}

	$scope.deleteSentMessage = function(id) {
		$http.post('/deleteSentPrivateMessage', {id: id}).success(function(data, status, headers, config){ //consider using a delete?
			$scope.messageDeleteSuccess = true;
		});
	}

	$scope.deleteRecievedMessage = function(id){
		$http.post('/deleteRecievedPrivateMessage', {id: id}).success(function(data, status, headers, config){
			$scope.messageDeleteSuccess = true;
		});
	}


	$scope.changeTab = function(tab) { 
		$scope.selectedTab = tab;
	};

	initializePage = function() {
		$scope.getPrivateMessages();
		$scope.getDrafts();
		$scope.getSentMessages();
	};

	initializePage();

});