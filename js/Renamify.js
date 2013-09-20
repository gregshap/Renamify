app.controller('mainController', function($scope){
	$scope.approvalRatingBase = 25;
	$scope.approvalRating = null;
	$scope.approvalClass = 'start';
	$scope.candidateName = 'NGP VAN';
	$scope.issues = [
		{name: 'Healthcare', stances: [{description: 'Poison everyone', effect: -20}, {description: 'Free for all people!', effect: 15}]},
		{name: 'Enviroment', stances: [{description: 'Chop down the trees', effect: -5}, {description: 'Imprison those who don\'t recycle', effect: 50}]}
	];
	$scope.selectedStances = [];
	$scope.showAlert = true;
	$scope.showFirstScreen = true;
	$scope.showSecondScreen = false;
	$scope.trend = 'none';
    $scope.init = function() {
    	$scope.approvalRating = $scope.approvalRatingBase;
    };
	$scope.alertOn = function(){
		return $scope.showAlert;
	}
	$scope.showAlert = function(option) {
		$scope.showAlert = option === false ? false : true;
	};
    $scope.calculateApprovalRating = function(){
    	var change = 0;
    	var approvalStart = $scope.approvalRatingBase;
    	angular.forEach($scope.selectedStances, function(value){
    		change += value;
    	});
    	$scope.approvalRating = approvalStart + change < 0 ? 0 : approvalStart + change;
    	$scope.approvalRating = $scope.approvalRating <= 100 ? $scope.approvalRating : 100;
    	if($scope.approvalRating !== approvalStart){
    		$scope.trend = $scope.approvalRating >= approvalStart ? 'up' : 'down';
    	}
    	else{
    		$scope.trend = 'none';
    	}
    };
    $scope.covertRatingtoClass = function(){
    	if($scope.showFirstScreen === true){
			$scope.approvalClass = 'start';
    	}
    	else{
	    	if($scope.approvalRating <= 100 && $scope.approvalRating > 74){
		    	$scope.approvalClass = 'great';
		    }
		    else if($scope.approvalRating <= 74 && $scope.approvalRating > 50){
		   		$scope.approvalClass = 'good';
		    }
		    else if($scope.approvalRating <= 50 && $scope.approvalRating > 24){
		    	$scope.approvalClass = 'bad';
		    }
		    else if($scope.approvalRating <= 24){
		    	$scope.approvalClass = 'abominable';
	    }
    	}
    };
    $scope.toggleScreens = function(current){
    	if(current == 'first'){
    		$scope.showFirstScreen = false;
    		$scope.showSecondScreen = true;
    	}
    	else{
    	    $scope.showFirstScreen = true;
    		$scope.showSecondScreen = false;	
    	}
 		$scope.covertRatingtoClass();
    };
    $scope.updateRating = function(){
    	$scope.calculateApprovalRating();
    	$scope.covertRatingtoClass();
    };
});