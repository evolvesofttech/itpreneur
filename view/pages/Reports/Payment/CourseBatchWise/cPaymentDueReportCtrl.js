/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("studentplacementCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope,$sessionStorage, toaster, $window) {

    $scope.currentUserId = $sessionStorage.adUserId;
    $scope.courseId = "null";
    $scope.batchId = "null";
    $scope.studentId = "null";
    $scope.branchArray = [{"bBranchId":"null"}];
    $scope.useId = [{"adUserId":"null"}];
    $window.document.title = "ITPreneur - Coursewise/Batchwise Payment Due Report";
    $scope.data_cbplacement = [];

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

    /*==========================================
    =            Miliseconds to HMS            =
    ==========================================*/
    // time function
    $scope.parseMillisecondsIntoReadableTime=function(s) {
          var ms = s % 1000;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
            var hrs = (s - mins) / 60;

            return hrs + ':' + mins + ':' + secs;

          return h + ' : ' + m + ' : ' + s ;
    }
    /*=====  End of Miliseconds to HMS  ======*/

    /*======================================
    =            Round Function            =
    ======================================*/
    $scope.roundToTwo = function(num) {
        //////console.log(num); 
        return +(Math.round(num + "e+2")  + "e-2");
    }
    /*=====  End of Round Function  ======*/

    /*==============================
    =            Branch            =
    ==============================*/
    var urlBrnchList = baseUrlSrvc.baseUrl + 'listBranch';
    var promiseBrchGet = CRUD_SERVICE.getAllData(urlBrnchList);
    promiseBrchGet.then(function(pl) {
        $scope.BranchData = pl.data;

        //$scope.BranchData.push({"bBranchId":"123","branchname":"All"});
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of Branch  ======*/
    
    
    /*=====================================
   =            Branch Change            =
   =====================================*/
   $scope.branchChange = function(id, branchdata) {

    ////console.log(id);
     //if (id == 123) {
        ////console.log("All Branches");
        //$scope.brName = "All";
        //$scope.branchArray = [{"bBranchId":"null"}];
    //} else {
        ////console.log("Single Branches");


        $scope.temp_br = $filter('filter')(branchdata, { "bBranchId": id });
        $scope.brName = $scope.temp_br[0].branchname; 
        $scope.branchId = id;
        ////console.log("$scope.brName",$scope.brName);
        $scope.branchArray = [{"bBranchId":id}];

        //var urlExeList = baseUrlSrvc.baseUrl + 'listCoursebyBranchId/' + id;
        var urlExeList = baseUrlSrvc.baseUrl + 'listCourse';
        var promiseExeGet = CRUD_SERVICE.getAllData(urlExeList);
        promiseExeGet.then(function(pl) {
            $scope.Courses = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
      //}
    //listUserDetailByBranchId
   }
   /*=====  End of Branch Change  ======*/

   /*========================================
   =            courses Change            =
   ========================================*/
   $scope.coursesChange = function(id, data) {
    if (id != undefined) {
        $scope.temp_br = $filter('filter')(data, { "cCourseId": id });
        $scope.corName = $scope.temp_br[0].coursename;
        $scope.courseId = $scope.temp_br[0].cCourseId;  
        ////console.log("$scope.corName",$scope.corName);

        var urlList = baseUrlSrvc.baseUrl + 'listBatchByCourseId/' + id;
        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function(pl) {
            $scope.Batch = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
      }
     else {
       $scope.courseId = "null";
     }
   }

   /*=====  End of courses Change  ======*/

    /*========================================
   =            batch Change            =
   ========================================*/
   $scope.batchChange = function(id, data) {
    if (id != undefined) {
        $scope.temp_br = $filter('filter')(data, { "cBatchId": id });
        $scope.batName = $scope.temp_br[0].batchname; 
        $scope.batchId = $scope.temp_br[0].cBatchId;

        var urlCBStudentList = baseUrlSrvc.baseUrl + 'listStudentByBatchIdCourseIdAndBranchId/' + id + '/' + $scope.courseId + '/' + $scope.branchId;
        var promiseCBStudentGet = CRUD_SERVICE.getAllData(urlCBStudentList);
        promiseCBStudentGet.then(function(pl) {
            $scope.AllStudents = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
        
     }
     else {
       $scope.batchId = "null";
     }

   }
   /*=====  End of batch Change  ======*/

   /*======================================
   =            Student Change            =
   ======================================*/
   $scope.studentChange = function(id) {

    if (id != undefined) {
      $scope.studentId = id;
    } else {
      $scope.studentId = "null";
    }

   }
   /*=====  End of Student Change  ======*/
   

   /*========================================
   =            From Date Change            =
   ========================================*/
   $scope.fromChange = function(fromdate) {
    ////console.log(fromdate);
    $scope.fromDateValue = fromdate;
   }
   /*=====  End of From Date Change  ======*/
   
   /*======================================
   =            To Date Change            =
   ======================================*/
   $scope.toChange = function(todate) {
    ////console.log(todate);
    $scope.toDateValue = todate;
   }
   
   
   /*=====  End of To Date Change  ======*/

   /*========================================
   =            Generate Reports            =
   ========================================*/
   $scope.generateReport = function(data) {
        // ////console.log("data",data);

        //check if form data is present
        if (!data) {
          var data = {};
        }

        data.cCourseId = [{"cCourseId":$scope.courseId}];
        
        data.eEnquiryFormId = [{"eEnquiryFormId":$scope.studentId}];

        if (data.cCourseId[0].cCourseId == "null") {
          $scope.corName = "All"
        }

        data.cBatchId = [{"cBatchId":$scope.batchId}];

        if (data.cBatchId[0].cBatchId == "null") {
          $scope.batName = "All"
        }

        data.bBranchId = $scope.branchArray;

        if (data.bBranchId[0].bBranchId == "null") {
          $scope.brName = "All"
        }

        if (!data.fromdate) {
            data.fromdate = "null";
        }
        if (!data.todate) {
            data.todate = "null";
        }

        //userid
        if($scope.fullAccess) {
            data.adUserId = $scope.useId;
        }
        if(!$scope.fullAccess) {
            data.adUserId = [{"adUserId":$sessionStorage.adUserId}];
        }


        $scope.sendArray = [];
        $scope.sendArray.push(data);


        var FormData = {
            formdata: $scope.sendArray,
            url: baseUrlSrvc.baseUrl + 'listPaymentDueCoursewiseOrBatchwise'
        };

        ////console.log("FormData",FormData);

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           
            var cbReportData = pl.data;
            ////console.log("cbReportData",pl.data);
            $scope.cbReportArray = [];
            $scope.cbReportArray.push(cbReportData);


            $scope.usersTable_cb = new ngTableParams({
                page: 1,
                count: 10
            }, {
               total: cbReportData.length, 
                getData: function ($defer, params) {

                  if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                
                    $scope.data_cbplacement = params.sorting() ? $filter('orderBy')($scope.cbReportArray[0], params.orderBy()) : $scope.cbReportArray[0];
                    $scope.data_cbplacement = params.filter() ? $filter('filter')($scope.data_cbplacement, params.filter()) : $scope.data_cbplacement;
                   $scope.data_cbplacement = $scope.data_cbplacement.slice((params.page() - 1) * params.count(), params.page() * params.count());
                   $defer.resolve($scope.data_cbplacement)
                }
            });
            $scope.usersTable_cb.reload();

            if (cbReportData.length == 0) {
                toaster.error({title: "", body:"No Records Found!",tapToDismiss: true,showCloseButton: true});
            } 
            if (cbReportData.length > 0) {
                toaster.success({title: "Success", body:cbReportData.length + " Records Found!",tapToDismiss: true,showCloseButton: true});
            }

            if ($scope.courseandbatchData.fromdate == "null") {
              $scope.courseandbatchData.fromdate = "";
            }
            if ($scope.courseandbatchData.todate == "null") {
              $scope.courseandbatchData.todate = "";
            }
           
        }, function (err) {
            toaster.error({title: "Error", body:"Error In Generating Report!",tapToDismiss: true,showCloseButton: true});
        });

   }
   /*=====  End of Generate Reports  ======*/
   
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
      ////console.log("today1",today1);
      $scope.currentDate =today;
      $scope.currentDate1 =today1;
      ////console.log("$scope.currentDate",$scope.currentDate);
     /*=====  End of Get Current Date  ======*/
   
    
    /*=======================================
    =            Export to Excel            =
    =======================================*/
    $scope.exportAction = function(export_action,tbname) { 

    tbname = tbname + '-' + $scope.currentDate + '[' + $sessionStorage.username + ']';

    switch(export_action){ 
          case 'pdf': $scope.$broadcast('export-pdf', {type:'pdf',tableName:tbname,pdfFontSize:'7',escape:'false'}); 
                      break; 
          case 'excel': $scope.$broadcast('export-excel', {type:'excel',tableName:tbname,htmlContent:'true',escape:'false'}); 
                      break; 
          case 'doc': $scope.$broadcast('export-doc',{type:'doc',tableName:tbname,escape:'false'});
                      break; 
          case 'csv': $scope.$broadcast('export-csv',{type:'csv',tableName:tbname,escape:'false'});
                      break;
          case 'png': $scope.$broadcast('export-png',{type:'png',tableName:tbname,escape:'false'});
                      break;
          default: //////console.log('no event caught'); 
       }
    }
    /*=====  End of Export to Excel  ======*/
    
});
/*=====  End of Controller  ======*/