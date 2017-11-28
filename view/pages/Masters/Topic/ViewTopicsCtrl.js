/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("ViewTopicsCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("courses");
    $scope.tArray = [];
    $scope.OperType = $routeParams.ID;
    $scope.OperType1 = $routeParams.ID1;
    $window.document.title = "ITPreneur - Topics";
   
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

    /*=======================================
    =            Edit Topic List            =
    =======================================*/
    var topicUrl = baseUrlSrvc.baseUrl + 'listTopicByCourseIdAndTechnologyMasterId/' + $scope.OperType + '/' + $scope.OperType1;
    GetAllRecords(topicUrl);

    function GetAllRecords(url) {
        $scope.tArray = [];
        var promisetopicUrlGet = CRUD_SERVICE.getAllData(url);
        promisetopicUrlGet.then(function(pl) {
            $scope.Topics = pl.data;
            
            if ($scope.Topics.length != 0) {
                $scope.currentCourse = $scope.Topics[0].coursename;
                $scope.currentTechnology = $scope.Topics[0].technologyname;
            }
            $scope.tArray.push($scope.Topics);

                $scope.usersTable_Topics = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Topics.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) { params.settings().$scope = $scope;}
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.tArray[0], params.orderBy()) : $scope.tArray[0];
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                       $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data)
                    }
                });
                $scope.usersTable_Topics.reload();
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
    }
    /*=====  End of Edit Topic List  ======*/

    /*==================================
    =            View Topic            =
    ==================================*/
    $scope.viewTopic = function(data) {
        $scope.viewTopicData = data;
    }
    /*=====  End of View Topic  ======*/
    
    /*==================================
    =            Save Topic            =
    ==================================*/
    $scope.saveTopic = function(data) {
        data.inInstituteId=$sessionStorage.inInstituteId;
        data.bBranchId=$sessionStorage.bBranchId;
        data.updatedby=$sessionStorage.updatedby;
        data.createdby=$sessionStorage.createdby;
        data.adUserId = $sessionStorage.adUserId;

        var FormData = {
            formdata: data,
            url: baseUrlSrvc.baseUrl + 'addUpdateTopic'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           var promiseData = pl.data;
           GetAllRecords(topicUrl);
            if (promiseData.code == 2) {
                toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            } else {
                toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
            }
        }, function (err) {
             toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Save Topic  ======*/

    /*====================================
    =            Delete Topic            =
    ====================================*/
    $scope.delTopic = function(data) {
        $scope.deleteTopicData = data;
    }
    
    $scope.deleteTopic = function(id) {
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteTopic'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            GetAllRecords(topicUrl);
            toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function (err) {
            toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Delete Topic  ======*/
    
    
});
/*=====  End of Controller  ======*/
