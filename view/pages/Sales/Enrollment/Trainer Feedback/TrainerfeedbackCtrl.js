/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("feedbackCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, toaster, feedback_Cid, 
  feedback_Bid, feedback_Eid, firstNameService, middleNameService, lastNameService, avg_att) {
       
      //console.log("feedbackCtrl");

      $scope.C_Id = feedback_Cid.getCourse_id();
      //console.log($scope.C_Id);
      
      $scope.B_Id = feedback_Bid.getBatch_id();
      //console.log($scope.B_Id);
      $scope.E_Id = feedback_Eid.getEnq_id();
      //console.log($scope.E_Id);
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;

      $scope.avgatt =avg_att.getavg_att();
      //console.log("$scope.avgatt",$scope.avgatt);
     
      $scope.trainerFeedbackArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
      // $scope.feedbackhide = false; 

      
               
    // if ($sessionStorage.userData1.roleName ="Sales Executive") {
    //       $scope.feedbackhide = true;
    //     }
    //     else{
    //        $scope.feedbackhide = false;
    //     }
      
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

    
        /*=========================================
        =            Technology Change            =
        =========================================*/
        $scope.technologyChange = function(id) {
            //console.log(id);
            $scope.techId = id;
        }
        /*=====  End of Technology Change  ======*/
        
    
 

    /*============================================
    =            Get Trainer Feedback            =
    ============================================*/
    var urlTrainerFeedbackList = baseUrlSrvc.baseUrl + 'listTrainerFeedbackByEnquiryFormId/' + $scope.OperType;
    GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);

    //To Get All Records
    function GetAllRecordsTrainerFeedback(url) {
        $scope.trainerFeedbackArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.trainerFeedbackList = pl.data;
                $scope.trainerFeedbackArray.push($scope.trainerFeedbackList);
                 // $scope.attavg = $scope.trainerFeedbackList.attendancepercetage;
                $scope.usersTable_TrainerFeedback = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.trainerFeedbackList.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_TrainerFeedback = params.sorting() ? $filter('orderBy')($scope.trainerFeedbackArray[0], params.orderBy()) : $scope.trainerFeedbackArray[0];
                        $scope.data_TrainerFeedback = params.filter() ? $filter('filter')($scope.data_TrainerFeedback, params.filter()) : $scope.data_TrainerFeedback;
                       $scope.data_TrainerFeedback = $scope.data_TrainerFeedback.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_TrainerFeedback)
                    }
                });
                $scope.usersTable_TrainerFeedback.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
      }
    /*=====  End of Get Trainer Feedback  ======*/

  
    /*==================================================
      =            Get Enrollment on Edit Page            =
      ==================================================*/

      

      $scope.addFeedbackClick = function() {
       
        var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquirybyRegistrationandEnrollment/'+ $scope.OperType;
          
        GetAllRecordsCheck(urlEnquiryList);
      }

      function addFeedbackClickFunction() {
        //console.log("Function Call");
        var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquirybyRegistrationandEnrollment/'+ $scope.OperType;
          
        GetAllRecordsCheck(urlEnquiryList);
      }
        
      function GetAllRecordsCheck(url) {



          var promiseGet = CRUD_SERVICE.getAllData(url);
          promiseGet.then(function(pl) {
              $scope.enq = pl.data;
              for (var i = 0; i < $scope.enq.length; i++) {
                  if ($scope.enq[i].eEnquiryFormId == $scope.OperType) {
                      $scope.enqData = $scope.enq[i];
                      //console.log("=================",$scope.enqData);
                      $scope.cName = $scope.enqData.coursename;
                      $scope.bName = $scope.enqData.batchname;

                      // Technology List
                      var TechnologyListUrl = baseUrlSrvc.baseUrl + 'listTechnologyByBranchIdCourseIdAndEnquiryformId/'+ $scope.B_Id + '/' + $scope.C_Id + '/' +$scope.OperType;
                       var promiseTechnologyGet = CRUD_SERVICE.getAllData(TechnologyListUrl);
                       promiseTechnologyGet.then(function(pl) {
                            $scope.feedback_data = pl.data;

                            //console.log("feedback_data",$scope.feedback_data);
                            //$scope.feedback_data1 = [];

                            

                            $timeout(function() {
                                $scope.$apply(function () {

                                  for(var i=0;i<$scope.feedback_data.length;i++) {

                                      for(var j=0;j<$scope.trainerFeedbackList.length;j++) {

                                        //console.log($scope.trainerFeedbackList[j].cTechnologyMasterId);
                                          //console.log($scope.feedback_data[i].cTechnologyMasterId);
                                        if ($scope.trainerFeedbackList[j].cTechnologyMasterId == $scope.feedback_data[i].cTechnologyMasterId) {
                                          //console.log("if");
                                          //console.log($scope.trainerFeedbackList[j].cTechnologyMasterId);
                                          //console.log($scope.feedback_data[i].cTechnologyMasterId);
                                        $scope.feedback_data[i] =  angular.extend($scope.feedback_data[i], {"FeedbackAdded": true});

                                         } 
                                        //else {
                                        //   //console.log("else");
                                        //   //console.log("else",$scope.trainerFeedbackList[j].cTechnologyMasterId);
                                        //   //console.log("else",$scope.feedback_data[i].cTechnologyMasterId);
                                        //   $scope.feedback_data[i] =  angular.extend($scope.feedback_data[i], {"FeedbackAdded": false});
                                        // }
                                      }
                                    
                                  }
                                  //console.log("feedback_data",$scope.feedback_data);
                                });
                            },1500);

                            
                           },
                         function(errorPl) {
                             $log.error('Some Error in Getting Records.', errorPl);
                       });
                       // Technology List
                  }
              }
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
        }
        /*=====  End of Enrollment on Edit Page  ======*/

    /*===============================================
    =            Update Trainer Feedback            =
    ===============================================*/
    $scope.editTrainerFeedback1 = function(id) {

        var trainerFeedbackUpdateUrl = baseUrlSrvc.baseUrl + 'listTrainerFeedbackById/'+ id;
         var promiseStudentGet = CRUD_SERVICE.getAllData(trainerFeedbackUpdateUrl);
         promiseStudentGet.then(function(pl) {
                $scope.feedbackData2_a =pl.data;
                $scope.feedbackData2 =$scope.feedbackData2_a[0];
                //console.log($scope.feedbackData2);
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });

    }
    /*=====  End of Update Trainer Feedback  ======*/
    
     /*===================================
    =            Clear Model            =
    ===================================*/
    function ClearModelsTrainerFeedback() {
        // $scope.feedbackData1.startdate = "";
        // $scope.feedbackData1.enddate = "";
        // $scope.feedbackData1.finalexamscore = "";
        // $scope.feedbackData1.attendance = "";
        // $scope.feedbackData1.remark = "";
        // $scope.feedbackData1.status = "";
        //console.log("Clear Models");
        //$scope.feedbackData1 = {};
    }
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnCloseTrainerFeedback = function() {
        // $scope.feedbackData1.startdate = "";
        // $scope.feedbackData1.enddate = "";
        // $scope.feedbackData1.finalexamscore = "";
        // $scope.feedbackData1.attendance = "";
        // $scope.feedbackData1.remark = "";
        // $scope.feedbackData1.status = "";
        //$scope.feedbackData1 = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*=============================================
    =            View Trainer Feedback            =
    =============================================*/
    $scope.viewTrainerFeedback = function(id, tdata) {

      $scope.temp_var_viewtrainer = $filter('filter')(tdata, { "eTrainerfeedbackId": id });

       $scope.viewTrainerFeedbackData = $scope.temp_var_viewtrainer[0];

    }
    /*=====  End of View Trainer Feedback  ======*/

    /*=====================================
    =            Save Function            =
    =====================================*/
    $scope.saveAll = function(data) {
      //console.log(data);

      data.updatedby=$sessionStorage.updatedby;
      data.createdby=$sessionStorage.createdby;
      data.inInstituteId=$sessionStorage.inInstituteId;
      data.bBranchId=$sessionStorage.bBranchId;
      data.adUserId=$sessionStorage.adUserId;
      data.eEnquiryFormId = $scope.OperType;
      data.cCourseId = $scope.C_Id;
      data.cBatchId = $scope.B_Id;

      var FormData = {
          formdata: data,
          url: baseUrlSrvc.baseUrl + 'addUpdateTrainerFeedback'
      };

      var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
      promisePut.then(function(pl) {
          $timeout(function() {
              $scope.$apply(function () {
              GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);
              ClearModelsTrainerFeedback();
              // GetAllRecordsCheck(urlEnquiryList);
              addFeedbackClickFunction();
              });
          },100);
           toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
      }, function(err) {
          //console.log("Some Error Occured." + err);
          $timeout(function() {
              $scope.$apply(function () {
              GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);
              ClearModelsTrainerFeedback();
              // GetAllRecordsCheck(urlEnquiryList);
              addFeedbackClickFunction();
              });
          },100);
           toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
      });


    }

      // $scope.saveFeedback = function(data1, data2) {
      //           //console.log(data1);
      //           //console.log(data2);

      //           if (data1.cTechnologyMasterId) {

      //               data1.updatedby=$sessionStorage.updatedby;
      //               data1.inInstituteId=$sessionStorage.inInstituteId;
      //               data1.bBranchId=$sessionStorage.bBranchId;
      //                data1.adUserId=$sessionStorage.adUserId;
      //                data1.cCourseId = $scope.C_Id;
      //                data1.cBatchId = $scope.B_Id;

      //               var FormData = {
      //                   formdata: data1,
      //                   url: baseUrlSrvc.baseUrl + 'addUpdateTrainerFeedback'
      //               };
      //               var promisePost = CRUD_SERVICE.post(FormData);
      //               promisePost.then(function(pl) {
      //                   $scope.cTechnologyMasterId = pl.data.cTechnologyMasterId;
      //                   $timeout(function() {
      //                       $scope.$apply(function () {
      //                       GetAllRecordsfeedback(urlListfeedback);
      //                       });
      //                   },100);
      //                    toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
      //               }, function(err) {
      //                   //console.log(err);
      //                   $timeout(function() {
      //                       $scope.$apply(function () {
      //                       GetAllRecordsfeedback(urlListfeedback);
      //                       });
      //                   },100);
      //                    toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
      //               });
      //           } else {  

      //               data1.updatedby=$sessionStorage.updatedby;
      //               data1.createdby=$sessionStorage.createdby;
      //               data1.inInstituteId=$sessionStorage.inInstituteId;
      //               data1.bBranchId=$sessionStorage.bBranchId;
      //               data1.adUserId=$sessionStorage.adUserId;
      //               data1.cCourseId = $scope.C_Id;
      //               data1.cBatchId = $scope.B_Id;

      //               $scope.att_array = [];

      //               // var array_cTechnologyMasterId = $.map(data1.cTechnologyMasterId, function(value, index) {
      //               //     return [value];
      //               // });

      //               var array_attendance = $.map(data1.attendance, function(value, index) {
      //                   return [value];
      //               });

      //               var array_startdate = $.map(data1.startdate, function(value, index) {
      //                   return [value];
      //               });

      //               var array_enddate = $.map(data1.startdate, function(value, index) {
      //                   return [value];
      //               });

      //               var array_finalscore = $.map(data1.startdate, function(value, index) {
      //                   return [value];
      //               });

      //               var array_remark = $.map(data1.startdate, function(value, index) {
      //                   return [value];
      //               });

      //               var array_status = $.map(data1.startdate, function(value, index) {
      //                   return [value];
      //               });


      //               //console.log(array_attendance);

      //               for (var i = 0; i < array_attendance.length; i++) {
      //                $scope.att_array.push({"bBranchId":$sessionStorage.bBranchId,"inInstituteId":$sessionStorage.inInstituteId,"adUserId":$sessionStorage.adUserId,"attendance":array_attendance[i],"startdate":array_startdate[i],"enddate":array_enddate[i],"finalscore":array_finalscore[i],"remark":array_remark[i],"status":array_status[i],"createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby});
      //                //console.log($scope.att_array);
      //               }

                    
      //               //console.log("$scope.att_array",$scope.att_array);


      //               var FormData = {
      //                   formdata: $scope.att_array,
      //                   url: baseUrlSrvc.baseUrl + 'addUpdateTrainerFeedback'
      //               };

      //               var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
      //               promisePut.then(function(pl) {
      //                   $timeout(function() {
      //                       $scope.$apply(function () {
      //                       GetAllRecordsfeedback(urlListfeedback);
      //                       });
      //                   },100);
      //                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
      //               }, function(err) {
      //                   //console.log("Some Error Occured." + err);
      //                   $timeout(function() {
      //                       $scope.$apply(function () {
      //                       GetAllRecordsfeedback(urlListfeedback);
      //                       });
      //                   },100);
      //                    toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
      //               });
      //           }
      //       };
            /*=====  End of Save Function  ======*/

            /*===============================================
            =            Delete Trainer Feedback            =
            ===============================================*/
            $scope.delTrainerFeedback = function(id, tfdata) {
               //console.log(id); 

             
              $scope.temp_var_a1 = $filter('filter')(tfdata, { "eTrainerfeedbackId": id });

                 $scope.deleteTrainerFeedbackData= {
                    "eTrainerfeedbackId": $scope.temp_var_a1[0].eTrainerfeedbackId,
                    "technologyname": $scope.temp_var_a1[0].technologyname
                 };
              }

              $scope.deleteTrainerFeedback = function(id) {
              //console.log(id);
                  var FormData = {
                      id: id,
                      url: baseUrlSrvc.baseUrl + 'deleteTrainerFeedback'
                  };
                  var promiseDelete = CRUD_SERVICE.delete(FormData);
                  promiseDelete.then(function(pl) {
                     $timeout(function() {
                              $scope.$apply(function () {
                              GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);
                              addFeedbackClickFunction();
                              });
                          },100);
                           toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                  }, function(err) {
                      //console.log("Some Error Occured." + err);
                      $timeout(function() {
                              $scope.$apply(function () {
                              GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);
                              addFeedbackClickFunction();
                              });
                          },100);
                           toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                  });
              }
            /*=====  End of Delete Trainer Feedback  ======*/

});
/*=====  End of School Controller  ======*/