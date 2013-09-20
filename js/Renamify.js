app.factory('selectedAnswersService', function(){
    var results = {stances: []};
    function get(){
        return results;
    }
    return {get:get};
});

app.controller('mainController', function($scope, selectedAnswersService){
	$scope.approvalRatingBase = 25;
	$scope.approvalRating = null;
	$scope.approvalClass = 'start';
	$scope.candidateName = 'NGP VAN';
	$scope.issues = [
		{name: 'Healthcare', stances: [{description: 'Poison everyone', effect: -20}, {description: 'Free for all people!', effect: 15}]},
		{name: 'Enviroment', stances: [{description: 'Chop down the trees', effect: -5}, {description: 'Imprison those who don\'t recycle', effect: 50}]},
        {name: 'Warfare', stances: [{description: 'World police to the rescue!', effect: -10}, {description: 'Why can\'t we all just get along?', effect: 15}]}
	];
	var stances = selectedAnswersService.get();
    $scope.selectedStances = stances.stances;
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
	$scope.setAlert = function(option) {
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

//send emails
app.controller('emailGrabber', ['$scope', 'selectedAnswersService', function($scope, selectedAnswersService){
    var endpoint = new Firebase('https://harvester.firebaseio.com/emails');
    $scope.harvest = function($event){
        if (!$scope.email){
            $event.stopPropagation();
            return false;   
        }
        var stances = selectedAnswersService.get().stances;
        var ref = endpoint.push();
        ref.set({email:$scope.email, stances:stances});
        location.href='/';
    }
}])