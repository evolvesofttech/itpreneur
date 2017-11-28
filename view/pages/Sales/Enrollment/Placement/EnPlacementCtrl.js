/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("placementCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster) {
    //console.log("placementCtrl");
    $scope.placementArray = [];
    $scope.OperType = $routeParams.ID;

    //console.log($scope.OperType);

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


    /*======================================
    =            Get List placement            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listPlacementStatusByEnquiryFormId/' + $scope.OperType;
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.placementArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.placement = pl.data;
                $scope.placementArray.push($scope.placement);
                //console.log("$scope.placement",$scope.placement);

                $scope.usersTable_placement = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.placement.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_placement = params.sorting() ? $filter('orderBy')($scope.placementArray[0], params.orderBy()) : $scope.placementArray[0];
                        $scope.data_placement = params.filter() ? $filter('filter')($scope.data_placement, params.filter()) : $scope.data_placement;
                       $scope.data_placement = $scope.data_placement.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_placement)
                    }
                });
                $scope.usersTable_placement.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List placement  ======*/
});
/*=====  End of Controller  ======*/
