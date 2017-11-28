/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("enquiryactivitiesCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster, firstNameService, middleNameService, lastNameService) {
       
      //console.log("enquiryactivitiesCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.enquiryactivitiesArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
 
        var f_name =firstNameService.getFirstName();
        var m_name =middleNameService.getMiddleName();
        var l_name =lastNameService.getLastName();

        $scope.fullName = f_name + ' ' + m_name + ' ' + l_name;
        //console.log($scope.fullName);

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

      $scope.hideActivityStatus= false;
     

      /*=============================================
      =            Partial Payment Click            =
      =============================================*/
      $scope.AddHideActivityStatus = function() {
        $scope.headingMessage = "Add Activity";
       
         $scope.hideActivityStatus= true;
      }
      /*=====  End of Partial Payment Click  ======*/
          

      
    /*======================================
    =            Get List enquiryactivities            =
    ======================================*/
    //1 Mean New Entry
    var urlList_a = baseUrlSrvc.baseUrl + 'listActivityById/' + $scope.OperType;
    GetAllRecords_act(urlList_a);

    //To Get All Records
    function GetAllRecords_act(url) {
        $scope.enquiryactivitiesArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.enquiryactivities = pl.data;
                $scope.enquiryactivitiesArray.push($scope.enquiryactivities);
                //console.log("$scope.enquiryactivities",$scope.enquiryactivities);

                $scope.usersTable_enquiryactivities = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.enquiryactivities.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_enquiryactivities = params.sorting() ? $filter('orderBy')($scope.enquiryactivitiesArray[0], params.orderBy()) : $scope.enquiryactivitiesArray[0];
                        $scope.data_enquiryactivities = params.filter() ? $filter('filter')($scope.data_enquiryactivities, params.filter()) : $scope.data_enquiryactivities;
                       $scope.data_enquiryactivities = $scope.data_enquiryactivities.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_enquiryactivities)
                    }
                });
                $scope.usersTable_enquiryactivities.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List enquiryactivities  ======*/

    
     /*===================================
    =            Clear Model            =
    ===================================*/
    function ClearModels() {
        $scope.addenquiryactivities = {};
        $scope.enquiryactivitiesData.activitytype = "";
        $scope.enquiryactivitiesData.description = "";
        $scope.enquiryactivitiesData.followupdate = "";
        $scope.enquiryactivitiesData.activitydate = "";
        $scope.enquiryactivitiesData.activitystatus = 'Pending';
    }
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.enquiryactivitiesData.activitytype = "";
        $scope.enquiryactivitiesData.description = "";
        $scope.enquiryactivitiesData.followupdate = "";
        $scope.enquiryactivitiesData.activitydate = "";
        $scope.enquiryactivitiesData.activitystatus = 'Pending';
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit Activity Modal            =
    ========================================*/
    $scope.editEnquiryActivity = function(id) {
        $scope.headingMessage = "Edit Activity";
         //console.log(id);

          $scope.name = true;
           $scope.hideActivityStatus= false;
          

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
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit Activity Modal  ======*/

    /*========================================
    =            Edit enquiryactivities Modal            =
    ========================================*/
    $scope.saveActivities = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.acActivityId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.eEnquiryFormId = $scope.OperType;
            data.activityagainst = "Enquiry";
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
                    //$route.reload();
                    GetAllRecords_act(urlList_a);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
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
             data.eEnquiryFormId = $scope.OperType;
             data.activityagainst = "Enquiry";
             data.adUserId = $sessionStorage.adUserId;
             data.activitystatus = "Pending";

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

    /*=====================================
    =            View Activity            =
    =====================================*/
    $scope.viewActivity = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "acActivityId": id });

        $scope.viewActivityData= {
       "acActivityId": $scope.temp_var_a[0].acActivityId,
       "activitytype": $scope.temp_var_a[0].activitytype,
       "description": $scope.temp_var_a[0].description,
       "username": $scope.temp_var_a[0].username,
       "followupdate": $scope.temp_var_a[0].followupdate,
       "activitydate": $scope.temp_var_a[0].activitydate,
       "activitystatus": $scope.temp_var_a[0].activitystatus,
       "activityagainst": $scope.temp_var_a[0].activityagainst

        };
        $scope.viewActivityData= temp_var_a[0];
       // $scope.viewActivityData.studentname = $scope.temp_var_c[0].lastname + ' ' + $scope.temp_var_c[0].firstname + ' ' + $scope.temp_var_c[0].middlename;

    }
    /*=====  End of View Activity  ======*/


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
  

});
/*=====  End of School Controller  ======*/