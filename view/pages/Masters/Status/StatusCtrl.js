/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("statusCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("status");
    $scope.statusArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Status";
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

    $scope.addstatus = function(){
        $scope.headingMessage = "Add Status";
    }

    /*======================================
    =            Get List Status            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listEnquiryStatus';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.statusArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.status = pl.data;
                $scope.statusArray.push($scope.status);
                //console.log("$scope.status",$scope.status);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.status.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.statusArray[0], params.orderBy()) : $scope.statusArray[0];
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
    /*=====  End of Get List status  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addstatus = {};
        $scope.statusData = {};
       
        $scope.viewstatusData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.statusData = {};
       
        $scope.viewstatusData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit status Modal            =
    ========================================*/
    
    $scope.editStatus = function(id) {
        $scope.headingMessage = "Edit Status";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.status1 = pl.data;
                //console.log($scope.status1);
                for (var i = 0; i < $scope.status1.length; i++) {
                    if ($scope.status1[i].cStatusId == id) {
                        $scope.statusData = $scope.status1[i];
                        
                          //console.log($scope.statusData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit status Modal  ======*/
    
    /*==================================
    =            View Status            =
    ==================================*/
    $scope.viewStatus = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cStatusId": id });

       $scope.viewstatusData= {
          "cStatusId": $scope.temp_var_a[0].cStatusId,
          "statusname": $scope.temp_var_a[0].statusname,
          "description": $scope.temp_var_a[0].description
       };
    }
    /*=====  End of View Status  ======*/
    
    /*==================================
    =            Save Status            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cStatusId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryStatus'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cStatusId = pl.data.cStatusId;
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                ClearModels();
            });
        } else {

             data.createdby=$sessionStorage.createdby;
             data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryStatus'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var status = pl.status;
               var promiseData = pl.data;
               //console.log("status",status);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);

                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save Status  ======*/
   
    /*====================================
    =            Delete Status            =
    ====================================*/
    
    $scope.delStatus = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cStatusId": id });

       $scope.deletestatusData= {
          "cStatusId": $scope.temp_var[0].cStatusId,
          "statusname": $scope.temp_var[0].statusname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteEnquiryStatus'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete Status  ======*/
    
});
/*=====  End of Controller  ======*/
