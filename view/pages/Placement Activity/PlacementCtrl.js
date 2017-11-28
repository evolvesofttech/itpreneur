/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("PlacementCtrl", ["$scope", "$log", "$filter", 
  "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, $window) {
          $window.document.title = "ITPreneur - Placement Activity";
         $scope.placementArray = [];
          $scope.OperType = $routeParams.ID;
          $scope.disableSendButton = false;
          $scope.disableJobs = true;

          $scope.disableAdvanceButton = true;

          $scope.advanceFilterShowArray = [];

          $scope.user = {data_Placement: []};
          $scope.St_name = [];
          $scope.multArray = [];
          // $scope.Technologies_Course = [];
          $scope.editStateCheckbox = [];
          $scope.user2 = {Technologies_Course: []};
          $scope.user0 = {multArray: []};
          $scope.user3 = {allDocuments: []};
          $scope.user4 = {allDegree: []};
          $scope.user5 = {TrainerFeedbackCheckboxData: []};
          $scope.user6 = {FeesPaidCheckboxData: []};
          $scope.user7 = {PlacementStatusCheckboxData: []};
          $scope.user8 = {CoursesBatchCheckboxData: []};
           //$scope.role = $sessionStorage.userData1.roleName;

           $scope.studentNameArray = [];
           $scope.selectedTrainerFeedback = []; 
            $scope.allBranchArray = [];
            $scope.selectedFeesPaid = [];
            $scope.selectedPlacementStatus = [];
            $scope.selectedTech = [];
            $scope.selectedDoc = [];
            $scope.selectedCourseBatch = [];
            $scope.qualificationDegree = [];

          // tabs
         $scope.viewGrid= $sessionStorage.userData1.inInstituteId;
         // $scope.windowtype  = "Enquiry";

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

          $scope.toggle_ins_a = function() {
              $scope.institute_a = !$scope.institute_a;
          };

          $scope.toggle_ins_b = function() {
              $scope.institute_b = !$scope.institute_b;
          };

          $scope.toggle_ins_c = function() {
              $scope.institute_c = !$scope.institute_c;
          };
         /*=====  End of Tabs  ======*/

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

      /*==================================
      =            Reset Form            =
      ==================================*/
      $scope.resetForm = function() {

        //console.log("Reset form");
        $scope.AdvanceData = {};
        $scope.AdvanceData.companyname = $scope.AdvanceData1[0].companyname;
        $scope.AdvanceData.jobprofile = $scope.AdvanceData1[0].jobprofile;
        $scope.allBranchArray = [];
        $scope.selectedCourseBatch = [];
        $scope.selectByGroupModel = [];
        $scope.selectedTech = [];
        $scope.selectedFeesPaid = [];
        $scope.selectedCourseBatch = [];
        $scope.advanceFilterShowArray = [];
        // $scope.Technologies_Course1 = {}
        // $scope.cTechnologyMasterId = {};
        $scope.editStateCheckbox = [];
        $scope.selectedTechnologies = {};
        $scope.user2 = {Technologies_Course1: []};
        $scope.user0 = {multArray: []};
        $scope.user3 = {allDocuments: []};
        $scope.user4 = {allDegree: []};
        $scope.user5 = {TrainerFeedbackCheckboxData: []};
        $scope.user6 = {FeesPaidCheckboxData: []};
        $scope.user7 = {PlacementStatusCheckboxData: []};
        $scope.user8 = {CoursesBatchCheckboxData: []};
        $scope.tfcheckbox1 = {};
        $scope.tfcheckbox2 = {};
        $scope.disableEligible = false;
        $scope.disableNotEligible = false;

        $scope.feescheckbox1 = {};
        $scope.feescheckbox2 = {};
        $scope.disableFeesPaid = false;
        $scope.disableFeesUnpaid = false;

        $scope.placementstatus1 = {};
        $scope.placementstatus2 = {};
        $scope.disableOpen = false;
        $scope.disableBlackListed = false;

      }
      /*=====  End of Reset Form  ======*/

       $scope.resumePaths = [];
      /*======================================
      =            Checkbox Click            =
      ======================================*/
       $scope.check = function(value, checked, email, path) {
         ////console.log($scope.user.State);
          //console.log(email);

          
     
         if($scope.user.data_Placement !=undefined)
         {
            var idx = $scope.user.data_Placement.indexOf(value);
            var idx1 = $scope.St_name.indexOf(email);
            var idx2 = $scope.resumePaths.indexOf(path);
         }
         
          if (idx >= 0 && !checked) {
            $scope.user.data_Placement.splice(idx, 1);
          }
          if (idx1 >= 0 && !checked) {
            $scope.St_name.splice(idx1, 1);
          }
          if (idx2 >= 0 && !checked) {
            $scope.resumePaths.splice(idx2, 1);
          }


          if (idx < 0 && checked) {
            $scope.user.data_Placement.push(value);
          }
          if (idx1 < 0 && checked) {
            $scope.St_name.push(email);
          }
          if (idx2 < 0 && checked) {
            $scope.resumePaths.push(path);
          }

          $scope.studentNameArray = [];
           //console.log($scope.user.data_Placement);
           //console.log($scope.St_name);
           $scope.user_ID = $scope.user.data_Placement;
           for(var a=0;a<$scope.St_name.length;a++) {
            $scope.studentNameArray.push($scope.St_name[a]);
           }
           //$scope.studentNameArray1 = JSON.stringify($scope.studentNameArray);
           //console.log("studentNameArray",$scope.studentNameArray); 

           $scope.resumeArray = [];
           for(var a=0;a<$scope.resumePaths.length;a++) {
            $scope.resumeArray.push($scope.resumePaths[a]);
           }

           //console.log("resumeArray",$scope.resumeArray);
        };
      
      
      /*=====  End of Checkbox Click  ======*/

      var CourseBatchUrl = baseUrlSrvc.baseUrl + 'listBatch';
      var promiseCBGet = CRUD_SERVICE.getAllData(CourseBatchUrl);
      promiseCBGet.then(function(pl) {
          $scope.selectByGroupData = pl.data;
          //console.log("selectByGroupData",$scope.selectByGroupData);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

      $scope.selectByGroupModel = [];
      $scope.selectByGroupSettings = { groupBy: 'coursename', displayProp: 'batchname'};


      // $scope.selectByGroupModelQua = [];
      // // $scope.selectByGroupSettingsQua = $scope.selectByGroupDataQua + $scope.selectByGroupDataQua1;
      // $scope.selectByGroupSettingsQua = { groupBy: 'qualificationname', displayProp: 'degreename'};
      // $scope.selectByGroupSettingsQua = { groupBy: 'degreename', displayProp: 'degreespecificationname'};

      /*=================================
      =            Check All            =
      =================================*/
      $scope.checkAll = function() {
        //console.log("All");
        //$scope.user.eEnquiryformId = angular.copy($scope.data_Placement);

        $scope.user.eEnquiryformId = $scope.data_Placement.map(function(item) { return item.eEnquiryformId; });
       
        //console.log($scope.data_Placement);
        $scope.user.data_Placement = $scope.user.eEnquiryformId;

        
        for(var a=0;a<$scope.data_Placement.length;a++) {
          $scope.studentNameArray.push($scope.data_Placement[a].email);
         }

         $scope.St_name = $scope.studentNameArray;
         //console.log($scope.studentNameArray);
         //console.log($scope.user.data_Placement);
      };
      /*=====  End of Check All  ======*/

      /*===================================
      =            Uncheck All            =
      ===================================*/
      $scope.uncheckAll = function() {
        $scope.user.data_Placement = [];
        $scope.user = {data_Placement: []};
        //console.log($scope.user.data_Placement);
        $scope.studentNameArray = [];
        $scope.St_name = [];
        ;
      };
      /*=====  End of Uncheck All  ======*/

      /*==================================================
      =            Clear Modal on Close Click            =
      ==================================================*/
      $scope.advanceModalClose = function() {
        // $scope.allBranchArray = [];
        // $scope.selectedCourseBatch = [];
        // $scope.selectByGroupModel = [];
        // $scope.user2 = {Technologies_Course: []};
        // $scope.user0 = {multArray: []};
        // $scope.user3 = {allDocuments: []};
        // $scope.user4 = {allDegree: []};
        // $scope.user5 = {TrainerFeedbackCheckboxData: []};
        // $scope.user6 = {FeesPaidCheckboxData: []};
        // $scope.user7 = {PlacementStatusCheckboxData: []};
        // $scope.user8 = {CoursesBatchCheckboxData: []};
      }
      /*=====  End of Clear Modal on Close Click  ======*/

      

      /*=======================================
      =            Download Resume            =
      =======================================*/
      document.querySelector('#download-btn').addEventListener('click', function (e) {
          var files = $scope.resumeArray;
          //console.log("files", files);
          multiDownload(files);
      });
      /*=====  End of Download Resume  ======*/
      
      

      /*===================================
      =            Branch List            =
      ===================================*/
      var urlBrnchList = baseUrlSrvc.baseUrl + 'listBranch';
      var promiseBrchGet = CRUD_SERVICE.getAllData(urlBrnchList);
      promiseBrchGet.then(function(pl) {
          $scope.AllBranches = pl.data;
          $scope.AllBranches.push({"bBranchId":"123","branchname":"All"});
          //console.log("$scope.AllBranches",$scope.AllBranches);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Branch List  ======*/

      /*=======================================
      =            Export to Excel            =
      =======================================*/
      $scope.exportAction = function(export_action,tbname){ 

        //console.log(export_action);
        //console.log(tbname);

            tbname = tbname + '-' + $scope.currentDate;

            switch(export_action){ 
                case 'excel': $scope.$broadcast('export-excel', {type:'excel',tableName:tbname,escape:'false'}); 
                            break;
                default: //console.log('no event caught');
             }
      }
      /*=====  End of Export to Excel  ======*/
      
      $scope.allBranchArray = [];
      /*==============================================
      =            Branch Change Function            =
      ==============================================*/
      $scope.branchChange = function(id, branchdata) {

        //console.log(id);

        //console.log("ooooooooo",branchdata);
        $scope.branchSingleData = $filter('filter')(branchdata, { "bBranchId": id });

        
        
        $scope.allBranchArray = [];
        if (id == "123") {
          $scope.AllBranchesSelected = true;
          $scope.advanceFilterShowArray.push({"Branch":"All"});
          // //console.log("All Branches IF");

          // for(var i=0;i<branchdata.length;i++) {
          //   $scope.allBranchArray.push({"bBranchId":branchdata[i].bBranchId});
          // }
          // //console.log("$scope.allBranchArray",$scope.allBranchArray);
        } else {
          // //console.log("Else");
          // $scope.allBranchArray = [{"bBranchId":id}];
          $scope.AllBranchesSelected = false;
          $scope.advanceFilterShowArray.push({"Branch":$scope.branchSingleData[0].branchname});
        }
        //console.log("$scope.allBranchArray",$scope.allBranchArray);

      }
      /*=====  End of Branch Change Function  ======*/
      
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
        $scope.compId = id;
        //console.log(cdata);

        $scope.compNameData = $filter('filter')(cdata, { "clClientId": id });

        $scope.currCompName = $scope.compNameData[0].companyname;
        //console.log("$scope.currCompName",$scope.currCompName);

        $scope.disableJobs = false;
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
        data_Placement = [];

        $scope.jobNameData = $filter('filter')(jdata, { "clClientjobprofileId": id });

        $scope.currJobName = $scope.jobNameData[0].jobprofile;
        //console.log("$scope.currJobName",$scope.currJobName);

        $scope.disableAdvanceButton = false;
        $scope.StudentArray = [];
        var urlStudentList = baseUrlSrvc.baseUrl + 'listSendEmailInvitation/' + $scope.compId + '/' + $scope.jobId ;
        GetAllStudentRecords(urlStudentList);

        //To Get All Records
         function GetAllStudentRecords(url) {
        $scope.StudentArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.StudentList = pl.data;
                $scope.StudentArray.push($scope.StudentList);
                 // $scope.attavg = $scope.StudentList.attendancepercetage;
                $scope.usersTable_Placement = new ngTableParams({
                    page: 1,
                    count: 9
                }, {
                   total: $scope.StudentList.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_Placement = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
                        $scope.data_Placement = params.filter() ? $filter('filter')($scope.data_Placement, params.filter()) : $scope.data_Placement;
                       $scope.data_Placement = $scope.data_Placement.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Placement)
                    }
                });
                $scope.usersTable_Placement.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
      }

      }

        // function GetAllStudentRecords(url) {
        //     $scope.StudentArray = [];
        //     var promiseGet = CRUD_SERVICE.getAllData(url);
        //     promiseGet.then(function (pl) {
        //             $scope.StudentList = pl.data;
        //             $scope.StudentArray.push($scope.StudentList);
        //             //console.log("$scope.StudentList",$scope.StudentList);

        //             $scope.usersTable_Placement = new ngTableParams({
        //                 page: 1,
        //                 count: 10
        //             }, {
        //                total: $scope.StudentList.length, 
        //                 getData: function ($defer, params) {
                        
        //                     $scope.data_Placement = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
        //                     $scope.data_Placement = params.filter() ? $filter('filter')($scope.data_Placement, params.filter()) : $scope.data_Placement;
        //                    $scope.data_Placement = $scope.data_Placement.slice((params.page() - 1) * params.count(), params.page() * params.count());
        //                    $defer.resolve($scope.data_Placement)
        //                 }
        //             });
        //             $scope.usersTable_Placement.reload();
        //         },
        //         function (errorPl) {
        //             $log.error('Some Error in Getting Records.', errorPl);
        //         });
        // }


      /*=====  End of Job Change  ======*/

      /*============================================
      =            Advance Search Click            =
      ============================================*/
      $scope.advanceSearchClick = function(cl_id, job_id) {

        $scope.advanceFilterShowArray = [];

        var advSearchListUrl = baseUrlSrvc.baseUrl + 'listClientJobProfileByClientIdAndJobprofileId/' + cl_id + '/' + job_id;
        var promiseAdvSearchGet = CRUD_SERVICE.getAllData(advSearchListUrl);
        promiseAdvSearchGet.then(function(pl) {
            $scope.AdvanceData1 = pl.data;
            //$scope.AdvanceData = $scope.AdvanceData1[0];

            // //console.log("AdvanceData1",$scope.AdvanceData1);
            $scope.yofp = $scope.AdvanceData1[0].yearofpassing.toString();

            /*==========================================
            =            QUalification list            =
            ==========================================*/
            var urlJobDegreeList = baseUrlSrvc.baseUrl + 'listClientJobProfileDegreeByClientJobProfileId/' + job_id;
            GetAllJobDegreeRecords(urlJobDegreeList);
            $scope.attendance1={};
            //To Get All Records
            function GetAllJobDegreeRecords(url) {
                var promiseGet = CRUD_SERVICE.getAllData(url);
                promiseGet.then(function (pl) {
                    $scope.JobDegree = pl.data;
                    //console.log("$scope.JobDegree",$scope.JobDegree);

                    for(var a=0;a<$scope.JobDegree.length;a++) {

                      var id='"'+"cQualificationmasterId"+"/"+$scope.JobDegree[a].cQualificationmasterId+'"';

                      var str="true";
                      var testBool=str.replace(/"/g, '');
                      $scope.attendance1[JSON.parse(id)]=JSON.parse(str);
                      ////console.log("$scope.attendance1", $scope.attendance1);
                    }

                    for(var b=0;b<$scope.JobDegree.length;b++) {

                      var id='"'+"cDegreeId"+"/"+$scope.JobDegree[b].cDegreeId+'"';

                      var str="true";
                      var testBool=str.replace(/"/g, '');
                      $scope.attendance1[JSON.parse(id)]=JSON.parse(str);
                      ////console.log("$scope.attendance1", $scope.attendance1);
                    }

                    for(var c=0;c<$scope.JobDegree.length;c++) {

                      var id='"'+"cDegreespecificationId"+"/"+$scope.JobDegree[c].cDegreespecificationId+'"';

                      var str="true";
                      var testBool=str.replace(/"/g, '');
                      $scope.attendance1[JSON.parse(id)]=JSON.parse(str);
                      ////console.log("$scope.attendance1", $scope.attendance1);
                    }
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
              }
            
            
            /*=====  End of QUalification list  ======*/
            //console.log("$scope.attendance1", $scope.attendance1);

            $scope.AdvanceData = {
               "experience": $scope.AdvanceData1[0].experience,
              // "sscpercentage": $scope.AdvanceData1[0].ssc,
              // "hscpercentage": $scope.AdvanceData1[0].hsc,
              // "diplomapercentage": $scope.AdvanceData1[0].diploma,
              // "graduationpercentage": $scope.AdvanceData1[0].graduation,
              // "postgraduationpercentage": $scope.AdvanceData1[0].postgraduation,
               "yearofpassing": $scope.yofp,
              "companyname": $scope.AdvanceData1[0].companyname,
              "jobprofile": $scope.AdvanceData1[0].jobprofile,
              "tree":$scope.attendance1
            };
            //console.log("$scope.AdvanceData",$scope.AdvanceData);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        // var listTechMaster = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
        // var promiseTechmaster = CRUD_SERVICE.getAllData(listTechMaster);
        // promiseTechmaster.then(function(pl) {
        //     $scope.Technologies_Course = pl.data;
        // },
        // function(errorPl) {
        //     $log.error('Some Error in Getting Records.', errorPl);
        // }); 

         var listTechUrl = baseUrlSrvc.baseUrl + 'listClientTechnologyCompulsoryByClientJobProfileId/' + job_id;
            var promiselistTechGet = CRUD_SERVICE.getAllData(listTechUrl);
            promiselistTechGet.then(function(pl) {
                $scope.Technologies_Course1 = pl.data;
                //console.log("$scope.Technologies_Course1",$scope.Technologies_Course1);


                var listTechMaster = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
                var promiseTechmaster = CRUD_SERVICE.getAllData(listTechMaster);
                promiseTechmaster.then(function(pl) {
                    $scope.Technologies_Course = pl.data;
                  

                    for(var j=0;j<$scope.Technologies_Course1.length;j++) {
                      $scope.editStateCheckbox.push($scope.Technologies_Course1[j].cTechnologyMasterId);
                    }
                    //console.log("$scope.editStateCheckbox",$scope.editStateCheckbox);

                    $scope.user2 = {
                      Technologies_Course: $scope.editStateCheckbox
                    };
                    $scope.selectedTechnologies = $scope.user2.Technologies_Course;

                    
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                }); 

            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            }); 

    }

      // var QDSListUrl = baseUrlSrvc.baseUrl + 'listQualificationDegreeAndDegreeSpecification';
      // var promisQDSGet = CRUD_SERVICE.getAllData(QDSListUrl);
      // promisQDSGet.then(function(pl) {
      //     $scope.QDSData1 = pl.data;
      //     $scope.QDSData = $scope.QDSData1[0].children;
      //     //console.log("$scope.QDSData",$scope.QDSData);

      //      var QualificationListUrl = baseUrlSrvc.baseUrl + 'listQualificationMaster';
      //     var promiseQualificationGet = CRUD_SERVICE.getAllData(QualificationListUrl);
      //     promiseQualificationGet.then(function(pl) {
      //         $scope.Qualification = pl.data;
          
      //      var degListUrl = baseUrlSrvc.baseUrl + 'listDegree';
      //       var promiseDegGet = CRUD_SERVICE.getAllData(degListUrl);
      //       promiseDegGet.then(function(pl) {
      //           $scope.HighestQualification = pl.data;
      //           //console.log("listDegree",$scope.HighestQualification);
                     

      //     $scope.qualification={};
      //     $scope.degree={};
      //     $scope.degreespecify = {};

      //      for(var i=0;i<$scope.QDSData1.length;i++) {

      //          //console.log("degree",$scope.qualification)
      //          $scope.degree=$scope.degree;
      //           //console.log("degree",$scope.degree);
      //            $scope.degreespecify=$scope.degreespecify;
      //           //console.log("degreespecify",$scope.degreespecify);
      //         //console.log("QDSData1",$scope.QDSData1);

      //        },
      //        function(errorPl) {
      //            $log.error('Some Error in Getting Records.', errorPl);
      //    };
      // }

      /*=============================================
      =            Clear Modal Admission            =
      =============================================*/
      $scope.clearModalOnCloseAdmission = function() {
        $scope.enrollmentData = {};
      }
      /*=====  End of Clear Modal Admission  ======*/

      /*========================================
      =            Open Branch Form            =
      ========================================*/
      $scope.openBranchForm = function(id) {
        //console.log("id",id);

        // $scope.OnStateChange = function(id) {
        //   // $scope.disableRegion = false;
        //    //console.log(id);
        //    var stateUrl = baseUrlSrvc.baseUrl + 'listDistrictById/'+id;
        //    var promiseStateGet = CRUD_SERVICE.getAllData(stateUrl);
        //    promiseStateGet.then(function(pl) {
        //       $scope.District =pl.data;
        //    },
        //    function(errorPl) {
        //        $log.error('Some Error in Getting Records.', errorPl);
        //    });
        // }

        $scope.OnStateChange = function(id) {
            // $scope.disableRegion = false;
             //console.log(id);
             var stateUrl = baseUrlSrvc.baseUrl + 'listDistrictById/'+id;
             var promiseStateGet = CRUD_SERVICE.getAllData(stateUrl);
             promiseStateGet.then(function(pl) {
                $scope.District =pl.data;
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });
          }

         
          $scope.OnDistrictChange = function(id) {
             //console.log(id);
             $scope.disableTaluka = false;
             var districtUrl = baseUrlSrvc.baseUrl + 'listTalukaById/'+id;
             var promiseDistrictGet = CRUD_SERVICE.getAllData(districtUrl);
             promiseDistrictGet.then(function(pl) {
                 $scope.TalukaData = pl.data;

                 $scope.Taluka = $filter('filter')($scope.TalukaData, { "cDistrictId": id });
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });
          }
       
    
        var urlList = baseUrlSrvc.baseUrl + 'listBranch';
        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.branch1 = pl.data;
                //console.log($scope.branch1);
                for (var i = 0; i < $scope.branch1.length; i++) {
                    if ($scope.branch1[i].bBranchId == id) {
                        $scope.branchData = $scope.branch1[i];
                        //console.log("$scope.branchData",$scope.branchData);

                        $scope.State=[{
                           "cStateId":$scope.branchData.cStateId,
                          "statename":$scope.branchData.statename

                        }];

                         $scope.District=[{
                          "cDistrictId":$scope.branchData.cDistrictId,
                          "districtname":$scope.branchData.districtname

                        }];
                        $scope.Taluka=[{
                           "cTalukaId":$scope.branchData.cTalukaId,
                          "talukaname":$scope.branchData.talukaname

                        }];
                        
                          ////console.log($scope.branchData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

      }

      $scope.ngStateFocus = function() {

        var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
        var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseStateGet.then(function(pl) {
            $scope.State = pl.data;

            //console.log($scope.branchArray);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

      }
      /*=====  End of Open Branch Form  ======*/

      /*===================================
      =            View Resume            =
      ===================================*/
      $scope.viewResumeClick = function(id, data) {

        //console.log(id);
        //console.log(data);

        $scope.temp_resume = $filter('filter')(data, { "eEnquiryformId": id });

       $scope.viewResumeData = $scope.temp_resume[0];
       

       $scope.url = $scope.temp_resume[0].path;

      $scope.NotesDocUrl="https://docs.google.com/gview?url="+ $scope.url+"&embedded=true";

      //console.log("url",$scope.NotesDocUrl);

      $scope.fileExtension = $scope.url.substr($scope.url.lastIndexOf(".") + 1);

      }
      /*=====  End of View Resume  ======*/
      

      /*==================================
      =            Save branch            =
      ==================================*/
      
      $scope.saveBranch = function (data) {
          //console.log("data",data);
          if (data.bBranchId) {

              data.updatedby=$sessionStorage.updatedby;
               data.inInstituteId=$sessionStorage.inInstituteId;
              data.adUserId = $sessionStorage.adUserId;

              var FormData = {
                  formdata: data,
                  url: baseUrlSrvc.baseUrl + 'addUpdateBranch'
              };
              var promisePost = CRUD_SERVICE.post(FormData);
              promisePost.then(function (pl) {
                  $scope.bBranchId = pl.data.bBranchId;
                 
                 $timeout(function() {
                      $scope.$apply(function () {
                      //GetAllRecords(urlList);
                      });
                  },100);
                    toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                  
                  ClearModels();
              }, function (err) {
                  //console.log(err);
                  
                  $timeout(function() {
                      $scope.$apply(function () {
                      //GetAllRecords(urlList);
                      });
                  },100);
                  toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                   
                  //ClearModels();
              });
          }
      };
      
      /*=====  End of Save branch  ======*/

      /*=======================================
      =            Open Batch form            =
      =======================================*/
      $scope.openBatchForm = function(id) {
        //console.log(id);

        var singleBatchListUrl = baseUrlSrvc.baseUrl + 'listBatchById/' + id;
        var promiseBatchGet = CRUD_SERVICE.getAllData(singleBatchListUrl);
        promiseBatchGet.then(function(pl) {
            $scope.Batch1 = pl.data;
            $scope.batchData = $scope.Batch1[0];

            //console.log($scope.batchData);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

      }
      /*=====  End of Open Batch form  ======*/

      /*==================================
    =            Save batch            =
    ==================================*/
    
    $scope.saveBatch = function (data) {
        //console.log(data);
        if (data.cBatchId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;


            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBatch'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cBatchId = pl.data.cBatchId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    //GetAllRecords(urlList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                //ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllRecords(urlList);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                //ClearModels();
            });
        }
    };
    
    /*=====  End of Save batch  ======*/
      
      /*============================================
      =            Open Admission Modal            =
      ============================================*/
      $scope.openAdmissionForm = function(id) {
        //console.log(id);

        var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquirybyRegistrationandEnrollment/'+ id;
        var promiseGet = CRUD_SERVICE.getAllData(urlEnquiryList);
        promiseGet.then(function(pl) {
            $scope.enquiry = pl.data;
            //console.log("$scope.enquiry",$scope.enquiry);

            for (var i = 0; i < $scope.enquiry.length; i++) {
                if ($scope.enquiry[i].eEnquiryFormId == id) {
                    $scope.enrollmentData = $scope.enquiry[i];
                    //console.log("$scope.enrollmentData",$scope.enrollmentData);
                    // $sessionStorage.cCourseId = $scope.enrollmentData.cCourseId;
                    // $sessionStorage.cTechnologyMasterId = $scope.enrollmentData.cTechnologyMasterId;
                    // //console.log("=================",$scope.enrollmentData);
                    // branch_name.addBranch_name($scope.enrollmentData.branchname);
                    // feedback_Cid.addCourse_id($scope.enrollmentData.cCourseId);
                    // feedback_Bid.addBatch_id($scope.enrollmentData.cBatchId);
                    // feedback_Eid.addEnq_id($scope.enrollmentData.eEnquiryFormId);
                    // course_fee.addCourse_fee($scope.enrollmentData.totalfee)
                    // avg_att.addavg_att($scope.enrollmentData.attendancepercetage);
                    // Form_no.addForm_no($scope.enrollmentData.enquiryformno);
                    
                    // Branch_Id.addBranch_Id($scope.enrollmentData.bBranchId);

                    // firstNameService.addFirstName($scope.enrollmentData.firstname);
                    // middleNameService.addMiddleName($scope.enrollmentData.middlename);
                    // lastNameService.addLastName($scope.enrollmentData.lastname);

                    /*==================================
                    =            Source List            =
                    ==================================*/
                    var sourceListUrl = baseUrlSrvc.baseUrl + 'listAboutUs';
                    var promiseSourceGet = CRUD_SERVICE.getAllData(sourceListUrl);
                    promiseSourceGet.then(function(pl) {
                        $scope.Source = pl.data;

                        //console.log($scope.Source);
                    },
                    function(errorPl) {
                        $log.error('Some Error in Getting Records.', errorPl);
                    });
                    /*=====  End of Source List  ======*/

                    /*===================================
                      =            Degree List            =
                      ===================================*/
                      var degListUrl = baseUrlSrvc.baseUrl + 'listDegree';
                      var promiseDegGet = CRUD_SERVICE.getAllData(degListUrl);
                      promiseDegGet.then(function(pl) {
                          $scope.HighestQualification = pl.data;
                          //console.log("listDegree",$scope.HighestQualification);
                      },
                      function(errorPl) {
                          $log.error('Some Error in Getting Records.', errorPl);
                      });
                      /*=====  End of Degree List  ======*/

                    $scope.source_name = $scope.enrollmentData.sourcename;

                    var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentByBranchId/'+$scope.enrollmentData.bBranchId;
                   var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
                   promiseStudentGet.then(function(pl) {
                        $scope.Students = pl.data;
                        //console.log("Students",$scope.Students);
                       },
                       function(errorPl) {
                           $log.error('Some Error in Getting Records.', errorPl);
                       });

                  var StaffListUrl = baseUrlSrvc.baseUrl + 'listUserDetailsByBranchId/'+$scope.enrollmentData.bBranchId;
                  var promiseStaffGet = CRUD_SERVICE.getAllData(StaffListUrl);
                   promiseStaffGet.then(function(pl) {
                        $scope.Staff = pl.data;

                      //console.log("Staff",$scope.Staff);
                       },
                       function(errorPl) {
                           $log.error('Some Error in Getting Records.', errorPl);
                       });

                     if ($scope.source_name == "ITPreneur Student") {
                        $scope.showStudent = true;
                       
                      } else if ($scope.source_name == "ITPreneur Staff") {
                        $scope.showStaff = true;
                       
                         
                      } else {
                        $scope.showStudent = false;
                        $scope.showStaff = false;
                      }

                    $scope.Course_id = $scope.enrollmentData.cCourseId;

                    var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentEnquiryByBranchId/'+$scope.enrollmentData.bBranchId;
                     var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
                     promiseStudentGet.then(function(pl) {
                          $scope.Students = pl.data;

                  //console.log($scope.Students);
                         },
                         function(errorPl) {
                             $log.error('Some Error in Getting Records.', errorPl);
                         });

                    $scope.calculatedFee = $scope.enrollmentData.totalfee;
                    $scope.manualamount = $scope.enrollmentData.amount;
                    $scope.totalFee = $scope.enrollmentData.coursefee;

                    // $scope.avgattendance = $scope.enrollmentData.attendancepercetage;
                    // //console.log("heyyy",$scope.avgattendance);

                    //to check if discount id present or not
                    if ($scope.enrollmentData.cDiscountId != undefined) {
                      $scope.percentageChecked = true;
                      $scope.amountChecked = false;
                      $scope.showList = true;
                      $scope.showAmt = false;

                      $scope.manualLabel = false;
                      $scope.manualDiscLabel = true;

                      var feediff = $scope.enrollmentData.coursefee - $scope.enrollmentData.totalfee;

                      $scope.DiscountPercentage = (feediff / $scope.enrollmentData.coursefee ) * 100;
                      //console.log($scope.DiscountPercentage);


                      var DiscountListUrl = baseUrlSrvc.baseUrl + 'listDiscountByCourseIdByTimeduration/' + $scope.enrollmentData.cCourseId;
                      var promiseDiscountsStatusGet = CRUD_SERVICE.getAllData(DiscountListUrl);
                      promiseDiscountsStatusGet.then(function(pl) {
                          $scope.Discount = pl.data;
                          
                      },
                      function(errorPl) {
                          $log.error('Some Error in Getting Records.', errorPl);
                      });

                    }//if ends 
                    else {
                      $scope.amountChecked = true;
                      $scope.percentageChecked = false;
                      $scope.showList = false;
                      $scope.showAmt = true;
                      $scope.manualLabel = true;
                      $scope.manualDiscLabel = false;

                      $scope.manualamount = $scope.enrollmentData.amount;
                    } //else ends

                    var BatchListUrl1 = baseUrlSrvc.baseUrl + 'listBatchByCourseIdTimeduration/' + $scope.enrollmentData.cCourseId;
                    var promiseBatch1Get = CRUD_SERVICE.getAllData(BatchListUrl1);
                    promiseBatch1Get.then(function(pl) {
                        $scope.Batch = pl.data;

                        //console.log("Batch",$scope.Batch);
                    },
                    function(errorPl) {
                        $log.error('Some Error in Getting Records.', errorPl);
                    });
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });


      }
      /*=====  End of Open Admission Modal  ======*/

      /*====================================
            =            Save Enrollment            =
            ====================================*/
             $scope.saveEnrollment = function(data) {
                //console.log(data);

                if (data.eEnquiryFormId) {

                    //console.log("update");

                    data.windowtype="Enrollment";
                    data.statusregistration = "Close";
                    
                    
                    
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;
                    data.statusenquiry = "Close";
                    data.paymentstatus = "Paid";

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryForm'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.eEnquiryFormId = pl.data.eEnquiryFormId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            // GetAllEnquiryRecords(urlEnquiryList);
                            //$route.reload();
                            });
                        },3000);

                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            // GetAllEnquiryRecords(urlEnquiryList);
                            //$route.reload();
                            });
                        },3000);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };
            /*=====  End of Save Enrollment  ======*/
      
      

      /*==================================================
      =            List Call on Is Email Sent            =
      ==================================================*/
      //To Get All Records
        function GetAllStudentRecords(url) {
            $scope.StudentArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.StudentList = pl.data;
                    $scope.StudentArray.push($scope.StudentList);
                    //console.log("$scope.StudentList",$scope.StudentList);

                    $scope.usersTable_Placement = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.StudentList.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                        
                            $scope.data_Placement = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
                            $scope.data_Placement = params.filter() ? $filter('filter')($scope.data_Placement, params.filter()) : $scope.data_Placement;
                           $scope.data_Placement = $scope.data_Placement.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_Placement)
                        }
                    });
                    $scope.usersTable_Placement.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
      /*=====  End of List Call on Is Email Sent  ======*/
      

      /*========================================
      =            Get Student List            =
      ========================================*/
      $scope.roundChange = function(id, data) {
        //console.log(id);

        $scope.roundData_a = $filter('filter')(data, { "clClientjobroundId": id });
          //console.log($scope.roundData_a);
       // $scope.deleteJobDegreeData= {
       //    "clClientjobroundId": $scope.roundData_a[0].clClientjobroundId,
       //    "round": $scope.roundData_a[0].round
       // };
        $scope.Rou_id = id;
       $scope.Rou = $scope.roundData_a[0].round;

        $scope.disableSendButton = false;
        $scope.StudentArray = [];
        var urlStudentList = baseUrlSrvc.baseUrl + 'listAdvanceFilterByRoundwise/'+ $scope.Rou + '/' + $scope.compId + '/' + $scope.jobId ;
        GetAllStudentRecords(urlStudentList);

        //To Get All Records
        function GetAllStudentRecords(url) {
            $scope.StudentArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.StudentList = pl.data;
                    $scope.StudentArray.push($scope.StudentList);
                    //console.log("$scope.StudentList",$scope.StudentList);

                    $scope.usersTable_Placement = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.StudentList.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                        
                            $scope.data_Placement = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
                            $scope.data_Placement = params.filter() ? $filter('filter')($scope.data_Placement, params.filter()) : $scope.data_Placement;
                           $scope.data_Placement = $scope.data_Placement.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_Placement)
                        }
                    });
                    $scope.usersTable_Placement.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }

      }
      /*=====  End of Get Student List  ======*/

      /*===============================================
      =            Trainer Feedback Change            =
      ===============================================*/
      $scope.trainerFeedbackChange = function(status) {
        //console.log(status);
        $scope.trainerFeedbackValue = status;
      }
      /*=====  End of Trainer Feedback Change  ======*/

      /*========================================
      =            Fees Paid Change            =
      ========================================*/
      $scope.feesPaidChange = function(status) {

        //console.log(status);
        $scope.feesPaidValue = status;

      }
      /*=====  End of Fees Paid Change  ======*/

      /*================================================
      =            Post Dated Cheque Change            =
      ================================================*/
      $scope.postDatedChequeChange = function(status) {

        //console.log(status);
        $scope.postDatedChequeValue = status;

      }
      /*=====  End of Post Dated Cheque Change  ======*/

      /*=====================================
      =            Course Change            =
      =====================================*/
      $scope.courseChange = function(id) {
        //console.log(id);
        $scope.courseValue = id;
        var BatchListUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseId/' + id;
        var promiseBatchGet = CRUD_SERVICE.getAllData(BatchListUrl);
        promiseBatchGet.then(function(pl) {
            $scope.batch = pl.data;

            //console.log($scope.batch);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
      }
      /*=====  End of Course Change  ======*/

     /*=====================================
      =            batch change            =
      =====================================*/
      $scope.batchChange = function(id){

        $scope.batId = id;
        //console.log(id);

      }
      /*=====  End of batch change  ======*/

      /*=====================================
      =            Status Change            =
      =====================================*/
      $scope.statusChange = function(status) {

        //console.log(status);
        $scope.statusValue = status;

      }
      /*=====  End of Status Change  ======*/
      

      /*=========================================
      =            Technologies List            =
      =========================================*/
      var TechListUrl = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
      var promiseTechGet = CRUD_SERVICE.getAllData(TechListUrl);
      promiseTechGet.then(function(pl) {
          $scope.Technologies_Course = pl.data;
          ////console.log($scope.Technologies_Course);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Technologies List  ======*/

      /*===========================================
      =            Technology Checkbox            =
      ===========================================*/
      $scope.selectedTech = [];
      $scope.checkTechnology = function(value, checked) {


     
         if($scope.user2.Technologies_Course !=undefined)
         {
            var idx = $scope.user2.Technologies_Course.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user2.Technologies_Course.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user2.Technologies_Course.push(value);
          }

          ////console.log($scope.user2.Technologies_Course);
          $scope.selectedTech1 = $scope.user2.Technologies_Course;
          
          //$scope.selectedTech2 = [];
          $scope.selectedTech = [];
          for(var a=0;a<$scope.selectedTech1.length;a++) {
            //$scope.selectedTech2.push($scope.selectedTech1[a]);
            $scope.selectedTech.push({"cTechnologyMasterId":$scope.selectedTech1[a]});
          }
          //$scope.selectedTech = JSON.stringify($scope.selectedTech2);
          //$scope.selectedTech = $scope.user2.Technologies_Course;
          //console.log("selectedTech",$scope.selectedTech);
      };
      /*=====  End of Technology Checkbox  ======*/

      /*==============================================
      =            Check Trainer Feedback            =
      ==============================================*/
      $scope.selectedTrainerFeedback = [];
      $scope.checkTrainerFeedback = function(value, checked) {

         if($scope.user5.TrainerFeedbackCheckboxData !=undefined)
         {
            var idx = $scope.user5.TrainerFeedbackCheckboxData.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user5.TrainerFeedbackCheckboxData.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user5.TrainerFeedbackCheckboxData.push(value);
          }

          ////console.log($scope.user5.TrainerFeedbackCheckboxData);
          $scope.selectedTrainerFeedback1 = $scope.user5.TrainerFeedbackCheckboxData;
          
          //$scope.selectedTech2 = [];
          $scope.selectedTrainerFeedback = [];
          for(var a=0;a<$scope.selectedTrainerFeedback1.length;a++) {
            //$scope.selectedTech2.push($scope.selectedTrainerFeedback1[a]);
            $scope.selectedTrainerFeedback.push({"status":$scope.selectedTrainerFeedback1[a]});
          }
          //$scope.selectedTech = JSON.stringify($scope.selectedTech2);
          //$scope.selectedTech = $scope.user5.TrainerFeedbackCheckboxData;
          //console.log("selectedTrainerFeedback",$scope.selectedTrainerFeedback);
      };
      /*=====  End of Check Trainer Feedback  ======*/

      /*================================================
      =            Check Fees Paid Checkbox            =
      ================================================*/
      $scope.selectedFeesPaid = [];
      $scope.checkFeesPaid = function(value, checked) {

         if($scope.user6.FeesPaidCheckboxData !=undefined)
         {
            var idx = $scope.user6.FeesPaidCheckboxData.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user6.FeesPaidCheckboxData.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user6.FeesPaidCheckboxData.push(value);
          }

          ////console.log($scope.user6.FeesPaidCheckboxData);
          $scope.selectedFeesPaid1 = $scope.user6.FeesPaidCheckboxData;
          
          //$scope.selectedTech2 = [];
          $scope.selectedFeesPaid = [];
          for(var a=0;a<$scope.selectedFeesPaid1.length;a++) {
            //$scope.selectedTech2.push($scope.selectedFeesPaid1[a]);
            $scope.selectedFeesPaid.push({"paymentstatus":$scope.selectedFeesPaid1[a]});
          }
          //$scope.selectedTech = JSON.stringify($scope.selectedTech2);
          //$scope.selectedTech = $scope.user6.FeesPaidCheckboxData;
          //console.log("selectedFeesPaid",$scope.selectedFeesPaid);
      };
      /*=====  End of Check Fees Paid Checkbox  ======*/
      
      /*=======================================================
      =            Check Placement Status Checkbox            =
      =======================================================*/
      $scope.selectedPlacementStatus = [];
      $scope.checkPlacementStatus = function(value, checked) {

         if($scope.user7.PlacementStatusCheckboxData !=undefined)
         {
            var idx = $scope.user7.PlacementStatusCheckboxData.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user7.PlacementStatusCheckboxData.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user7.PlacementStatusCheckboxData.push(value);
          }

          ////console.log($scope.user7.PlacementStatusCheckboxData);
          $scope.selectedPlacementStatus1 = $scope.user7.PlacementStatusCheckboxData;
          
          //$scope.selectedTech2 = [];
          $scope.selectedPlacementStatus = [];
          for(var a=0;a<$scope.selectedPlacementStatus1.length;a++) {
            //$scope.selectedTech2.push($scope.selectedPlacementStatus1[a]);
            $scope.selectedPlacementStatus.push({"placementstatus":$scope.selectedPlacementStatus1[a]});
          }
          //$scope.selectedTech = JSON.stringify($scope.selectedTech2);
          //$scope.selectedTech = $scope.user7.PlacementStatusCheckboxData;
          //console.log("selectedPlacementStatus",$scope.selectedPlacementStatus);
      };
      /*=====  End of Check Placement Status Checkbox  ======*/

       /*=======================================================
      =            Check Placement Status Checkbox            =
      =======================================================*/
      $scope.checkcb = function(value) {
        //console.log("heyyyyyyyyyyyy",value);

        $scope.user8.CoursesBatchCheckboxData=value;

        $scope.selectedCourseBatch = value;
      };
      /*=====  End of Check Placement Status Checkbox  ======*/

      /*================================
      =            Check TF            =
      ================================*/
      $scope.TCheck = function(val) {
        //console.log(val);
        ////console.log(data);

        if (val == true) {
          $scope.disableNotEligible = true;
          $scope.selectedTrainerFeedback = [{"status":"Eligible"}];
          //console.log($scope.selectedTrainerFeedback);
        }
        if (val == false) {
          $scope.disableNotEligible = false;
          $scope.selectedTrainerFeedback = [];
          //console.log($scope.selectedTrainerFeedback);
        }
      }

      $scope.TCheck1 = function(val1) {
        //console.log(val1);
        ////console.log(data);

        if (val1 == true) {
          $scope.disableEligible = true;
          $scope.selectedTrainerFeedback = [{"status":"Not-Eligible"}];
          //console.log($scope.selectedTrainerFeedback);
        }
        if (val1 == false) {
          $scope.disableEligible = false;
          $scope.selectedTrainerFeedback = [];
          //console.log($scope.selectedTrainerFeedback);
        }
      }
      /*=====  End of Check TF  ======*/

      /*==========================================
      =            Fees Paid Checkbox            =
      ==========================================*/
      $scope.FeeCheck = function(val) {
        //console.log(val);
        ////console.log(data);

        if (val == true) {
          $scope.disableFeesUnpaid = true;
          $scope.selectedFeesPaid = [{"paymentstatus":"Paid"}];
          //console.log($scope.selectedFeesPaid);
        }
        if (val == false) {
          $scope.disableFeesUnpaid = false;
          $scope.selectedFeesPaid = [];
          //console.log($scope.selectedFeesPaid);
        }
      }

      $scope.FeeCheck1 = function(val1) {
        //console.log(val1);
        ////console.log(data);

        if (val1 == true) {
          $scope.disableFeesPaid = true;
          $scope.selectedFeesPaid = [{"paymentstatus":"Unpaid"}];
          //console.log($scope.selectedFeesPaid);
        }
        if (val1 == false) {
          $scope.disableFeesPaid = false;
          $scope.selectedFeesPaid = [];
          //console.log($scope.selectedFeesPaid);
        }
      }
      /*=====  End of Fees Paid Checkbox  ======*/

      /*=================================================
      =            Placement status checkbox            =
      =================================================*/
      $scope.PlacementCheck = function(val) {
        //console.log(val);
        ////console.log(data);

        if (val == true) {
          $scope.disableBlackListed = true;
          $scope.selectedPlacementStatus = [{"placementstatus":"Open"}];
          //console.log($scope.selectedPlacementStatus);
        }
        if (val == false) {
          $scope.disableBlackListed = false;
          $scope.selectedPlacementStatus = [];
          //console.log($scope.selectedPlacementStatus);
        }
      }

      $scope.PlacementCheck1 = function(val1) {
        //console.log(val1);
        ////console.log(data);

        if (val1 == true) {
          $scope.disableOpen = true;
          $scope.selectedPlacementStatus = [{"placementstatus":"BlackListed"}];
          //console.log($scope.selectedPlacementStatus);
        }
        if (val1 == false) {
          $scope.disableOpen = false;
          $scope.selectedPlacementStatus = [];
          //console.log($scope.selectedPlacementStatus);
        }
      }
      
      
      /*=====  End of Placement status checkbox  ======*/
      
      
      
      
      

      /*==================================================
      =            TF, Fees Paid, Status List            =
      ==================================================*/
      $scope.TrainerFeedbackCheckboxData = [
        {
        "name": "Eligible"
        },{
        "name":"Not-Eligible"
        }
      ];

      $scope.FeesPaidCheckboxData = [
        {
        "name": "Paid"
        },{
        "name":"Unpaid"
        }
      ];

      $scope.PlacementStatusCheckboxData = [
        {
        "name": "Open"
        },{
        "name":"BlackListed"
        }
      ];
      /*=====  End of TF, Fees Paid, Status List  ======*/
      

      /*=====================================
      =            Document List            =
      =====================================*/
      $scope.allDocuments = [
        {
        "documentname": "SSC Marksheet",
        "name": "SSC Document"
        },{
        "documentname": "HSC Marksheet",
        "name":"HSC Document"
        },{
          "documentname": "Graduation Marksheet",
          "name":"Graduation Document"
        }, {
          "documentname": "Diploma Marksheet",
          "name":"Diploma Document"
        }, {
          "documentname": "Post Graduation Marksheet",
          "name":"Postgraduation Document"
        }, {
          "documentname": "ID Proof",
          "name":"ID Proof Document"
        }, {
          "documentname": "Address Proof",
          "name":"Address Proof Document"
        }, {
          "documentname": "Resume",
          "name":"Resume Document"
        }, {
          "documentname": "Experience",
          "name":"Experience Document"
        }
      ];

      $scope.checkDocument = function(value, checked) {
     
         if($scope.user3.allDocuments !=undefined)
         {
            var idx = $scope.user3.allDocuments.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user3.allDocuments.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user3.allDocuments.push(value);
          }

          //console.log($scope.user3.allDocuments);
          $scope.selectedDoc1 = $scope.user3.allDocuments;
          //$scope.selectedDoc = $scope.user3.allDocuments;
          
          // $scope.selectedDoc2 = [];
          $scope.selectedDoc = [];
          for(var a=0;a<$scope.selectedDoc1.length;a++) {
            $scope.selectedDoc.push({"documentname": $scope.selectedDoc1[a]});
          }
          //$scope.selectedDoc = JSON.stringify($scope.selectedDoc2);
          //console.log("selectedDoc",$scope.selectedDoc);
      };

      $scope.checkDegree = function(value, checked) {
     
         if($scope.user4.allDegree !=undefined)
         {
            var idx = $scope.user4.allDegree.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user4.allDegree.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user4.allDegree.push(value);
          }

          //console.log($scope.user4.allDegree);
          $scope.selectedDeg1 = $scope.user4.allDegree;
          $scope.selectedDeg = [];
          for(var a=0;a<$scope.selectedDeg1.length;a++) {
            $scope.selectedDeg.push({"cDegreeId": $scope.selectedDeg1[a]});
          }
          //console.log("$scope.selectedDeg",$scope.selectedDeg);
          //$scope.selectedDeg = $scope.user4.allDegree;
           // $scope.seletedStateCheckbox = $scope.user.State;
      };
      
      
      /*=====  End of Document List  ======*/
      
      
      

      /*=====================================================
      =            Qualification Post Graduation            =
      =====================================================*/
      var QuaListUrl = baseUrlSrvc.baseUrl + 'listEducationRequired';
      var promiseQuaGet = CRUD_SERVICE.getAllData(QuaListUrl);
      promiseQuaGet.then(function(pl) {
          $scope.EducationRequired = pl.data;

          //console.log($scope.EducationRequired);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      
      /*=====  End of Qualification Post Graduation  ======*/
      

       /*==================================
      =            Trainer Feedback List            =
      ==================================*/
      var trainerListUrl = baseUrlSrvc.baseUrl + 'listTrainerFeedback';
      var promiseTrainerGet = CRUD_SERVICE.getAllData(trainerListUrl);
      promiseTrainerGet.then(function(pl) {
          $scope.trainer = pl.data;

          //console.log($scope.trainer);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of  Trainer Feedback List  ======*/

      /*======================================
      =            trainer change            =
      ======================================*/
      
      $scope.trainerChange = function(id) {
        $scope.traId = id;
        //console.log($scope.traId);
        var studentListUrl = baseUrlSrvc.baseUrl + 'liststudentFeedback';
      var promisestudentGet = CRUD_SERVICE.getAllData(studentListUrl);
      promisestudentGet.then(function(pl) {
          $scope.student = pl.data;

          //console.log($scope.student);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      }
      /*=====  End of trainer change  ======*/
    

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

      /*==================================
      =            Qualification List            =
      ==================================*/
      var QualificationListUrl = baseUrlSrvc.baseUrl + 'listQualificationMaster';
      var promiseQualificationGet = CRUD_SERVICE.getAllData(QualificationListUrl);
      promiseQualificationGet.then(function(pl) {
          $scope.Qualification = pl.data;

          //console.log("Qualify", $scope.Qualification);

          for (var i = 0; i < $scope.Qualification.length; i++) {

          if ($scope.Qualification[i].qualificationname == 'SSC') {
              $scope.SSCID = $scope.Qualification[i].cQualificationmasterId;
            }
          else if ($scope.Qualification[i].qualificationname == 'HSC') {
              $scope.HSCID = $scope.Qualification[i].cQualificationmasterId;
            }
          else if ($scope.Qualification[i].qualificationname == 'Diploma') {
              $scope.DIPID = $scope.Qualification[i].cQualificationmasterId;
            }
          else if ($scope.Qualification[i].qualificationname == 'Post Graduation') {
              $scope.PGID = $scope.Qualification[i].cQualificationmasterId;
            }
          // else if ($scope.Qualification[i].qualificationname == 'Under Graduate') {
          //     $scope.UGID = $scope.Qualification[i].cQualificationmasterId;
          //   }
          else if ($scope.Qualification[i].qualificationname == 'Graduation') {
              $scope.GRADID = $scope.Qualification[i].cQualificationmasterId;
            }
          }

      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Qualification List  ======*/

      /*===========================================
      =            Enquiry Status List            =
      ===========================================*/
      var EnquiryStatusListUrl = baseUrlSrvc.baseUrl + 'listEnquiryStatus';
      var promiseEnquiryStatusGet = CRUD_SERVICE.getAllData(EnquiryStatusListUrl);
      promiseEnquiryStatusGet.then(function(pl) {
          $scope.EnquiryStatus = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Enquiry Status List  ======*/

       /*===========================================
      =            Technologies List            =
      ===========================================*/
      var techListUrl = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
      var promisetechGet = CRUD_SERVICE.getAllData(techListUrl);
      promisetechGet.then(function(pl) {
          $scope.Technologies = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Technologies List  ======*/

      /*===================================
      =            List Degree            =
      ===================================*/
      var degListUrl = baseUrlSrvc.baseUrl + 'listDegree';
      var promiseDegGet = CRUD_SERVICE.getAllData(degListUrl);
      promiseDegGet.then(function(pl) {
          $scope.allDegree = pl.data;
          //console.log($scope.allDegree);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of List Degree  ======*/
      

       /*=====================================
      =            technologies change            =
      =====================================*/
      
      $scope.technoChange = function(id){
        $scope.techId = id;
        //console.log($scope.techId);
      }
      
      /*=====  End of technologies change  ======*/


        /*==================================
      =            Document List            =
      ==================================*/
      // var DocumentListUrl = baseUrlSrvc.baseUrl + 'listDocumentByEnquiryFormId';
      // var promiseDocumentGet = CRUD_SERVICE.getAllData(DocumentListUrl);
      // promiseDocumentGet.then(function(pl) {
      //     $scope.document = pl.data;

      //     //console.log($scope.document);
      // },
      // function(errorPl) {
      //     $log.error('Some Error in Getting Records.', errorPl);
      // });
      /*=====  End of  Document List  ======*/


       /*=====================================
      =            Document change            =
      =====================================*/
      
      $scope.documentChange = function(id){
        $scope.dacId = id;
        //console.log($scope.dacId);
      }
      
      /*=====  End of Document change  ======*/

      /*===========================================
      =            Send Email Function            =
      ===========================================*/
      $scope.sendEmailData = function(data1) {
        //console.log(data1);
        $scope.finalStudentData = [];
        //"eEnquiryFormId":$scope.user_ID[b],
        for(var b=0;b<$scope.St_name.length;b++) {
          $scope.finalStudentData.push({"eEnquiryFormId":$scope.user_ID[b],"email":$scope.St_name[b], "clClientId":$scope.compId, "clClientjobprofileId":$scope.jobId});
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
                saveEmailDetails();
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

      function saveEmailDetails() {

        $scope.finalStudentData1 = [];
        //"eEnquiryFormId":$scope.user_ID[b],
        for(var b=0;b<$scope.St_name.length;b++) {
          $scope.finalStudentData1.push({"eEnquiryFormId":$scope.user_ID[b],"email":$scope.St_name[b], "clClientId":$scope.compId, "clClientjobprofileId": $scope.jobId, "createdby": $sessionStorage.createdby, "updatedby":$sessionStorage.updatedby, "bBranchId": $sessionStorage.bBranchId, "inInstituteId": $sessionStorage.inInstituteId, "adUserId": $sessionStorage.adUserId, "ismailsend": "Yes"});
        }
        // var jsdata1 = JSON.stringify($scope.finalStudentData1);
        // //console.log("jsdata1",jsdata1);


        var FormData = {
                formdata: $scope.finalStudentData1,
                url: baseUrlSrvc.baseUrl + 'addUpdateSendmailDetails'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               //var source = pl.source;
               var promiseData = pl.data;
               ////console.log("source",source);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    var urlStudentList = baseUrlSrvc.baseUrl + 'listSendEmailInvitation/' + $scope.compId + '/' + $scope.jobId ;
                    GetAllStudentRecords(urlStudentList);
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
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    var urlStudentList = baseUrlSrvc.baseUrl + 'listSendEmailInvitation/' + $scope.compId + '/' + $scope.jobId ;
                    GetAllStudentRecords(urlStudentList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                //ClearModels();
            });



      }
      /*=====  End of Send Email Function  ======*/

      /*=====================================
      =            Dropdown Demo            =
      =====================================*/

      // $scope.data11 = [
      //   {id: 'a', text: 'a', children: [
      //     {id: 'a-1' ,text: 'a-1', children: [
      //       {id: 'a-1-1', text: 'a-1-1'},
      //       {id: 'a-1-2', text: 'a-1-2'},
      //       {id: 'a-1-3', text: 'a-1-3'}
      //     ]},
      //     {id: 'a-2', text: 'a-2'},
      //     {id: 'a-3', text: 'a-3'}
      //   ]},
      //   {id: 'b', text: 'b'},
      //   {id: 'c', text: 'c'},
      //   {id: 'd', text: 'd'},
      //   {id: 'e', text: 'e'}
      // ];
      // //console.log("data11",$scope.data11);

      var QDSListUrl = baseUrlSrvc.baseUrl + 'listQualificationDegreeAndDegreeSpecification';
      var promisQDSGet = CRUD_SERVICE.getAllData(QDSListUrl);
      promisQDSGet.then(function(pl) {
          $scope.QDSData1 = pl.data;
          $scope.QDSData = $scope.QDSData1[0].children;
          //console.log("$scope.QDSData",$scope.QDSData);
          // $scope.valueProperty = "id";
          // $scope.displayProperty = "name";
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });



      // $scope.valueProperty = 'id';
      //     $scope.displayProperty = 'text';
      $scope.saveTree = function(data) {
        //console.log("treeview",data);
      }
      

      

      $scope.awesomeCallback = function(value, check) {
        //console.log(value);
        //console.log(check);
        // //console.log(c);

        if (check) {
          $scope.user0.multArray.push(value);
        } else {
          var index = $scope.user0.multArray.indexOf(value);
          $scope.user0.multArray.splice(index, 1);
        }

        //console.log("$scope.user0.multArray",$scope.user0.multArray);
        $scope.qualificationDegree = $scope.user0.multArray;

        // if($scope.user0.multArray !=undefined)
        //  {
        //     var idx = $scope.user0.multArray.indexOf(value);
        //  }
        //   if (idx >= 0 && !checked) {
        //     $scope.user0.multArray.splice(idx, 1);
        //   }
        //   if (idx < 0 && checked) {
        //     $scope.user0.multArray.push(value);
        //   }
        //   $scope.qualificationDegree = $scope.user0.multArray;
        //   //console.log("$scope.qualificationDegree",$scope.qualificationDegree);
      }
      /*=====  End of Dropdown Demo  ======*/
      

      /*===========================================
      =            Send Advance  Function            =
      ===========================================*/
      $scope.sendadvanceData = function(data) {

        $scope.data_Placement = [];
        var advdata = {};
        //console.log(data);
        //console.log(data.tree);
        
        /*=================================================
        =            Qua, Deg, Spec Separation            =
        =================================================*/
        $scope.qua_array = [];
        $scope.deg_array = [];
        $scope.spec_array = [];

        for(var i in data.tree) { 
          ////console.log("i",i);
           ////console.log("value",data.tree[i]);

          if (data.tree[i] == true) {

            var fields = i.split('/');
            // //console.log("fields",fields);
            // //console.log("[0]",fields[0]);
            // //console.log("[1]",fields[1]);
            if (fields[0] == "cQualificationmasterId") {
              $scope.qua_array.push({"cQualificationmasterId":fields[1]});
            }

            if (fields[0] == "cDegreeId") {
              $scope.deg_array.push({"cDegreeId":fields[1]});
            }

            if (fields[0] == "cDegreespecificationId") {
              $scope.spec_array.push({"cDegreespecificationId":fields[1]});
            }

          }
        }
        //console.log("$scope.qua_array",$scope.qua_array);
        //console.log("$scope.deg_array",$scope.deg_array);
        //console.log("$scope.spec_array",$scope.spec_array);

        if ($scope.qua_array.length > 0) {
          advdata.qualificationmaster = $scope.qua_array;
        } else {
          advdata.qualificationmaster = [{"cQualificationmasterId":"null"}];
        }

        if ($scope.deg_array.length > 0) {
          advdata.degree = $scope.deg_array;
        } else {
          advdata.degree = [{"cDegreeId":"null"}];
        }

        if ($scope.spec_array.length > 0) {
          advdata.degreespecification = $scope.spec_array;
        } else {
          advdata.degreespecification = [{"cDegreespecificationId":"null"}];
        }
        /*=====  End of Qua, Deg, Spec Separation  ======*/

        // CLIENT JOB PROFILE IDS
        advdata.clClientId = $scope.compId;
        advdata.clClientjobprofileId = $scope.jobId;
        // CLIENT JOB PROFILE IDS

        /*===================================
        =            Single Data            =
        ===================================*/
          if (data != undefined) {

            /*=======================================
            =            Qualification %            =
            =======================================*/
            if (data.sscpercentage) {
              advdata.sscId = $scope.SSCID;
            } else {
              advdata.sscId = "null";
            }

            if (data.hscpercentage) {
              advdata.hscId = $scope.HSCID;
            } else {
              advdata.hscId = "null";
            }

            if (data.diplomapercentage) {
              advdata.diplomaId = $scope.DIPID;
            } else {
              advdata.diplomaId = "null";
            }

            if (data.graduationpercentage) {
              advdata.graduationId = $scope.GRADID;
            } else {
              advdata.graduationId = "null";
            }

            if (data.postgraduationpercentage) {
              advdata.postgraduationId = $scope.PGID;
            } else {
              advdata.postgraduationId = "null";
            }
            /*=====  End of Qualification %  ======*/
          }

          

          if (data.postdatedcheque) {
            advdata.postdatedcheque = data.postdatedcheque;
          } else {
            advdata.postdatedcheque = "null";
          }

          if (data.attendance) {
            advdata.attendance = data.attendance;
          } else {
            advdata.attendance = "null";
          }

          if (data.sscpercentage) {
            advdata.sscpercentage = data.sscpercentage;
          } else {
            advdata.sscpercentage = "null";
          }

          if (data.hscpercentage) {
            advdata.hscpercentage = data.hscpercentage;
          } else {
            advdata.hscpercentage = "null";
          }

          if (data.diplomapercentage) {
            advdata.diplomapercentage = data.diplomapercentage;
          } else {
            advdata.diplomapercentage = "null";
          }

          if (data.graduationpercentage) {
            advdata.graduationpercentage = data.graduationpercentage;
          } else {
            advdata.graduationpercentage = "null";
          }

          if (data.postgraduationpercentage) {
            advdata.postgraduationpercentage = data.postgraduationpercentage;
          } else {
            advdata.postgraduationpercentage = "null";
          }

          if (data.yearofpassing) {
            advdata.yearofpassing = data.yearofpassing;
          } else {
            advdata.yearofpassing = "null";
          }

          if (data.experience) {
            advdata.experience = data.experience;
          } else {
            advdata.experience = "null";
          }
        /*=====  End of Single Data  ======*/

        /*=====================================
        =            Multiple Data            =
        =====================================*/
          // BRANCHES
          // if ($scope.allBranchArray.length>0) {
          //   if ($scope.AllBranchesSelected == false) {
          //     advdata.bBranchId = data.bBranchId;
             
          //   }else
          //     {
          //     advdata.bBranchId = "null";
          //   }
          // } else {
          //   advdata.bBranchId = "null";
          // }
          if (data.bBranchId) {

            if ($scope.AllBranchesSelected == false) {
              advdata.bBranchId = data.bBranchId;
             
            } else {
              advdata.bBranchId = "null";
            }

          } else {
              advdata.bBranchId = "null";
          }
          // BRANCHES

          // TRAINER FEEDBACK
          if ($scope.selectedTrainerFeedback.length > 0) {
            advdata.trainerfeedback = $scope.selectedTrainerFeedback;
          } else {
            advdata.trainerfeedback = [{"status":"null"}];
          }
          // TRAINER FEEDBACK

          // FEES PAID
          if ($scope.selectedFeesPaid.length > 0) {
            advdata.feesstatus = $scope.selectedFeesPaid;
          } else {
            advdata.feesstatus = [{"paymentstatus":"null"}];
          }
          // FEES PAID

          // PLACEMENT STATUS
          if ($scope.selectedPlacementStatus.length > 0) {
            advdata.placementstatus = $scope.selectedPlacementStatus;
          } else {
            advdata.placementstatus = [{"placementstatus":"Open"}];
          }
          // PLACEMENT STATUS

          // TECHNOLOGY
          if ($scope.selectedTech.length > 0) {
            advdata.technologyMaster = $scope.selectedTech;
          } else {
            advdata.technologyMaster = [{"cTechnologyMasterId":"null"}];
          }
          // TECHNOLOGY

          // DOCUMENT
          if ($scope.selectedDoc.length > 0) {
            advdata.document = $scope.selectedDoc;
          } else {
            advdata.document = [{"documentname":"null"}];
          }
          // DOCUMENT

          // COURSE
          $scope.saveCourseArray = [];
          if ($scope.selectedCourseBatch.length > 0) {
            for(var j=0;j<$scope.selectedCourseBatch.length;j++) {
              $scope.saveCourseArray.push({"cCourseId":$scope.selectedCourseBatch[j].cCourseId});
            }
            advdata.course = $scope.saveCourseArray;
          } else {
            advdata.course = [{"cCourseId": "null"}];
          }
          // COURSE

          // BATCH
          $scope.saveBatchArray = [];
          if ($scope.selectedCourseBatch.length > 0) {
            for(var j=0;j<$scope.selectedCourseBatch.length;j++) {
              $scope.saveBatchArray.push({"cBatchId":$scope.selectedCourseBatch[j].cBatchId});
            }
            advdata.batch = $scope.saveBatchArray;
          } else {
            advdata.batch = [{"cBatchId": "null"}];
          }
          // BATCH
        /*=====  End of Multiple Data  ======*/


        // Push advdata to array
        $scope.finArr = [];
        $scope.finArr.push(advdata);
        // Push advdata to array

        var FormData = {
            formdata: $scope.finArr,
            url: baseUrlSrvc.baseUrl + 'listAdvanceFilter'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           
           // var source = pl.source;
           $scope.promiseData = pl.data;
           // //console.log("source",source);
           //console.log("promiseData",$scope.promiseData);

           $scope.StudentArray = [];
            $scope.StudentArray.push($scope.promiseData);

            $scope.usersTable_Placement = new ngTableParams({
                page: 1,
                count: 10
            }, {
               total: $scope.promiseData.length, 
                getData: function ($defer, params) {

                  if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                
                    $scope.data_Placement = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
                    $scope.data_Placement = params.filter() ? $filter('filter')($scope.data_Placement, params.filter()) : $scope.data_Placement;
                   $scope.data_Placement = $scope.data_Placement.slice((params.page() - 1) * params.count(), params.page() * params.count());
                   $defer.resolve($scope.data_Placement)
                }
            });
            $scope.usersTable_Placement.reload();
           
            $timeout(function() {
                $scope.$apply(function () {
                });
            },100);
            if ($scope.promiseData.length == 0) {
              toaster.success({title: "Success", body:"No Records Found!",tapToDismiss: true,showCloseButton: true});
            }
            if ($scope.promiseData.length > 0) {
              toaster.success({title: "Success", body:$scope.promiseData.length + " Records Found!",tapToDismiss: true,showCloseButton: true});
            }
        }, function (err) {
          //console.log("Some Error Occured." + err);

          ////console.log("err.data",err.data);
              
             $timeout(function() {
                  $scope.$apply(function () {
                  //$route.reload();
                  //GetAllRecords(urlList);
                  });
              },100);
               
               toaster.error({title: "Error", body:"Error in Searching Data",tapToDismiss: true,showCloseButton: true});
                
              //ClearModels();
          });
      }
      /*=====  End of Send Advance Function  ======*/
      
}]);
/*=====  End of Controller  ======*/