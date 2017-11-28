/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("bankCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("bankCtrl");
    $scope.bankArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Bank";

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

    $scope.addbankclick = function(){
        $scope.headingMessage = "Add Bank";
    }

    /*======================================
    =            Get List bank            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listBankDetail';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.bankArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.bank = pl.data;
                $scope.bankArray.push($scope.bank);
                //console.log("$scope.bank",$scope.bank);

                $scope.usersTable_bank = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.bank.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_bank = params.sorting() ? $filter('orderBy')($scope.bankArray[0], params.orderBy()) : $scope.bankArray[0];
                        $scope.data_bank = params.filter() ? $filter('filter')($scope.data_bank, params.filter()) : $scope.data_bank;
                       $scope.data_bank = $scope.data_bank.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_bank)
                    }
                });
                $scope.usersTable_bank.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List bank  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addbank = {};
        $scope.bankData = {};
       
        $scope.viewbankData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.bankData = {};
       
        $scope.viewbankData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit bank Modal            =
    ========================================*/
    
    $scope.editBank = function(id) {
        $scope.headingMessage = "Edit Bank";
         //console.log(id);

      // var StreamListUrl = baseUrlSrvc.baseUrl + 'listEducationRequired';
      // var promiseStreamGet = CRUD_SERVICE.getAllData(StreamListUrl);
      // promiseStreamGet.then(function(pl) {
      //     $scope.EducationStream = pl.data;

      //     //console.log($scope.EducationStream);
      // },
      // function(errorPl) {
      //     $log.error('Some Error in Getting Records.', errorPl);
      // }); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.bank1 = pl.data;
                //console.log($scope.bank1);
                for (var i = 0; i < $scope.bank1.length; i++) {
                    if ($scope.bank1[i].cBankdetailId == id) {
                        $scope.bankData = $scope.bank1[i];
                          //console.log($scope.bankData);
                          // $scope.EducationStream=[{
                          //   "cEducationrequiredId": $scope.bankData.cEducationrequiredId,
                          //   "educationname": $scope.bankData.educationname
                          // }];
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit bank Modal  ======*/
    
    /*==================================
    =            View bank            =
    ==================================*/
    $scope.viewBank = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cBankdetailId": id });

       $scope.viewbankData= {
          "cBankdetailId": $scope.temp_var_a[0].cBankdetailId,
          "bankname": $scope.temp_var_a[0].bankname,
          "branchname": $scope.temp_var_a[0].branchname,
          "accountno": $scope.temp_var_a[0].accountno,
          "ifsccode": $scope.temp_var_a[0].ifsccode,
          "micrcode": $scope.temp_var_a[0].micrcode,
          "address": $scope.temp_var_a[0].address 
       };
    }
    /*=====  End of View Bank  ======*/
    
    /*==================================
    =            Save Bank            =
    ==================================*/
    
    $scope.saveBank = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cBankdetailId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBankDetail'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cBankdetailId = pl.data.cBankdetailId;
               
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
                url: baseUrlSrvc.baseUrl + 'addUpdateBankDetail'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var bank = pl.bank;
               var promiseData = pl.data;
               //console.log("bank",bank);
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
    
    /*=====  End of Save Bank  ======*/
   
    /*====================================
    =            Delete Bank            =
    ====================================*/
    
    $scope.delBank = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cBankdetailId": id });

       $scope.deletebankData= {
          "cBankdetailId": $scope.temp_var[0].cBankdetailId,
          "bankname": $scope.temp_var[0].bankname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteBankDetail'
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
    /*=====  End of Delete educationstream  ======*/
    
});
/*=====  End of Controller  ======*/
