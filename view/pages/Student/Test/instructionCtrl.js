/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("instructionCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window, $localStorage) {
     
    $window.document.title = "ITPreneur - Test Instructions";
    $scope.OperType = $routeParams.ID;
    console.log($scope.OperType);
    $localStorage.Count = "";
    /*=====================================
    =            Get Test List            =
    =====================================*/
    var testUrl = baseUrlSrvc.baseUrl + 'listTestByTestId/' + $scope.OperType;
    var promiseTGet = CRUD_SERVICE.getAllData(testUrl);
    promiseTGet.then(function(pl) {
            $scope.SingleTest = pl.data[0];
            console.log("$scope.SingleTest",$scope.SingleTest);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });  
    /*=====  End of Get Test List  ======*/
       
    /*====================================
    =            Page Refresh            =
    ====================================*/
    $scope.refreshPage = function() {
        $timeout(function() {
           $scope.$apply(function () {
            $route.reload();
          });
      },100);
    }
    /*=====  End of Page Refresh  ======*/

    
    
    
});
/*=====  End of Controller  ======*/
