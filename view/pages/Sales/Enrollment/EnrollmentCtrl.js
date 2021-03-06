/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("enrollmentCtrl", ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster",
        "feedback_Cid","feedback_Bid","feedback_Eid","branch_name","Form_no","course_fee",
        "firstNameService","middleNameService","lastNameService","Branch_Id","avg_att","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, feedback_Cid, 
            feedback_Bid, feedback_Eid, branch_name, Form_no, course_fee, 
            firstNameService, middleNameService, lastNameService, Branch_Id, avg_att, $window) {

         $scope.enquiryArray = [];
          $scope.OperType = $routeParams.ID;
           $scope.role = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;
           $window.document.title = "ITPreneur - Admission";
           $scope.disableAllInput = true;
           $scope.showStaticCourseInfo = true;
           $scope.showDyanmicCourseInfo = true;

           $scope.user11 = {data_Enq: []};
          $scope.St_name = [];
          $scope.StName = [];
          // $scope.data_Enq = [];
          $scope.studentNameArray1 = [];

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

         /*=====================================================================
         =            Disable Enable Fields on New Existring Select            =
         =====================================================================*/
         $scope.enableAll = function() {
          $scope.enrollmentData = {};
          $scope.disableAllInput = false;
          $scope.showDyanmicCourseInfo = false;
          $scope.existing = false;
          $scope.showStaticCourseInfo = true;
          $scope.stureq = false;
         }

         $scope.enableAll1 = function() {
          $scope.enrollmentData = {};
          $scope.disableAllInput = true;
          $scope.showDyanmicCourseInfo = true;
          $scope.showStaticCourseInfo = false;
          $scope.stureq = true;
         }
         /*=====  End of Disable Enable Fields on New Existring Select  ======*/

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

      /*=================================
         =            Check Enq            =
         =================================*/
         $scope.checkEnq = function(value, checked, email, stname) {
         //console.log(value);
          // //console.log(email);
          //console.log(stname);
          //$scope.singleEmail = email;
          
          function findIndexInData(data, property, value) {
          var result = -1;
          data.some(function (item, i) {
              if (item[property] === value) {
                  result = i;
                  return true;
              }
          });
          return result
        }

         if($scope.user11.data_Enq !=undefined)
         {
           
            ////console.log(index);
            
            var idx = $scope.user11.data_Enq.indexOf(value);
            var idx1 = $scope.St_name.indexOf(index);
             var index=findIndexInData($scope.St_name, 'name', stname);
            //console.log("St_name",$scope.St_name);
            
         }
         
          if (idx >= 0 && !checked) {
            $scope.user11.data_Enq.splice(idx, 1);
            //console.log("splice",$scope.user11.data_Enq);

          }

          if (index >= 0 && !checked) {
            $scope.St_name.splice(index, 1);
          }
          // if (idx2 >= 0 && !checked) {
          //   $scope.StName.splice(idx2, 1);
          // }


          if (idx < 0 && checked) {
            $scope.user11.data_Enq.push(value);
            //console.log("Push",$scope.user11.data_Enq);

            

          }

          if (idx1 < 0 && checked) {
            $scope.St_name.push({"name":stname});
          }

          //console.log("$scope.St_name",$scope.St_name);
          //console.log("$scope.user11.data_Enq",$scope.user11.data_Enq);


          $scope.studentNameArray = [];
          // $scope.studentContact = [];
          $scope.studentNameArray1 = [];
           ////console.log($scope.user11.data_Placement);

           ////console.log($scope.St_name);
           // $scope.user_ID = $scope.user11.data_Enq;
           for(var a=0;a<$scope.St_name.length;a++) {
            // $scope.studentNameArray.push($scope.St_name[a].email);
            $scope.studentNameArray1.push({"name":$scope.St_name[a].name});
            // $scope.studentContact.push({"eEnquiryFormId":$scope.St_name[a].eEnquiryFormId});
           }

           //console.log("studentNameArray",$scope.studentNameArray);
           // //console.log("studentContact",$scope.studentContact);
           $scope.studentnames = $scope.studentNameArray1;
           //console.log("$scope.studentnames",$scope.studentnames);

        };
         /*=====  End of Check Enq  ======*/

         /*=================================
      =            Check All            =
      =================================*/
      $scope.checkAll = function() {
        //console.log("All");
        //$scope.user.eEnquiryformId = angular.copy($scope.data_Placement);
        $scope.studentNameArray1 = [];
        $scope.user11.eEnquiryFormId = $scope.data.map(function(item) { return item.eEnquiryFormId; });
       
        //console.log($scope.data);
        $scope.user11.data_Enq = $scope.user11.eEnquiryFormId;
        
        for(var a=0;a<$scope.data.length;a++) {
          $scope.studentNameArray1.push({"name":$scope.data[a].firstname + ' ' + $scope.data[a].middlename + ' ' + $scope.data[a].lastname });
         }
         $scope.St_name = $scope.studentNameArray1;
         $scope.studentnames = $scope.studentNameArray1;
         //console.log($scope.studentNameArray1);
         //console.log($scope.user11.data_Enq);
      };
      /*=====  End of Check All  ======*/

      /*===================================
      =            Uncheck All            =
      ===================================*/
      $scope.uncheckAll = function() {
        $scope.user11.data_Enq = [];
        $scope.user11 = {data_Enq: []};
        //console.log($scope.user11.data_Enq);
        $scope.studentNameArray = [];
        $scope.St_name = [];
        ;
      };
      /*=====  End of Uncheck All  ======*/

      /*===========================================
      =            Assign Button Click            =
      ===========================================*/
      $scope.assignButtonClick = function() {
        $scope.disableAssign = true;
          // var Staff11ListUrl = baseUrlSrvc.baseUrl + 'listUserDetails';
          //  var promiseStaff11Get = CRUD_SERVICE.getAllData(Staff11ListUrl);
          //  promiseStaff11Get.then(function(pl) {
          //     $scope.Staff11 = pl.data;

          //   //console.log($scope.Staff11);
          //    },
          //    function(errorPl) {
          //        $log.error('Some Error in Getting Records.', errorPl);
          //    });



      }
      /*=====  End of Assign Button Click  ======*/

      /*======================================================
      =            Branch Change for User Details            =
      ======================================================*/
      $scope.branchChangeForUser = function(id) {
        $scope.disableAssign = false;
        /*==================================
        =            Users List            =
        ==================================*/
        var userDetailsListUrl = baseUrlSrvc.baseUrl + 'listUserDetailByBranchId/' + id;
        var promiseUserDetailsGet = CRUD_SERVICE.getAllData(userDetailsListUrl);
        promiseUserDetailsGet.then(function(pl) {
            $scope.Staff11 = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
        /*=====  End of Users List  ======*/

      }
      /*=====  End of Branch Change for User Details  ======*/
      
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
          //console.log($scope.HighestQualification);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Degree List  ======*/


      /*==================================
      =            Student List            =
      ==================================*/
     

      $scope.branchChange = function(id) {
             console.log(id);
             if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
                var StudentListUrl = baseUrlSrvc.baseUrl + 'listRegistrationByBranchId/'+id;
             } else {
                var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnquiryEnrollmentByadUserIdAndBranchId/' + $sessionStorage.adUserId + '/' + id + '/' + $sessionStorage.cRoleId;
             }

            var CourseListUrl = baseUrlSrvc.baseUrl + 'listCoursebyBranchId/' + id;
            var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
            promiseCourseGet.then(function(pl) {
                $scope.Course = pl.data;

                console.log($scope.Course);
            },
           function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
             
             var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
             promiseStudentGet.then(function(pl) {
                  $scope.Students = pl.data;

                  //console.log($scope.Students);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });

             var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentByBranchId/'+id;
             var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
             promiseStudentGet.then(function(pl) {
                  $scope.Students1 = pl.data;
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });

    
           var StaffListUrl = baseUrlSrvc.baseUrl + 'listUserDetailsByBranchId/'+id;
             var promiseStaffGet = CRUD_SERVICE.getAllData(StaffListUrl);
             promiseStaffGet.then(function(pl) {
                  $scope.Staff = pl.data;

                //console.log($scope.Staff);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });




             var urlBrnchList = baseUrlSrvc.baseUrl + 'listBranch';
                var promiseBrchGet = CRUD_SERVICE.getAllData(urlBrnchList);
                promiseBrchGet.then(function(pl) {
                    $scope.BranchData = pl.data;
                    for (var i = 0; i < $scope.BranchData.length; i++) {
                        if ($scope.BranchData[i].bBranchId == id) {
                            $scope.BranchData1 = $scope.BranchData[i];
                            //console.log("$scope.BranchData1.branchname",$scope.BranchData1.branchname);

                            var brnchName1 = $scope.BranchData1.branchname.replace(/[\. ,:-]+/g, "");
                            var brnchName = brnchName1.toUpperCase();
                            $scope.currentBranchInitials = brnchName.substring(0, 3);
                            //console.log($scope.currentBranchInitials);
                        }
                    }
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
          }
           /*=====  End of Student List  ======*/

           $scope.OnStudentChange1 = function(id) {
           
             //console.log(id);
             $scope.disableAllInput = false;
             $scope.showStaticCourseInfo = false;
             $scope.showDyanmicCourseInfo = true;

             var StudentUrl = baseUrlSrvc.baseUrl + 'listEnquiryFormbyId/'+id;
             var promiseStudentGet = CRUD_SERVICE.getAllData(StudentUrl);
             promiseStudentGet.then(function(pl) {
                    $scope.enrollmentData1 =pl.data;
                    $scope.enrollmentData = $scope.enrollmentData1[0];
                    //console.log($scope.enrollmentData[0]);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
          }
      

      /*===================================
      =            Branch List            =
      ===================================*/
      // var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
      // var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
      // promiseBranchGet.then(function(pl) {
      //     $scope.Branch = pl.data;
      // },
      // function(errorPl) {
      //     $log.error('Some Error in Getting Records.', errorPl);
      // });
      /*=====  End of Branch List  ======*/

      /*==================================
      =            Course List            =
      ==================================*/
      // var CourseListUrl = baseUrlSrvc.baseUrl + 'listCoursebyBranchId/' + $sessionStorage.bBranchId;
      // var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
      // promiseCourseGet.then(function(pl) {
      //     $scope.Course = pl.data;

      //     //console.log($scope.Course);
      // },
      // function(errorPl) {
      //     $log.error('Some Error in Getting Records.', errorPl);
      // });
      /*=====  End of Source List  ======*/

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
      
      /*========================================
      =            Get Enrollment List            =
      ========================================*/

      if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
        var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquiryFormByEnrollment';
      } else {
        //var urlEnquiryList = baseUrlSrvc.baseUrl  + 'listEnquiryFormByEnrollmentadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
        var urlEnquiryList = baseUrlSrvc.baseUrl  + 'listEnquiryEnrollmentByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
      }
      GetAllEnquiryRecords(urlEnquiryList);

      function GetAllEnquiryRecords(url) {
          $scope.enquiryArray = [];
          var promiseGet = CRUD_SERVICE.getAllData(url);
          promiseGet.then(function (pl) {
                  $scope.enquiry = pl.data;
                  $scope.enquiryArray.push($scope.enquiry);
                  //console.log("$scope.enquiry",$scope.enquiry);

                  $scope.usersTable = new ngTableParams({
                      page: 1,
                      count: 10
                  }, {
                     total: $scope.enquiry.length, 
                      getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                      
                          $scope.data = params.sorting() ? $filter('orderBy')($scope.enquiryArray[0], params.orderBy()) : $scope.enquiryArray[0];
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
          /*=====  End of Get Enquiry List  ======*/
      
          /*==========================================
          =            Role Select Change            =
          ==========================================*/
          $scope.roleSelect = function(id, rdata) {
            //console.log("id",id);
            //console.log("rdata",rdata);
            $scope.temp_var = $filter('filter')(rdata, { "adRoleId": id });
                 //console.log("$scope.temp_var",$scope.temp_var);

                 $scope.addenquiry.conAccounttypeId= $scope.temp_var[0].conAccounttypeId;
                 //console.log("$scope.addenquiry.conAccounttypeId",$scope.addenquiry.conAccounttypeId);
          }
          /*=====  End of Role Select Change  ======*/

          /*======================================
          =            Change Student            =
          ======================================*/
          $scope.changeStudent = function(id, sdata) {
            //console.log(id);
              $scope.selectedStudent = $filter('filter')(sdata, { "eEnquiryFormId": id });

              $scope.selectedStudent1 = $scope.selectedStudent[0].firstname;
              //console.log("$scope.selectedStudent1",$scope.selectedStudent1);
          }
          /*=====  End of Change Student  ======*/
		  
		  /*====================================
          =            Change Staff            =
          ====================================*/
          $scope.changeStaff = function(id, sdata) {
            //console.log(id);
            //console.log(sdata);
              $scope.selectedStudent = $filter('filter')(sdata, { "adUserdetailId": id });

              $scope.selectedStudent1 = $scope.selectedStudent[0].lastname + ' ' + $scope.selectedStudent[0].firstname + ' ' + $scope.selectedStudent[0].middlename;
              //console.log("$scope.selectedStudent1",$scope.selectedStudent1);
          }
          /*=====  End of Change Staff  ======*/

          /*=====================================
          =            Course Change            =
          =====================================*/
          $scope.courseChange = function(id) {
            //console.log(id);

            $scope.Course_id = id;

            var FeeListUrl = baseUrlSrvc.baseUrl + 'listFeeStructureByCourseId/' + id;
            var promiseFeesStatusGet = CRUD_SERVICE.getAllData(FeeListUrl);
            promiseFeesStatusGet.then(function(pl) {
                $scope.Fee = pl.data;
                $scope.totalFee = $scope.Fee[0].amount;
                $scope.calculatedFee = $scope.Fee[0].amount;

                //console.log($scope.Fee);
                //console.log($scope.totalFee);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

            var DiscountListUrl = baseUrlSrvc.baseUrl + 'listDiscountByCourseIdByTimeduration/' + id;
            var promiseDiscountsStatusGet = CRUD_SERVICE.getAllData(DiscountListUrl);
            promiseDiscountsStatusGet.then(function(pl) {
                $scope.Discount = pl.data;
                //console.log($scope.Discount);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

            
             var BatchListUrl = baseUrlSrvc.baseUrl + 'listBatchByCourseIdTimeduration/' + id;
              var promiseBatchGet = CRUD_SERVICE.getAllData(BatchListUrl);
              promiseBatchGet.then(function(pl) {
                  $scope.Batch = pl.data;

                  //console.log($scope.Batch);
              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });


          }
          /*=====  End of Course Change  ======*/

          /*=======================================
          =            Discount Change            =
          =======================================*/
          $scope.discountChange = function(id) {

            //console.log(id);

            var DiscountList1Url = baseUrlSrvc.baseUrl + 'listDiscountById/' + id;
            var promiseDiscounts1StatusGet = CRUD_SERVICE.getAllData(DiscountList1Url);
            promiseDiscounts1StatusGet.then(function(pl) {
                $scope.Discount1 = pl.data;
                //console.log($scope.Discount1);
                $scope.DiscountPercentage = $scope.Discount1[0].percentage;
                // //console.log($scope.Discount);
                //console.log($scope.DiscountPercentage);

                $scope.calculatedFee_a = ($scope.DiscountPercentage / 100) * $scope.totalFee;
                $scope.calculatedFee = $scope.totalFee - $scope.calculatedFee_a;

                //console.log($scope.calculatedFee);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

          }
          /*=====  End of Discount Change  ======*/

          $scope.twoClick = function() {

            $scope.calculatedFee = $scope.Fee[0].amount;
            $scope.DiscountPercentage = "";
            $scope.manualLabel = true;
            $scope.manualDiscLabel = false;

          }

          $scope.oneClick = function() {

            $scope.calculatedFee = $scope.Fee[0].amount;
            $scope.DiscountPercentage = "";
            $scope.manualLabel = false;
            $scope.manualDiscLabel = true;

          }

          $scope.applyAmount = function(amt) {
            $scope.calculatedFee = $scope.totalFee - amt;
            //console.log($scope.calculatedFee);
          }

          $scope.manualAmtMinus = function(amt) {

            $scope.manualAmountSave = amt;
            $scope.calculatedFee = $scope.totalFee - amt;
            //console.log($scope.calculatedFee);

          }
            

            /*==============================================
            =            Source Change Function            =
            ==============================================*/
            $scope.showStudent = false;
            $scope.showStaff = false;
            $scope.sourceChange = function(id, sdata) {
              //console.log(name);

              $scope.temp_var2 = $filter('filter')(sdata, { "cSourceId": id });
               //console.log($scope.temp_var2[0]);
              var selectedname = $scope.temp_var2[0].sourcename;

              if (selectedname == "ITPreneur Student") {
                //console.log("if");
                $scope.showStudent = true;
                $scope.showStaff = false;
              } else  if (selectedname == "ITPreneur Staff") {
                $scope.showStaff = true;
                $scope.showStudent = false;

                // var StaffListUrl = baseUrlSrvc.baseUrl + 'listUserDetails';
                //  var promiseStaffGet = CRUD_SERVICE.getAllData(StaffListUrl);
                //  promiseStaffGet.then(function(pl) {
                //     $scope.Staff = pl.data;
                //  },
                //  function(errorPl) {
                //      $log.error('Some Error in Getting Records.', errorPl);
                //  });
                 
              } else {
                $scope.showStudent = false;
                $scope.showStaff = false;
              }
            }
            /*=====  End of Source Change Function  ======*/
            
            /*===============================================
            =            View Enrollment Function            =
            ===============================================*/
            $scope.viewEnrollment = function(id, idata) {
                 //console.log(id);
                $scope.temp_var = $filter('filter')(idata, { "eEnquiryFormId": id });
               //console.log("$scope.temp_var",$scope.temp_var);

               $scope.viewenrollmentData= $scope.temp_var[0];
            }
            /*=====  End of View Enrollment Function  ======*/

            /*============================================
            =            Clear Modal on Click            =
            ============================================*/
            $scope.clearModalOnClose = function() {
                $scope.enquiryData = {};
                $scope.enrollmentData = {};
                $scope.existing = false;
            }
            /*=====  End of Clear Modal on Click  ======*/
            
            /*==============================================
            =            Clear Model After Save            =
            ==============================================*/
            function ClearModels() {
                $scope.enquiryData = {};
                $scope.enrollmentData = {};
            }
            /*=====  End of Clear Model After Save  ======*/

            /*==================================================
            =            Get Enrollment on Edit Page            =
            ==================================================*/
            if ($scope.OperType != undefined && $scope.OperType != 0) {
              $window.document.title = "ITPreneur - Edit Admission";
              var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquirybyRegistrationandEnrollment/'+ $scope.OperType;
                var promiseGet = CRUD_SERVICE.getAllData(urlEnquiryList);
                promiseGet.then(function(pl) {
                    $scope.enquiry = pl.data;
                    

                    for (var i = 0; i < $scope.enquiry.length; i++) {
                        if ($scope.enquiry[i].eEnquiryFormId == $scope.OperType) {
                            $scope.enrollmentData = $scope.enquiry[i];
                            $sessionStorage.cCourseId = $scope.enrollmentData.cCourseId;
                            $sessionStorage.cTechnologyMasterId = $scope.enrollmentData.cTechnologyMasterId;
                            //console.log("=================",$scope.enrollmentData);
                            branch_name.addBranch_name($scope.enrollmentData.branchname);
                            feedback_Cid.addCourse_id($scope.enrollmentData.cCourseId);
                            // $sessionStorage.courseName = $scope.enrollmentData.coursename;
                            // $sessionStorage.batchName = $scope.enrollmentData.batchname;
                            feedback_Bid.addBatch_id($scope.enrollmentData.cBatchId);
                            feedback_Eid.addEnq_id($scope.enrollmentData.eEnquiryFormId);
                            course_fee.addCourse_fee($scope.enrollmentData.totalfee)
                            avg_att.addavg_att($scope.enrollmentData.attendancepercetage);
                            Form_no.addForm_no($scope.enrollmentData.enquiryformno);
                            
                            Branch_Id.addBranch_Id($scope.enrollmentData.bBranchId);

                            firstNameService.addFirstName($scope.enrollmentData.firstname);
                            middleNameService.addMiddleName($scope.enrollmentData.middlename);
                            lastNameService.addLastName($scope.enrollmentData.lastname);

                            /*===================================
                              =            Degree List            =
                              ===================================*/
                              var degListUrl = baseUrlSrvc.baseUrl + 'listDegree';
                              var promiseDegGet = CRUD_SERVICE.getAllData(degListUrl);
                              promiseDegGet.then(function(pl) {
                                  $scope.HighestQualification = pl.data;
                              },
                              function(errorPl) {
                                  $log.error('Some Error in Getting Records.', errorPl);
                              });
                              /*=====  End of Degree List  ======*/

                              /*==================================
                              =            Course List            =
                              ==================================*/
                              var CourseListUrl = baseUrlSrvc.baseUrl + 'listCoursebyBranchId/' + $scope.enrollmentData.bBranchId;
                              var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
                              promiseCourseGet.then(function(pl) {
                                  $scope.Course = pl.data;

                                  //console.log($scope.Course);
                              },
                              function(errorPl) {
                                  $log.error('Some Error in Getting Records.', errorPl);
                              });
                              /*=====  End of Course List  ======*/

                            $scope.source_name = $scope.enrollmentData.sourcename;

                            var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentByBranchId/'+$scope.enrollmentData.bBranchId;
                           var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
                           promiseStudentGet.then(function(pl) {
                                $scope.Students = pl.data;
                                //console.log($scope.Students);
                               },
                               function(errorPl) {
                                   $log.error('Some Error in Getting Records.', errorPl);
                               });

                          var StaffListUrl = baseUrlSrvc.baseUrl + 'listUserDetailsByBranchId/'+$scope.enrollmentData.bBranchId;
                          var promiseStaffGet = CRUD_SERVICE.getAllData(StaffListUrl);
                           promiseStaffGet.then(function(pl) {
                                $scope.Staff = pl.data;

                              //console.log($scope.Staff);
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

                                //console.log($scope.Batch);
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
            /*=====  End of Enrollment on Edit Page  ======*/

            /*===========================================
            =            Qualification Focus            =
            ===========================================*/
            $scope.QualificationFocus = function() {


              var degListUrl = baseUrlSrvc.baseUrl + 'listDegree';
              var promiseDegGet = CRUD_SERVICE.getAllData(degListUrl);
              promiseDegGet.then(function(pl) {
                  $scope.HighestQualification = pl.data;
                  //console.log($scope.HighestQualification);
              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });

            }
            /*=====  End of Qualification Focus  ======*/

            /*===================================
            =            Assign Send            =
            ===================================*/
            $scope.assignSubmit = function(adata) {

              //console.log(adata);
              $scope.selectedStudentIds = $scope.user11.data_Enq;
              //console.log("$scope.selectedStudentIds",$scope.selectedStudentIds);
              $scope.sendAssignArray = [];
              for(var i=0;i<$scope.selectedStudentIds.length;i++) {

                $scope.sendAssignArray.push({"assignto":adata.assignto,"eEnquiryFormId":$scope.selectedStudentIds[i]});

              }

              //console.log("$scope.sendAssignArray",$scope.sendAssignArray);

              var FormData = {
                  formdata: $scope.sendAssignArray,
                  url: baseUrlSrvc.baseUrl + 'updateEnquiryFormByMultipleEnquiryformId'
              };

              var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
              promisePut.then(function(pl) {
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllEnquiryRecords(urlEnquiryList);
                      $scope.user11 = {data_Enq: []};
                      $scope.St_name = [];
                      $scope.StName = [];
                      $scope.studentNameArray1 = [];
                      $scope.assignData = {};
                      });
                  },100);
                  ClearModels();
                   toaster.success({title: "Success", body:"Forms Assigned Successfully!" ,tapToDismiss: true,showCloseButton: true});
              }, function(err) {
                  //console.log("Some Error Occured." + err);
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllEnquiryRecords(urlEnquiryList);
                      });
                  },100);
                   toaster.error({title: "Error", body:"Error in Assigning Forms!",tapToDismiss: true,showCloseButton: true});
              });


            }
            /*=====  End of Assign Send  ======*/
            

            /*====================================
            =            Save Enrollment            =
            ====================================*/
             $scope.saveEnrollment = function(data) {
                //console.log(data);
                data.adRoleId = '770D25781FE24E2B803F9287BB0CD934';

                if (data.eEnquiryFormId) {

                    //console.log("update");

                    if (!data.assignto) {
                      //console.log("assigned to self");
                      data.assignto = $sessionStorage.adUserId;
                    }

                    data.windowtype="Enrollment";
                    data.statusregistration = "Close";
                    if ($scope.OperType != undefined && $scope.OperType != 0) {

                    } else {
                      data.statusenroll="Draft";
                    }
                    
                    
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;
                    data.statusenquiry = "Close";

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
                            $route.reload();
                            });
                        },3000);

                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            // GetAllEnquiryRecords(urlEnquiryList);
                            $route.reload();
                            });
                        },3000);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {

                    if (!data.assignto) {
                      //console.log("assigned to self");
                      data.assignto = $sessionStorage.adUserId;
                    }

                    data.windowtype="Enrollment";
                    data.statusenroll="Draft";
                    data.statusenquiry = "Close";
                    data.statusregistration = "Close";
                    data.placementstatus = 'Open';
                    data.enquiryformno = $scope.currentBranchInitials + $scope.currentYear;
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.createdby = $sessionStorage.createdby;
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;

                    data.totalfee = $scope.calculatedFee;
                     data.amount = $scope.manualamount;
                     data.coursefee = $scope.totalFee;

                    data.reference = $scope.selectedStudent1;

                    
                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryForm'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllEnquiryRecords(urlEnquiryList);
                            });
                        },100);
                        //ClearModels();
                         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllEnquiryRecords(urlEnquiryList);
                            });
                        },100);

                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };
            /*=====  End of Save Enrollment  ======*/

            /*==============================================
            =            Update Enrollment Only            =
            ==============================================*/
            $scope.UpdateEnrollment = function(data) {
              //console.log("update");

                    data.windowtype="Enrollment";
                    data.statusregistration = "Close";
                    if ($scope.OperType != undefined && $scope.OperType != 0) {

                    } else {
                      data.statusenroll="Draft";
                    }
                    
                    
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;
                    data.statusenquiry = "Close";

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'updateEnquiryForm'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.eEnquiryFormId = pl.data.eEnquiryFormId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllEnquiryRecords(urlEnquiryList);
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllEnquiryRecords(urlEnquiryList);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
            }
            /*=====  End of Update Enrollment Only  ======*/
            
            /*======================================================
            =            Delete Enrollment Modal Funtion            =
            ======================================================*/
            $scope.delEnrollment = function(id, idata) {
               //console.log(id); 

             
              $scope.temp_var = $filter('filter')(idata, { "eEnquiryFormId": id });
                 //console.log("$scope.temp_var",$scope.temp_var);

                 $scope.deleteenrollmentData= {
                    "eEnquiryFormId": $scope.temp_var[0].eEnquiryFormId,
                    "firstname": $scope.temp_var[0].firstname
                 };
              }

              $scope.deleteEnrollment = function(id) {
              //console.log(id);
                  var FormData = {
                      id: id,
                      url: baseUrlSrvc.baseUrl + 'deleteEnquiryForm'
                  };
                  var promiseDelete = CRUD_SERVICE.delete(FormData);
                  promiseDelete.then(function(pl) {
                     $timeout(function() {
                              $scope.$apply(function () {
                              GetAllEnquiryRecords(urlEnquiryList);
                              });
                          },100);
                           toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                  }, function(err) {
                      //console.log("Some Error Occured." + err);
                      $timeout(function() {
                              $scope.$apply(function () {
                              GetAllEnquiryRecords(urlEnquiryList);
                              });
                          },100);
                           toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                  });
              }
            /*=====  End of Delete Institute Modal Funtion  ======*/

}]);
/*=====  End of Controller  ======*/