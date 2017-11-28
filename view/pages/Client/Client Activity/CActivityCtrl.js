/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("CActivityCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("CActivityCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
  
      $scope.activityArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;

      $scope.hideNameAll = false;
      $scope.hideNameOne = true;
      $scope.disableName = false;
 
               
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


      /*=======================================
      =            Update Activity            =
      =======================================*/
      $scope.OnClientActivityStatusChange = function(id, data) {
             //console.log(id);
             //console.log(data);
            
             var districtUrl = baseUrlSrvc.baseUrl + 'updateStatusByClientActivity/'+ id + '/' + data;
             var promiseDistrictGet = CRUD_SERVICE.getAllData(districtUrl);
             promiseDistrictGet.then(function(pl) {
                     $scope.ActivityStatus = pl.data;
                     //console.log("$scope.ActivityStatus",$scope.ActivityStatus);
                     if ($scope.ActivityStatus.code == 1) {
                        toaster.success({title: "Success", body:"Activity Updated Successfully!",tapToDismiss: true,showCloseButton: true});
                     } else {
                        toaster.error({title: "Error", body:"Error In Updating Activity!",tapToDismiss: true,showCloseButton: true});
                     }

                     $timeout(function() {
                        $scope.$apply(function () {
                          $route.reload();
                        });
                    },3000);
                     
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });

             
         }
         /*=====  End of Update Activity  ======*/

    /*===========================================================
    =            Disable Client name on Add activity            =
    ===========================================================*/
    $scope.addActivityButtonClick = function() {
      $scope.disabledClientName = false;
      $scope.hideActivityStatus= true;
      $scope.statusReq = false;
    }
    /*=====  End of Disable Client name on Add activity  ======*/


    /*===============================================
    =            Add Activity From Table            =
    ===============================================*/
    $scope.addClientActivityFromTable = function(id, data) {
      //console.log(id);
      //console.log(data);
      $scope. hideNameAll = true;
      $scope.hideNameOne = false;
       $scope.hideActivityStatus= true;


      $scope.temp_var_o = $filter('filter')(data, { "clClientactivityId": id });
       //console.log("$scope.temp_var_o",$scope.temp_var_o);

       $scope.companyFullName = $scope.temp_var_o[0].lastname + ' ' + $scope.temp_var_o[0].firstname + ' ' + $scope.temp_var_o[0].middlename;
       $scope.ClientactivitiesData.clClientId = $scope.temp_var_o[0].clClientId;
       //console.log($scope.ClientactivitiesData.clClientId);
    }
    /*=====  End of Add Activity From Table  ======*/


          /*========================================
    =            Edit Activity Modal            =
    ========================================*/
    
    $scope.editClientActivity = function(id) {
         //console.log(id); 
          $scope.disableName = true;
         
          $scope.statusReq = true;
           $scope.hideActivityStatus= false;
           //console.log("$scope.hideActivityStatus",$scope.hideActivityStatus);

        var promiseGet = CRUD_SERVICE.getAllData(urlList_a);
        promiseGet.then(function (pl) {
                $scope.clientactivity1 = pl.data;
                //console.log($scope.clientactivity1);
                for (var i = 0; i < $scope.clientactivity1.length; i++) {
                    if ($scope.clientactivity1[i].clClientactivityId == id) {
                        $scope.ClientactivitiesData = $scope.clientactivity1[i];
                          //console.log($scope.ClientactivitiesData);
                          $scope.Company=[{
                            "clClientId" : $scope.ClientactivitiesData.clClientId,
                            "companyname" : $scope.ClientactivitiesData.companyname
                        
                          }];
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit Activity Modal  ======*/
    

     /*==================================
      =            Companyclient List            =
      ==================================*/
      var CompanyclientListUrl = baseUrlSrvc.baseUrl + 'listClient';
      var promiseCompanyclientGet = CRUD_SERVICE.getAllData(CompanyclientListUrl);
      promiseCompanyclientGet.then(function(pl) {
          $scope.Company = pl.data;

          //console.log($scope.Company);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Companyclient List  ======*/


    /*========================================
    =            Get client List            =
    ========================================*/
    

    // if ($scope.role == 'Admin' || $scope.role == 'System Admin' || $scope.role == 'Placement Executive') {
        var urlList_a = baseUrlSrvc.baseUrl + 'listClientActivity';
      // } else {
        // var urlList_a = baseUrlSrvc.baseUrl  + 'listClientActivityByClientId/' + $scope.OperType;
      // }
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
    /*=====  End of Get client List  ======*/


          /*========================================
    =            Edit Activity Modal            =
    ========================================*/
    
    // $scope.editClientActivity = function(id) {
    //      //console.log(id); 

    //       $scope.name = true;
    //       $scope.disabledClientName = true;
          

    //     var promiseGet = CRUD_SERVICE.getAllData(urlList_a);
    //     promiseGet.then(function (pl) {
    //             $scope.clientactivity1 = pl.data;
    //             //console.log($scope.clientactivity1);
    //             for (var i = 0; i < $scope.clientactivity1.length; i++) {
    //                 if ($scope.clientactivity1[i].clClientactivityId == id) {
    //                     $scope.ClientactivitiesData = $scope.clientactivity1[i];
    //                       //console.log($scope.ClientactivitiesData);
    //                       $scope.Students=[{
    //                         "clClientId" : $scope.ClientactivitiesData.clClientId,
    //                         "companyname" : $scope.ClientactivitiesData.companyname

    //                       }];
    //                 }
    //             }

    //         },
    //         function (errorPl) {
    //             $log.error('Some Error in Getting Records.', errorPl);
    //         });
    // }
    
    /*=====  End of Edit Activity Modal  ======*/




    
     /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        
        $scope.ClientactivitiesData = {};
        $scope.ClientactivitiesData.activitystatus = 'Pending';
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnCloseActivity = function() {
        $scope.ClientactivitiesData = {};
       
        $scope.viewClientActivityData = {};

         $scope.enquiryactivitiesData = {};
        $scope.hideNameAll = false;
        $scope.hideNameOne = true;
        $scope.disableName = false;
        $scope.ClientactivitiesData.activitystatus = 'Pending';
    }
    /*=====  End of Clear Modal on Click  ======*/

    
      /*===============================================
      =            View Client Function            =
      ===============================================*/
      $scope.viewClientActivity = function(id, idata) {
           //console.log(id);
          $scope.temp_var_c = $filter('filter')(idata, { "clClientactivityId": id });
         //console.log("$scope.temp_var_c",$scope.temp_var_c);

         $scope.viewClientActivityData= $scope.temp_var_c[0];
      }
      /*=====  End of View Client Function  ======*/



      $scope.saveClientActivities = function(data) {
                //console.log(data);
                $scope.name = false;

                if (data.clClientactivityId) {

                    data.updatedby=$sessionStorage.updatedby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                    data.bBranchId=$sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;


                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateClientActivity'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.clClientactivityId = pl.data.clClientactivityId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels()
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels()
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {  
                    
                     data.activitystatus = "Pending";
                     data.updatedby=$sessionStorage.updatedby;
                     data.createdby=$sessionStorage.createdby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                    data.bBranchId=$sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;

                    data.activitydate = $scope.currentDate;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateClientActivity'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels()
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllRecords_act(urlList_a);
                            ClearModels()
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };



});
/*=====  End of School Controller  ======*/