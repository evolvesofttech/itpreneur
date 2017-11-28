/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("feedbackCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, toaster, feedback_Cid, feedback_Bid, feedback_Eid, $window) {
       
      //console.log("feedbackCtrl");
      $window.document.title = "ITPreneur - Trainer Feedback";
      $scope.C_Id = feedback_Cid.getCourse_id();
      //console.log($scope.C_Id);
      
      $scope.B_Id = feedback_Bid.getBatch_id();
      //console.log($scope.B_Id);
      $scope.E_Id = feedback_Eid.getEnq_id();
      //console.log($scope.E_Id);
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     
      $scope.trainerFeedbackArray = [];
      $scope.OperType = $routeParams.ID;
 
               
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

      
      
      /*===================================
      =            Course List            =
      ===================================*/
      if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
        var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
      } else {
        var CourseListUrl = baseUrlSrvc.baseUrl + 'listUserCoursesByadUserId/' + $sessionStorage.adUserId;
      }
      
       var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
       promiseCourseGet.then(function(pl) {
            $scope.Course = pl.data;

          //console.log($scope.Courses);
                 },
           function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
        });
      /*=====  End of Courses List  ======*/


         $scope.courseChange = function(id) {
            //console.log(id);
            $scope.courseId = id;

             var BatchListUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseId/' + id;
              var promiseBatchGet = CRUD_SERVICE.getAllData(BatchListUrl);
              promiseBatchGet.then(function(pl) {
                  $scope.Batch = pl.data;

                  //console.log($scope.Batch);
              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });

               if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
                  var TechnologyListUrl = baseUrlSrvc.baseUrl + 'listTechnologyByCourseId/' + id ;
                } else {
                  var TechnologyListUrl = baseUrlSrvc.baseUrl + 'listTechnologyByCourseIdAndadUserId/' + id + '/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId ;
                }

              
             var promiseTechnologyGet = CRUD_SERVICE.getAllData(TechnologyListUrl);
             promiseTechnologyGet.then(function(pl) {
                  $scope.Technology = pl.data;

                  //console.log($scope.Technology);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });

          }

           $scope.batchChange = function(id) {
            //console.log(id);
            $scope.batchId = id;
          }
          /*=====  End of course Change  ======*/

          $scope.technologyChange = function(id) {
            //console.log(id);

            // $scope.EnqId = id;
            $scope.techId = id;

           var urlListfeedback = baseUrlSrvc.baseUrl + 'listEnquiryByBatchAndCourseId/' + $scope.batchId +'/'+ $scope.courseId +'/'+ id + '/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
           GetAllRecordsfeedback(urlListfeedback);

           function GetAllRecordsfeedback(url) {
             var promiseStudentsGet = CRUD_SERVICE.getAllData(url);
             promiseStudentsGet.then(function(pl) {
                  $scope.feedback_data = pl.data;

                  //console.log("$scope.feedback_data",$scope.feedback_data);
                   },
                   function(errorPl) {
                       $log.error('Some Error in Getting Records.', errorPl);
                   });

            }


        }

    
       function GetAllRecordsfeedback(url) {
           var promiseStudentsGet = CRUD_SERVICE.getAllData(url);
           promiseStudentsGet.then(function(pl) {
                $scope.feedback_data = pl.data;

                //console.log("$scope.feedback_data",$scope.feedback_data);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });

          }


    /*============================================
    =            Get Trainer Feedback            =
    ============================================*/
    
    if ($scope.role == 'Admin' || $scope.role == 'System Admin' || $scope.role == 'Sales Manager') {
      var urlTrainerFeedbackList = baseUrlSrvc.baseUrl  + 'listTrainerFeedback';
    } else {
      var urlTrainerFeedbackList = baseUrlSrvc.baseUrl  + 'listTrainerFeedbackByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
    }

    GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);

    //To Get All Records
    function GetAllRecordsTrainerFeedback(url) {
        $scope.trainerFeedbackArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.trainerFeedbackList = pl.data;

                // for(var i = 0; i<$scope.feedback_data.length;i++) {

                //     if ($scope.feedback_data[i].cCourseId == $scope.courseId && 
                //       $scope.feedback_data[i].cBatchId == $scope.batchId && 
                //       $scope.feedback_data[i].cTechnologyMasterId == $scope.techId && 
                //       $scope.feedback_data[i].eEnquiryFormId == $scope.trainerFeedbackList[i].eEnquiryFormId) {

                      
                //     }

                //   }

                $scope.trainerFeedbackArray.push($scope.trainerFeedbackList);
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
                $scope.stdName = $scope.feedbackData2.firstname + " " +  $scope.feedbackData2.middlename + " " +  $scope.feedbackData2.lastname;

                $scope.EnqId = $scope.feedbackData2.eEnquiryFormId;
                $scope.courseId = $scope.feedbackData2.cCourseId;
                $scope.batchId = $scope.feedbackData2.cBatchId;
                $scope.techId = $scope.feedbackData2.cTechnologyMasterId;

             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });

    }
    /*=====  End of Update Trainer Feedback  ======*/
    
     /*===================================
    =            Clear Model            =
    ===================================*/
    function ClearModels() {
        $scope.feedbackData1 = {};
        // $scope.feedbackData = {};
    }
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    // $scope.cleardata = function() {
    //     $scope.feedbackData1 = {};
    //      $scope.feedbackData = {};
    // }
    /*=====  End of Clear Modal on Click  ======*/

    
    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClosefeedback = function() {
        $scope.feedbackData1 = {};
        $scope.feedbackData = {};
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

      if (data.eTrainerfeedbackId) {
        data.updatedby=$sessionStorage.updatedby;
      } else {
        data.updatedby=$sessionStorage.updatedby;
        data.createdby=$sessionStorage.createdby;
      }
      
      data.inInstituteId=$sessionStorage.inInstituteId;
      //data.bBranchId=$sessionStorage.bBranchId;
      data.adUserId=$sessionStorage.adUserId;
      data.cCourseId = $scope.courseId;
      data.cBatchId = $scope.batchId;
      data.cTechnologyMasterId = $scope.techId;



      var FormData = {
          formdata: data,
          url: baseUrlSrvc.baseUrl + 'addUpdateTrainerFeedback'
      };

      var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
      promisePut.then(function(pl) {
          $timeout(function() {
              $scope.$apply(function () {
              GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);
              var urlListfeedback = baseUrlSrvc.baseUrl + 'listEnquiryByBatchAndCourseId/' + $scope.batchId +'/'+ $scope.courseId +'/'+ $scope.techId;
           GetAllRecordsfeedback(urlListfeedback);
              });
          },100);
          $timeout(function() {
              $scope.$apply(function () {
                $route.reload();
                });
          },3000);
          if (data.eTrainerfeedbackId) {
            toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
          } else {
            toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }
      }, function(err) {
          //console.log("Some Error Occured." + err);
          $timeout(function() {
              $scope.$apply(function () {
              GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);
              });
          },100);
           toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
      });


    }

      $scope.saveFeedback = function(data1, data2) {
                //console.log(data1);
                //console.log(data2);

                if (data1.cTechnologyMasterId) {

                    data1.updatedby=$sessionStorage.updatedby;
                    data1.inInstituteId=$sessionStorage.inInstituteId;
                    //data1.bBranchId=$sessionStorage.bBranchId;
                     data1.adUserId=$sessionStorage.adUserId;
                     data1.cCourseId = $scope.C_Id;
                     data1.cBatchId = $scope.B_Id;
                     data.cTechnologyMasterId = $scope.techId;

                    var FormData = {
                        formdata: data1,
                        url: baseUrlSrvc.baseUrl + 'addUpdateTrainerFeedback'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.cTechnologyMasterId = pl.data.cTechnologyMasterId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecordsfeedback(urlListfeedback);
                            ClearModels();
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                        ClearModels();
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecordsfeedback(urlListfeedback);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {  

                    data1.updatedby=$sessionStorage.updatedby;
                    data1.createdby=$sessionStorage.createdby;
                    data1.inInstituteId=$sessionStorage.inInstituteId;
                    data1.bBranchId=$sessionStorage.bBranchId;
                    data1.adUserId=$sessionStorage.adUserId;
                    data1.cCourseId = $scope.courseId;
                    data1.cBatchId = $scope.batchId;
                    data.cTechnologyMasterId = $scope.techId;

                    $scope.att_array = [];

                    // var array_cTechnologyMasterId = $.map(data1.cTechnologyMasterId, function(value, index) {
                    //     return [value];
                    // });

                    var array_attendance = $.map(data1.attendance, function(value, index) {
                        return [value];
                    });

                    var array_startdate = $.map(data1.startdate, function(value, index) {
                        return [value];
                    });

                    var array_enddate = $.map(data1.startdate, function(value, index) {
                        return [value];
                    });

                    var array_finalscore = $.map(data1.startdate, function(value, index) {
                        return [value];
                    });

                    var array_remark = $.map(data1.startdate, function(value, index) {
                        return [value];
                    });

                    var array_status = $.map(data1.startdate, function(value, index) {
                        return [value];
                    });


                    //console.log(array_attendance);

                    for (var i = 0; i < array_attendance.length; i++) {
                     $scope.att_array.push({"bBranchId":$sessionStorage.bBranchId,"inInstituteId":$sessionStorage.inInstituteId,"adUserId":$sessionStorage.adUserId,"attendance":array_attendance[i],"startdate":array_startdate[i],"enddate":array_enddate[i],"finalscore":array_finalscore[i],"remark":array_remark[i],"status":array_status[i],"createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby});
                     //console.log($scope.att_array);
                    }

                    
                    //console.log("$scope.att_array",$scope.att_array);


                    var FormData = {
                        formdata: $scope.att_array,
                        url: baseUrlSrvc.baseUrl + 'addUpdateTrainerFeedback'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecordsfeedback(urlListfeedback);
                            ClearModels();
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                    ClearModels();
                  }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                              ClearModels();
                            GetAllRecordsfeedback(urlListfeedback);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };
            /*=====  End of Save Function  ======*/

            /*===============================================
            =            Delete Trainer Feedback            =
            ===============================================*/
            $scope.delTrainerFeedback = function(id, tfdata) {
               //console.log(id); 

             
              $scope.temp_var_a1 = $filter('filter')(tfdata, { "eTrainerfeedbackId": id });

                 $scope.deleteTrainerFeedbackData = $scope.temp_var_a1[0];
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
                              });
                          },100);
                           toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                  }, function(err) {
                      //console.log("Some Error Occured." + err);
                      $timeout(function() {
                              $scope.$apply(function () {
                              GetAllRecordsTrainerFeedback(urlTrainerFeedbackList);
                              });
                          },100);
                           toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                  });
              }
            /*=====  End of Delete Trainer Feedback  ======*/
            



});
/*=====  End of School Controller  ======*/