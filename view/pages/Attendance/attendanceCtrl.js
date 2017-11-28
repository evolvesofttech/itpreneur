angular.module('theGuru')
   .controller('attendanceCtrl', function($scope,$location,$routeParams,$http,CRUD_SERVICE,
    baseUrlSrvc,$filter,$route,hideHeader,$sessionStorage,$timeout, toaster, $window) {

	$scope.OperType = $routeParams.ID;
  $window.document.title = "ITPreneur - Add Attendance";
	//console.log($scope.OperType);
  $scope.hideTable = true;
  $scope.disabledButton = true;

  $scope.attendance = {};
  $scope.batchdisabled = true;
  $scope.techdisabled = true;
  $scope.datedisabled = true; 
  $scope.date1disabled = true;
  $scope.statusdisabled = true; 

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

  
  $scope.getNumber = function (num) {
        return new Array(num);
    };

    $scope.options = [
        {value: '', label: 'Choose a value'},
        {value: false, label: 'Absent'},
        {value: true, label: 'Present'}
    ];

    /*==================================
    =            Course List            =
    ==================================*/
    if ($scope.role == 'Admin' || $scope.role == 'System Admin') {
      var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
    } else {
      var CourseListUrl = baseUrlSrvc.baseUrl + 'listUserCoursesByadUserId/' + $sessionStorage.adUserId;
    }
    var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
    promiseCourseGet.then(function(pl) {
        $scope.Course = pl.data;
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of Source List  ======*/

    /*=====================================
    =            Course Change            =
    =====================================*/
    $scope.courseChange = function(id) {
      //console.log(id);
       $scope.batchdisabled = false;
       $scope.datedisabled = true;
       $scope.date1disabled = true;
       $scope.statusdisabled = true;
       $scope.techdisabled = true;
       $scope.Course_id = id;

      // clear data
      $scope.attendanceDropdownData.cTechnologyMasterId = "";
      $scope.attendanceDropdownData.fromdate = "";
      $scope.attendanceDropdownData.todate = "";
      $scope.attendanceDropdownData.status = "";
      // clear data
      
        var BatchListUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseIdTimeduration/' + id;
        var promiseBatchGet = CRUD_SERVICE.getAllData(BatchListUrl);
        promiseBatchGet.then(function(pl) {
            $scope.Batch = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

    }
    /*=====  End of Course Change  ======*/


    /*=====================================
    =            technology Change            =
    =====================================*/
    $scope.technologyChange = function(id) {    
       $scope.datedisabled = false;

       $scope.Tech_id = id;

       // var disableDatesListUrl = baseUrlSrvc.baseUrl + 'listDisableDates/' + $scope.Course_id + '/' + $scope.batch_id + '/' + $scope.Tech_id;
       // var promiseDisableDatesGet = CRUD_SERVICE.getAllData(disableDatesListUrl);
       // promiseDisableDatesGet.then(function(pl) {
       //    $scope.DisabledDates = pl.data;

       //    //console.log($scope.DisabledDates);

       //    $scope.dDates1 = [];
       //    for(var i=0;i<$scope.DisabledDates.length;i++) {
       //      $scope.dDates1.push($scope.DisabledDates[i].date +" " +"00:00:00");
       //    }

       //    $scope.datesDisabled = [];
       //    var date = new Date();
       //    // months oare zero indexed! +2 = 1 month ahead
       //    var t = new Date(date.getMonth() + 2 + '/' + date.getDate() + '/' + date.getFullYear());
       //    //console.log(t);
       //    $scope.datesDisabled.push(t.getTime());
       //    //console.log($scope.datesDisabled);



       // },
       // function(errorPl) {
       //     $log.error('Some Error in Getting Records.', errorPl);
       // });


    }
    /*=====  End of technology Change  ======*/

    /*=====================================
    =            date Change            =
    =====================================*/
    $scope.dateChange = function(da) {    
       $scope.date1disabled = false;  
       //console.log(da);
       var today = new Date(da);
       var d1 = today.getDate();
        var m1 = today.getMonth()+1; //January is 0!
        var y1 = today.getFullYear();
        //$scope.limitDate = y1+'-'+m1+'-'+d1;
        $scope.limitDate = y1+'-'+m1+'-'+d1;
        //console.log("$scope.limitDate",$scope.limitDate);
    }
    /*=====  End of technology Change  ======*/

  
/*=====================================
    =            date1 Change            =
    =====================================*/
    $scope.date1Change = function(id) {    
       $scope.statusdisabled = false;  
    }
    /*=====  End of date1 Change  ======*/


    /*====================================
    =            Batch Change            =
    ====================================*/
    $scope.batchChange = function(id) {
      $scope.techdisabled = false;
      $scope.batch_id = id;

        /*=======================================
        =            Technology List            =
        =======================================*/

        if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
          var TechnologyListUrl = baseUrlSrvc.baseUrl + 'listTechnologyByCourseId/' + $scope.Course_id;
        } else {
          var TechnologyListUrl = baseUrlSrvc.baseUrl + 'listTechnologyByCourseIdAndadUserId/' + $scope.Course_id + '/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId ;
        }

         var promiseTechnologyGet = CRUD_SERVICE.getAllData(TechnologyListUrl);
         promiseTechnologyGet.then(function(pl) {
            $scope.TechnologyMaster = pl.data;
         },
         function(errorPl) {
             $log.error('Some Error in Getting Records.', errorPl);
         });
         /*=====  End of Technology List  ======*/

           var AllBranchUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseIdTimeduration/' + $scope.Course_id;
          var promiseAllBranchGet = CRUD_SERVICE.getAllData(AllBranchUrl);
          promiseAllBranchGet.then(function(pl) {
              $scope.AllBranch = pl.data;

              for (var i = 0; i < $scope.AllBranch.length; i++) {
              if ($scope.AllBranch[i].cBatchId == id) {
                  $scope.branchData = $scope.AllBranch[i];
                  
                  var fromdate1 = $scope.branchData.fromdate;
                  var todate1 = $scope.branchData.todate;
                  $scope.tDate = $scope.branchData.todate;

                  var f_d = new Date(fromdate1);
                  f_d.setDate(f_d.getDate()-1)

                  var dd1 = f_d.getDate();
                  var mm1 = f_d.getMonth()+1; //January is 0!
                  var yyyy1 = f_d.getFullYear();

                  if(dd1<10) {
                      dd1='0'+dd1
                  } 

                  if(mm1<10) {
                      mm1='0'+mm1
                  } 

                  f_d = yyyy1+'-'+mm1 +'-'+dd1;
                  $scope.fDate =f_d;
                  //console.log("From Date",$scope.fDate);
                }
              }
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });

    }
    /*=====  End of Batch Change  ======*/
    
    /*===================================
    =            Date Change            =
    ===================================*/
    $scope.statusChange = function(from, to, status) {
      $scope.hideTable = false;
      $scope.attStatus = status;

      var a = moment(from,'YYYY/MM/DD');
      var b = moment(to,'YYYY/MM/DD');
      $scope.diffDays = b.diff(a, 'days');

      var startDate = moment(from).subtract('days', 1);
      var endDate = moment(to).add('days', 1);

      var dates = [];
      endDate.subtract(1, "day"); //Substract one month to exclude endDate itself

      var month = moment(startDate); //clone the startDate
      while(month < endDate) {
          month.add(1, "day");
          dates.push(month.format('YYYY-MM-DD'));
      }

      $scope.number = dates;
      $scope.BatchDates = dates;

      // if (status == 'Working Day') {
        $scope.disableOnHoliday = false;
        /*========================================
        =            Get Student List            =
        ========================================*/
        var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryByBatchAndCourseId/' + $scope.batch_id +'/'+ $scope.Course_id +'/'+ $scope.Tech_id + '/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
           var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
           promiseStudentGet.then(function(pl) {
                $scope.Students = pl.data;

                if (status == 'Working Day') {
                    $scope.disableOnHoliday = false;
                  } else {
                    $scope.disableOnHoliday = true;
                  }

                if ($scope.Students == []) {
                  $scope.disabledButton = true;
                } else {
                  $scope.disabledButton = false;
                }

                //console.log($scope.Students);
                //$scope.Att = [];
                // for(var i=0;i<$scope.Students.length;i++) {

                // }
                // $scope.Att.push({"eEnquiryFormId":$scope.Students[i].eEnquiryFormId, "status":"Working Day", "date":da, "present":true, "inInstituteId":$sessionStorage.inInstituteId, "adUserId":$sessionStorage.adUserId, "createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId":$sessionStorage.bBranchId, "cCourseId":$scope.attendanceDropdownData.cCourseId, "cBatchId":$scope.attendanceDropdownData.cBatchId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId});
               },
               function(errorPl) {
                   $log.error('Some Error in Getting Records.', errorPl);
           });
        /*=====  End of Get Student List  ======*/

        /*====================================
        =            Get Schedule            =
        ====================================*/
        var data = {};
        data.fromdate = from;
        data.todate = to;
        data.cCourseId = $scope.Course_id;
        data.cBatchId = $scope.batch_id;
        data.cTechnologyMasterId = $scope.Tech_id;
        var FormData = {
            formdata: data,
            url: baseUrlSrvc.baseUrl + 'listScheduleByCourseBatchAndTechnologyId'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           var promiseData = pl.data;
           $scope.Schedule = promiseData;
           console.log("$scope.Schedule",$scope.Schedule);
            // if (promiseData.code == 2) {
            //     toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
            // } else {
            //     toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
            // }
           
        }, function (err) {
             toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });
        /*=====  End of Get Schedule  ======*/
        
      // } else {
      //   //$scope.Students = [];
      //   $scope.disabledButton = false;
      //   $scope.disableOnHoliday = true;

      //   //$scope.attendanceArray.push({"attendance":{"eEnquiryFormId":fields[0], "status":$scope.attStatus, "date":fields[1], "present":data.date[i], "inInstituteId":$sessionStorage.inInstituteId, "adUserId":$sessionStorage.adUserId, "createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId":$sessionStorage.bBranchId, "cCourseId":$scope.attendanceDropdownData.cCourseId, "cBatchId":$scope.attendanceDropdownData.cBatchId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId}
      //     //, "present":data.date[i], "createdby":$sessionStorage.createdby,"updatedby": $sessionStorage.updatedby, "inInstituteId":$sessionStorage.inInstituteId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId,"adUserId":$sessionStorage.adUserId,"bBranchId":$sessionStorage.bBranchId,"status":$scope.attStatus});
      // }

    }
    /*=====  End of Date Change  ======*/

    /*===========================================
    =            Date Click Function            =
    ===========================================*/
    $scope.dateClick = function(da, cid, bid, tid) {
      $scope.temp_course = $filter('filter')($scope.Course, { "cCourseId": cid });
      $scope.coursename = $scope.temp_course[0].coursename;
      $scope.CID = $scope.temp_course[0].cCourseId;

      $scope.temp_batch = $filter('filter')($scope.Batch, { "cBatchId": bid });
      $scope.batchname = $scope.temp_batch[0].batchname;
      $scope.BID = $scope.temp_batch[0].cBatchId;

      $scope.temp_tech = $filter('filter')($scope.TechnologyMaster, { "cTechnologyMasterId": tid });
      $scope.technologyname = $scope.temp_tech[0].technologyname;
      $scope.TID = $scope.temp_tech[0].cTechnologyMasterId;
      $scope.viewDateData = da;
    }
    /*=====  End of Date Click Function  ======*/
    
    $scope.studentArray = [];

    $scope.attendanceClick = function(data, id, ind) {
      $scope.currentDay = ind + 1;
      $scope.studentArray.push({"attendance": data, "eEnquiryFormId": id, "date":$scope.currentDate, "inInstituteId":$sessionStorage.inInstituteId, "adUserId":$sessionStorage.adUserId, "createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId":$sessionStorage.bBranchId});
    }

    /*=================================================
    =            Attendance Checkbox Click            =
    =================================================*/
    $scope.Att = [];
    $scope.check = function(value, checked, da) {
         function findIndexInData(data, property, value, enq, eid) {
          var result = -1;
          data.some(function (item, i) {
              if (item[property] === value && item[enq] === eid) {
                  result = i;
                  return true;
              }
          });
          return result
        }

         if($scope.Att !=undefined)
         {
          var index=findIndexInData($scope.Att, 'date', da, 'eEnquiryFormId', value);
          //console.log(index);
            var idx = $scope.Att.indexOf(index);
            //var idx = $scope.Att.indexOf(da);
         }

         
          if (index >= 0 && !checked) 
          {
            $scope.Att.splice(index, 1);
          }

          if (index < 0 && checked)
          {
            $scope.Att.push({"eEnquiryFormId":value, "status":$scope.attStatus, "date":da, "present":true, "inInstituteId":$sessionStorage.inInstituteId, "adUserId":$sessionStorage.adUserId, "createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId":$sessionStorage.bBranchId, "cCourseId":$scope.attendanceDropdownData.cCourseId, "cBatchId":$scope.attendanceDropdownData.cBatchId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId});
            //, "inInstituteId":$sessionStorage.inInstituteId, "adUserId":$sessionStorage.adUserId, "createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId":$sessionStorage.bBranchId, "cCourseId":$scope.attendanceDropdownData.cCourseId, "cBatchId":$scope.attendanceDropdownData.cBatchId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId
          }

          //console.log("Att",$scope.Att);
      };
      /*=====  End of Attendance Checkbox Click  ======*/


    /*=======================================
    =            Save Attendance            =
    =======================================*/
    $scope.saveAttendance = function(data) {
      console.log(data);
      $scope.attendanceArray = [];
      $scope.attendanceArray1 = [];
      $scope.attendanceArrayInner = [];

      // for(var a=0;a<$scope.Schedule.length;a++) {

        for(var i in data.date) {
        var fields = i.split('/');
        console.log("data.date",data.date[i]);

        // if ($scope.BatchDates[a] == fields[1]) {
          $scope.attendanceArrayInner.push({
            "present":data.date[i], 
            "createdby":$sessionStorage.createdby,
            "eEnquiryFormId":fields[0],
            "updatedby": $sessionStorage.updatedby,
            "inInstituteId":$sessionStorage.inInstituteId,
            "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId,
            "adUserId":$sessionStorage.adUserId,
            "bBranchId":$sessionStorage.bBranchId
          });
          $scope.attendanceArray1.push({
            "date":fields[1],
            "cCourseId":$scope.attendanceDropdownData.cCourseId,
            "cBatchId":$scope.attendanceDropdownData.cBatchId,
            "eEnquiryFormId":fields[0],
            // "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId,
            "createdby":$sessionStorage.createdby,
            "updatedby":$sessionStorage.updatedby,
            "inInstituteId":$sessionStorage.inInstituteId,
            "status":$scope.attStatus,
            "adUserId":$sessionStorage.adUserId,
            "bBranchId":$sessionStorage.bBranchId,
            "attendanceDetails":[{
                "present":data.date[i], 
                "createdby":$sessionStorage.createdby,
                "eEnquiryFormId":fields[0],
                "updatedby": $sessionStorage.updatedby,
                "inInstituteId":$sessionStorage.inInstituteId,
                "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId,
                "adUserId":$sessionStorage.adUserId,
                "bBranchId":$sessionStorage.bBranchId
              }]
          });
        //   } //if ends
        
        } //var i in data.date for ends

         //   $scope.attendanceArray1.push({"date":$scope.BatchDates[a],"cCourseId":$scope.attendanceDropdownData.cCourseId, "cBatchId":$scope.attendanceDropdownData.cBatchId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId,"createdby":$sessionStorage.createdby,"updatedby":$sessionStorage.updatedby,"inInstituteId":$sessionStorage.inInstituteId,"status":$scope.attStatus,"adUserId":$sessionStorage.adUserId,"bBranchId":$sessionStorage.bBranchId,
         // "attendanceDetails":$scope.attendanceArrayInner});
         //   $scope.attendanceArrayInner = [];

         console.log("attendanceArray1",$scope.attendanceArray1);

      // } //main for ends
      // $scope.Att = [];

      var FormData = {
          formdata: $scope.attendanceArray1,
          url: baseUrlSrvc.baseUrl + 'addUpdateAttendance'
      };

      var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
      promisePut.then(function(pl) {
          $timeout(function() {
              $scope.$apply(function () {
              });
          },100);
           toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
      }, function(err) {
          //console.log("Some Error Occured." + err);
          $timeout(function() {
              $scope.$apply(function () {
              });
          },100);
           toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
      });
    }
    /*=====  End of Save Attendance  ======*/

});