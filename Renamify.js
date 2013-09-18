// The controller is a regular JavaScript function. It is called
// once when AngularJS runs into the ng-controller declaration.

function InlineEditorController($scope){

	// $scope is a special object that makes
	// its properties available to the view as
	// variables. Here we set some default values:

	$scope.showtooltip = false;
	$scope.value = 'Voter';
    
    $scope.showdomaintooltip = false;
    $scope.domainvalue = 'ly'

	// Some helper functions that will be
	// available in the angular declarations

	$scope.hideTooltip = function(){

		// When a model is changed, the view will be automatically
		// updated by by AngularJS. In this case it will hide the tooltip.

		$scope.showtooltip = false;
        $scope.showdomaintooltip = false;
	}

    $scope.hideDomainTooltip = function(){
        //Attach this to the tld input
        
        $scope.showdomaintooltip = false;
    }

	$scope.toggleTooltip = function(e){
		e.stopPropagation();
		$scope.showtooltip = !$scope.showtooltip;
	}
    
    $scope.toggleDomainTooltip = function(e){
		e.stopPropagation();
		$scope.showdomaintooltip = !$scope.showdomaintooltip;
		if ($scope.showtooltip) {
                    $scope.toggleTooltip(e);
                }
	}
}