/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("profileCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster) {
    //console.log("profileCtrl");
    $scope.profileArray = [];
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
    =            Get List profile            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listEnquiryProfileByEnquiryFormId/' + $scope.OperType;
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.profileArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.profile = pl.data;
                $scope.profileArray.push($scope.profile);
                //console.log("$scope.profile",$scope.profile);

                $scope.usersTable_profile = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.profile.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_profile = params.sorting() ? $filter('orderBy')($scope.profileArray[0], params.orderBy()) : $scope.profileArray[0];
                        $scope.data_profile = params.filter() ? $filter('filter')($scope.data_profile, params.filter()) : $scope.data_profile;
                       $scope.data_profile = $scope.data_profile.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_profile)
                    }
                });
                $scope.usersTable_profile.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List profile  ======*/
});
/*=====  End of Controller  ======*/
