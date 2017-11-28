/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("EditScheduleCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("bankCtrl");
    $scope.schArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Schedule";

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

    /*=====================================
    =            Edit Schedule            =
    =====================================*/
    var urlList = baseUrlSrvc.baseUrl + 'listScheduleByScheduleId/' + $scope.OperType;
    GetAllRecords(urlList);

    function GetAllRecords(url) {
        $scope.topicArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.ScheduleData = pl.data[0];
                $scope.cId = $scope.ScheduleData.cCourseId;
                $scope.tId = $scope.ScheduleData.cTechnologyMasterId;
                $scope.Courses = [{
                    "cCourseId": $scope.ScheduleData.cCourseId,
                    "coursename": $scope.ScheduleData.coursename
                }];

                $scope.Batch = [{
                    "cBatchId": $scope.ScheduleData.cBatchId,
                    "batchname": $scope.ScheduleData.batchname
                }];

                $scope.Technologies = [{
                    "cTechnologyMasterId": $scope.ScheduleData.cTechnologyMasterId,
                    "technologyname": $scope.ScheduleData.technologyname
                }];

                getTopics();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit Schedule  ======*/
    
    
    /*=====================================
    =            Save Schedule            =
    =====================================*/
    $scope.saveSchedule = function(data) {
        $scope.sendArray = [];
        data.updatedby=$sessionStorage.updatedby;
        data.inInstituteId=$sessionStorage.inInstituteId;
        data.bBranchId=$sessionStorage.bBranchId;
        data.adUserId = $sessionStorage.adUserId;
        $scope.sendArray.push(data);
        var FormData = {
            formdata: $scope.sendArray,
            url: baseUrlSrvc.baseUrl + 'addUpdateSchedule'
        };
        var promisePost = CRUD_SERVICE.post(FormData);
        promisePost.then(function (pl) {
           
           $timeout(function() {
                $scope.$apply(function () {
                GetAllRecords(urlList);
                });
            },100);
            toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function (err) {
            toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Save Schedule  ======*/
    
    /*----------  Topics  ----------*/
    
    /*====================================================
    =            Course/Technology Topic List            =
    ====================================================*/
    function getTopics() {
        var techTopicUrl = baseUrlSrvc.baseUrl + 'listTopicByCourseIdAndTechnologyMasterId/' + $scope.cId + '/' + $scope.tId;
        var promiseUserTopGet = CRUD_SERVICE.getAllData(techTopicUrl);
        promiseUserTopGet.then(function(pl) {
            $scope.Topics = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });    
    }
    /*=====  End of Course/Technology Topic List  ======*/

    /*===========================================
    =            Schedule Topic List            =
    ===========================================*/
    var urlSTopicList = baseUrlSrvc.baseUrl + 'listScheduleTopicByScheduleId/' + $scope.OperType;
    GetAllTopicRecords(urlSTopicList);

    //To Get All Records
    function GetAllTopicRecords(url) {
        $scope.SchTopicArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.ScheduleTopic = pl.data;
                $scope.SchTopicArray.push($scope.ScheduleTopic);

                $scope.usersTable_topics = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.ScheduleTopic.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_scheduletopic = params.sorting() ? $filter('orderBy')($scope.SchTopicArray[0], params.orderBy()) : $scope.SchTopicArray[0];
                        $scope.data_scheduletopic = params.filter() ? $filter('filter')($scope.data_scheduletopic, params.filter()) : $scope.data_scheduletopic;
                       $scope.data_scheduletopic = $scope.data_scheduletopic.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_scheduletopic)
                    }
                });
                $scope.usersTable_topics.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    
    /*=====  End of Schedule Topic List  ======*/
    
    /*==================================
    =            View Topic            =
    ==================================*/
    $scope.viewTopic = function(data) {
        $scope.viewTopicData = data;
    }
    /*=====  End of View Topic  ======*/
    
    /*==================================
    =            Edit Topic            =
    ==================================*/
    $scope.editTopic = function(data) {
        getTopics();
        $scope.TopicData = data;
    }
    /*=====  End of Edit Topic  ======*/

    /*==================================
    =            Save Topic            =
    ==================================*/
    $scope.saveTopic = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.conScheduletopicId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.conScheduleId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateScheduleTopic'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
               
               $timeout(function() {
                    $scope.$apply(function () {
                    GetAllTopicRecords(urlSTopicList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function (err) {
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {
             data.updatedby=$sessionStorage.updatedby;
             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.conScheduleId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateScheduleTopic'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               var promiseData = pl.data;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllTopicRecords(urlSTopicList);
                    });
                },100);

                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
            }, function (err) {
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };
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
            url: baseUrlSrvc.baseUrl + 'deleteScheduleTopic'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            GetAllTopicRecords(urlSTopicList);
            toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function (err) {
            toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Delete Topic  ======*/
    
});
/*=====  End of Controller  ======*/
