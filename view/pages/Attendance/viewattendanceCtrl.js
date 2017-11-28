angular.module('theGuru')
   .controller('viewAttendanceCtrl', function($scope,$location,$routeParams,$http,CRUD_SERVICE,
    baseUrlSrvc,$filter,$route,hideHeader,$sessionStorage,$timeout, toaster, $window) {

	$scope.OperType = $routeParams.ID;
	$window.document.title = "ITPreneur - View/Edit Attendance";
  $scope.hideTable = true;

  $scope.batchdisabled = true;
  $scope.techdisabled = true;
  $scope.datedisabled = true; 
  $scope.date1disabled = true;
  $scope.disableCheckbox = true;

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

  
  $scope.getNumber = function (num) {
        return new Array(num);
    };

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
    =            Edit Click            =
    ==================================*/
    $scope.editClick = function() {
      $scope.disableCheckbox = false;
    }
    $scope.cancelClick = function() {
      $scope.disableCheckbox = true;
    }
    /*=====  End of Edit Click  ======*/
    

    // var d = new Date();
    // var n = d.getMonth();
    // var y = d.getYear();

    // function daysInMonth(month,year) {
    //   return new Date(year, month, 0).getDate();
    // }

    // $scope.number = daysInMonth(n,y);
    
    // //console.log($scope.number);
    //February

    


    /*==================================
    =            Course List            =
    ==================================*/
    // var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
    if ($scope.role == 'Admin' || $scope.role == 'System Admin' || $scope.role == 'Sales Manager' || $scope.role == 'Accounts Manager' || $scope.role == 'Placement Manager') {
      var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
    } else {
      var CourseListUrl = baseUrlSrvc.baseUrl + 'listUserCoursesByadUserId/' + $sessionStorage.adUserId;
    }
    var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
    promiseCourseGet.then(function(pl) {
        $scope.Course = pl.data;

        //console.log($scope.Course);
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
      
     var BatchListUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseIdTimeduration/' + id;
        var promiseBatchGet = CRUD_SERVICE.getAllData(BatchListUrl);
        promiseBatchGet.then(function(pl) {
            $scope.Batch = pl.data;

            //console.log($scope.Batch);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

    }
    /*=====  End of Course Change  ======*/

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
        //var TechnologyListUrl = baseUrlSrvc.baseUrl + 'listTechnologyByCourseId/' + $scope.Course_id;
         var promiseTechnologyGet = CRUD_SERVICE.getAllData(TechnologyListUrl);
         promiseTechnologyGet.then(function(pl) {
            $scope.TechnologyMaster = pl.data;

            //console.log($scope.TechnologyMaster);
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
    
    /*=====================================
    =            date Change            =
    =====================================*/
    $scope.dateChange = function(id) {    
       $scope.date1disabled = false;  
      // //console.log(da);
       var today = new Date(id);
       var d1 = today.getDate();
        var m1 = today.getMonth()+1; //January is 0!
        var y1 = today.getFullYear();
        //$scope.limitDate = y1+'-'+m1+'-'+d1;
        $scope.limitDate = y1+'-'+m1+'-'+d1;
        //console.log("$scope.limitDate",$scope.limitDate);
    }
    /*=====  End of technology Change  ======*/

    $scope.technologyChange = function(id) {
      $scope.Tech_id = id;
       $scope.datedisabled = false; 
    }

    /*===================================
    =            Date Change            =
    ===================================*/
    $scope.toDateChange = function(from, to) {
      //console.log(from);
      //console.log(to);
      $scope.FromDate = from;
      $scope.ToDate = to;
      $scope.hideTable = false;

      var a = moment(from,'YYYY/MM/DD');
      var b = moment(to,'YYYY/MM/DD');
      $scope.diffDays = b.diff(a, 'days');
      //console.log($scope.diffDays);

      // $scope.number = diffDays;

      var startDate = moment(from).subtract('days', 1);
      var endDate = moment(to).add('days', 1);

      var dates = [];
      endDate.subtract(1, "day"); //Substract one month to exclude endDate itself

      var month = moment(startDate); //clone the startDate
      while(month < endDate) {
          month.add(1, "day");
          dates.push(month.format('YYYY-MM-DD'));
      }

      //console.log(dates);
      $scope.number = dates;
      $scope.BatchDates = dates;
      var obj = {};
      $scope.BatchDates1 = [];
      //console.log("$scope.BatchDates",$scope.BatchDates);

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
         //console.log("$scope.Schedule",$scope.Schedule);
         for(var k=0;k<$scope.Schedule.length;k++) {
            $scope.BatchDates1.push({"date":$scope.Schedule[k].date, "lecture":$scope.Schedule[k].lecture });
        }
         
      }, function (err) {
           toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
      });
      /*=====  End of Get Schedule  ======*/

      /*========================================
      =            Get Student List            =
      ========================================*/
      var StudentListUrl = baseUrlSrvc.baseUrl + 'listAttendanceByCourseBatchTechnologyAndDate/' + $scope.Course_id + '/' + $scope.batch_id + '/' + $scope.Tech_id + '/' + $scope.FromDate + '/' + $scope.ToDate;
         var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
         promiseStudentGet.then(function(pl) {
              $scope.Students = pl.data;
              console.log("$scope.Students",$scope.Students);
                $scope.attendance1={};
                 $scope.attendance={};
              $scope.StudentsDate = [];
              
              for(var i=0;i<$scope.Students.length;i++) {
                $scope.StudentsDate.push($scope.Students[i].ListAttendanceDetails);
                for(var j=0;j<$scope.Students[i].ListAttendanceDetails.length;j++)
                {
                  for(var k=0;k<$scope.BatchDates1.length;k++) {
                    
                    if ($scope.BatchDates1[k].date == $scope.Students[i].ListAttendanceDetails[j].date) {
                      $scope.BatchDates1[k] =  angular.extend($scope.BatchDates1[k], {"status": $scope.Students[i].ListAttendanceDetails[j].status});
                    } //if

                  } //for 3
                  var id='"'+$scope.Students[i].eEnquiryformId+"/"+$scope.Students[i].ListAttendanceDetails[j].date + "/"+ $scope.Students[i].ListAttendanceDetails[j].status+'"';

                var str=$scope.Students[i].ListAttendanceDetails[j].present;
                 var testBool=str.replace(/"/g, '');
                $scope.attendance1[JSON.parse(id)]=JSON.parse(str);


                } //for 2
              } //for 1
               $scope.attendance=$scope.attendance1;
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
         });
      /*=====  End of Get Student List  ======*/

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
            $scope.Att.push({"eEnquiryFormId":value,"date":da, "present":true, "inInstituteId":$sessionStorage.inInstituteId, "adUserId":$sessionStorage.adUserId, "createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId":$sessionStorage.bBranchId, "cCourseId":$scope.attendanceDropdownData.cCourseId, "cBatchId":$scope.attendanceDropdownData.cBatchId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId});
            //, "inInstituteId":$sessionStorage.inInstituteId, "adUserId":$sessionStorage.adUserId, "createdby":$sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId":$sessionStorage.bBranchId, "cCourseId":$scope.attendanceDropdownData.cCourseId, "cBatchId":$scope.attendanceDropdownData.cBatchId, "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId
          }

          //console.log($scope.Att);
      };
      /*=====  End of Attendance Checkbox Click  ======*/


    /*=======================================
    =            Save Attendance            =
    =======================================*/
    $scope.saveAttendance = function(data) {

      //console.log(data);
      $scope.attendanceArray = [];
      $scope.attendanceArray1 = [];
      $scope.attendanceArrayInner = [];

      // for(var a=0;a<$scope.BatchDates1.length;a++) {

        for(var i in data.date) {
        //console.log(i); // alerts key
        var fields = i.split('/');
        console.log("data.date",data.date[i]);

        // if ($scope.BatchDates1[a].date == fields[1]) {
          //console.log("Date Equals");
          // $scope.attendanceArrayInner.push({
          //   "present":data[i], 
          //   "createdby":$sessionStorage.createdby,
          //   "eEnquiryFormId":fields[0],
          //   "updatedby": $sessionStorage.updatedby, 
          //   "inInstituteId":$sessionStorage.inInstituteId, 
          //   "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId,
          //   "adUserId":$sessionStorage.adUserId,
          //   "bBranchId":$sessionStorage.bBranchId});
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
        }
          // } //if ends
        
        // } //inner for ends

         //   $scope.attendanceArray1.push({"date":$scope.BatchDates1[a].date,
         //    "cCourseId":$scope.attendanceDropdownData.cCourseId, 
         //    "cBatchId":$scope.attendanceDropdownData.cBatchId, 
         //    "cTechnologyMasterId":$scope.attendanceDropdownData.cTechnologyMasterId,
         //    "createdby":$sessionStorage.createdby,
         //    "updatedby":$sessionStorage.updatedby,
         //    "inInstituteId":$sessionStorage.inInstituteId,
         //    "status":$scope.BatchDates1[a].status,
         //    "adUserId":$sessionStorage.adUserId,
         //    "bBranchId":$sessionStorage.bBranchId,
         // "attendanceDetails":$scope.attendanceArrayInner});
         //   $scope.attendanceArrayInner = [];
           // fields[2]

      // } //main for ends
      $scope.Att = [];
      console.log($scope.attendanceArray1);
      // var FormData = {
      //     formdata: $scope.attendanceArray1,
      //     url: baseUrlSrvc.baseUrl + 'addUpdateAttendance'
      // };

      // var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
      // promisePut.then(function(pl) {
      //     $timeout(function() {
      //         $scope.$apply(function () {
      //         //GetAllEnquiryRecords(urlEnquiryList);
      //         });
      //     },100);
      //     $scope.disableCheckbox = true;
      //      toaster.success({title: "Success", body:"Attendance Updated Successfully!",tapToDismiss: true,showCloseButton: true});
      // }, function(err) {
      //     //console.log("Some Error Occured." + err);
      //     $timeout(function() {
      //         $scope.$apply(function () {
      //         //GetAllEnquiryRecords(urlEnquiryList);
      //         $scope.disableCheckbox = false;
      //         });
      //     },100);
      //      toaster.error({title: "Error", body:"Error in Updating Attendance!",tapToDismiss: true,showCloseButton: true});
      // });
    }
    /*=====  End of Save Attendance  ======*/
});