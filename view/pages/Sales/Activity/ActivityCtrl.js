/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("activitiesCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster, $window) {
       
      //console.log("activitiesCtrl");
      $window.document.title = "ITPreneur - Sales Activity";
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.enquiryArray = [];
      $scope.activityArray = [];
      $scope.OperType = $routeParams.ID;
      //$scope.role = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;

      // var f_name =firstNameService.getFirstName();
      // var m_name =middleNameService.getMiddleName();
      // var l_name =lastNameService.getLastName();

      //   $scope.fullName = l_name + ' ' + f_name + ' ' + m_name;
      //   //console.log($scope.fullName);


      $scope.hideNameAll = false;
      $scope.hideNameOne = true;
      $scope.disableName = false;

      // $scope.hideActivityStatus= false;
 
               
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

         $scope.getId = function(data) {
          //console.log(data);

          $scope.enquiryactivitiesData.eEnquiryFormId = data.eEnquiryFormId;
          $scope.enquiryactivitiesData.eLeadinformationId = data.eLeadinformationId;
         }

          /*==========================================
          =            Full Payment Click            =
          ==========================================*/
          // $scope.EditHideActivityStatus = function() {
          //   //console.log(); 
          //    $scope.hideActivityStatus= false;
          // }
          /*=====  End of Full Payment Click  ======*/

          /*=============================================
          =            Partial Payment Click            =
          =============================================*/
          $scope.AddHideActivityStatus = function() {
            $scope.headingMessage = "Add Activity";           
             $scope.hideActivityStatus= true;
             $scope.hideStudentList = false;
             $scope.againstDisabled = false;
             $scope.studentreq = true;
          }
          /*=====  End of Partial Payment Click  ======*/
          

      /*=======================================
      =            Update Activity            =
      =======================================*/
      $scope.OnActivityStatusChange = function(id, data) {
             //console.log(id);
             //console.log(data);
            
             var districtUrl = baseUrlSrvc.baseUrl + 'updateActivity/'+ id + '/' + data;
             var promiseDistrictGet = CRUD_SERVICE.getAllData(districtUrl);
             promiseDistrictGet.then(function(pl) {
                     $scope.ActivityStatus = pl.data;
                     //console.log("$scope.ActivityStatus",$scope.ActivityStatus);
                     if ($scope.ActivityStatus.code == 1) {
                        toaster.success({title: "Success", body:"Activity Updated Successfully!",tapToDismiss: true,showCloseButton: true});
                     } else {
                        toaster.error({title: "Error", body:"Error In Updating Activity!",tapToDismiss: true,showCloseButton: true});
                     }
                     // $scope.Activitystatus = $filter('filter')($scope.ActivityStatus, { "acActivityId": id });
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
         }
         /*=====  End of Update Activity  ======*/

          /*========================================
    =            Edit Activity Modal            =
    ========================================*/
    
    $scope.editEnquiryActivity = function(id) {
      $scope.headingMessage = "Edit Activity";
         //console.log(id); 

          // var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryForm';
          //    var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
          //    promiseStudentGet.then(function(pl) {
          //         $scope.Students = pl.data;

          // //console.log($scope.Students);
          //        },
          //        function(errorPl) {
          //            $log.error('Some Error in Getting Records.', errorPl);
          //        });

          $scope.disableName = true;
          $scope.hideActivityStatus= false;

          $scope.hideStudentList = true;
          $scope.studentreq = false;
          

        var promiseGet = CRUD_SERVICE.getAllData(urlList_a);
        promiseGet.then(function (pl) {
                $scope.enquryactivity1 = pl.data;
                //console.log($scope.enquryactivity1);
                for (var i = 0; i < $scope.enquryactivity1.length; i++) {
                    if ($scope.enquryactivity1[i].acActivityId == id) {
                        $scope.enquiryactivitiesData = $scope.enquryactivity1[i];
                          //console.log($scope.enquiryactivitiesData);
                          $scope.Students=[{
                            "eEnquiryFormId" : $scope.enquiryactivitiesData.eEnquiryFormId,
                            "firstname" : $scope.enquiryactivitiesData.firstname,
                            "middlename" : $scope.enquiryactivitiesData.middlename,
                            "lastname" : $scope.enquiryactivitiesData.lastname

                          }];

                          if ($scope.enquiryactivitiesData.activityagainst == 'Lead') {
                            var fullname = $scope.enquiryactivitiesData.lastnamelead +  ' ' + $scope.enquiryactivitiesData.firstnamelead + ' ' + $scope.enquiryactivitiesData.middlenamelead;
                          $scope.selectedStudentName = fullname;  
                          } else {
                            var fullname = $scope.enquiryactivitiesData.lastname +  ' ' + $scope.enquiryactivitiesData.firstname + ' ' + $scope.enquiryactivitiesData.middlename;
                          $scope.selectedStudentName = fullname;  
                          }

                                                  
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit Activity Modal  ======*/

    /*=====================================
    =            View Activity            =
    =====================================*/
    $scope.viewActivity = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_c = $filter('filter')(bdata, { "acActivityId": id });

       $scope.viewActivityData = $scope.temp_var_c[0];
       if ($scope.temp_var_c[0].activityagainst == 'Lead') {
        $scope.viewActivityData.studentname = $scope.temp_var_c[0].lastnamelead + ' ' + $scope.temp_var_c[0].firstnamelead + ' ' + $scope.temp_var_c[0].middlenamelead;
      } else {

       $scope.viewActivityData.studentname = $scope.temp_var_c[0].lastname + ' ' + $scope.temp_var_c[0].firstname + ' ' + $scope.temp_var_c[0].middlename;
      }

    }
    /*=====  End of View Activity  ======*/

    /*===============================================
    =            Activity Against Change            =
    ===============================================*/
    $scope.activityAgainstChange = function(status) {
      //console.log(status);

        /*===================================
        =            Students List            =
        ===================================*/
        if (status == 'Lead') {
          var StudentListUrl = baseUrlSrvc.baseUrl + 'listLeadInformationByBranchId/' + $sessionStorage.bBranchId;
        }

        if (status == 'Enquiry') {
          var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryFormByBranchId/'  + $sessionStorage.bBranchId;
        }

        if (status == 'Application') {
          var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryRegistrationByBranchId/' + $sessionStorage.bBranchId;
        }

        if (status == 'Admission') {
          var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentByBranchId/' + $sessionStorage.bBranchId;
        }
       
         var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
         promiseStudentGet.then(function(pl) {
              $scope.Students = pl.data;

              //console.log($scope.Students);
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
         });
        /*=====  End of Students List  ======*/
    }
    /*=====  End of Activity Against Change  ======*/
    
    /*===============================================
    =            Add Activity From Table            =
    ===============================================*/
    $scope.addActivityFromTable = function(id, data) {
      //console.log(id);
      //console.log(data);
      $scope.hideNameAll = true;
      $scope.hideNameOne = false;
       $scope.hideActivityStatus= true;
       $scope.againstDisabled = true;

      $scope.temp_var_o = $filter('filter')(data, { "acActivityId": id });
       //console.log("$scope.temp_var_o",$scope.temp_var_o);

       $scope.enquiryactivitiesData.activityagainst = $scope.temp_var_o[0].activityagainst;
       //console.log($scope.enquiryactivitiesData.activityagainst);

       if ($scope.temp_var_o[0].activityagainst == 'Lead') {
        $scope.studentFullName = $scope.temp_var_o[0].lastnamelead + ' ' + $scope.temp_var_o[0].firstnamelead + ' ' + $scope.temp_var_o[0].middlenamelead;
       $scope.enquiryactivitiesData.eLeadinformationId = $scope.temp_var_o[0].eLeadinformationId;
       //console.log($scope.enquiryactivitiesData.eLeadinformationId);
       //$scope.enquiryactivitiesData.activityagainst == $scope.temp_var_o[0].activityagainst;


       } else {
        $scope.studentFullName = $scope.temp_var_o[0].lastname + ' ' + $scope.temp_var_o[0].firstname + ' ' + $scope.temp_var_o[0].middlename;
       $scope.enquiryactivitiesData.eEnquiryFormId = $scope.temp_var_o[0].eEnquiryFormId;
       //console.log($scope.enquiryactivitiesData.eEnquiryFormId);
       //$scope.enquiryactivitiesData.activityagainst == $scope.temp_var_o[0].activityagainst;
       }

       
    }
    /*=====  End of Add Activity From Table  ======*/
  

    /*========================================
    =            Get Enquiry List            =
    ========================================*/
    

    if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
        var urlList_a = baseUrlSrvc.baseUrl + 'listActivity';
      } else {
        var urlList_a = baseUrlSrvc.baseUrl  + 'listActivityByadUserIdAndRoleId/' + $sessionStorage.adUserId+ '/' + $sessionStorage.cRoleId;
      }
    GetAllRecords_act(urlList_a);

    //To Get All Records
    function GetAllRecords_act(url) {
        $scope.activityArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Activitylist = pl.data;
                $scope.activityArray.push($scope.Activitylist);
                //console.log("$scope.Activitylist",$scope.Activitylist);

                $scope.usersTable_activity = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Activitylist.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_activity = params.sorting() ? $filter('orderBy')($scope.activityArray[0], params.orderBy()) : $scope.activityArray[0];
                        $scope.data_activity = params.filter() ? $filter('filter')($scope.data_activity, params.filter()) : $scope.data_activity;
                       $scope.data_activity = $scope.data_activity.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_activity)
                    }
                });
                $scope.usersTable_activity.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get Enquiry List  ======*/


    
     /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.enquiryactivitiesData = {};
        $scope.enquiryactivitiesData.activitystatus = 'Pending';
        $scope.enquiryactivitiesData.activitydate = '';
        $scope.selected = {};
        $scope.hideStudentList = false;
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnCloseActivity = function() {
        $scope.enquiryactivitiesData = {};
        $scope.hideNameAll = false;
        $scope.selected = {};
        $scope.hideNameOne = true;
        $scope.disableName = false;
        $scope.enquiryactivitiesData.activitystatus = 'Pending';
        $scope.enquiryactivitiesData.activitydate = '';
        $scope.hideStudentList = false;
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*==================================================
    =            Get enquiry on Edit Page            =
    ==================================================*/
    if ($scope.OperType != undefined && $scope.OperType != 0) {
      var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquiryFormbyId/'+ $scope.OperType;
        var promiseGet = CRUD_SERVICE.getAllData(urlEnquiryList);
        promiseGet.then(function(pl) {
            $scope.enquiry = pl.data;

            for (var i = 0; i < $scope.enquiry.length; i++) {
                if ($scope.enquiry[i].eEnquiryFormId == $scope.OperType) {
                    $scope.enquiryData = $scope.enquiry[i];
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
     }
    /*=====  End of GetEnquiry on Edit Page  ======*/

    /*=====================================
    =            Save Activity            =
    =====================================*/
      $scope.saveActivities = function(data) {
                //console.log(data);
                 $scope.name = false;
                 $scope.hideNameAll = false;
                 $scope.hideNameOne = true;

                if (data.acActivityId) {

                    data.updatedby=$sessionStorage.updatedby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                    data.bBranchId=$sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;
                    

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateActivity'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.acActivityId = pl.data.acActivityId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels();
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels();
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {  
                    
                     
                     data.updatedby=$sessionStorage.updatedby;
                     data.createdby=$sessionStorage.createdby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                    data.bBranchId=$sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;



                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateActivity'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels();
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels();
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };
            /*=====  End of Save Activity  ======*/



});
/*=====  End of School Controller  ======*/