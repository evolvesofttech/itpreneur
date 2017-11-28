/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("clientactivitiesCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("clientactivitiesCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
  
      $scope.clientactivityArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;
 
               
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
                     
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
         }
         /*=====  End of Update Activity  ======*/


      /*=============================================
      =            Partial Payment Click            =
      =============================================*/
      $scope.AddHideActivityStatus = function() {
       
         $scope.hideActivityStatus= true;
      }
      /*=====  End of Partial Payment Click  ======*/
          

      /*===============================================
      =            View Client Function            =
      ===============================================*/
      $scope.viewClientActivity = function(id, idata) {
           //console.log(id);
          $scope.temp_var_c = $filter('filter')(idata, { "clClientactivityId": id });
         //console.log("$scope.temp_var_c",$scope.temp_var_c);

         $scope.viewClientActivityData= {
            "clClientactivityId": $scope.temp_var_c[0].clClientactivityId,
            "companyname": $scope.temp_var_c[0].companyname,
            "activitytype": $scope.temp_var_c[0].activitytype,
            "activitydate": $scope.temp_var_c[0].activitydate,
            "followupdate": $scope.temp_var_c[0].followupdate,
            "activitystatus": $scope.temp_var_c[0].activitystatus,
            "description": $scope.temp_var_c[0].description,
            "username": $scope.temp_var_c[0].username
            
         };
      }
      /*=====  End of View Client Function  ======*/


          /*========================================
    =            Edit Activity Modal            =
    ========================================*/
    
    $scope.editClientActivity = function(id) {
      $scope.headingMessage = "Edit Activity";
         //console.log(id); 

          $scope.name = true;
          $scope.disabledClientName = true;
          $scope.hideActivityStatus = false;
          

        var promiseGet = CRUD_SERVICE.getAllData(urlList_a);
        promiseGet.then(function (pl) {
                $scope.clientactivity1 = pl.data;
                //console.log($scope.clientactivity1);
                for (var i = 0; i < $scope.clientactivity1.length; i++) {
                    if ($scope.clientactivity1[i].clClientactivityId == id) {
                        $scope.ClientactivitiesData = $scope.clientactivity1[i];
                          //console.log($scope.ClientactivitiesData);
                          $scope.Students=[{
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



    /*===========================================================
    =            Disable Client name on Add activity            =
    ===========================================================*/
    $scope.addActivityButtonClick = function() {
      $scope.headingMessage = "Add Activity";
      $scope.disabledClientName = false;
      $scope.hideActivityStatus= true;
    }
    /*=====  End of Disable Client name on Add activity  ======*/
    

     /*==================================
      =            Companyclient List            =
      ==================================*/
      // var CompanyclientListUrl = baseUrlSrvc.baseUrl + 'listClient';
      // var promiseCompanyclientGet = CRUD_SERVICE.getAllData(CompanyclientListUrl);
      // promiseCompanyclientGet.then(function(pl) {
      //     $scope.Company = pl.data;

      //     //console.log($scope.Company);
      // },
      // function(errorPl) {
      //     $log.error('Some Error in Getting Records.', errorPl);
      // });
      /*=====  End of Companyclient List  ======*/


    /*========================================
    =            Get client List            =
    ========================================*/
    

    // if ($scope.role == 'Admin' || $scope.role == 'System Admin') {
    //     var urlList_a = baseUrlSrvc.baseUrl + 'listClientActivity';
    //   } else {
        var urlList_a = baseUrlSrvc.baseUrl  + 'listClientActivityByClientId/' + $scope.OperType;
       // }
    GetAllRecords_act(urlList_a);

    //To Get All Records
    function GetAllRecords_act(url) {
        $scope.clientactivityArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Activitylist = pl.data;
                $scope.clientactivityArray.push($scope.Activitylist);
                //console.log("$scope.Activitylist",$scope.Activitylist);

                $scope.usersTable_clientactivities = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Activitylist.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                    
                        $scope.data_clientactivities = params.sorting() ? $filter('orderBy')($scope.clientactivityArray[0], params.orderBy()) : $scope.clientactivityArray[0];
                        $scope.data_clientactivities = params.filter() ? $filter('filter')($scope.data_clientactivities, params.filter()) : $scope.data_clientactivities;
                       $scope.data_clientactivities = $scope.data_clientactivities.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_clientactivities)
                    }
                });
                $scope.usersTable_clientactivities.reload();
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
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnCloseActivity = function() {
        $scope.ClientactivitiesData = {};
       
        $scope.viewclientactivitiesData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/


      $scope.saveClientAct = function(data) {
                //console.log(data);
                $scope.name = false;

                if (data.clClientactivityId) {

                    data.updatedby=$sessionStorage.updatedby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                    data.bBranchId=$sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;
                    data.clClientId = $scope.OperType;

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
                    data.clClientId = $scope.OperType;

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
/*=====  End of Activity Controller  ======*/