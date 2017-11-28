/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("PlacementStatusCtrl", ["$scope", "$log", "$filter", 
  "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, $window) {

         $scope.placementStatusArray = [];
          $scope.OperType = $routeParams.ID;
         $scope.disableJobs = true;
         $scope.disableName = true;
         $window.document.title = "ITPreneur - Placement Status";
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
      =            Checkbox Click            =
      ======================================*/
       $scope.check = function(value, checked, email) {
         ////console.log($scope.user.State);
          //console.log(email);
          
     
         if($scope.user.data_Placement !=undefined)
         {
            var idx = $scope.user.data_Placement.indexOf(value);
            var idx1 = $scope.St_name.indexOf(email);
         }
         
          if (idx >= 0 && !checked) {
            $scope.user.data_Placement.splice(idx, 1);
          }
          if (idx1 >= 0 && !checked) {
            $scope.St_name.splice(idx1, 1);
          }


          if (idx < 0 && checked) {
            $scope.user.data_Placement.push(value);
          }
          if (idx1 < 0 && checked) {
            $scope.St_name.push(email);
          }

          $scope.studentNameArray = [];
           //console.log($scope.user.data_Placement);
           //console.log($scope.St_name);
           $scope.user_ID = $scope.user.data_Placement;
           for(var a=0;a<$scope.St_name.length;a++) {
            $scope.studentNameArray.push($scope.St_name[a]);
           }
           
           //console.log($scope.studentNameArray);
        };
      
      
      /*=====  End of Checkbox Click  ======*/

      /*===================================
      =            ClearModels            =
      ===================================*/
      function ClearModels() {
        $scope.studentStatusData = {};
      }
      /*=====  End of ClearModels  ======*/
      
      /*==================================
      =            Company List            =
      ==================================*/
      var clientListUrl = baseUrlSrvc.baseUrl + 'listClient';
      var promiseClientGet = CRUD_SERVICE.getAllData(clientListUrl);
      promiseClientGet.then(function(pl) {
          $scope.Company = pl.data;
          //console.log($scope.Company);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Company List  ======*/

      /*===============================================
      =            Company Change Function            =
      ===============================================*/
      $scope.companyChange = function(id, cdata) {
        $scope.disableJobs = false;
        $scope.compId = id;
        //console.log(cdata);

        $scope.compNameData = $filter('filter')(cdata, { "clClientId": id });

        $scope.currCompName = $scope.compNameData[0].companyname;
        //console.log("$scope.currCompName",$scope.currCompName);

        
        data_Placement = [];
        var jobListUrl = baseUrlSrvc.baseUrl + 'listClientJobProfileByClientId/' + id;
        var promiseJobGet = CRUD_SERVICE.getAllData(jobListUrl);
        promiseJobGet.then(function(pl) {
            $scope.Job = pl.data;
            //console.log($scope.Job);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
      }
      /*=====  End of Company Change Function  ======*/
      
      /*==================================
      =            Job Change            =
      ==================================*/
      $scope.jobChange = function(id, jdata) {
        $scope.jobId = id;
        $scope.disableName = false;
        /*===================================
        =            Students List            =
        ===================================*/
       var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryForm';
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
      /*=====  End of Job Change  ======*/

      /*======================================
      =            Student Change            =
      ======================================*/
      $scope.studentChange = function(id) {
        //console.log(id);

        var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquiryFormbyId/'+ id;
        var promiseGet = CRUD_SERVICE.getAllData(urlEnquiryList);
        promiseGet.then(function(pl) {
            $scope.enquiry = pl.data;
            for (var i = 0; i < $scope.enquiry.length; i++) {
                if ($scope.enquiry[i].eEnquiryFormId == id) {
                    $scope.enquiryData = $scope.enquiry[i];
                    //console.log($scope.enquiryData);

                    $scope.studentBranchId = $scope.enquiryData.bBranchId;
                    $scope.studentBranchName = $scope.enquiryData.branchname;
                    $scope.studentBatchId = $scope.enquiryData.cBatchId;
                    $scope.studentBatchName = $scope.enquiryData.batchname;

                    $scope.studentFirstName = $scope.enquiryData.firstname;
                    $scope.studentMiddleName = $scope.enquiryData.middlename;
                    $scope.studentLastName = $scope.enquiryData.lastname;
                    $scope.studentYearOfPassing = $scope.enquiryData.yearofpassing;
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
      }
      
      
      /*=====  End of Student Change  ======*/

      // /*========================================
      // =            Get Student List            =
      // ========================================*/
      // $scope.technologyChange = function(id) {
      //   $scope.disableSendButton = false;
      //   $scope.StudentArray = [];
      //   var urlStudentList = baseUrlSrvc.baseUrl + 'listPlacementStudentByClientJobProfileId';// + $scope.OperType;
      //   GetAllStudentRecords(urlStudentList);

      //   //To Get All Records
      //   function GetAllStudentRecords(url) {
      //       $scope.StudentArray = [];
      //       var promiseGet = CRUD_SERVICE.getAllData(url);
      //       promiseGet.then(function (pl) {
      //               $scope.StudentList = pl.data;
      //               $scope.StudentArray.push($scope.StudentList);
      //               //console.log("$scope.StudentList",$scope.StudentList);

      //               $scope.usersTable_Placement = new ngTableParams({
      //                   page: 1,
      //                   count: 10
      //               }, {
      //                  total: $scope.StudentList.length, 
      //                   getData: function ($defer, params) {
                        
      //                       $scope.data_Placement = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
      //                       $scope.data_Placement = params.filter() ? $filter('filter')($scope.data_Placement, params.filter()) : $scope.data_Placement;
      //                      $scope.data_Placement = $scope.data_Placement.slice((params.page() - 1) * params.count(), params.page() * params.count());
      //                      $defer.resolve($scope.data_Placement)
      //                   }
      //               });
      //               $scope.usersTable_Placement.reload();
      //           },
      //           function (errorPl) {
      //               $log.error('Some Error in Getting Records.', errorPl);
      //           });
      //   }

      // }
      // /*=====  End of Get Student List  ======*/

       /*======================================
    =            Get List payment            =
    ======================================*/
    //1 Mean New Entry
    // var urlList = baseUrlSrvc.baseUrl + 'listPlacementactivityByPlacementDetails';
    var urlList = baseUrlSrvc.baseUrl + 'listPlacementStatus';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.StatusArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Status = pl.data;
                $scope.StatusArray.push($scope.Status);
                //console.log("$scope.Status",$scope.Status);

                $scope.usersTable_Status = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Status.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_Status = params.sorting() ? $filter('orderBy')($scope.StatusArray[0], params.orderBy()) : $scope.StatusArray[0];
                        $scope.data_Status = params.filter() ? $filter('filter')($scope.data_Status, params.filter()) : $scope.data_Status;
                       $scope.data_Status = $scope.data_Status.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Status)
                    }
                });
                $scope.usersTable_Status.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List payment  ======*/

    /*===========================================
    =            Save Student Status            =
    ===========================================*/
    $scope.saveStudentStatus = function(data) {
        //console.log(data);

        // if (data.acActivityId) {

        //     data.updatedby=$sessionStorage.updatedby;
        //     data.inInstituteId=$sessionStorage.inInstituteId;
        //     data.bBranchId=$sessionStorage.bBranchId;
        //     data.adUserId = $sessionStorage.adUserId;
           

        //     var FormData = {
        //         formdata: data,
        //         url: baseUrlSrvc.baseUrl + 'addUpdateActivity'
        //     };
        //     var promisePost = CRUD_SERVICE.post(FormData);
        //     promisePost.then(function(pl) {
        //         $scope.acActivityId = pl.data.acActivityId;
        //         $timeout(function() {
        //             $scope.$apply(function () {
        //             GetAllRecords_act(urlList_a);
        //             ClearModels();
        //             });
        //         },100);
        //          toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
        //     }, function(err) {
        //         //console.log(err);
        //         $timeout(function() {
        //             $scope.$apply(function () {
        //             GetAllRecords_act(urlList_a);
        //             ClearModels();
        //             });
        //         },100);
        //          toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
        //     });
        // } else {  
            
             
             data.updatedby=$sessionStorage.updatedby;
             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.adUserId = $sessionStorage.adUserId;
            data.bBranchId = $scope.studentBranchId;
            data.cBatchId = $scope.studentBatchId;
            data.firstname = $scope.studentFirstName;
            data.middlename = $scope.studentMiddleName;
            data.lastname = $scope.studentLastName;
            data.yearofpassing = $scope.studentYearOfPassing;


            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdatePlacementStatus'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    //GetAllRecords_act(urlList_a);
                    ClearModels();
                    $route.reload();
                    });
                },3000);
                 toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    //GetAllRecords_act(urlList_a);
                    ClearModels();
                    $route.reload();
                    });
                },3000);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        //}
    };
    
    
    /*=====  End of Save Student Status  ======*/
    

      /*===========================================
      =            Send Email Function            =
      ===========================================*/
      $scope.sendEmailData = function(data1) {
        //console.log(data1);
        $scope.finalStudentData = [];
        //"eEnquiryFormId":$scope.user_ID[b],
        for(var b=0;b<$scope.St_name.length;b++) {
          $scope.finalStudentData.push({"eEnquiryFormId":$scope.user_ID[b],"email":$scope.St_name[b]});
        }
        var jsdata = JSON.stringify($scope.finalStudentData);
        //console.log("jsdata",jsdata);

        var FormData = {
            formdata: jsdata,
            url: baseUrlSrvc.baseUrl + 'sendEmailForStudents'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           
           // var source = pl.source;
           // var promiseData = pl.data;
           // //console.log("source",source);
           // //console.log("promiseData",promiseData);
           
            $timeout(function() {
                $scope.$apply(function () {
                //$route.reload();
                //GetAllRecords(urlList);
                });
            },100);
            // if (promiseData.code == 0) {
            //     ////console.log("Add source successfully");
            //     Flash.create('danger', $scope.DangerMessage);
            //    }
            // if (promiseData.code == 2) {
            //     toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
            // } else {
                toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
            //}
           
            //ClearModels();
        }, function (err) {
          //console.log("Some Error Occured." + err);

          ////console.log("err.data",err.data);
              
             $timeout(function() {
                  $scope.$apply(function () {
                  //$route.reload();
                  //GetAllRecords(urlList);
                  });
              },100);
               
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                
              //ClearModels();
          });
      }
      /*=====  End of Send Email Function  ======*/
      
}]);
/*=====  End of Controller  ======*/