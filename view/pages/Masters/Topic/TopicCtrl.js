/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("TopicCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("courses");
    $scope.topicArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Topic";

    /*============================
    =            Tabs            =
    ============================*/
    this.Inst = 1;

    this.setTab = function(tabId) {
        this.Inst = tabId;
    };

    this.isSet = function(tabId) {
        return this.Inst === tabId;
    };
    /*=====  End of Tabs  ======*/

    /*=================================
    =            Add Click            =
    =================================*/
    $scope.addTopic = function(data) {
        $scope.TopicData = data;
    }
    /*=====  End of Add Click  ======*/

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

    /*==================================
    =            Topic List            =
    ==================================*/
    var urlList = baseUrlSrvc.baseUrl + 'listTechnologyCourses';
    GetAllRecords(urlList);

    function GetAllRecords(url) {
        $scope.topicArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Topics = pl.data;
                $scope.topicArray.push($scope.Topics);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Topics.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) { params.settings().$scope = $scope;}
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.topicArray[0], params.orderBy()) : $scope.topicArray[0];
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                       $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data)
                    }
                });
                $scope.usersTable.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Topic List  ======*/
    
    /*==================================
    =            Save Topic            =
    ==================================*/
    $scope.saveTopic = function(data) {

        data.createdby=$sessionStorage.createdby;
        data.inInstituteId=$sessionStorage.inInstituteId;
        data.bBranchId=$sessionStorage.bBranchId;
        data.updatedby=$sessionStorage.updatedby;
        data.adUserId = $sessionStorage.adUserId;

        var FormData = {
            formdata: data,
            url: baseUrlSrvc.baseUrl + 'addUpdateTopic'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           var promiseData = pl.data;
           GetAllRecords(urlList);

            if (promiseData.code == 2) {
                toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
            } else {
                toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
            }
           
        }, function (err) {
             toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Save Topic  ======*/
    
});
/*=====  End of Controller  ======*/
