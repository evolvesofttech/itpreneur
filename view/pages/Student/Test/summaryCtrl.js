/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("summaryCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window,$location,topic_id) {

    $scope.OperType = $routeParams.ID;
    $scope.detailsArray = [];
    $scope.currentTopicId =topic_id.getTopic_id();
    console.log("$scope.currentTopicId",$scope.currentTopicId);
   /*=========================================
   =            Back Button Click            =
   =========================================*/
   $scope.backbtnclick = function(){
        $timeout(function() {
            $scope.$apply(function () {
            $location.path("/Test");
            });
        },300);
   }
   /*=====  End of Back Button Click  ======*/

   /*=========================================
   =            Show Summary Data            =
   =========================================*/
   var sumListUrl = baseUrlSrvc.baseUrl + 'listTestSummaryByadUserIdAndtTestId/' + $sessionStorage.adUserId +'/'+ $scope.OperType + '/'+$scope.currentTopicId;
    var promisetestGet = CRUD_SERVICE.getAllData(sumListUrl);
    promisetestGet.then(function(pl) {
        $scope.sumarry = pl.data;
        console.log("$scope.sumarry",$scope.sumarry);
            
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
   /*=====  End of Show Summary Data  ======*/
   $scope.showdetails = false;
   /*============================================
   =            Details Button Click            =
   ============================================*/
   $scope.detailsclick = function(){
    $scope.showdetails = $scope.showdetails ?false: true;

    /*======================================
    =            Get List Question            =
    ======================================*/
        var detailsListUrl = baseUrlSrvc.baseUrl + 'listTestDetailByadUserIdAndtTestId/' + $sessionStorage.adUserId +'/'+ $scope.OperType + '/' +$scope.sumarry[0].attemptno;
        GetAllRecords(detailsListUrl);

        function GetAllRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.detailsQuestionData = pl.data;
                    $scope.detailsArray.push($scope.detailsQuestionData);
                    console.log("$scope.detailsQuestionData",$scope.detailsQuestionData);

                    $scope.detailsTable = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.detailsQuestionData.length, 
                        getData: function ($defer, params) {
                        
                            $scope.detailsqueData = params.sorting() ? $filter('orderBy')($scope.detailsArray[0], params.orderBy()) : $scope.detailsArray[0];
                            $scope.detailsqueData = params.filter() ? $filter('filter')($scope.detailsqueData, params.filter()) : $scope.detailsqueData;
                           $scope.detailsqueData = $scope.detailsqueData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.detailsqueData)
                        }
                    });

                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
       }
  /*=====  End of Get List Question  ======*/
    // var detailsListUrl = baseUrlSrvc.baseUrl + 'listTestDetailByadUserIdAndtTestId/' + $sessionStorage.adUserId +'/'+ $scope.OperType + '/' +$scope.sumarry[0].attemptno;
    // var promisetestGet = CRUD_SERVICE.getAllData(detailsListUrl);
    // promisetestGet.then(function(pl) {
    //     $scope.detailsQuestionData = pl.data;
    //     console.log("$scope.detailsQuestionData",$scope.detailsQuestionData);
            
    //     },
    //     function(errorPl) {
    //         $log.error('Some Error in Getting Records.', errorPl);
    //     });

   }
   
   
   /*=====  End of Details Button Click  ======*/
   
   
   

    

    

    
    

    

    
    
    
    
    
   
    
    
});
/*=====  End of Controller  ======*/
