/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("structureCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster) {
    //console.log("structure");
    $scope.structureArray = [];
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


     $scope.addfeestruct = function(){
      $scope.headingMessage = "Add Fee Structure";
     }

     /*=========================================
     =            Valid Date Change            =
     =========================================*/
     $scope.validDateChange = function(dat) {
      //console.log(dat);
      $scope.val_date = dat;
     }
     /*=====  End of Valid Date Change  ======*/

    /*======================================
    =            Get List structure            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listFeeStructureByCourseId/'+ $scope.OperType;
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.structureArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.structure = pl.data;
                $scope.structureArray.push($scope.structure);
                //console.log("$scope.structure",$scope.structure);

                $scope.usersTable_fee = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.structure.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_fee = params.sorting() ? $filter('orderBy')($scope.structureArray[0], params.orderBy()) : $scope.structureArray[0];
                        $scope.data_fee = params.filter() ? $filter('filter')($scope.data_fee, params.filter()) : $scope.data_fee;
                       $scope.data_fee = $scope.data_fee.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_fee)
                    }
                });
                $scope.usersTable_fee.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List structure  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addstructure = {};
        $scope.structureData = {};
       
        $scope.viewstructureData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.structureData = {};
       
        $scope.viewstructureData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit structure Modal            =
    ========================================*/
    
    $scope.editStructure = function(id) {
      $scope.headingMessage = "Edit Fee Structure";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.structure1 = pl.data;
                //console.log($scope.structure1);
                for (var i = 0; i < $scope.structure1.length; i++) {
                    if ($scope.structure1[i].cFeeStructureId == id) {
                        $scope.structureData = $scope.structure1[i];
                       
                          //console.log($scope.structureData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit structure Modal  ======*/
    
    /*==================================
    =            View structure            =
    ==================================*/
    $scope.viewStructure = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cFeeStructureId": id });

       $scope.viewstructureData= {
          "cFeeStructureId": $scope.temp_var_a[0].cFeeStructureId,
          "startdate": $scope.temp_var_a[0].startdate,
          "enddate": $scope.temp_var_a[0].enddate,
          "amount": $scope.temp_var_a[0].amount
       };
    }
    /*=====  End of View Structure  ======*/
    
    /*==================================
    =            Save Structure            =
    ==================================*/
    
    $scope.saveFee = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cFeeStructureId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.cCourseId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateFeeStructure'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cFeeStructureId = pl.data.cFeeStructureId;
               
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
            data.cCourseId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateFeeStructure'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var structure = pl.structure;
               var promiseData = pl.data;
               //console.log("structure",structure);
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
    
    /*=====  End of Save structure  ======*/
   
    /*====================================
    =            Delete structure            =
    ====================================*/
    
    $scope.delStructure = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cFeeStructureId": id });

       $scope.deletestructureData= {
          "cFeeStructureId": $scope.temp_var[0].cFeeStructureId,
          "amount": $scope.temp_var[0].amount
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteFeeStructure'
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
    /*=====  End of Delete structure  ======*/
    
});
/*=====  End of Controller  ======*/
