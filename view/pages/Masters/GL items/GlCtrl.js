/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("GlCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("GL");
    $scope.GLArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - General Ledger";
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

    $scope.addgeneralclick = function(){
        $scope.headingMessage = "Add General Ledger";
    }

    /*======================================
    =            Get List GL            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listGeneralLedger';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.GLArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.GL = pl.data;
                $scope.GLArray.push($scope.GL);
                //console.log("$scope.GL",$scope.GL);

                $scope.usersTable_GL = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.GL.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_GL = params.sorting() ? $filter('orderBy')($scope.GLArray[0], params.orderBy()) : $scope.GLArray[0];
                        $scope.data_GL = params.filter() ? $filter('filter')($scope.data_GL, params.filter()) : $scope.data_GL;
                       $scope.data_GL = $scope.data_GL.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_GL)
                    }
                });
                $scope.usersTable_GL.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List GL  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.adddgl = {};
        $scope.glData = {};
       
        $scope.viewglData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.glData = {};
       
        $scope.viewglData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit GL Modal            =
    ========================================*/
    
    $scope.editgl = function(id) {
        $scope.headingMessage = "Edit General Ledger";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.gl1 = pl.data;
                //console.log($scope.gl1);
                for (var i = 0; i < $scope.gl1.length; i++) {
                    if ($scope.gl1[i].cGeneralledgerId == id) {
                        $scope.glData = $scope.gl1[i];
                       
                          //console.log($scope.glData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit gl Modal  ======*/
    
    /*==================================
    =            View gl            =
    ==================================*/
    $scope.viewGL = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cGeneralledgerId": id });

       $scope.viewglData= {
          "cGeneralledgerId": $scope.temp_var_a[0].cGeneralledgerId,
          "name": $scope.temp_var_a[0].name,
          "narration": $scope.temp_var_a[0].narration
       };
    }
    /*=====  End of View GL  ======*/
    
    /*==================================
    =            Save GL            =
    ==================================*/
    
    $scope.saveGL = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cGeneralledgerId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateGeneralLedger'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cGeneralledgerId = pl.data.cGeneralledgerId;
               
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

            data.updatedby=$sessionStorage.updatedby;
            data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateGeneralLedger'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var gl = pl.gl;
               var promiseData = pl.data;
               //console.log("gl",gl);
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
    
    /*=====  End of Save GL  ======*/
   
    /*====================================
    =            Delete GL            =
    ====================================*/
    
    $scope.delGL = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cGeneralledgerId": id });

       $scope.deleteglData= {
          "cGeneralledgerId": $scope.temp_var[0].cGeneralledgerId,
          "name": $scope.temp_var[0].name
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteGeneralLedger'
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
    /*=====  End of Delete GL  ======*/
    
});
/*=====  End of Controller  ======*/
