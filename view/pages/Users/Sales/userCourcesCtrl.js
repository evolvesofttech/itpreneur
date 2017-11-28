/*=========================================
=            Courses Controller            =
=========================================*/
angular.module('theGuru').controller("usercourcesCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("usercourcesCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.technologiesArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
 
    
      
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
    =            Get List Cource            =
    ======================================*/
    //1 Mean New Entry
    var urlList_b = baseUrlSrvc.baseUrl + 'listUserCourses';
    GetAllRecords_cource(urlList_b);

    //To Get All Records
    function GetAllRecords_cource(url) {
        $scope.courceArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.cource = pl.data;
                $scope.courceArray.push($scope.cource);
                //console.log("$scope.cource",$scope.cource);

                $scope.usersTable_usercource = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.cource.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_usercource = params.sorting() ? $filter('orderBy')($scope.courceArray[0], params.orderBy()) : $scope.courceArray[0];
                        $scope.data_usercource = params.filter() ? $filter('filter')($scope.data_usercource, params.filter()) : $scope.data_usercource;
                       $scope.data_usercource = $scope.data_usercource.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_usercource)
                    }
                });
                $scope.usersTable_usercource.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List Cource  ======*/


    

     /*==================================
      =            Course List            =
      ==================================*/
      var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
      var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
      promiseCourseGet.then(function(pl) {
          $scope.Course = pl.data;

          //console.log($scope.Course);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Course List  ======*/


    
    
     /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addcource = {};
        $scope.courceData1 = {};
       
        $scope.viewcourceData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
      
        $scope.courceData1 = {};
       
        $scope.viewcourceData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    


    /*========================================
    =            Edit courses Modal            =
    ========================================*/
    
   
      $scope.editcourses = function(id) {
      var coursesList = baseUrlSrvc.baseUrl + 'listUserCoursesByUserdetailId/'+ $scope.OperType;
        var promiseGet = CRUD_SERVICE.getAllData(coursesList);
        promiseGet.then(function(pl) {
            $scope.courses = pl.data;
            //console.log($scope.courses);

            for (var i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].cCourseId == id) {
                    $scope.courceData1 = $scope.courses[i];
                    //console.log($scope.courceData1);

                    $scope.Course = [{
                      "cCourseId":$scope.courceData1.cCourseId,
                      "coursename":$scope.courceData1.coursename,
                    }];
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
     }
    
    /*=====  End of Edit courses Modal  ======*/

    /*====================================
    =            Course Focus            =
    ====================================*/
    $scope.courseFocus = function() {

      var CourseListUrl = baseUrlSrvc.baseUrl + 'listCourse';
      var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
      promiseCourseGet.then(function(pl) {
          $scope.Course = pl.data;

          //console.log($scope.Course);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

    }
    
    
    /*=====  End of Course Focus  ======*/
    
    
    /*==================================
    =            View Cource            =
    ==================================*/
    $scope.viewcource = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "adUsercoursesId": id });

       $scope.viewcourceData= {
          "adUsercoursesId": $scope.temp_var_a[0].adUsercoursesId,
          "coursename": $scope.temp_var_a[0].coursename
       };
    }
    /*=====  End of View Cource  ======*/
      
    
    /*==================================
    =            Save courses            =
    ==================================*/
    
    $scope.saveUserCource = function (data) {
        //console.log("data",data);

        if (data.adUsercoursesId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;

            data.adUserdetailId = $scope.OperType;
            data.adUserId=$sessionStorage.adUserId;
           
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserCourses'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.adUsercoursesId = pl.data.adUsercoursesId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   GetAllRecords_cource(urlList_b);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
               ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   GetAllRecords_cource(urlList_b);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                //ClearModels();
            });
        } else {

             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.updatedby=$sessionStorage.updatedby;
             data.adUserdetailId = $scope.OperType;
             data.adUserId=$sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserCourses'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var courses = pl.courses;
               var promiseData = pl.data;
               //console.log("courses",courses);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   GetAllRecords_cource(urlList_b);
                    });
                },100);

                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
                //ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   GetAllRecords_cource(urlList_b);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save courses  ======*/


    /*====================================
    =            Delete Cource            =
    ====================================*/
    
    $scope.delCource = function(id, tdata) {
         //console.log(id); 
         //console.log(tdata); 
        $scope.temp_var = $filter('filter')(tdata, { "adUsercoursesId": id });

       $scope.deletecourceData= {
          "adUsercoursesId": $scope.temp_var[0].adUsercoursesId,
          "coursename": $scope.temp_var[0].coursename
       };
     }

    $scope.deletecource = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteUserCourses'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   GetAllRecords_cource(urlList_b);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   GetAllRecords_cource(urlList_b);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete Cource  ======*/


});
/*=====  End of Courses Controller  ======*/