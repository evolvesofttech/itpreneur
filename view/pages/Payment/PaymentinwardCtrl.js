/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("PaymentinwardCtrl",
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope,$resource, $sessionStorage, toaster, $window) {
    //console.log("paymentin");
    $scope.paymentArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Payment Inward";
    //console.log($scope.OperType);
     $scope.hideNameAll = false;
      $scope.hideNameOne = true;
      $scope.disableName = false;

      // if ($scope.role == 'Admin' || $scope.role == 'ITP Admin' || $scope.role == 'Account Owner' || $scope.role == 'Sales Manager') {
      //   $scope.disableStatus = true;
      // } else {
      //   $scope.disableStatus = false;
      // }

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

    // $scope.status = function(){
    //   $scope.paymentinData.status=='Cleared' = false;
    //   $scope.paymentinData.status=='Uncleared'=true;
    // }

     /*========================================
         =            Get Current Date            =
         ========================================*/
         var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();

          if(dd<10) {
              dd='0'+dd;
          } 

          if(mm<10) {
              mm='0'+mm
          } 

          today = yyyy+'-'+mm+'-'+(dd - 1);
          $scope.currentDate =today;
          //console.log("$scope.currentDate",$scope.currentDate);
         /*=====  End of Get Current Date  ======*/

         /*========================================
         =            Get Current Year            =
         ========================================*/
         var d = new Date();
         $scope.currentYear = d.getFullYear();
         //console.log("$scope.currentYear",$scope.currentYear);
         /*=====  End of Get Current Year  ======*/



         $scope.getId = function(data) {
          //console.log(data);
          //console.log(data.eEnquiryFormId);

          //$scope.paymentinData.eEnquiryFormId = data.eEnquiryFormId;
          $scope.Enq = data.eEnquiryFormId;
          //console.log($scope.Enq);

          var paymentinDatUrl = baseUrlSrvc.baseUrl + 'listEnquiryFormbyId/'+data.eEnquiryFormId;
             var promisepaymentinDatGet = CRUD_SERVICE.getAllData(paymentinDatUrl);
             promisepaymentinDatGet.then(function(pl) {
                    $scope.paymentinData1 =pl.data;
                    $scope.paymentinData2 = $scope.paymentinData1[0];
                    //console.log("aaaaa",$scope.paymentinData1[0]);
                    $scope.bname= $scope.paymentinData2.branchname;
                    $scope.cname= $scope.paymentinData2.coursename;
                    $scope.btchname= $scope.paymentinData2.batchname;
                    // $scope.paymentinData.bBranchId= $scope.paymentinData2.bBranchId;
                    // $scope.paymentinData.cBatchId= $scope.paymentinData2.cBatchId;
                    // $scope.paymentinData.cCourseId= $scope.paymentinData2.cCourseId;
                     $scope.bBranchId1= $scope.paymentinData2.bBranchId;
                    $scope.cBatchId1= $scope.paymentinData2.cBatchId;
                    $scope.cCourseId1= $scope.paymentinData2.cCourseId;
                    $scope.cfee = $scope.paymentinData2.totalfee;


                    /*==================================
                    =            Receipt No            =
                    ==================================*/
                    var brnchName1 = $scope.bname.replace(/[\. ,:-]+/g, "");
                    var brnchName = brnchName1.toUpperCase();
                    $scope.currentBranchInitials = brnchName.substring(0, 3);
                    //console.log($scope.currentBranchInitials);
                    /*=====  End of Receipt No  ======*/

                     var FeeListUrl = baseUrlSrvc.baseUrl + 'listFeeScheduleRegistrationByEnquiryFormId/'+data.eEnquiryFormId;
                     var promiseFeeGet = CRUD_SERVICE.getAllData(FeeListUrl);
                     promiseFeeGet.then(function(pl) {
                          $scope.FeeType = pl.data;
                          //console.log($scope.FeeType);
                          // $scope.feetype= $scope.FeeType.feestype;
                          // $scope.due= $scope.paymentinData.dueamount;

                    //console.log($scope.FeeType);
                         },
                         function(errorPl) {
                             $log.error('Some Error in Getting Records.', errorPl);
                         });



                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
         }

         $scope.AddHideActivityStatus = function() {
           
             $scope.hideActivityStatus= true;
             $scope.hideStudentList = false;
             $scope.disableFeesType = false;

             

             if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
              var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryFormByRegistration';
            } else {
              var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryFormByRegistrationFormByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
            }

             var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
             promiseStudentGet.then(function(pl) {
              $scope.Students = pl.data;

              //console.log($scope.Students);
            },
            function(errorPl) {
               $log.error('Some Error in Getting Records.', errorPl);
           });
          }
          /*=====  End of Partial Payment Click  ======*/

          $scope.chequeChecked = function() {
            $scope.chq = true;
            $scope.ca = false;
            $scope.et = false;

            $scope.paymentinData.transactionno = "";
          }

          $scope.cashChecked = function() {
            $scope.chq = false;
            $scope.ca = false;
            $scope.et= false;
            $scope.paymentinData.transactionno = "";
            $scope.paymentinData.chequeno = "";
            $scope.paymentinData.chequedate = "";
            $scope.paymentinData.bankname = "";
          }
          $scope.cardChecked = function(){
            $scope.chq = false;
            $scope.ca = true;
            $scope.et = false;
            $scope.paymentinData.chequeno = "";
            $scope.paymentinData.chequedate = "";
            $scope.paymentinData.bankname = "";
            $scope.paymentinData.transactionno = "";
          }
          $scope.ETChecked = function(){
            $scope.chq = false;
            $scope.ca = false;
            $scope.et = true;
            $scope.paymentinData.chequeno = "";
            $scope.paymentinData.chequedate = "";
            $scope.paymentinData.bankname = "";

          }

       $scope.studentChange = function(id) {
           
             //console.log(id);
             // $scope.disableAllInput = false;

             var paymentinDatUrl = baseUrlSrvc.baseUrl + 'listEnquiryFormbyId/'+id;
             var promisepaymentinDatGet = CRUD_SERVICE.getAllData(paymentinDatUrl);
             promisepaymentinDatGet.then(function(pl) {
                    $scope.paymentinData1 =pl.data;
                    $scope.paymentinData2 = $scope.paymentinData1[0];
                    //console.log($scope.paymentinData[0]);
                    $scope.bname= $scope.paymentinData2.branchname;
                    $scope.cname= $scope.paymentinData2.coursename;
                    $scope.btchname= $scope.paymentinData2.batchname;
                    $scope.bBranchId1= $scope.paymentinData2.bBranchId;
                    $scope.cBatchId1= $scope.paymentinData2.cBatchId;
                    $scope.cCourseId1= $scope.paymentinData2.cCourseId;
                    $scope.eEnquiryFormId1= $scope.paymentinData2.eEnquiryFormId;

                    /*==================================
                    =            Receipt No            =
                    ==================================*/
                    var brnchName1 = $scope.bname.replace(/[\. ,:-]+/g, "");
                    var brnchName = brnchName1.toUpperCase();
                    $scope.currentBranchInitials = brnchName.substring(0, 3);
                    //console.log($scope.currentBranchInitials);
                    /*=====  End of Receipt No  ======*/

                     var FeeListUrl = baseUrlSrvc.baseUrl + 'listFeeScheduleRegistrationByEnquiryFormId/'+id;
                     var promiseFeeGet = CRUD_SERVICE.getAllData(FeeListUrl);
                     promiseFeeGet.then(function(pl) {
                          $scope.FeeType = pl.data;
                          //console.log($scope.FeeType);
                          // $scope.feetype= $scope.FeeType.feestype;
                          // $scope.due= $scope.paymentinData.dueamount;

                    //console.log($scope.FeeType);
                         },
                         function(errorPl) {
                             $log.error('Some Error in Getting Records.', errorPl);
                         });



                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
          }


          $scope.feeChange = function(id) {
           
             //console.log(id);
             // $scope.disableAllInput = false;

             var FeeListUrl = baseUrlSrvc.baseUrl + 'listFeeScheduleRegistrationId/'+id;
             var promiseFeeGet = CRUD_SERVICE.getAllData(FeeListUrl);
             promiseFeeGet.then(function(pl) {
                    $scope.paymentinData3 =pl.data;
                    $scope.paymentinData4 = $scope.paymentinData3[0];
                    //console.log($scope.paymentinData[0]);
                     $scope.due= $scope.paymentinData4.dueamount;

                     if ($scope.due == 0) {
                      $scope.fullpay= true;
                    } else {
                      $scope.fullpay= false;
                    }
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
          }

    /*=======================================
    =            Update Status            =
    =======================================*/
    $scope.OnStatusChange = function(id, data) {
           //console.log(id);
           //console.log(data);
          
           var payinUrl = baseUrlSrvc.baseUrl + 'updatePaymentInwardStatus/'+ id + '/' + data + '/' + $sessionStorage.adUserId;
           var promisepayinGet = CRUD_SERVICE.getAllData(payinUrl);
           promisepayinGet.then(function(pl) {

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

          
  /*==========================================
          =            Full Payment Click            =
          ==========================================*/
          $scope.fullPaymentClick = function(fee) {
            //console.log(fee);
            $scope.paymentinData.paymentamount = fee;
             $scope.fullpay= true;
          }
          /*=====  End of Full Payment Click  ======*/

          /*=============================================
          =            Partial Payment Click            =
          =============================================*/
          $scope.partialPaymentClick = function() {
            $scope.paymentinData.paymentamount = '';
             $scope.fullpay= false;
          }
          /*=====  End of Partial Payment Click  ======*/


      /*===================================
      =            Branch List            =
      ===================================*/
      var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
      var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
      promiseBranchGet.then(function(pl) {
          $scope.Branch = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Branch List  ======*/

       /*===================================
      =            Course List            =
      ===================================*/
      var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
      var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
      promiseCourseGet.then(function(pl) {
          $scope.Course = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Course List  ======*/

    /*======================================
    =            Get List payment            =
    ======================================*/
    if ($scope.role == 'Admin' || $scope.role == 'System Admin' || $scope.role == 'Accounts Manager') {
      var urlList = baseUrlSrvc.baseUrl + 'listPaymentInward';
    } else {
      var urlList = baseUrlSrvc.baseUrl + 'listPaymentInwardByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
    }
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.paymentArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.payment = pl.data;
                $scope.paymentArray.push($scope.payment);
                //console.log("$scope.payment",$scope.payment);

                $scope.usersTable_paymentin = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.payment.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_paymentin = params.sorting() ? $filter('orderBy')($scope.paymentArray[0], params.orderBy()) : $scope.paymentArray[0];
                        $scope.data_paymentin = params.filter() ? $filter('filter')($scope.data_paymentin, params.filter()) : $scope.data_paymentin;
                       $scope.data_paymentin = $scope.data_paymentin.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_paymentin)
                    }
                });
                $scope.usersTable_paymentin.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List payment  ======*/

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
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addpaymentin = {};
        $scope.paymentinData = {};
         $scope.selected = {};
        $scope.hideStudentList = false;
        $scope.viewpaymentinData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.paymentinData = {};
        $scope.hideNameAll = false;
        $scope.selected = {};
        $scope.hideNameOne = true;
        $scope.disableName = false;
        $scope.hideStudentList = false;
        $scope.viewpaymentinData = {};
        $scope.paymentinData.status = 'Uncleared';
    }
    /*=====  End of Clear Modal on Click  ======*/

    
      $scope.OnPaymentClick = function(id, pdata) {
        // $scope.payID = id;
        //console.log($scope.payID);
        //console.log(pdata);

         $scope.temp_var_c = $filter('filter')(pdata, { "pPaymentinwardId": id });
         //console.log($scope.temp_var_c);
         $scope.paymentData= {
            "pPaymentinwardId": $scope.temp_var_c[0].pPaymentinwardId,
            "feestype": $scope.temp_var_c[0].feestype,
            "dueamounts": $scope.temp_var_c[0].dueamount
         };

         //console.log($scope.paymentData);

         $scope.currentFeesType = $scope.temp_var_c[0].feestype;

         // var paymentinDatUrl = baseUrlSrvc.baseUrl + 'listEnquirybyRegistrationandEnrollment/'+ $scope.OperType;
         // var promisepaymentinDatGet = CRUD_SERVICE.getAllData(paymentinDatUrl);
         // promisepaymentinDatGet.then(function(pl) {
         //        $scope.paymentData1 =pl.data;
         //        $scope.paymentData2 = $scope.paymentData1[0];
         //        //console.log($scope.paymentData[0]);
         //        $scope.sname= $scope.paymentData2.firstname;
         //        $scope.bname= $scope.paymentData2.branchname;
         //        $scope.cname= $scope.paymentData2.coursename;
         //        $scope.btchname= $scope.paymentData2.batchname;
         //        $scope.paymentData.bBranchId= $scope.paymentData2.bBranchId;
         //        $scope.paymentData.cBatchId= $scope.paymentData2.cBatchId;
         //        $scope.paymentData.cCourseId= $scope.paymentData2.cCourseId;

         //     },
         //     function(errorPl) {
         //         $log.error('Some Error in Getting Records.', errorPl);
         //     });
       }


    /*========================================
    =            Edit paymentin Modal            =
    ========================================*/
    
    $scope.editpaymentin = function(id) {
         //console.log(id); 
         $scope.disableFeesType = true;



        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.paymentin1 = pl.data;
                //console.log($scope.paymentin1);
                for (var i = 0; i < $scope.paymentin1.length; i++) {
                    if ($scope.paymentin1[i].pPaymentinwardId == id) {
                        $scope.paymentinData = $scope.paymentin1[i];
                           //console.log($scope.paymentinData);
                           $scope.Students=[{
                            "eEnquiryFormId" : $scope.paymentinData.eEnquiryFormId,
                            "firstname" : $scope.paymentinData.firstname,
                            "middlename" : $scope.paymentinData.middlename,
                            "lastname" : $scope.paymentinData.lastname

                          }];


                          //console.log("$scope.Students", $scope.Students);
                          $scope.Enq = $scope.paymentinData.eEnquiryFormId;

                          $scope.hideStudentList = true;

                          $scope.bname= $scope.paymentinData.branchname;
                          $scope.cname= $scope.paymentinData.coursename;
                          $scope.btchname= $scope.paymentinData.batchname;
                          $scope.bBranchId1= $scope.paymentinData.bBranchId;
                          $scope.cBatchId1= $scope.paymentinData.cBatchId;
                          $scope.cCourseId1= $scope.paymentinData.cCourseId;
                          

                          $scope.FeeType = [{
                            "eFeescheduleregistrationId":$scope.paymentinData.eFeescheduleregistrationId,
                            "feestype":$scope.paymentinData.feestype
                          }];

                          // list fee schedule
                          var FeeListUrl = baseUrlSrvc.baseUrl + 'listFeeScheduleRegistrationId/'+$scope.paymentinData.eFeescheduleregistrationId;
                           var promiseFeeGet = CRUD_SERVICE.getAllData(FeeListUrl);
                           promiseFeeGet.then(function(pl) {
                              $scope.paymentinData3 =pl.data;
                              $scope.paymentinData4 = $scope.paymentinData3[0];
                              //console.log($scope.paymentinData[0]);
                               $scope.due= $scope.paymentinData4.dueamount;
                               $scope.due = $scope.due + $scope.paymentinData.paymentamount;

                               if ($scope.due == 0) {
                                $scope.fullpay= true;
                              } else {
                                $scope.fullpay= false;
                              }
                           },
                           function(errorPl) {
                               $log.error('Some Error in Getting Records.', errorPl);
                           });
                           // list fee schedule

                           //enquiry list
                           var EnListUrl = baseUrlSrvc.baseUrl + 'listEnquirybyRegistrationandEnrollment/'+ $scope.paymentinData.eEnquiryFormId;
                           var promiseEnqGet = CRUD_SERVICE.getAllData(EnListUrl);
                           promiseEnqGet.then(function(pl) {
                              $scope.EnqData =pl.data;
                              //console.log($scope.EnqData);
                              $scope.cfee = $scope.EnqData[0].totalfee;
                           },
                           function(errorPl) {
                               $log.error('Some Error in Getting Records.', errorPl);
                           });
                           //enquiry list

                          var fullname = $scope.paymentinData.lastname +  ' ' + $scope.paymentinData.firstname + ' ' + $scope.paymentinData.middlename;
                          $scope.selectedStudentName = fullname;
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit paymentin Modal  ======*/
    
    /*==================================
    =            View paymentin            =
    ==================================*/
    $scope.viewpaymentin = function(id, bdata) {
        //console.log(id); 
        $scope.temp_viewdata = $filter('filter')(bdata, { "pPaymentinwardId": id });

       $scope.viewpaymentinData= $scope.temp_viewdata[0];

       if ($scope.viewpaymentinData.modeofpayment == 'Cash') {
          $scope.Cash = true;
          $scope.viewCheque = false;
          $scope.viewCard = false;
           $scope.ET = false; 
       }

       if ($scope.viewpaymentinData.modeofpayment == 'Cheque') {

          $scope.viewCheque = true;
          $scope.viewCard = false;
           $scope.ET = false; 
       }

       if($scope.viewpaymentinData.modeofpayment == 'Card'){
        $scope.viewCard = true;
        $scope.viewCheque = false;
        $scope.ET = false; 
       }

       if ($scope.viewpaymentinData.modeofpayment == 'E T') {
        $scope.ET = true;
        $scope.viewCard = false;
        $scope.viewCheque = false;
       }
    }
    /*=====  End of View paymentin  ======*/
    
    /*==================================
    =            Save paymentin            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.pPaymentinwardId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            // data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId=$sessionStorage.adUserId;
            // data.eEnquiryFormId=$sessionStorage.eEnquiryFormId;
            data.eEnquiryFormId = $scope.Enq;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentInward'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.pPaymentinwardId = pl.data.pPaymentinwardId;
               
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
            // data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId=$sessionStorage.adUserId;
            // data.eEnquiryFormId=$sessionStorage.eEnquiryFormId;
            data.documentdate = $scope.currentDate;
            data.receiptno = $scope.currentBranchInitials + $scope.currentYear;
            data.eEnquiryFormId = $scope.Enq;
            data.bBranchId = $scope.bBranchId1;
            data.cCourseId = $scope.cCourseId1;
            data.cBatchId = $scope.cBatchId1;

            if (data.paymentstatus=="Partial Payment") {
              data.dueamount = $scope.due - data.paymentamount;
            }
            else{
              data.dueamount = 0;
            }

            // if(data.paymentstatus=="Full Payment"){
            //   data.status = "Cleared";
            // }

            // else{
            //   data.status = "Uncleared";
            // }

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentInward'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var designation = pl.designation;
               var promiseData = pl.data;
               //console.log("designation",designation);
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
    
    /*=====  End of Save paymentin  ======*/
   
    /*====================================
    =            Delete paymentin            =
    ====================================*/
    
    $scope.delpaymentin = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "pPaymentinwardId": id });

       $scope.deletepaymentinData= {
          "pPaymentinwardId": $scope.temp_var[0].pPaymentinwardId,
          "feestype": $scope.temp_var[0].feestype
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deletePaymentInward'
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
    
    
});
/*=====  End of Controller  ======*/
