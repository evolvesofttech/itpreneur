/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("batchCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster) {
    //console.log("batch");
    $scope.batchArray = [];
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

    /*========================================
     =            Get Current Date            =
     ========================================*/
     var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 

      today = yyyy+'-'+mm+'-'+dd;
      $scope.currentDate =today;
      //console.log("$scope.currentDate",$scope.currentDate);
     /*=====  End of Get Current Date  ======*/

     $scope.addbatchclick = function(){
      $scope.headingMessage = "Add Batch";
     }

    /*======================================
    =            Get List batch            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listBatch';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.batchArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.batch = pl.data;
                $scope.batchArray.push($scope.batch);
                //console.log("$scope.batch",$scope.batch);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.batch.length, 
                    getData: function ($defer, params) {
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.batchArray[0], params.orderBy()) : $scope.batchArray[0];
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
    /*=====  End of Get List batch  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addbatch = {};
        $scope.batchData = {};
       
        $scope.viewbatchData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.batchData = {};
       
        $scope.viewbatchData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit batch Modal            =
    ========================================*/
    
    $scope.editBatch = function(id) {
      $scope.headingMessage = "Edit Batch";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.batch1 = pl.data;
                //console.log($scope.batch1);
                for (var i = 0; i < $scope.batch1.length; i++) {
                    if ($scope.batch1[i].cBatchId == id) {
                        $scope.batchData = $scope.batch1[i];
                       
                          //console.log($scope.batchData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit batch Modal  ======*/
    
    /*==================================
    =            View batch            =
    ==================================*/
    $scope.viewBatch = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cBatchId": id });

       $scope.viewbatchData= {
          "cBatchId": $scope.temp_var_a[0].cBatchId,
          "batchname": $scope.temp_var_a[0].batchname
       };
    }
    /*=====  End of View batch  ======*/
    
    /*==================================
    =            Save batch            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cBatchId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBatch'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cBatchId = pl.data.cBatchId;
               
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
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBatch'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var batch = pl.batch;
               var promiseData = pl.data;
               //console.log("batch",batch);
               //console.log("promiseData",promiseData);
               
                // $timeout(function() {
                //     $scope.$apply(function () {
                //     //$route.reload();
                //     GetAllRecords(urlList);
                //     });
                // },100);


                if (promiseData.code == 2) {
                    
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
                     GetAllRecords(urlList);
                // Flash.create('success', $scope.SuccessMessage);
               
                ClearModels();
                //}
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               // $timeout(function() {
               //      $scope.$apply(function () {
               //      //$route.reload();
               //      GetAllRecords(urlList);
               //      });
               //  },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                   GetAllRecords(urlList);
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save batch  ======*/
   
    /*====================================
    =            Delete batch            =
    ====================================*/
    
    $scope.delBatch = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cBatchId": id });

       $scope.deletebatchData= {
          "cBatchId": $scope.temp_var[0].cBatchId,
          "batchname": $scope.temp_var[0].batchname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteBatch'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                    });
                },100);
                 
                //Flash.create('success', $scope.SuccessMessage);
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                    });
                },100);
                 
                //Flash.create('danger', $scope.DangerMessage);
            ClearModels();
        });
    }
    /*=====  End of Delete batch  ======*/
    
});
/*=====  End of Controller  ======*/
