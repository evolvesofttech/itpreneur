/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("EnfeescheduleCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, Branch_Id,
  ngTableParams, Flash, branch_name, toaster, course_fee, firstNameService, middleNameService, lastNameService) {
       
      //console.log("scheduleCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.ScheduleArray = [];
      $scope.FeeArray = [];
      $scope.PaymentArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;

      $scope.Br_name =branch_name.getBranch_name();
      //console.log("$scope.Br_name",$scope.Br_name);

      $scope.CFee =course_fee.getCourse_fee();
      //console.log("$scope.CFee",$scope.CFee);

      $scope.B_Id = Branch_Id.getBranch_Id();
      //console.log($scope.B_Id);


      var brnchName1 = $scope.Br_name.replace(/[\. ,:-]+/g, "");
      var brnchName = brnchName1.toUpperCase();
      $scope.currentBranchInitials = brnchName.substring(0, 3);
      //console.log($scope.currentBranchInitials);

      $scope.fullpay= false;
      
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

      
     var f_name =firstNameService.getFirstName();
      var m_name =middleNameService.getMiddleName();
      var l_name =lastNameService.getLastName();


       $scope.fullName = f_name + ' ' + m_name + ' ' + l_name;
      //console.log($scope.fullName);

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
          
          today1 = yyyy+'-'+mm+'-'+ (dd - 1);
          //console.log("today1",today1);
          $scope.currentDate =today;
          $scope.currentDate1 =today1;
          //console.log("$scope.currentDate",$scope.currentDate);
         /*=====  End of Get Current Date  ======*/

         /*=======================================
         =            fees type click            =
         =======================================*/
         
         $scope.Registration = function(){
          $scope.Plc = false;
           $scope.Plc1 = true;
         }
         $scope.Advanced = function(){
          $scope.Plc = false;
           $scope.Plc1 = true;
         }
         $scope.firInstallment = function(){
          $scope.Plc = false;
           $scope.Plc1 = true;
         }
         $scope.secInstallment = function(){
          $scope.Plc = false;
           $scope.Plc1 = true;
         }
         $scope.thirInstallment = function(){
          $scope.Plc = false;
          $scope.Plc1 = true;
         }
         $scope.Placement = function(){
          $scope.Plc = true;
          $scope.Plc1 = false;
         }

         
         /*=====  End of fees type click  ======*/

         $scope.sheduledateclick = function(dat){

          //console.log(dat);
          $scope.maxdatelimit = dat;

         }
         

         /*========================================
         =            Get Current Year            =
         ========================================*/
         var d = new Date();
         $scope.currentYear = d.getFullYear();
         //console.log("$scope.currentYear",$scope.currentYear);
         /*=====  End of Get Current Year  ======*/

         /*============================================
        =            Clear Modal on Click            =
        ============================================*/
        $scope.clearModalOnCloseSchedule = function() {
            // $scope.viewregistrationData = {};
            $scope.scheduleData = {};
        }

        function ClearModelsSchedule() {
          $scope.scheduleData = {};
        }
        /*=====  End of Clear Modal on Click  ======*/

        /*=====================================
          =            List Schedule            =
          =====================================*/
        var urlScheduleList = baseUrlSrvc.baseUrl + 'listFeeScheduleRegistrationByEnquiryFormId/'+ $scope.OperType;
        GetAllScheduleRecords(urlScheduleList);

        //To Get All Records
        function GetAllScheduleRecords(url) {
            $scope.ScheduleArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.Schedule = pl.data;
                    $scope.ScheduleArray.push($scope.Schedule);
                    //console.log("$scope.Schedule",$scope.Schedule);

                    for(var b=0;b<$scope.Schedule.length;b++) {

                      if ($scope.Schedule[b].feestype == 'Advanced') {
                        $scope.hideAdvanced = true;
                      }

                      if ($scope.Schedule[b].feestype == 'Placement') {
                        $scope.hidePlacement = true;
                      }

                      if ($scope.Schedule[b].feestype == 'Registration') {
                        $scope.hideRegistration = true;
                      }

                      if ($scope.Schedule[b].feestype == '1st Installment') {
                        $scope.hideFirst = true;
                      }

                      if ($scope.Schedule[b].feestype == '2nd Installment') {
                        $scope.hideSecond = true;
                      }

                      if ($scope.Schedule[b].feestype == '3rd Installment') {
                        $scope.hideThird = true;
                      }

                      if ($scope.Schedule[b].feestype == '4th Installment') {
                        $scope.hideFour = true;
                      }

                      if ($scope.Schedule[b].feestype == '5th Installment') {
                        $scope.hideFive = true;
                      }

                      if ($scope.Schedule[b].feestype == '6th Installment') {
                        $scope.hideSix = true;
                      }

                      if ($scope.Schedule[b].feestype == '7th Installment') {
                        $scope.hideSeven = true;
                      }

                      if ($scope.Schedule[b].feestype == '8th Installment') {
                        $scope.hideEight = true;
                      }

                      if ($scope.Schedule[b].feestype == '9th Installment') {
                        $scope.hideNine = true;
                      }

                      if ($scope.Schedule[b].feestype == '10th Installment') {
                        $scope.hideTen = true;
                      }

                    }

                    $scope.paidAmt = 0;

                    for(var a=0;a<$scope.Schedule.length;a++) {
                      $scope.paidAmt += $scope.Schedule[a].paidamount;
                    }

                    for(var j=0;j<$scope.Schedule.length;j++) {

                      if ($scope.Schedule[j].feestype == 'Registration') {
                        $scope.paidAmt = $scope.paidAmt - $scope.Schedule[j].paidamount;
                      }

                    }

                    $scope.remFee = $scope.CFee - $scope.paidAmt;
                    //console.log("$scope.remFee",$scope.remFee);

                    $scope.usersTable_Schedule = new ngTableParams({
                        page: 1,
                        count: 13
                    }, {
                       total: $scope.Schedule.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                        
                            $scope.data_Schedule = params.sorting() ? $filter('orderBy')($scope.ScheduleArray[0], params.orderBy()) : $scope.ScheduleArray[0];
                            $scope.data_Schedule = params.filter() ? $filter('filter')($scope.data_Schedule, params.filter()) : $scope.data_Schedule;
                           $scope.data_Schedule = $scope.data_Schedule.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_Schedule)
                        }
                    });
                    $scope.usersTable_Schedule.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        /*=====  End of List Schedule  ======*/


    /*====================================
    =            List Payment            =
    ====================================*/
    var urlPaymentList = baseUrlSrvc.baseUrl + 'listPaymentInwardByEnquiryFormId/'+ $scope.OperType; 
        GetAllPaymentRecords(urlPaymentList);

        //To Get All Records
        function GetAllPaymentRecords(url) {
            $scope.PaymentArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.Payment = pl.data;
                    $scope.PaymentArray.push($scope.Payment);
                    //console.log("$scope.Payment",$scope.Payment);

                    $scope.usersTable_Payment = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.Payment.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                        
                            $scope.data_Payment = params.sorting() ? $filter('orderBy')($scope.PaymentArray[0], params.orderBy()) : $scope.PaymentArray[0];
                            $scope.data_Payment = params.filter() ? $filter('filter')($scope.data_Payment, params.filter()) : $scope.data_Payment;
                           $scope.data_Payment = $scope.data_Payment.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_Payment)
                        }
                    });
                    $scope.usersTable_Payment.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        /*=====  End of List Payment  ======*/
          


           /*=======================================
            =            Update Schedule            =
            =======================================*/
            $scope.OnScheduleStatusChange = function(id, data) {
                   //console.log(id);
                   //console.log(data);
                  
                   var ScheduleUrl = baseUrlSrvc.baseUrl + 'updateSchedule/'+ id + '/' + data;
                   var promiseScheduleGet = CRUD_SERVICE.getAllData(ScheduleUrl);
                   promiseScheduleGet.then(function(pl) {
                           $scope.ScheduleStatus = pl.data;
                           //console.log("$scope.ScheduleStatus",$scope.ScheduleStatus);
                           if ($scope.ScheduleStatus.code == 1) {
                              toaster.success({title: "Success", body:"Schedule Updated Successfully!",tapToDismiss: true,showCloseButton: true});
                           } else {
                              toaster.error({title: "Error", body:"Error In Updating Schedule!",tapToDismiss: true,showCloseButton: true});
                           }
                           // $scope.Schedulestatus = $filter('filter')($scope.ScheduleStatus, { "acScheduleId": id });
                       },
                       function(errorPl) {
                           $log.error('Some Error in Getting Records.', errorPl);
                       });
               }
               /*=====  End of Update Schedule  ======*/

            $scope.OnPaymentClick = function(id, pdata) {
                  $scope.payID = id;
                  //console.log($scope.payID);
                  //console.log(pdata);

                   $scope.temp_var_c = $filter('filter')(pdata, { "eFeescheduleregistrationId": id });
                   //console.log($scope.temp_var_c);
                   $scope.paymentData= {
                      "eFeescheduleregistrationId": $scope.temp_var_c[0].eFeescheduleregistrationId,
                      "feestype": $scope.temp_var_c[0].feestype,
                      "dueamount": $scope.temp_var_c[0].dueamount,
                      "status": "Uncleared"
                   };

                   $scope.DueAmt = $scope.temp_var_c[0].dueamount;
                   //console.log("$scope.DueAmt",$scope.DueAmt);

                   //console.log($scope.paymentData);

                   $scope.currentFeesType = $scope.temp_var_c[0].feestype;

                   var paymentinDatUrl = baseUrlSrvc.baseUrl + 'listEnquirybyRegistrationandEnrollment/'+ $scope.OperType;
                   var promisepaymentinDatGet = CRUD_SERVICE.getAllData(paymentinDatUrl);
                   promisepaymentinDatGet.then(function(pl) {
                          $scope.paymentData1 =pl.data;
                          $scope.paymentData2 = $scope.paymentData1[0];
                          //console.log($scope.paymentData[0]);
                          $scope.sname= $scope.paymentData2.firstname;
                          $scope.bname= $scope.paymentData2.branchname;
                          $scope.cname= $scope.paymentData2.coursename;
                          $scope.btchname= $scope.paymentData2.batchname;
                          $scope.paymentData.bBranchId= $scope.paymentData2.bBranchId;
                          $scope.paymentData.cBatchId= $scope.paymentData2.cBatchId;
                          $scope.paymentData.cCourseId= $scope.paymentData2.cCourseId;

                       },
                       function(errorPl) {
                           $log.error('Some Error in Getting Records.', errorPl);
                       });
                 }


          /*==================================
          =            Discount List            =
          ==================================*/
          var DiscountListUrl = baseUrlSrvc.baseUrl + 'listDiscount';
          var promiseDiscountGet = CRUD_SERVICE.getAllData(DiscountListUrl);
          promiseDiscountGet.then(function(pl) {
              $scope.Discount = pl.data;

              //console.log($scope.Discount);
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
          /*=====  End of Discount List  ======*/

          /*================================================
          =            Schedule Calculation API            =
          ================================================*/
          var feeCalcListUrl = baseUrlSrvc.baseUrl + 'listFeeScheduleByEnquiryFormId/' + $scope.OperType;
          GetAllCalcFeeRecords(feeCalcListUrl);

          function GetAllCalcFeeRecords(url) {
            
            var promiseFeeCalcGet = CRUD_SERVICE.getAllData(url);
            promiseFeeCalcGet.then(function(pl) {
                $scope.CalculatedFees = pl.data;

                $scope.calcFee = $scope.CalculatedFees[0].feesSchedule;

                $scope.valFee = $scope.calcFee.pendingamount;

                //console.log("CalculatedFees",$scope.calcFee);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
          }
          /*=====  End of Schedule Calculation API  ======*/

          /*==========================================
          =            Full Payment Click            =
          ==========================================*/
          $scope.fullPaymentClick = function(fee) {
            //console.log(fee);
            $scope.paymentData.paymentamount = fee;
             $scope.fullpay= true;
          }
          /*=====  End of Full Payment Click  ======*/

          /*=============================================
          =            Partial Payment Click            =
          =============================================*/
          $scope.partialPaymentClick = function() {
            $scope.paymentData.paymentamount = '';
             $scope.fullpay= false;
          }
          /*=====  End of Partial Payment Click  ======*/

          /*==========================================
          =            Payment Mode Click            =
          ==========================================*/
          $scope.paymentModeChange = function(data) {
            //console.log(data);
            if (data=='Cash') {
              $scope.Crd = false;
              $scope.Chq = false;
              $scope.Epay = false;
            } 
            if (data == 'Cheque') {
              $scope.Crd = false;
              $scope.Chq = true;
              $scope.Epay = false;
            }
            if (data == 'Card') {
              $scope.Crd = true;
              $scope.Chq = false;
              $scope.Epay = false;
            } 
            if (data == 'Electronic Payment') {
              $scope.Crd = false;
              $scope.Chq = false;
              $scope.Epay = true;
            }
          }
          /*=====  End of Payment Mode Click  ======*/

          /*==========================================
          =            Schedule Fees Type            =
          ==========================================*/
          $scope.feesTypeChange = function(data) {
            //console.log(data);
            if (data == 'Placement') {
              $scope.Plc = true;
              $scope.Plc1 = false;
            } else {
              $scope.Plc = false;
              $scope.Plc1 = true;
            }
          }
          /*=====  End of Schedule Fees Type  ======*/

          /*==========================================
          =            Add Schedule Click            =
          ==========================================*/
          $scope.addScheduleClick = function() {
            $scope.headingMessage = "Add Schedule";
            $scope.disableAmount = false;
          }
          /*=====  End of Add Schedule Click  ======*/
        
     /*==========================================
    =            Edit Schedule            =
    ==========================================*/
    $scope.editSchedule = function(id) {
      $scope.headingMessage = "Edit Schedule";
         //console.log(id);

         $scope.disableAmount = true;

         var ScheduleListUrl = baseUrlSrvc.baseUrl + 'listFeeScheduleRegistrationByEnquiryFormId/'+ $scope.OperType;
          var promiseScheduleGet = CRUD_SERVICE.getAllData(ScheduleListUrl);
          promiseScheduleGet.then(function(pl) {
              $scope.EnquirySchedule = pl.data;
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          }); 

        var promiseGet = CRUD_SERVICE.getAllData(ScheduleListUrl);
        promiseGet.then(function (pl) {
                $scope.Schedule_a = pl.data;
                for (var i = 0; i < $scope.Schedule_a.length; i++) {
                    if ($scope.Schedule_a[i].eFeescheduleregistrationId == id) {
                        $scope.scheduleData = $scope.Schedule_a[i];
                    }
                }
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit Schedule  ======*/

    /*=======================================
    =            View Schedule board            =
    =======================================*/
    $scope.viewSchedule = function(id, bdata) {
    
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "eFeescheduleregistrationId": id });

       $scope.viewscheduleData= $scope.temp_var_a[0];
       //console.log($scope.viewscheduleData);
    }
    
    /*=====  End of View Schedule   ======*/
      
     $scope.saveSchedule = function(data) {
        //console.log(data);

        if (data.eFeescheduleregistrationId) {
           if (data.totalamount==data.paidamount) {
              data.status= "Complete";
            }
            else
            {
               data.status= "Incomplete";
            }
           
            data.inInstituteId = $sessionStorage.inInstituteId;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $scope.B_Id;
            data.eEnquiryFormId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateFeeScheduleRegistration'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.eFeescheduleregistrationId = pl.data.eFeescheduleregistrationId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                     ClearModelsSchedule();
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                     ClearModelsSchedule();
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

            data.inInstituteId = $sessionStorage.inInstituteId;
            data.createdby = $sessionStorage.createdby;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $scope.B_Id;
            data.eEnquiryFormId = $scope.OperType;
            data.paidamount = 0;
            data.adUserId = $sessionStorage.adUserId;
            data.dueamount = data.totalamount;
            data.status= "Unpaid";
            
            if (data.feestype=="Placement") {
              data.placementstatus= "Submitted";
            }
            else
            {
               data.placementstatus= "Not-Submitted";
            }

            if (data.dueamount==0) {
              $scope.paymentbutton = true;
            }

            
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateFeeScheduleRegistration'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                     ClearModelsSchedule();
                    });
                },100);
                 // if (promiseData.code == 2) {
                //    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                // } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                //}
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                     ClearModelsSchedule();
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };

     


     $scope.saveFees = function(data) {
        //console.log(data);

        if (data.eFeestructureregistrationId) {
            
           data.inInstituteId = $sessionStorage.inInstituteId;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $scope.currentBranchId;
            data.eEnquiryFormId = $scope.OperType;
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateFeeStructureRegistration'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.eFeestructureregistrationId = pl.data.eFeestructureregistrationId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllFeeRecords(urlFeeList );
                    GetAllScheduleRecords(urlScheduleList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllFeeRecords(urlFeeList );
                    GetAllScheduleRecords(urlScheduleList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

            data.inInstituteId = $sessionStorage.inInstituteId;
            data.createdby = $sessionStorage.createdby;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $scope.currentBranchId;
            data.eEnquiryFormId = $scope.OperType;
            data.status = "Draft";
            data.feestype = $scope.currentFeesType;     
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateFeeStructureRegistration'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllFeeRecords(urlFeeList);
                    GetAllScheduleRecords(urlScheduleList);
                    });
                },100);
                 // if (promiseData.code == 2) {
                //    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                // } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                //}
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllFeeRecords(urlFeeList);
                    GetAllScheduleRecords(urlScheduleList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };


     $scope.savePayment = function(data) {
        //console.log(data);

        if (data.ePaymentregistrationId) {
            
           data.inInstituteId = $sessionStorage.inInstituteId;
          data.updatedby = $sessionStorage.updatedby;
           data.bBranchId = $scope.B_Id;
           data.adUserId = $sessionStorage.adUserId;
            data.eEnquiryFormId = $scope.OperType;
            
            
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentInward'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.ePaymentregistrationId = pl.data.ePaymentregistrationId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllPaymentRecords(urlPaymentList);
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllPaymentRecords(urlPaymentList);
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

            data.inInstituteId = $sessionStorage.inInstituteId;
            data.createdby = $sessionStorage.createdby;
            data.adUserId = $sessionStorage.adUserId;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $scope.B_Id;
            data.eEnquiryFormId = $scope.OperType;
            data.eFeescheduleregistrationId = $scope.payID;

            data.receiptno = $scope.currentBranchInitials + $scope.currentYear;
            
            if (data.paymentstatus=="Partial Payment") {
              data.dueamount = data.dueamount - data.paymentamount;
            }
            else{
              data.dueamount = 0;
            }
            
            //console.log("hello",data.dueamount);
           
            
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePaymentInward'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllPaymentRecords(urlPaymentList);
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                    });
                },100);
                 // if (promiseData.code == 2) {
                //    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                // } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                //}
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllPaymentRecords(urlPaymentList);
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };

    /*============================================
    =            Delete Schedule            =
    ============================================*/
    $scope.delSchedule = function(id, ftype, bdata) {
         //console.log(id); 
         //console.log(ftype); 
        $scope.temp_var = $filter('filter')(bdata, { "eFeescheduleregistrationId": id });
//console.log($scope.temp_var);
       $scope.deletescheduleData= {
          "eFeescheduleregistrationId": $scope.temp_var[0].eFeescheduleregistrationId,
          "feestype": $scope.temp_var[0].feestype
       };
     }

    $scope.deleteSchedule = function (id, ftype) {


        //console.log(id);

        if (ftype == 'Advanced') {
          $scope.hideAdvanced = false;
        }
        
        if (ftype == 'Placement') {
          $scope.hidePlacement = false;
        }

        if (ftype == 'Registration') {
          $scope.hideRegistration = false;
        }

        if (ftype == '1st Installment') {
          $scope.hideFirst = false;
        }

        if (ftype == '2nd Installment') {
          $scope.hideSecond = false;
        }

        if (ftype == '3rd Installment') {
          $scope.hideThird = false;
        }

        if (ftype == '4th Installment') {
          $scope.hideFour = false;
        }

        if (ftype == '5th Installment') {
          $scope.hideFive = false;
        }

        if (ftype == '6th Installment') {
          $scope.hideSix = false;
        }

        if (ftype == '7th Installment') {
          $scope.hideSeven = false;
        }

        if (ftype == '8th Installment') {
          $scope.hideEight = false;
        }

        if (ftype == '9th Installment') {
          $scope.hideNine = false;
        }

        if (ftype == '10th Installment') {
          $scope.hideTen = false;
        }


        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteFeeScheduleRegistration'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllofficeFilterRecords(urlgapFilterList);
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);

                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    // GetAllGapFilterRecords(urlgapFilterList);
                    GetAllScheduleRecords(urlScheduleList);
                    GetAllCalcFeeRecords(feeCalcListUrl);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete Officeuse  ======*/

});
/*=====  End of Officeuse Controller  ======*/