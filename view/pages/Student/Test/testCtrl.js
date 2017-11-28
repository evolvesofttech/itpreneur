/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("testCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
     
    $window.document.title = "ITPreneur - Test";

    /*=====================================
    =            Get Test List            =
    =====================================*/
    var testListUrl = baseUrlSrvc.baseUrl + 'listTestByadUserId/' + $sessionStorage.adUserId;
    var promisetestGet = CRUD_SERVICE.getAllData(testListUrl);
    promisetestGet.then(function(pl) {
            $scope.testData = pl.data;
            
            console.log("$scope.testData",$scope.testData);
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
