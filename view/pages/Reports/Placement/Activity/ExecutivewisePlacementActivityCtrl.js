/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("ExecutivewisePlacementActivityCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope,$sessionStorage, toaster, $window) {
    
    $scope.branchArray = [];
    $window.document.title = "ITPreneur - Executivewise Client Activity Reports";
    // $scope.currentUserId = $sessionStorage.adUserId;
    $scope.exeId = "null";
    $scope.branchArray = [{"bBranchId":"null"}];
    $scope.data_executiveplacementactivity = [];
    
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

    $scope.disableExecutive = false;
        $scope.temp_br = $filter('filter')(branchdata, { "bBranchId": id });
        $scope.brName = $scope.temp_br[0].branchname; 
        //console.log("$scope.brName",$scope.brName);

        $scope.branchArray = [{"bBranchId":id}];

        var urlExeList = baseUrlSrvc.baseUrl + 'listUsersPlacementActivityByBranchId/' + id;
        var promiseExeGet = CRUD_SERVICE.getAllData(urlExeList);
        promiseExeGet.then(function(pl) {
            $scope.AllExecutives = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

    //}
    //listUserDetailByBranchId
   }
   /*=====  End of Branch Change  ======*/

   /*========================================
   =            Executive Change            =
   ========================================*/
   $scope.executiveChange = function(id, data) {

     $scope.disableFromDate = false;
     if (id != undefined) {
       $scope.temp_exe = $filter('filter')(data, { "adUserId": id });
       ////console.log("$scope.temp_exe",$scope.temp_exe);
      $scope.exeName = $scope.temp_exe[0].executivename;
      $scope.exeId = $scope.temp_exe[0].adUserId;
       ////console.log("$scope.exeId",$scope.exeId);
     } else {
       $scope.exeId = "null";
     }

   }
   /*=====  End of Executive Change  ======*/

   /*========================================
   =            From Date Change            =
   ========================================*/
   $scope.fromChange = function(fromdate) {
    $scope.disableToDate = false;
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
        ////console.log(data);

        //check if form data is present
        if (!data) {
          var data = {};
        }

        //set branch id
        data.bBranchId = $scope.branchArray;

        if (data.bBranchId[0].bBranchId == "null") {
          $scope.brName = "All";
        }

        //set from date null if not present
        if (!data.fromdate) {
            data.fromdate = "null";
        }

        //set to data null if not present
        if (!data.todate) {
            data.todate = "null";
        }

        //check aduserid selected or not in admin
        if ($scope.fullAccess) {
            data.adUserId = [{"adUserId":$scope.exeId}];
        }

        //set aduserid in executive login
        if (!$scope.fullAccess) {
            data.adUserId = [{"adUserId":$sessionStorage.adUserId}];
        }

        if (data.adUserId[0].adUserId == "null") {
          $scope.exeName = "All";
        }

        //define array for send
        $scope.sendArray = [];
        $scope.sendArray.push(data);

        var FormData = {
            formdata: $scope.sendArray,
            url: baseUrlSrvc.baseUrl + 'listExecutivewiseActivityPlacementReport'
        };

        ////console.log("FormData",FormData);

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           
            var AdmissionReportData = pl.data;
            //console.log("AdmissionReportData",AdmissionReportData);
            $scope.admissionReportArray = [];
            $scope.admissionReportArray.push(AdmissionReportData);


            $scope.usersTable_executiveplacementactivity = new ngTableParams({
                page: 1,
                count: 10
            }, {
               total: AdmissionReportData.length, 
                getData: function ($defer, params) {

                  if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                
                    $scope.data_executiveplacementactivity = params.sorting() ? $filter('orderBy')($scope.admissionReportArray[0], params.orderBy()) : $scope.admissionReportArray[0];
                    $scope.data_executiveplacementactivity = params.filter() ? $filter('filter')($scope.data_executiveplacementactivity, params.filter()) : $scope.data_executiveplacementactivity;
                   $scope.data_executiveplacementactivity = $scope.data_executiveplacementactivity.slice((params.page() - 1) * params.count(), params.page() * params.count());
                   $defer.resolve($scope.data_executiveplacementactivity)
                }
            });
            $scope.usersTable_executiveplacementactivity.reload();

            if (AdmissionReportData.length == 0) {
                toaster.error({title: "", body:"No Records Found!",tapToDismiss: true,showCloseButton: true});
            } 
            if (AdmissionReportData.length > 0) {
                toaster.success({title: "Success", body:AdmissionReportData.length + " Records Found!",tapToDismiss: true,showCloseButton: true});
            }

            if ($scope.ExecutivewisePlacementActivityData.fromdate == "null") {
              $scope.ExecutivewisePlacementActivityData.fromdate = "";
            }
            if ($scope.ExecutivewisePlacementActivityData.todate == "null") {
              $scope.ExecutivewisePlacementActivityData.todate = "";
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