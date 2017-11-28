/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("PaymentoutwardCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("Paymentout");
    $scope.PaymentoutArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Payment Outward";
    //console.log($scope.OperType);

    if($scope.role == 'Admin' || $scope.role == 'ITP Admin'){
      $scope.disableStatus = true;
    }
    else{
        $scope.disableStatus = false;
      }

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

        today = yyyy+'-'+mm+'-'+(dd - 1);
        $scope.currentDate =today;
        //console.log("$scope.currentDate",$scope.currentDate);
         /*=====  End of Get Current Date  ======*/

         $scope.CashChecked = function(){
          $scope.ca = false;
          $scope.che = false;
          $scope.et = false;
          $scope.PaymentoutData.chequeno = "";
          $scope.PaymentoutData.chequedate = "";
          $scope.PaymentoutData.bankname = "";
          $scope.PaymentoutData.transactionno = "";
         }
         $scope.CardChecked = function(){
          $scope.ca = true;
          $scope.che = false;
          $scope.et = false;
          $scope.PaymentoutData.chequeno = "";
          $scope.PaymentoutData.chequedate = "";
          $scope.PaymentoutData.bankname = "";
          $scope.PaymentoutData.transactionno = "";
         }
         $scope.ChequeChecked = function(){
          $scope.che = true;
          $scope.ca = false;
          $scope.et = false;
          $scope.PaymentoutData.transactionno = "";
         }
         $scope.ETChecked = function(){
          $scope.et = true;
          $scope.ca = false;
          $scope.che = false;
          $scope.PaymentoutData.chequeno = "";
          $scope.PaymentoutData.chequedate = "";
          $scope.PaymentoutData.bankname = "";
         }

    /*==================================
      =            Vendor List            =
      ==================================*/
      var VendorListUrl = baseUrlSrvc.baseUrl + 'listVendor';
      var promiseVendorGet = CRUD_SERVICE.getAllData(VendorListUrl);
      promiseVendorGet.then(function(pl) {
          $scope.Vendor = pl.data;

          //console.log($scope.Vendor);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Vendor List  ======*/

      /*==================================
      =            GeneralLedger List            =
      ==================================*/
      var GeneralLedgerListUrl = baseUrlSrvc.baseUrl + 'listGeneralLedger';
      var promiseGeneralLedgerGet = CRUD_SERVICE.getAllData(GeneralLedgerListUrl);
      promiseGeneralLedgerGet.then(function(pl) {
          $scope.GeneralLedger = pl.data;

          //console.log($scope.GeneralLedger);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of GeneralLedger List  ======*/



    /*======================================
    =            Get List Paymentout            =
    ======================================*/
    if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
      var urlList = baseUrlSrvc.baseUrl + 'listPaymentOutward';
    } else {
      var urlList = baseUrlSrvc.baseUrl + 'listPaymentOutwardByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
    }
    
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.PaymentoutArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Paymentout = pl.data;
                $scope.PaymentoutArray.push($scope.Paymentout);
                //console.log("$scope.Paymentout",$scope.Paymentout);

                $scope.usersTable_paymentout = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Paymentout.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_paymentout = params.sorting() ? $filter('orderBy')($scope.PaymentoutArray[0], params.orderBy()) : $scope.PaymentoutArray[0];
                        $scope.data_paymentout = params.filter() ? $filter('filter')($scope.data_paymentout, params.filter()) : $scope.data_paymentout;
                       $scope.data_paymentout = $scope.data_paymentout.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_paymentout)
                    }
                });
                $scope.usersTable_paymentout.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List Paymentout  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addPaymentout = {};
        $scope.PaymentoutData = {};
       
        $scope.viewPaymentoutData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.PaymentoutData = {};
       
        $scope.viewPaymentoutData = {};
        $scope.PaymentoutData.status = 'Uncleared';
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*=====================================
    =            Calculate TDS            =
    =====================================*/
    $scope.calTDS = function(amt, tds) {

      //console.log(amt);
      //console.log(tds);

      var tdsperamt = (tds / 100) * amt;
      //console.log(tdsperamt);
      $scope.PaymentoutData.tdsamount = tdsperamt;

      $scope.PaymentoutData.payableamount = amt - tdsperamt;
      $scope.PaymentoutData.receivedamount = amt - tdsperamt;

    }
    
    
    /*=====  End of Calculate TDS  ======*/
    

    /*========================================
    =            Edit Paymentout Modal            =
    ========================================*/
    
    $scope.editPaymentout = function(id) {
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.Paymentout1 = pl.data;
                //console.log($scope.Paymentout1);
                for (var i = 0; i < $scope.Paymentout1.length; i++) {
                    if ($scope.Paymentout1[i].pPaymentoutwardId == id) {
                        $scope.PaymentoutData = $scope.Paymentout1[i];
                        
                          //console.log($scope.PaymentoutData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit Paymentout Modal  ======*/

    /*=======================================
    =            Update Status            =
    =======================================*/
    $scope.OnStatusChange = function(id, data) {
           //console.log(id);
           //console.log(data);
          
           var payoutUrl = baseUrlSrvc.baseUrl + 'updatePaymentOutwardStatus/'+ id + '/' + data + '/' + $sessionStorage.adUserId;
           var promisepayoutGet = CRUD_SERVICE.getAllData(payoutUrl);
           promisepayoutGet.then(function(pl) {

                  $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    GetAllRecords(payoutUrl);
                    });
                },300);

                   $scope.Status = pl.data;
                   //console.log("$scope.Status",$scope.Status);
                   if ($scope.Status.code == 1) {
                      toaster.success({title: "Success", body:" Status Updated Successfully!",tapToDismiss: true,showCloseButton: true});
                   } else {
                      toaster.error({title: "Error", body:"Error In Updating Status !",tapToDismiss: true,showCloseButton: true});
                   }
                   // $scope.status = $filter('filter')($scope.Status, { "acId": id });
               },
               function(errorPl) {
                   $log.error('Some Error in Getting Records.', errorPl);
               });
       }
       /*=====  End of Update Status  ======*/
    
    /*==================================
    =            View Paymentout            =
    ==================================*/
    $scope.viewPaymentout = function(id, bdata) {
        //console.log(id); 
        $scope.temp_viewpayamt = $filter('filter')(bdata, { "pPaymentoutwardId": id });

       $scope.viewPaymentoutData = $scope.temp_viewpayamt[0];
       //console.log($scope.viewPaymentoutData);

       if ($scope.viewPaymentoutData.modeofpayment == 'Cash') {
          $scope.Cash = true;
          $scope.viewCheque = false;
          $scope.viewCard = false;
           $scope.ET = false; 
       }

       if ($scope.viewPaymentoutData.modeofpayment == 'Cheque') {

          $scope.viewCheque = true;
          $scope.viewCard = false;
           $scope.ET = false; 
       }

       if($scope.viewPaymentoutData.modeofpayment == 'Card'){
        $scope.viewCard = true;
        $scope.viewCheque = false;
        $scope.ET = false; 
       }

       if ($scope.viewPaymentoutData.modeofpayment == 'E T') {
        $scope.ET = true;
        $scope.viewCard = false;
        $scope.viewCheque = false;
       }
    }
    /*=====  End of View Paymentout  ======*/
    
    /*==================================
    =            Save Paymentout            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.pPaymentoutwardId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            //data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentOutward'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.pPaymentoutwardId = pl.data.pPaymentoutwardId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
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
            //data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentOutward'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var Paymentout = pl.Paymentout;
               var promiseData = pl.data;
               ////console.log("Paymentout",Paymentout);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
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
                    $route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save Paymentout  ======*/
   
    /*====================================
    =            Delete Paymentout            =
    ====================================*/
    
    $scope.delPaymentout = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "pPaymentoutwardId": id });

       $scope.deletePaymentoutData= $scope.temp_var[0];
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deletePaymentOutward'
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
    /*=====  End of Delete Paymentout  ======*/
    
    /*=======================================
            =            Export to Excel            =
            =======================================*/
            $scope.exportAction = function(export_action,tbname){ 

              //console.log(export_action);
              //console.log(tbname);

                  tbname = tbname + '-' + $scope.currentDate;

                  switch(export_action){ 
                      case 'excel': $scope.$broadcast('export-excel', {type:'excel',tableName:tbname,escape:'false'}); 
                                  break;
                      default: //console.log('no event caught');
                   }
            }
            /*=====  End of Export to Excel  ======*/
    
    
});
/*=====  End of Controller  ======*/
