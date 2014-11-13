app.controller("inboxController", function ($scope, $http) {
	//local data
	$scope.recipient = "";
	$scope.currentMessage = "";
	$scope.selectedTab = 1; //[todo] implement lazy loading here?

	$scope.privateMessages;
	$scope.drafts;
	$scope.sentMessages;

	//bootstrap success alerts
	$scope.messageSentSuccess = false;
	$scope.draftSavedSuccess = false;
	$scope.messageDeleteSuccess = false;
	$scope.draftDeleteSuccess = false;

	//bootstrap warnings
	$scope.editDraftWarning = false;


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
			$scope.recipient = "";
			$scope.currentMessage = "";
		});
	};

	$scope.saveDraft = function() {
		$http.post('/saveDraft', {recipient: $scope.recipient, message: $scope.currentMessage}).success(function(data, status, headers, config){
			$scope.draftSavedSuccess = true;
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

	$scope.deleteDraft = function(id) {
		$http.post('/deleteDraft', {id: id}).success(function(data, status, headers, config){
			$scope.draftDeleteSuccess = true; 
		});
	}

	$scope.changeTab = function(tab) { 
		$scope.selectedTab = tab;
	};

	$scope.edit = function(recipient, message) {
		warnIfMessageInProgress();

		$scope.recipient = recipient;
		$scope.currentMessage = message;
		$scope.selectedTab = 0;
	};

	$scope.reply = function(recipient) {
		warnIfMessageInProgress();

		$scope.recipient = recipient;
		$scope.selectedTab = 0;
	}

	warnIfMessageInProgress = function() {
		if($scope.recipient !== "" || $scope.currentMessage !== "") { //improve later
			$scope.editDraftWarning = true;
			return;
		} 
	}

	initializePage = function() {
		$scope.getPrivateMessages();
		$scope.getDrafts();
		$scope.getSentMessages();
	};

	initializePage();

});