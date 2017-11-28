/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("coursesCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("courses");
    $scope.coursesArray = [];
    $scope.OperType = $routeParams.ID;
    $scope.courses_tech= [];
    $window.document.title = "ITPreneur - Courses";

    /*============================
    =            Tabs            =
    ============================*/
    this.Inst = 1;

    this.setTab = function(tabId) {
        this.Inst = tabId;
    };

    this.isSet = function(tabId) {
        return this.Inst === tabId;
    };
    /*=====  End of Tabs  ======*/

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

    $scope.addtechno = function(){
        $scope.headingMessage = "Add Technology";
    }

    /*======================================
    =            Get List courses            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listCourse';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.coursesArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.courses = pl.data;
                $scope.coursesArray.push($scope.courses);
                //console.log("$scope.courses",$scope.courses);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.courses.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.coursesArray[0], params.orderBy()) : $scope.coursesArray[0];
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                       $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data)
                    }
                });
                $scope.usersTable.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List courses  ======*/

    /*==================================================
    =            Get List Technology Course            =
    ==================================================*/
    var urlTechList = baseUrlSrvc.baseUrl + 'listTechnologyByCourseId/' + $scope.OperType;
    GetAllTechRecords(urlTechList);

    //To Get All Records
    function GetAllTechRecords(url) {
        $scope.coursesTechArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.courses_tech = pl.data;
                $scope.coursesTechArray.push($scope.courses_tech);
                //console.log("$scope.courses_tech",$scope.courses_tech);

                $scope.usersTable_coursetechnology = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.courses_tech.length, 
                    getData: function ($defer, params) {
                    
                        $scope.data_technology = params.sorting() ? $filter('orderBy')($scope.coursesTechArray[0], params.orderBy()) : $scope.coursesTechArray[0];
                        $scope.data_technology = params.filter() ? $filter('filter')($scope.data_technology, params.filter()) : $scope.data_technology;
                       $scope.data_technology = $scope.data_technology.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_technology)
                    }
                });
                $scope.usersTable_coursetechnology.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List Technology Course  ======*/
    

    /*=================================================
    =            Course data on other page            =
    =================================================*/
    if ($scope.OperType != undefined && $scope.OperType != 0) {

        $window.document.title = "ITPreneur - Edit Course";

      var courseByIdListUrl = baseUrlSrvc.baseUrl + 'listCourseById/'+ $scope.OperType;
        var promisecourseByIdListUrlGet = CRUD_SERVICE.getAllData(courseByIdListUrl);
        promisecourseByIdListUrlGet.then(function(pl) {
            $scope.course1 = pl.data;
            for (var i = 0; i < $scope.course1.length; i++) {
                if ($scope.course1[i].cCourseId == $scope.OperType) {
                    $scope.coursesData = $scope.course1[i];
                    //console.log("$scope.coursesData",$scope.coursesData);
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
     }
    /*=====  End of Course data on other page  ======*/

    /*==============================================
    =            List Technology Master            =
    ==============================================*/
    var listTechUrl = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
    var listTechUrlGet = CRUD_SERVICE.getAllData(listTechUrl);
    listTechUrlGet.then(function(pl) {
        $scope.TechnologyMaster = pl.data;
        //console.log("$scope.TechnologyMaster",$scope.TechnologyMaster);
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of List Technology Master  ======*/
    
    
    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addcourses = {};
        $scope.coursesData = {};
       
        $scope.viewcoursesData = {};
    }
    function ClearModelsTechnology() {
        $scope.coursetechnologyData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.coursesData = {};
       
        $scope.viewcoursesData = {};
    }
    $scope.clearModalOnCloseTechnology = function() {
        $scope.coursetechnologyData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit courses Modal            =
    ========================================*/
    
    $scope.editCourses = function(id) {
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.courses1 = pl.data;
                //console.log($scope.courses1);
                for (var i = 0; i < $scope.courses1.length; i++) {
                    if ($scope.courses1[i].cCourseId == id) {
                        $scope.coursesData = $scope.courses1[i];
                       
                          //console.log($scope.coursesData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit courses Modal  ======*/

    /*========================================
    =            Edit courses Modal            =
    ========================================*/
    
    $scope.editTechCourses = function(id) {
        $scope.headingMessage = "Edit Technology";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(listTechUrl);
        promiseGet.then(function (pl) {
                $scope.coursestech1 = pl.data;
                //console.log($scope.coursestech1);
                for (var i = 0; i < $scope.coursestech1.length; i++) {
                    if ($scope.coursestech1[i].cTechnologycoursesId == id) {
                        $scope.TechnologyMaster = $scope.coursestech1[i];
                       
                          //console.log($scope.TechnologyMaster);
                    }
                }
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit courses Modal  ======*/
    
    /*==================================
    =            View courses            =
    ==================================*/
    $scope.viewCourses = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cCourseId": id });

       $scope.viewcoursesData= {
          "cCourseId": $scope.temp_var_a[0].cCourseId,
          "coursename": $scope.temp_var_a[0].coursename
       };
    }
    /*=====  End of View courses  ======*/


    /*==================================
    =            View courses            =
    ==================================*/
    $scope.viewTechCourses = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cTechnologycoursesId": id });

       $scope.viewcoursestechnologyData= {
          "cTechnologycoursesId": $scope.temp_var_a[0].cTechnologycoursesId,
          "technologyname": $scope.temp_var_a[0].technologyname
       };
    }
    /*=====  End of View courses  ======*/
    
    
    /*==================================
    =            Save courses            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("data",data);

        if (data.cCourseId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateCourse'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cCourseId = pl.data.cCourseId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                //ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
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
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateCourse'
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
                    GetAllRecords(urlList);
                    });
                },100);

                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save courses  ======*/
   
    /*====================================
    =            Delete Courses            =
    ====================================*/
    
    $scope.delCourses = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cCourseId": id });

       $scope.deletecoursesData= {
          "cCourseId": $scope.temp_var[0].cCourseId,
          "coursename": $scope.temp_var[0].coursename
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteCourse'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete Courses  ======*/

    /*======================================
    =            Add Technology            =
    ======================================*/
    $scope.savecoursetechnology = function (data) {
        //console.log("data",data);

        if (data.cTechnologycoursesId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.cCourseId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateTechnologyCourse'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cTechnologycoursesId = pl.data.cTechnologycoursesId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTechRecords(urlTechList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                //ClearModels();
                ClearModelsTechnology();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTechRecords(urlTechList);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                //ClearModels();
                ClearModelsTechnology();
            });
        } else {

             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.updatedby=$sessionStorage.updatedby;
            data.cCourseId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateTechnologyCourse'
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
                    GetAllTechRecords(urlTechList);
                    });
                },100);

                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
                ClearModelsTechnology();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTechRecords(urlTechList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModelsTechnology();
            });
        }
    };
    /*=====  End of Add Technology  ======*/
    
    /*================================================
    =            Delete Course Technology            =
    ================================================*/
    $scope.delCourseTechnology = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var_2 = $filter('filter')(bdata, { "cTechnologycoursesId": id });

       $scope.deleteCoursesData= {
          "cTechnologycoursesId": $scope.temp_var_2[0].cTechnologycoursesId,
          "technologyname": $scope.temp_var_2[0].technologyname
       };
     }

    $scope.deleteCourseTechnology = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteTechnologyCourses'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTechRecords(urlTechList);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTechRecords(urlTechList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete Course Technology  ======*/
    
    
});
/*=====  End of Controller  ======*/
