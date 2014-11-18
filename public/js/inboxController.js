app.controller("inboxController", function ($scope, $http, $filter) {
	//user data
	$scope.user = window.user;

	//message data
	$scope.recipient = "";
	$scope.currentMessage = "";
	$scope.subject = "";

	$scope.messageViewIsFrom;
	$scope.messageViewMessage;
	$scope.messageViewMessageType;
	$scope.isMessageView = false;

	//utilities
	$scope.selectedTab = 1; 
	$scope.searchText;

	//general data
	$scope.privateMessages;
	$scope.drafts;
	$scope.sentMessages;
	$scope.contacts;

	//bootstrap success alerts
	$scope.alerts = {
		messageSentSuccess: false,
		draftSavedSuccess: false,
		messageDeleteSuccess: false,
		draftDeleteSuccess: false
	}

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

	$scope.getContacts = function() {
		$http.get('/getFriends?user=' + $scope.user).success(function(data, status, headers, config){
			$scope.contacts = data;
		});

	}

	$scope.sendPrivateMessage = function() {
		$http.post('/sendPrivateMessage', {recipient: $scope.recipient, subject: $scope.subject, message: $scope.currentMessage}).success(function(data, status, headers, config){
			$scope.alerts.messageSentSuccess = true;
			if($scope.user === $scope.recipient){
				$scope.getPrivateMessages();
			}
			$scope.recipient = "";
			$scope.subject = "";
			$scope.currentMessage = "";
			$scope.getSentMessages();
		});
	};

	$scope.saveDraft = function() {
		$http.post('/saveDraft', {recipient: $scope.recipient, subject: $scope.subject, message: $scope.currentMessage}).success(function(data, status, headers, config){
			$scope.alerts.draftSavedSuccess = true;
			$scope.getDrafts();
		});
	}

	$scope.deleteSentMessage = function(id) {
		$http.post('/deleteSentPrivateMessage', {id: id}).success(function(data, status, headers, config){ //consider using a delete?
			$scope.alerts.messageDeleteSuccess = true;
			$scope.getSentMessages();
		});
		$scope.isMessageView = false;
	}

	$scope.deleteRecievedMessage = function(id){
		$http.post('/deleteRecievedPrivateMessage', {id: id}).success(function(data, status, headers, config){
			$scope.alerts.messageDeleteSuccess = true;
			$scope.getPrivateMessages();
		});
		$scope.isMessageView = false;
	}

	$scope.deleteDraft = function(id) {
		$http.post('/deleteDraft', {id: id}).success(function(data, status, headers, config){
			$scope.alerts.draftDeleteSuccess = true;
			$scope.getDrafts(); 
		});
		$scope.isMessageView = false;
	}

	$scope.changeTab = function(tab) { 
		$scope.isMessageView = false;
		$scope.searchText = "";
		$scope.selectedTab = tab;
		disableAlerts();
	};

	$scope.edit = function(recipient, subject, message) {
		$scope.isMessageView = false;
		warnIfMessageInProgress();

		$scope.recipient = recipient;
		$scope.subject = subject;
		$scope.currentMessage = message;
		$scope.selectedTab = 0;
	};

	$scope.reply = function(recipient) {
		$scope.isMessageView = false;
		warnIfMessageInProgress();

		$scope.recipient = recipient;
		$scope.selectedTab = 0;
	}

	$scope.enterMessageView = function(isFrom, message, messageViewMessageType) {
		$scope.messageViewIsFrom = isFrom; 
		$scope.messageViewMessage = message;
		$scope.messageViewMessageType = messageViewMessageType;
		$scope.isMessageView = true;
	}

	warnIfMessageInProgress = function() {
		if($scope.recipient !== "" || $scope.currentMessage !== "" || $scope.subject !== "") { //improve later
			$scope.editDraftWarning = true;
			return;
		} 
	}

	disableAlerts = function() {
		for(var key in $scope.alerts){
			$scope.alerts[key] = false;
		}
	}

	initializePage = function() {
		$scope.getPrivateMessages();
		$scope.getDrafts();
		$scope.getSentMessages();
		$scope.getContacts();
	};

	initializePage();

});