/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("leadactivityCtrl", ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster",
        "feedback_Cid","feedback_Bid","feedback_Eid","branch_name","Form_no","course_fee",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, feedback_Cid, 
            feedback_Bid, feedback_Eid, branch_name, Form_no, course_fee) {

         $scope.leadArray = [];
         // $scope.leadinfoArraysource = [];
          $scope.OperType = $routeParams.ID;
           $scope.role = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;

           $scope.disableAllInput = true;
           $scope.showStaticCourseInfo = true;
           $scope.showDyanmicCourseInfo = true;
          $scope.enquiryButton = false;
           $scope.status = "Incomplete";        

          // tabs
         $scope.viewGrid= $sessionStorage.userData1.inInstituteId;
         // $scope.windowtype  = "Enquiry";

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

        /*========================================
         =            Get Current Year            =
         ========================================*/
         var d = new Date();
         $scope.currentYear = d.getFullYear();
         //console.log("$scope.currentYear",$scope.currentYear);
         /*=====  End of Get Current Year  ======*/
       
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

     
    
  /*=====================================
    =            View Activity            =
    =====================================*/
    $scope.viewLeadActivity = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "acActivityId": id });

       $scope.viewActivityData = $scope.temp_var_a[0];
       // $scope.viewActivityData.studentname = $scope.temp_var_a[0].firstname + ' ' + $scope.temp_var_a[0].middlename + ' ' + $scope.temp_var_a[0].lastname;
    }
    /*=====  End of View Activity  ======*
            
            

            /*============================================
            =            Clear Modal on Click            =
            ============================================*/
            $scope.clearModalOnClose = function() {
                $scope.viewleadinfoData = {};
                $scope.leadinfoData = {};
                //$scope.existing = false;
            }
            /*=====  End of Clear Modal on Click  ======*/
            
            /*==============================================
            =            Clear Model After Save            =
            ==============================================*/
            function ClearModels() {
                $scope.viewleadinfoData = {};
                $scope.leadinfoData = {};
            }
            /*=====  End of Clear Model After Save  ======*/

             /*====================================
             =            Clear Models            =
             ====================================*/
             $scope.clearModalOnCloseActivity = function() {
              $scope.leadactivitiesData = {};
              $scope.leadactivitiesData.activitystatus = 'Pending';
              $scope.leadactivitiesData.activityagainst = 'Lead';
             }

             function ClearModels() {
              $scope.leadactivitiesData = {};
              $scope.leadactivitiesData.activitystatus = 'Pending';
              $scope.leadactivitiesData.activityagainst = 'Lead';
             }
             /*=====  End of Clear Models  ======*/
             

             /*==========================================
            =            Full Payment Click            =
            ==========================================*/
            $scope.EditHideActivityStatus = function() {
              //console.log(); 
               $scope.hideActivityStatus= false;
            }
            /*=====  End of Full Payment Click  ======*/

            /*=============================================
            =            Partial Payment Click            =
            =============================================*/
            $scope.AddHideActivityStatus = function() {
                $scope.headingMessage = "Add Activity";
               $scope.hideActivityStatus= true;
            }
            /*=====  End of Partial Payment Click  ======*/


            /*=====================================
            =            Edit Activity            =
            =====================================*/
            $scope.editLeadActivity = function(id) {
                $scope.headingMessage = "Edit Activity";
              var urlEditActivityList = baseUrlSrvc.baseUrl + 'listActivityByLeadinformationId/' + $scope.OperType;
                var promiseEditActivityGet = CRUD_SERVICE.getAllData(urlEditActivityList);
                promiseEditActivityGet.then(function(pl) {
                    $scope.editAct = pl.data;
                    for (var i = 0; i < $scope.editAct.length; i++) {
                        if ($scope.editAct[i].acActivityId == id) {
                            $scope.leadactivitiesData = $scope.editAct[i];
                            //console.log($scope.leadactivitiesData);
                            
                        }
                    }
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });

            }
            /*=====  End of Edit Activity  ======*/
            

            /*=====================================
            =            Save Activity            =
            =====================================*/
            $scope.saveActivities = function (data) {
                //console.log("$scope.StorageData",$scope.StorageData);
                if (data.acActivityId) {

                    data.updatedby=$sessionStorage.updatedby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                    data.bBranchId=$sessionStorage.bBranchId;
                    data.eLeadinformationId = $scope.OperType;
                    data.adUserId = $sessionStorage.adUserId;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateActivity'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function (pl) {
                        $scope.acActivityId = pl.data.acActivityId;
                       
                       $timeout(function() {
                            $scope.$apply(function () {
                            //$

                            
                            GetAllRecords_act(urlList_a);
                            ClearModels();
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                        
                        ClearModels();
                    }, function (err) {
                        //console.log(err);
                        
                        $timeout(function() {
                            $scope.$apply(function () {
                            //$route.reload();
                            ClearModels();
                            GetAllRecords_act(urlList_a);
                            });
                        },100);
                        toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                         
                        ClearModels();
                    });
                } else {
                     data.updatedby=$sessionStorage.updatedby;
                     data.createdby=$sessionStorage.createdby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                     data.bBranchId=$sessionStorage.bBranchId;
                     data.eLeadinformationId = $scope.OperType;
                     data.adUserId = $sessionStorage.adUserId;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateActivity'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function (pl) {
                       
                       var batch = pl.batch;
                       var promiseData = pl.data;
                       //console.log("batch",batch);
                       //console.log("promiseData",promiseData);
                       
                        if (promiseData.code == 2) {
                            
                            toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                        } else {
                            toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                        }
                             GetAllRecords_act(urlList_a);
                        // Flash.create('success', $scope.SuccessMessage);
                       
                        ClearModels();
                        //}
                    }, function (err) {
                        //console.log("Some Error Occured." + err);

                        //console.log("err.data",err.data);
                         
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                           GetAllRecords_act(urlList_a);
                        ClearModels();
                    });
                }
            };
            /*=====  End of Save Activity  ======*/

}]);
/*=====  End of Controller  ======*/