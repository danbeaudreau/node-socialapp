app.controller("inboxController", function ($scope, $http) {
	$scope.recipient;
	$scope.currentMessage;
	$scope.selectedTab = 1; //[todo] implement lazy loading here

	$scope.privateMessages;
	$scope.drafts;
	$scope.sentMessages;

	$scope.messageSentSuccess = false;
	$scope.draftSavedSuccess = false;


	$scope.getPrivateMessages = function() {
		$http.get('/getPrivateMessages').success(function(data, status, headers, config){
			$scope.privateMessages = data;
		});
	};

	$scope.sendPrivateMessage = function() {
		$http.post('/sendPrivateMessage', {recipient: $scope.recipient, message: $scope.currentMessage, isDraft: false}).success(function(data, status, headers, config){
			$scope.messageSentSuccess = true;
		});
	};

	$scope.saveDraft = function() {
		$http.post('/sendPrivateMessage', {recipient: $scope.recipient, message: $scope.currentMessage, isDraft: true}).success(function(data, status, headers, config){
			$scope.draftSavedSuccess = true;
		});
	};

	$scope.changeTab = function(tab) { 
		$scope.selectedTab = tab;
	};

	initializePage = function() {
		$scope.getPrivateMessages();
	};

	initializePage();

});