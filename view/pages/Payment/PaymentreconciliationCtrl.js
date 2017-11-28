/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("PaymentreconCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,
        Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("paymentreconciliation");
    $scope.paymentreconArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Payment Reconciliation";
    //console.log($scope.OperType);


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

          $scope.toggle_ins_a = function() {
              $scope.institute_a = !$scope.institute_a;
          };

          $scope.toggle_ins_b = function() {
              $scope.institute_b = !$scope.institute_b;
          };

          $scope.toggle_ins_c = function() {
              $scope.institute_c = !$scope.institute_c;
          };
         /*=====  End of Tabs  ======*/

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


    /*======================================
    =            Get List payment            =
    ======================================*/
    if ($scope.role == 'Admin' || $scope.role == 'System Admin' || $scope.role == 'Sales Manager' || $scope.role == 'Accounts Manager' || $scope.role == 'Placement Manager') {
      var urlList = baseUrlSrvc.baseUrl + 'listPaymentReconciliation';
    } else {
      var urlList = baseUrlSrvc.baseUrl + 'listPaymentReconciliationByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
    } 

    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.paymentreconArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.paymentrecon = pl.data;
                $scope.paymentreconArray.push($scope.paymentrecon);
                //console.log("$scope.paymentrecon",$scope.paymentrecon);

                $scope.usersTable_paymentrecon = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.paymentrecon.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_paymentrecon = params.sorting() ? $filter('orderBy')($scope.paymentreconArray[0], params.orderBy()) : $scope.paymentreconArray[0];
                        $scope.data_paymentrecon = params.filter() ? $filter('filter')($scope.data_paymentrecon, params.filter()) : $scope.data_paymentrecon;
                       $scope.data_paymentrecon = $scope.data_paymentrecon.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_paymentrecon)
                    }
                });
                $scope.usersTable_paymentrecon.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List payment  ======*/

    /*==============================================
    =            Branch Change Function            =
    ==============================================*/
    $scope.branchChange = function(id, data) {

      /*================================================
      =            Disable Month Validation            =
      ================================================*/
      // for(var i=0;i<$scope.paymentrecon.length;i++) {

        

      //   if($scope.paymentrecon[i].bBranchId == id) {

      //     $scope.monYear = $scope.paymentrecon[i].monthyear;
        
      //     var splitDates = $scope.monYear.split('-');
      //     $scope.mon = splitDates[1];
      //     $scope.yea = splitDates[0];
      //     //console.log("mon",$scope.mon);
      //     //console.log("yea",$scope.yea);



      //     function getDaysInMonth(mon, yea) {
      //          // Since no month has fewer than 28 days
      //          var date = new Date(yea, mon, 1);
      //          $scope.days = [];
      //          //console.log('mon', mon, 'date.getMonth()', date.getMonth())
      //          while (date.getMonth() === mon) {
      //             $scope.days.push(new Date(date));
      //             date.setDate(date.getDate() + 1);
      //          }
      //          return $scope.days;
      //     }

      //     // //console.log();
      //     $scope.disDates = getDaysInMonth(5, $scope.yea);
      //     //console.log("$scope.disDates",$scope.disDates);

      //   }

      // }
      /*=====  End of Disable Month Validation  ======*/

    }
    /*=====  End of Branch Change Function  ======*/


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
    
   

     /*=====================================
    =            Calculate Cash cLose            =
    =====================================*/
    $scope.CashClose = function(out, bclose, cclose, bin , bopen, copen, ramount) {

      //console.log("out",out);
      //console.log("bclose",bclose);

       // ng-value="((paymentreconData.paymentout + paymentreconData.bankclosing + paymentreconData.cashclosing )- (paymentreconData.paymentin + paymentreconData.bankopening + paymentreconData.cashopening) )+(paymentreconData.adjustmentamount)"

      $scope.paymentreconData.finalamount = ((out+bclose+cclose)-(bin +bopen+copen)+ ramount);

    }
    
    
    /*=====  End of  Cash cLose     ======*/
    

    /*=================================
    =            Addition             =
    =================================*/
    /*$scope.findTotal = function(){
      var total = 0;
      //total = $scope.paymentreconData.paymentin + $scope.paymentreconData.bankopening + $scope.paymentreconData.cashopening - $scope.paymentreconData.paymentout - $scope.paymentreconData.bankclosing - $scope.paymentreconData.cashclosing;

     // $scope.paymentreconData.finalamount = total;

    }*/
    
    
    /*=====  End of Addition   ======*/

    /*==================================
    =            Date Click            =
    ==================================*/
    $scope.dateClick = function(da, branch) {
      //console.log(da);
      $scope.curDate = da;
      var d = new Date(da);
      var m = d.getMonth() + 01;
      var y = d.getFullYear();
      $scope.BraId = branch;
      // $scope.month_a= m;
      // $scope.year_a=y;
      //console.log(m);
      //console.log(y);

      var yearListUrl = baseUrlSrvc.baseUrl + 'listPaymentReconciliationByClosingData/' + m + '/' + y + '/' + $scope.BraId;
      var promiseYearGet = CRUD_SERVICE.getAllData(yearListUrl);
      promiseYearGet.then(function(pl) {
          $scope.paymentreconData1 = pl.data;



          //console.log("paymentreconData1",$scope.paymentreconData1);
          $scope.paymentreconData.paymentin = $scope.paymentreconData1[0].listpaymentdata.paymentin;
          $scope.paymentreconData.paymentout = $scope.paymentreconData1[0].listpaymentdata.paymentout;
          //$scope.paymentreconData.bankopening = $scope.paymentreconData1[0].listpaymentdata.bankopening;
          $scope.paymentreconData.cashopening = $scope.paymentreconData1[0].listpaymentdata.cashopening;

          $scope.paymentreconData.finalamount = (($scope.paymentreconData1[0].listpaymentdata.paymentout + 0 + 0 ) - ($scope.paymentreconData1[0].listpaymentdata.paymentin + 0 + $scope.paymentreconData1[0].listpaymentdata.cashopening))+(0);
          ////console.log("$scope.paymentreconData.finalamount",$scope.paymentreconData.finalamount);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

      // var year = da.substr(0, 4);
      // var month = 
    }
    
    
    /*=====  End of Date Click  ======*/

    /*=======================================================
    =            Adjustment Amount Blur FUnction            =
    =======================================================*/
    $scope.adjustmentAmountBlur = function(adjamt) {

      $scope.paymentreconData.finalamount = (($scope.paymentreconData1[0].listpaymentdata.paymentout + 0 + 0 ) - ($scope.paymentreconData1[0].listpaymentdata.paymentin + 0 + $scope.paymentreconData1[0].listpaymentdata.cashopening))+(adjamt);

    }

    $scope.cashClosingBlur = function(cash, adjamt) {

      $scope.paymentreconData.finalamount = (($scope.paymentreconData1[0].listpaymentdata.paymentout + 0 + cash ) - ($scope.paymentreconData1[0].listpaymentdata.paymentin + 0 + $scope.paymentreconData1[0].listpaymentdata.cashopening))+(adjamt);

    }
    
    
    /*=====  End of Adjustment Amount Blur FUnction  ======*/
    
    
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addpaymentrecon = {};
        $scope.paymentreconData = {};
       
        $scope.viewpaymentreconData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.paymentreconData = {};
       
        $scope.viewpaymentreconData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

   /*==================================================
    =            Get Lead Info on Edit Page            =
    ==================================================*/
    if ($scope.OperType != undefined && $scope.OperType != 0) {
      $window.document.title = "ITPreneur - Edit Payment Reconciliation";
      var urlList = baseUrlSrvc.baseUrl + 'listPaymentreconciliationById/' + $scope.OperType;
        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function(pl) {
            $scope.bank = pl.data;

            for (var i = 0; i < $scope.bank.length; i++) {
                if ($scope.bank[i].pPaymentreconciliationId == $scope.OperType) {
                    $scope.paymentreconData1 = $scope.bank[i];
                    //console.log("---",$scope.paymentreconData1);


                    $scope.currBranch_id = $scope.paymentreconData1.bBranchId;
                    //console.log("$scope.currBranch_id",$scope.currBranch_id);

                    var paymntUrl = baseUrlSrvc.baseUrl + 'listPaymentreconciliationByBranchId/' + $scope.OperType + '/' +$scope.currBranch_id;
                     var promisepaymntUrlGet = CRUD_SERVICE.getAllData(paymntUrl);
                     promisepaymntUrlGet.then(function(pl) {
                          $scope.paymentreconData2 = pl.data;
                          $scope.paymentreconData = $scope.paymentreconData2[0];

                          if($scope.paymentreconData.status == 'Complete'){
                            $scope.updatedisabled = true;
                          }
                          else{
                            $scope.updatedisabled = false;
                          }

                          $scope.paymentreconData.finalamount = (($scope.paymentreconData.paymentout + $scope.paymentreconData.bankclosing + $scope.paymentreconData.cashclosing ) 
                            - ($scope.paymentreconData.paymentin + $scope.paymentreconData.bankopening + $scope.paymentreconData.cashopening) ) + 
                          ($scope.paymentreconData.adjustmentamount);

                        //console.log($scope.paymentreconData);
                         },
                         function(errorPl) {
                             $log.error('Some Error in Getting Records.', errorPl);
                         });


                    $scope.curDate1 = $scope.paymentreconData1.monthyear;
                    var d = new Date($scope.curDate1);
                    var m = d.getMonth() + 01;
                    var y = d.getFullYear();
                    $scope.month_a= m;
                    $scope.year_a=y;
                    //console.log($scope.month_a);

                    $scope.monthyearmodel = $scope.year_a + '-' + $scope.month_a;
                    //console.log($scope.monthyearmodel);

                    

                }
            }
            
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        // $timeout(function() {
        //     $scope.$apply(function () {
        //       
        //     });
        // },500);


     }
    /*=====  End of GetLead Info on Edit Page  ======*/
    
    
    /*==================================
    =            View paymentin            =
    ==================================*/
    $scope.viewpaymentrecon1 = function(id, bdata) {
        //console.log(id); 
        //console.log(bdata); 
        $scope.temp_var_a1 = $filter('filter')(bdata, { "pPaymentreconciliationId": id });

       $scope.viewpaymentreconData = $scope.temp_var_a1[0];
       //console.log($scope.viewpaymentreconData); 
    }
    /*=====  End of View paymentin  ======*/
    
    /*==================================
    =            Save paymentin            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.pPaymentreconciliationId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            //data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.monthyear = $scope.curDate1;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentReconciliation'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.pPaymentreconciliationId = pl.data.pPaymentreconciliationId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    
                    });
                },3000);
               GetAllRecords(urlList);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    
                    });
                },3000);
                GetAllRecords(urlList);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
            });
        } else {
          //console.log("finalamount",data.finalamount);
            data.updatedby=$sessionStorage.updatedby;
            data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            //data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.monthyear = $scope.curDate + '-' + '01';
            data.finalamount = data.finalamount;


            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentReconciliation'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {

             
               var paymentrecon = pl.paymentrecon;
               var promiseData = pl.data;
               //console.log("paymentrecon",paymentrecon);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);


                if (promiseData.code == 1) {
                  toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }

                if (promiseData.code == 2) {
                   toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
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
    
    /*=====  End of Save paymentin  ======*/
   
    /*====================================
    =            Delete paymentin            =
    ====================================*/
    
    $scope.delpaymentrecon = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "pPaymentreconciliationId": id });

       $scope.deletepaymentreconData= {
          "pPaymentreconciliationId": $scope.temp_var[0].pPaymentreconciliationId,
          "paymentin": $scope.temp_var[0].paymentin
       };
     }

    $scope.deletepaymentrecon = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deletePaymentReconciliation'
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
    /*=====  End of Delete paymentin  ======*/

    /**
     *
     * Bank Functions
     *
     */

     $scope.addbankArray = [];

     /*=========================================
     =            Clear Models Bank            =
     =========================================*/
     function ClearModelsBank() {
      $scope.bankData = {};
     }
     /*=====  End of Clear Models Bank  ======*/
     
      
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
       $scope.BankClick = function(id) {
        //console.log(id);
      // $scope.curDate = da;
      // var d = new Date(da);
      // var m = d.getMonth() + 1;
      // var y = d.getFullYear();
      // //console.log(m);
      // //console.log(y);

      var yearmonthListUrl = baseUrlSrvc.baseUrl + 'bankBalanceDetailByLastmonthAmountClosing/' + id +'/'+ $scope.month_a + '/' + $scope.year_a + '/' + $scope.currBranch_id;
      var promiseYearmonthGet = CRUD_SERVICE.getAllData(yearmonthListUrl);
      promiseYearmonthGet.then(function(pl) {
          $scope.bankData1 = pl.data;
          //console.log($scope.bankData1);
          $scope.bankData.bankopening = $scope.bankData1[0].bankopening;
          //$scope.bankData.paymentin = $scope.bankData1[0].listpaymentdata.paymentin;
          //$scope.bankData.paymentout = $scope.bankData1[0].listpaymentdata.paymentout;
          //$scope.bankData.bankopening = $scope.bankData1[0].listpaymentdata.bankopening;
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
        if (data.pBankbalancedetailsId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$scope.currBranch_id
            data.pPaymentreconciliationId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBankBalanceDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.pBankbalancedetailsId = pl.data.pBankbalancedetailsId;
               
               
               GetAllRecords_act(urlList_a);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },2000);
                ClearModelsBank();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },2000);
                GetAllRecords_act(urlList_a);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                ClearModelsBank();
            });
        } else {
             data.updatedby=$sessionStorage.updatedby;
             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$scope.currBranch_id;
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
               ////console.log("bank",bank);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },2000);


                if (promiseData.code == 2) {
                    
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               GetAllRecords_act(urlList_a);
               
                ClearModelsBank();
                //}
            }, function (err) {
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },2000);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                   GetAllRecords_act(urlList_a);
                   
                ClearModelsBank();
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
            ClearModelsBank();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    GetAllRecords_act(urlList_a);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModelsBank();
        });
    }
    /*=====  End of Delete technologies  ======*/
    
    
    
});
/*=====  End of Controller  ======*/
