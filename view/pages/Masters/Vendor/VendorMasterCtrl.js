/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("VendorCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("vendor");
    $scope.vendorArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Vendor";
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

    $scope.addvendorclick = function(){
        $scope.headingMessage = "Add Vendor Details";
    }

    /*======================================
    =            Get List vendor            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listVendor';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.vendorArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.vendor = pl.data;
                $scope.vendorArray.push($scope.vendor);
                //console.log("$scope.vendor",$scope.vendor);

                $scope.usersTable_Vendor = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.vendor.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_Vendor = params.sorting() ? $filter('orderBy')($scope.vendorArray[0], params.orderBy()) : $scope.vendorArray[0];
                        $scope.data_Vendor = params.filter() ? $filter('filter')($scope.data_Vendor, params.filter()) : $scope.data_Vendor;
                       $scope.data_Vendor = $scope.data_Vendor.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Vendor)
                    }
                });
                $scope.usersTable_Vendor.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List vendor  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.vendorDataAdd = {};
        $scope.viewvendorData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.vendorDataAdd = {};
       
        $scope.viewvendorData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit vendor Modal            =
    ========================================*/
    
    $scope.editVendor = function(id) {
        $scope.headingMessage = "Edit Vendor Details";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.vendor1 = pl.data;
                //console.log($scope.vendor1);
                for (var i = 0; i < $scope.vendor1.length; i++) {
                    if ($scope.vendor1[i].cVendorId == id) {
                        $scope.vendorDataAdd = $scope.vendor1[i];
                          //console.log($scope.vendorDataAdd);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit vendor Modal  ======*/
    
    /*==================================
    =            View vendor            =
    ==================================*/
    $scope.viewVendor = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cVendorId": id });

       $scope.viewvendorData= {
          "cVendorId": $scope.temp_var_a[0].cVendorId,
          "vendorname": $scope.temp_var_a[0].vendorname,
          "contactno": $scope.temp_var_a[0].contactno,
          "emailid": $scope.temp_var_a[0].emailid,
          "address": $scope.temp_var_a[0].address,
          "panno": $scope.temp_var_a[0].panno,
          "cstno": $scope.temp_var_a[0].cstno,
          "tinno": $scope.temp_var_a[0].tinno,
          "vatno": $scope.temp_var_a[0].vatno

       };
    }
    /*=====  End of View vendor  ======*/
    
    /*==================================
    =            Save vendor            =
    ==================================*/
    
    $scope.saveVendor = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cVendorId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateVendor'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cVendorId = pl.data.cVendorId;
               
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
                url: baseUrlSrvc.baseUrl + 'addUpdateVendor'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var vendor = pl.vendor;
               var promiseData = pl.data;
               //console.log("vendor",vendor);
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
    
    /*=====  End of Save vendor  ======*/
   
    /*====================================
    =            Delete vendor            =
    ====================================*/
    
    $scope.delVendor = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cVendorId": id });

       $scope.deletevendorData= {
          "cVendorId": $scope.temp_var[0].cVendorId,
          "vendorname": $scope.temp_var[0].vendorname
       };
     }

    $scope.deleteVendor = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteVendor'
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
    /*=====  End of Delete vendor  ======*/
    
});
/*=====  End of Controller  ======*/
