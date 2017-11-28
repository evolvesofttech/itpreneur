/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("technologiesCtrl", function($rootScope, $scope, $log, 
    $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, inst_id, toaster, firstNameService, middleNameService, lastNameService) {
       
      //console.log("technologiesCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.technologiesArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
 
               
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

      
     var f_name =firstNameService.getFirstName();
      var m_name =middleNameService.getMiddleName();
      var l_name =lastNameService.getLastName();


       $scope.fullName = f_name + ' ' + m_name + ' ' + l_name;
      //console.log($scope.fullName);

      
    /*======================================
    =            Get List technologies            =
    ======================================*/
    //1 Mean New Entry
    var urlList_a = baseUrlSrvc.baseUrl + 'listTechnologyById/' + $scope.OperType;
    GetAllRecords_tech(urlList_a);

    //To Get All Records
    function GetAllRecords_tech(url) {
        $scope.technologiesArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.technologies = pl.data;
                $scope.technologiesArray.push($scope.technologies);
                //console.log("$scope.technologies",$scope.technologies);

                $scope.usersTable_technologies = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.technologies.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_technologies = params.sorting() ? $filter('orderBy')($scope.technologiesArray[0], params.orderBy()) : $scope.technologiesArray[0];
                        $scope.data_technologies = params.filter() ? $filter('filter')($scope.data_technologies, params.filter()) : $scope.data_technologies;
                       $scope.data_technologies = $scope.data_technologies.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_technologies)
                    }
                });
                $scope.usersTable_technologies.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List technologies  ======*/


    /*======================================
    =            Get List courses            =
    ======================================*/
    //1 Mean New Entry
    var courseurlList_a = baseUrlSrvc.baseUrl + 'listCourse';
    GetAllCourseRecords(courseurlList_a);
    $scope.courses = [];
    //To Get All Records
    function GetAllCourseRecords(url) {
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
            $scope.courses = pl.data;
                //console.log("$scope.courses",$scope.courses);
// //                 $scope.user = {courses: [$scope.courses[{
// // "cCourseId": "0A0EC1DABB034350B1EB7F2602FDA5BB",
// // "isactive": "Y",
// // "created": 1488393000000,
// // "createdby": "1",
// // "updated": 1488393000000,
// // "updatedby": null,
// // "coursename": "C",
// // "description": null,
// // "inInstituteId": "0",
// // "bBranchId": "0"
// // }]]};

// $scope.courses = [
// {
// "cCourseId": "0A0EC1DABB034350B1EB7F2602FDA5BB",
// "isactive": "Y",
// "created": 1488393000000,
// "createdby": "1",
// "updated": 1488393000000,
// "updatedby": null,
// "coursename": "C",
// "description": null,
// "inInstituteId": "0",
// "bBranchId": "0"
// },
// {
// "cCourseId": "15259147A58F40D69C7C2562B4FEAC1C",
// "isactive": "Y",
// "created": 1488393000000,
// "createdby": "1",
// "updated": 1488393000000,
// "updatedby": null,
// "coursename": "Hadoop",
// "description": null,
// "inInstituteId": "0",
// "bBranchId": "0"
// },
// {
// "cCourseId": "463E5DD499E8418994DAA0799DB05C30",
// "isactive": "Y",
// "created": 1487701800000,
// "createdby": "1",
// "updated": 1487701800000,
// "updatedby": "1",
// "coursename": "Oracle",
// "description": null,
// "inInstituteId": "0",
// "bBranchId": "0"
// },
// {
// "cCourseId": "698E1FCADF124943B24A7CAABC07DFE8",
// "isactive": "Y",
// "created": 1488393000000,
// "createdby": "1",
// "updated": 1488393000000,
// "updatedby": null,
// "coursename": "C++",
// "description": null,
// "inInstituteId": "0",
// "bBranchId": "0"
// },
// {
// "cCourseId": "70997FF129F641C597D0920FFCFBD3A7",
// "isactive": "Y",
// "created": 1488393000000,
// "createdby": "1",
// "updated": 1488393000000,
// "updatedby": null,
// "coursename": "ASP.NET",
// "description": null,
// "inInstituteId": "0",
// "bBranchId": "0"
// },
// {
// "cCourseId": "7B04DAEE4CF04F4C953FD073275B5286",
// "isactive": "Y",
// "created": 1487701800000,
// "createdby": "1",
// "updated": 1487701800000,
// "updatedby": null,
// "coursename": "Testing",
// "description": null,
// "inInstituteId": null,
// "bBranchId": null
// }
// ];

$scope.user = {
    courses: [$scope.courses[1]]
  };

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List Courses  ======*/


     /*=============================================
     =            Courses Checkbox Click            =
     =============================================*/
     $scope.checkboxCoursesClick = function(id) {
        //console.log(id);
        $scope.course_id = id;
        //console.log("$scope.sch_id",$scope.course_id);

     }
     /*=====  End of Courses Checkbox Click  ======*/
    
     /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addtechnologies = {};
        $scope.technologiesdata = {};
       
        $scope.viewtechnologiesData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.technologiesData = {};
       
        $scope.viewtechnologiesData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit technologies Modal            =
    ========================================*/
    
    $scope.editTechnologies = function(id) {
         //console.log(id); 

         //$scope.courses = [];
        $scope.user = {courses: ["0A0EC1DABB034350B1EB7F2602FDA5BB", "698E1FCADF124943B24A7CAABC07DFE8"]};
               

        var promiseGet = CRUD_SERVICE.getAllData(courseurlList_a);
        promiseGet.then(function (pl) {

                $scope.courses = pl.data;
                //console.log(" $scope.courses", $scope.courses);
                  $scope.user = {courses: ["0A0EC1DABB034350B1EB7F2602FDA5BB", "698E1FCADF124943B24A7CAABC07DFE8"]};
               
                // // //console.log($scope.technologies1);
                // // for (var i = 0; i < $scope.technologies1.length; i++) {
                // //     if ($scope.technologies1[i].eTechnologyId == id) {
                // //         $scope.courses = $scope.technologies1[i];
                // //         //console.log($scope.courses);
                       
                // //     }
                // // }
                // //console.log("$scope.courses[1]",$scope.courses[1].cCourseId);

                // //for (var i = 0; i < $scope.courses.length; i++) {
                //     $scope.user = {courses: [1]};
                // //}
                

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
        $scope.temp_var_a = $filter('filter')(bdata, { "eTechnologyId": id });

       $scope.viewtechnologiesData= {
          "eTechnologyId": $scope.temp_var_a[0].eTechnologyId,
          "coursename": $scope.temp_var_a[0].coursename
       };
    }
    /*=====  End of View technologies  ======*/
      
    

    $scope.savetechnology1 = function(data_a) {
        //console.log("Save function");
        //console.log(data_a);

         var sch_data = $scope.course_id;
            $scope.school_array=[];

        if (data_a.eTechnologyId == undefined) {
            
            
            for(var i=0; i < sch_data.length; i++ )
            {
                $scope.school_array.push({'cCourseId': sch_data[i], 'eEnquiryFormId': $scope.OperType, 'inInstituteId':$sessionStorage.userData1.inInstituteId, 'updatedby':$sessionStorage.userData1.adUserId, 'bBranchId':$sessionStorage.userData1.bBranchId});
            }

            var FormData = {
                formdata: $scope.school_array,
                url: baseUrlSrvc.baseUrl + 'addUpdateTechnology'
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

            // data_a.inInstituteId=$sessionStorage.userData1.inInstituteId;
            // data_a.eEnquiryFormId=$scope.OperType;
            // data_a.createdby = $sessionStorage.userData1.adUserId;
            //data_a.cCourseId = $scope.school_array;

            
            for(var i=0; i < sch_data.length; i++ )
            {
                $scope.school_array.push({'cCourseId': sch_data[i], 'eEnquiryFormId': $scope.OperType, 'inInstituteId':$sessionStorage.userData1.inInstituteId, 'createdby':$sessionStorage.userData1.adUserId, 'bBranchId':$sessionStorage.userData1.bBranchId});
            }
            
            var FormData = {
                formdata: $scope.school_array,
                url: baseUrlSrvc.baseUrl + 'addUpdateTechnology'
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
        $scope.temp_var = $filter('filter')(tdata, { "eTechnologyId": id });

       $scope.deletetechnologiesData= {
          "eTechnologyId": $scope.temp_var[0].eTechnologyId,
          "coursename": $scope.temp_var[0].coursename
       };
     }

    $scope.deleteTechnology = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteTechnology'
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