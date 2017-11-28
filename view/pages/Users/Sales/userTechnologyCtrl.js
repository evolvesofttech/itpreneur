/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("usertechnologiesCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("usertechnologiesCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.technologiesArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
    $scope.user = {technology: []};
               
     // $scope.technology = [];
    //  $scope.user = {technology: [1,2]};
      
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

      
    /*======================================
    =            Get List technologies            =
    ======================================*/
    //1 Mean New Entry
    var urlList_a = baseUrlSrvc.baseUrl + 'listUserTechnologyById/' + $scope.OperType;
    GetAllRecords_tech(urlList_a);

    //To Get All Records
    function GetAllRecords_tech(url) {
        $scope.technologiesArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.technologies = pl.data;
                $scope.technologiesArray.push($scope.technologies);
                //console.log("$scope.technologies",$scope.technologies);

                $scope.usersTable_usertechnologies = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.technologies.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_usertechnologies = params.sorting() ? $filter('orderBy')($scope.technologiesArray[0], params.orderBy()) : $scope.technologiesArray[0];
                        $scope.data_usertechnologies = params.filter() ? $filter('filter')($scope.data_usertechnologies, params.filter()) : $scope.data_usertechnologies;
                       $scope.data_usertechnologies = $scope.data_usertechnologies.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_usertechnologies)
                    }
                });
                $scope.usersTable_usertechnologies.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List technologies  ======*/


    /*======================================
    =            Get List technology            =
    ======================================*/
    //1 Mean New Entry
    var courseurlList_a = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
    GetAllCourseRecords(courseurlList_a);
    $scope.technology = [];
    //To Get All Records
    function GetAllCourseRecords(url) {
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
            $scope.technology = pl.data;
                //console.log("$scope.technology",$scope.technology);


$scope.user = {
    technology: [$scope.technology[1]]
  };

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List technology  ======*/


     /*=============================================
     =            technology Checkbox Click            =
     =============================================*/
     $scope.checkboxTechnologyClick = function(id) {
        //console.log(id);
        $scope.course_id = id;
        //console.log("$scope.sch_id",$scope.course_id);

     }
     /*=====  End of technology Checkbox Click  ======*/
    
     /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addtechnologies = {};
        $scope.technologiesdata = {};
       $scope.user.cTechnologyMasterId = [];
        $scope.viewtechnologiesData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.technologiesData = {};
       $scope.user.cTechnologyMasterId = [];
        $scope.viewtechnologiesData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit technologies Modal            =
    ========================================*/
    
    $scope.editTechnologies = function(id) {
         //console.log(id); 

         //$scope.technology = [];
        $scope.user = {technology: ["0A0EC1DABB034350B1EB7F2602FDA5BB", "698E1FCADF124943B24A7CAABC07DFE8"]};
               

        var promiseGet = CRUD_SERVICE.getAllData(courseurlList_a);
        promiseGet.then(function (pl) {

                $scope.technology = pl.data;
                //console.log(" $scope.technology", $scope.technology);
                  $scope.user = {technology: ["0A0EC1DABB034350B1EB7F2602FDA5BB", "698E1FCADF124943B24A7CAABC07DFE8"]};
            
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit technologies Modal  ======*/
    
    /*==================================
    =            View technologies            =
    ==================================*/
    $scope.viewTechnologies = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "adUsertechnologyId": id });

       $scope.viewtechnologiesData= {
          "adUsertechnologyId": $scope.temp_var_a[0].adUsertechnologyId,
          "technologyname": $scope.temp_var_a[0].technologyname
       };
    }
    /*=====  End of View technologies  ======*/
      
    

    $scope.saveUserTechnology = function(data_a) {
        //console.log("Save function");
        //console.log(data_a);
        $scope.user.cTechnologyMasterId = [];
         var sch_data = $scope.course_id;
            $scope.school_array=[];

        if (data_a.adUsertechnologyId == undefined) {

             data_a.updatedby=$sessionStorage.updatedby;
           
            data_a.inInstituteId=$sessionStorage.inInstituteId;
             data_a.bBranchId=$sessionStorage.bBranchId;
             data_a.eEnquiryFormId = $scope.OperType;
              data_a.adUserId = $sessionStorage.adUserId;
              data_a.adUserdetailId = $scope.OperType;
            
            
            for(var i=0; i < sch_data.length; i++ )
            {
                $scope.school_array.push({'cTechnologyMasterId': sch_data[i], 'eEnquiryFormId': $scope.OperType, 'inInstituteId':$sessionStorage.inInstituteId, 'updatedby':$sessionStorage.updatedby, 'bBranchId':$sessionStorage.bBranchId});
            }

            var FormData = {
                formdata: $scope.school_array,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserTechnology'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.eEnquiryFormId = pl.data.eEnquiryFormId;
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords_tech(urlList_a);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords_tech(urlList_a);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

             data_a.updatedby=$sessionStorage.updatedby;
             data_a.createdby=$sessionStorage.createdby;
            data_a.inInstituteId=$sessionStorage.inInstituteId;
             data_a.bBranchId=$sessionStorage.bBranchId;
              data_a.adUserId = $sessionStorage.adUserId;
              data_a.adUserdetailId = $scope.OperType;
            
            for(var i=0; i < sch_data.length; i++ )
            {
                $scope.school_array.push({'cTechnologyMasterId': sch_data[i], 'adUserdetailId': $scope.OperType, 'inInstituteId':$sessionStorage.inInstituteId, 'createdby':$sessionStorage.createdby, 'bBranchId':$sessionStorage.bBranchId});
            }
            
            var FormData = {
                formdata: $scope.school_array,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserTechnology'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                // $timeout(function() {
                //     $scope.$apply(function () {
                //     $route.reload();
                //     });
                // },100);
                GetAllRecords_tech(urlList_a);
                //  if (promiseData.code == 2) {
                    
                //     toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                // } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                //}

            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords_tech(urlList_a);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };


    /*====================================
    =            Delete technologies            =
    ====================================*/
    
    $scope.delTechnologies = function(id, tdata) {
         //console.log(id); 
         //console.log(tdata); 
        $scope.temp_var = $filter('filter')(tdata, { "adUsertechnologyId": id });

       $scope.deletetechnologiesData= {
          "adUsertechnologyId": $scope.temp_var[0].adUsertechnologyId,
          "technologyname": $scope.temp_var[0].technologyname
       };
     }

    $scope.deleteTechnology = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteUserTechnology'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords_tech(urlList_a);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords_tech(urlList_a);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete technologies  ======*/


});
/*=====  End of School Controller  ======*/