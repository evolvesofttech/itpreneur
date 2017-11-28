/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("addbankCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("addbankCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.addbankArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
 
      // $scope.bank_Id = BankDetail_Id.getBankDetail_Id();
      
               
     // $scope.courses = [];
    //  $scope.user = {courses: [1,2]};
      
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
      =            Bank List            =
      ==================================*/
      var BankListUrl = baseUrlSrvc.baseUrl + 'listBankDetail';
      var promiseBankGet = CRUD_SERVICE.getAllData(BankListUrl);
      promiseBankGet.then(function(pl) {
          $scope.Bank = pl.data;

          //console.log($scope.Bank);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Course List  ======*/


      /*===================================
      =            Bank Change            =
      ===================================*/
       $scope.BankClick = function(da) {
      //console.log(da);
      $scope.curDate = da;
      var d = new Date(da);
      var m = d.getMonth() + 1;
      var y = d.getFullYear();
      //console.log(m);
      //console.log(y);

      var yearmonthListUrl = baseUrlSrvc.baseUrl + '/bankBalanceDetailByLastmonthAmountClosing/' +  +'/'+ m + '/' + y;
      var promiseYearmonthGet = CRUD_SERVICE.getAllData(yearmonthListUrl);
      promiseYearmonthGet.then(function(pl) {
          $scope.bankData1 = pl.data;

          //console.log($scope.bankData1[0].listpaymentdata);
          //$scope.bankData.paymentin = $scope.bankData1[0].listpaymentdata.paymentin;
          //$scope.bankData.paymentout = $scope.bankData1[0].listpaymentdata.paymentout;
          $scope.bankData.bankopening = $scope.bankData1[0].listpaymentdata.bankopening;
          //$scope.bankData.cashopening = $scope.bankData1[0].listpaymentdata.cashopening;

      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

      // var year = da.substr(0, 4);
      // var month = 
    }
      
      
      /*=====  End of Bank Change  ======*/
      
      
    /*======================================
    =            Get List             =
    ======================================*/
    //1 Mean New Entry
    var urlList_a = baseUrlSrvc.baseUrl + 'listBankBalanceDetailsByPaymentreconciliationId/' +$scope.OperType;
    GetAllRecords_act(urlList_a);

    //To Get All Records
    function GetAllRecords_act(url) {
        $scope.addbankArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.addbank = pl.data;
                $scope.addbankArray.push($scope.addbank);
                //console.log("$scope.addbank",$scope.addbank);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.addbank.length, 
                    getData: function ($defer, params) {
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.addbankArray[0], params.orderBy()) : $scope.addbankArray[0];
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
    /*=====  End of Get List   ======*/

    
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
    =            Edit  Modal            =
    ========================================*/
    
    $scope.editbank = function(id) {
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList_a);
        promiseGet.then(function (pl) {
                $scope.Bank1 = pl.data;
                //console.log($scope.Bank1);
                for (var i = 0; i < $scope.Bank1.length; i++) {
                    if ($scope.Bank1[i].pBankbalancedetailsId == id) {
                        $scope.bankData = $scope.Bank1[i];
                        
                          //console.log($scope.bankData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit  Modal  ======*/

    /*========================================
    =            Edit enquiryactivities Modal            =
    ========================================*/
   
    $scope.savebank = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.pBankbalancedetailsId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            //data.bBranchId=$sessionStorage.bBranchId;
            data.pPaymentreconciliationId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBankBalanceDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.pBankbalancedetailsId = pl.data.pBankbalancedetailsId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    GetAllRecords_act(urlList_a);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    GetAllRecords_act(urlList_a);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                ClearModels();
            });
        } else {
             data.updatedby=$sessionStorage.updatedby;
             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             //data.bBranchId=$sessionStorage.bBranchId;
             data.pPaymentreconciliationId = $scope.OperType;
             data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBankBalanceDetails'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var bank = pl.bank;
               var promiseData = pl.data;
               //console.log("bank",bank);
               //console.log("promiseData",promiseData);
               
                // $timeout(function() {
                //     $scope.$apply(function () {
                //     //$route.reload();
                //     GetAllRecords_act(urlList_a);
                //     });
                // },100);


                if (promiseData.code == 2) {
                    
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
                     GetAllRecords_act(urlList_a);
                // Flash.create('success', $scope.SuccessMessage);
               
                ClearModels();
                //}
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                   GetAllRecords_act(urlList_a);
                ClearModels();
            });
        }
    };
    

    /*====================================
    =            View             =
    ====================================*/

    $scope.viewbank = function(id, bdata) {
        //console.log(id); 
        //console.log(bdata); 
        $scope.temp_var_a1 = $filter('filter')(bdata, { "pBankbalancedetailsId": id });

       $scope.viewbankData = {
          "pBankbalancedetailsId": $scope.temp_var_a1[0].pBankbalancedetailsId,
          "bankname": $scope.temp_var_a1[0].bankname,
          "bankclosing": $scope.temp_var_a1[0].bankclosing,
          "bankopening": $scope.temp_var_a1[0].bankopening
         
          

       };
       //console.log($scope.viewpaymentreconData); 
    }
    /*=====  End of View   ======*/


    /*====================================
    =            Delete             =
    ====================================*/
    
    $scope.delbank = function(id, tdata) {
         //console.log(id); 
         //console.log(tdata); 
        $scope.temp_var = $filter('filter')(tdata, { "pBankbalancedetailsId": id });

       $scope.deletebankData= {
          "pBankbalancedetailsId": $scope.temp_var[0].pBankbalancedetailsId,
          "bankname": $scope.temp_var[0].bankname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteBankBalanceDetails'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    GetAllRecords_act(urlList_a);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    GetAllRecords_act(urlList_a);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete technologies  ======*/


});
/*=====  End of School Controller  ======*/