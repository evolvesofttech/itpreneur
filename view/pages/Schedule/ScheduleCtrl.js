/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("ScheduleCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {

    /*============================
    =            Init            =
    ============================*/
    $scope.schArray = [];
    $scope.saveArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Schedule";
    $scope.disableBatch = true;
    $scope.disableTechnology = true;
    $scope.disableInput = true;
    /*=====  End of Init  ======*/

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

    /*=====================================
    =            Schedule List            =
    =====================================*/
    var urlList = baseUrlSrvc.baseUrl + 'listSchedule';
    GetAllRecords(urlList);
    function GetAllRecords(url) {
        $scope.schArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Schedule = pl.data;
                $scope.schArray.push($scope.Schedule);
                $scope.usersTable_schedule = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Schedule.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                          }
                    
                        $scope.data_schedule = params.sorting() ? $filter('orderBy')($scope.schArray[0], params.orderBy()) : $scope.schArray[0];
                        $scope.data_schedule = params.filter() ? $filter('filter')($scope.data_schedule, params.filter()) : $scope.data_schedule;
                       $scope.data_schedule = $scope.data_schedule.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_schedule)
                    }
                });
                $scope.usersTable_schedule.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Schedule List  ======*/
    

    /*===================================
    =            Course List            =
    ===================================*/
    var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
    var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
    promiseCourseGet.then(function(pl) {
        $scope.Courses = pl.data;
    },
    function(errorPl) {});
    /*=====  End of Course List  ======*/

    /*=================================
    =            Add Click            =
    =================================*/
    $scope.addClick = function() {
        $scope.saveArray = [];
        $scope.ScheduleData = {};
        $scope.ScheduleData1 = {};
    }
    /*=====  End of Add Click  ======*/
    

    /*=====================================
    =            Lecture Array            =
    =====================================*/
    $scope.lectureData = [];
    for(var i=1; i<=100;i++) {
        $scope.lectureData.push("Lecture " + i);
    }
    /*=====  End of Lecture Array  ======*/

    /*=====================================
    =            Course Change            =
    =====================================*/
    $scope.courseChange = function(id) {
        $scope.Course_id = id;
        
        if (!id) {
            $scope.disableInput = true;
            $scope.disableBatch = true;
        } else {
            $scope.disableInput = false;
            $scope.disableBatch = false;
        }
        //batch
        var BatchListUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseIdTimeduration/' + id;
        var promiseBatchGet = CRUD_SERVICE.getAllData(BatchListUrl);
            promiseBatchGet.then(function(pl) {
              $scope.Batch = pl.data;
            },
        function(errorPl) {});
        //batch

        //tech
        var techUrl = baseUrlSrvc.baseUrl + 'listTechnologyByCourseId/' + id;
        var promiseTechGet = CRUD_SERVICE.getAllData(techUrl);
            promiseTechGet.then(function(pl) {
              $scope.Technologies = pl.data;
            },
        function(errorPl) {});
        //tech
    }
    /*=====  End of Course Change  ======*/

    /*====================================
    =            Batch Change            =
    ====================================*/
    $scope.batchChange = function(id) {
        if (!id) {
            $scope.disableInput = true;
            $scope.disableTechnology = true;
        } else {
            $scope.disableInput = false;
            $scope.disableTechnology = false;
        }
    }
    /*=====  End of Batch Change  ======*/
    
    /*=========================================
    =            Technology Change            =
    =========================================*/
    $scope.technologyChange = function(tid, id) {
        if (!tid) {
            $scope.disableInput = true;
        } else {
            $scope.disableInput = false;
        }
        
        var AllBranchUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseIdTimeduration/' + $scope.Course_id;
          var promiseAllBranchGet = CRUD_SERVICE.getAllData(AllBranchUrl);
          promiseAllBranchGet.then(function(pl) {
              $scope.AllBranch = pl.data;

              for (var i = 0; i < $scope.AllBranch.length; i++) {
              if ($scope.AllBranch[i].cBatchId == id) {
                  $scope.datData = $scope.AllBranch[i];
                  
                  var fromdate1 = $scope.datData.fromdate;
                  var todate1 = $scope.datData.todate;
                  $scope.tDate = $scope.datData.todate;

                  var f_d = new Date(fromdate1);
                  f_d.setDate(f_d.getDate()-1)

                  var dd1 = f_d.getDate();
                  var mm1 = f_d.getMonth()+1; //January is 0!
                  var yyyy1 = f_d.getFullYear();

                  if(dd1<10) {
                      dd1='0'+dd1
                  } 

                  if(mm1<10) {
                      mm1='0'+mm1
                  } 

                  f_d = yyyy1+'-'+mm1 +'-'+dd1;
                  $scope.fDate =f_d;
                }
              }
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
    }
    /*=====  End of Technology Change  ======*/

    /*=====================================
    =            View Schedule            =
    =====================================*/
    $scope.viewSchedule = function(data) {
        $scope.viewScheduleData = data;
    }
    /*=====  End of View Schedule  ======*/
    
    /*================================
    =            Add More            =
    ================================*/
    $scope.addMore = function(data, data1) {
        $scope.saveArray.push({
            "cCourseId": data.cCourseId,
            "cBatchId": data.cBatchId,
            "cTechnologyMasterId": data.cTechnologyMasterId,
            "lecture": data1.lecture,
            "date": data1.date,
            "fromtime": data1.fromtime,
            "totime": data1.totime,
            "updatedby":$sessionStorage.updatedby,
            "createdby":$sessionStorage.createdby,
            "inInstituteId":$sessionStorage.inInstituteId,
            "bBranchId":$sessionStorage.bBranchId,
            "adUserId":$sessionStorage.adUserId
        });
        $scope.ScheduleData1 = {};
        $scope.time1 = data1.fromtime;
        $scope.time2 = data1.totime;
        console.log($scope.saveArray);
    }
    /*=====  End of Add More  ======*/

    /*================================
    =            Set time            =
    ================================*/
    $scope.setTime = function() {
        $scope.ScheduleData1.fromtime = $scope.time1;
    }
    $scope.setTime1 = function() {
        $scope.ScheduleData1.totime = $scope.time2;
    }
    /*=====  End of Set time  ======*/

    /*===================================
    =            Remove Item            =
    ===================================*/
    $scope.removeItem = function(value) {
        var index = $scope.saveArray.indexOf(value);
        $scope.saveArray.splice(index, 1);
        console.log($scope.saveArray);
    }
    /*=====  End of Remove Item  ======*/
    
    /*=====================================
    =            Save Schedule            =
    =====================================*/
    $scope.saveSchedule = function(data) {
        // data.updatedby=$sessionStorage.updatedby;
        // data.createdby=$sessionStorage.createdby;
        // data.inInstituteId=$sessionStorage.inInstituteId;
        // data.bBranchId=$sessionStorage.bBranchId;
        // data.adUserId = $sessionStorage.adUserId;
        console.log($scope.saveArray);
        var FormData = {
            formdata: $scope.saveArray,
            url: baseUrlSrvc.baseUrl + 'addUpdateSchedule'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           var promiseData = pl.data;
            $timeout(function() {
                $scope.$apply(function () {
                GetAllRecords(urlList);
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
    /*=====  End of Save Schedule  ======*/
    
    /*=======================================
    =            Delete Schedule            =
    =======================================*/
    $scope.delSchedule = function(data) {
        $scope.deleteScheduleData = data;
    }
    
    $scope.deleteSchedule = function(id) {
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteSchedule'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            GetAllRecords(urlList);
            toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function (err) {
            toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Delete Schedule  ======*/
    
});
/*=====  End of Controller  ======*/
