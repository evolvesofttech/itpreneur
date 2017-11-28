/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("enquiryCtrl", ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "Branch_Id", "$timeout", "Flash", "$rootScope", 
        "toaster","firstNameService","middleNameService","lastNameService","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, Branch_Id, $timeout, Flash, $rootScope, toaster, 
            firstNameService, middleNameService, lastNameService, $window) {

         $scope.enquiryArray = [];
         $scope.technologiesArray = [];
          $scope.OperType = $routeParams.ID;
           $scope.role = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;
           $window.document.title = "ITPreneur - Enquiry";
          // tabs
         $scope.viewGrid= $sessionStorage.userData1.inInstituteId;
         // $scope.windowtype  = "Enquiry";

          $scope.disableAllInput = true;
          $scope.user11 = {data_Enq: []};
          $scope.St_name = [];
          $scope.StName = [];
          // $scope.data_Enq = [];
          $scope.studentNameArray1 = [];

          //  $scope.Bid = Branch_Id.getBranch_Id();
          // //console.log($scope.Bid);

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

         $scope.user = {technology: []};

         
         /*=====================================================================
         =            Disable Enable Fields on New Existring Select            =
         =====================================================================*/
         $scope.enableAll = function() {
          $scope.disableAllInput = false;
          // $scope.showDyanmicCourseInfo = false;
          $scope.existing = false;
          $scope.pc = false;
          $scope.enquiryData = {};
          // $scope.showStaticCourseInfo = true;
         }

         $scope.enableAll1 = function() {
          $scope.disableAllInput = true;
          $scope.enquiryData = {};
          $scope.pc = true;
          // $scope.showDyanmicCourseInfo = true;
          // $scope.showStaticCourseInfo = false;
         }
         /*=====  End of Disable Enable Fields on New Existring Select  ======*/

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
      =            Student List            =
      ==================================*/
      $scope.branchChange = function(id) {
             //console.log(id);
              $scope.branchID = id;
             var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentByBranchId/'+id;
             var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
             promiseStudentGet.then(function(pl) {
                  $scope.Students = pl.data;

          //console.log($scope.Students);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });

            

            if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
              var LeadListUrl = baseUrlSrvc.baseUrl + 'listLeadInformationByBranchId/'+id;
            } else {
              var LeadListUrl = baseUrlSrvc.baseUrl + 'listLeadInformationByadUserIdAndBranchId/'+ $sessionStorage.adUserId + '/' +id + '/' + $sessionStorage.cRoleId;
            }

             var promiseLeadGet = CRUD_SERVICE.getAllData(LeadListUrl);
             promiseLeadGet.then(function(pl) {
                  $scope.Lead = pl.data;

                //console.log($scope.Lead);
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
      
      // $scope.OnStudentChange = function(id) {
           
      //        //console.log(id);
      //        var StudentUrl = baseUrlSrvc.baseUrl + 'listEnquiryFormbyId/'+id;
      //        var promiseStudentGet = CRUD_SERVICE.getAllData(StudentUrl);
      //        promiseStudentGet.then(function(pl) {
      //               $scope.registrationData1 =pl.data;
      //               $scope.registrationData = $scope.registrationData1[0];
      //               //console.log($scope.registrationData[0]);
      //            },
      //            function(errorPl) {
      //                $log.error('Some Error in Getting Records.', errorPl);
      //            });
      //     }


       $scope.leadChange = function(id) {

        $scope.dat = $scope.enquiryData.date;
       
         //console.log(id);
         $scope.disableAllInput = false;
         // $scope.showStaticCourseInfo = false;
         // $scope.showDyanmicCourseInfo = true;

         var LeadUrl = baseUrlSrvc.baseUrl + 'listLeadInformationById/'+id;
         var promiseLeadGet = CRUD_SERVICE.getAllData(LeadUrl);
         promiseLeadGet.then(function(pl) {
                $scope.enquiryData1 =pl.data;
                $scope.enquiryData = $scope.enquiryData1[0];
                //console.log($scope.enquiryData[0]);
                $scope.enquiryData.date = $scope.dat;
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
      =            Get Enquiry List            =
      ========================================*/

      if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
        var urlEnquiryList = baseUrlSrvc.baseUrl  + 'listEnquiryForm';
      } else {
        //var urlEnquiryList = baseUrlSrvc.baseUrl  + 'listEnquiryFormByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
        var urlEnquiryList = baseUrlSrvc.baseUrl  + 'listEnquiryByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
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

          /*======================================
          =            Change Student            =
          ======================================*/
          $scope.changeStudent = function(id, sdata) {
            //console.log(id);
              $scope.selectedStudent = $filter('filter')(sdata, { "eEnquiryFormId": id });

              $scope.selectedStudent1 = $scope.selectedStudent[0].lastname + ' ' + $scope.selectedStudent[0].firstname + ' ' + $scope.selectedStudent[0].middlename;
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

              } else {
                $scope.showStudent = false;
                $scope.showStaff = false;
              }
            }
            /*=====  End of Source Change Function  ======*/
            
            /*===============================================
            =            View Enquiry Function            =
            ===============================================*/
            $scope.viewEnquiry = function(id, idata) {
                 //console.log(id);
                $scope.temp_var = $filter('filter')(idata, { "eEnquiryFormId": id });
               //console.log("$scope.temp_var",$scope.temp_var);

               $scope.enquiryData= $scope.temp_var[0];
            }
            /*=====  End of View Enquiry Function  ======*/


            /*===============================================
            =            move Enquiry Function            =
            ===============================================*/
            $scope.moveEnquiry = function(id, idata) {
                 //console.log(id);
                $scope.temp_var = $filter('filter')(idata, { "eEnquiryFormId": id });
               //console.log("$scope.temp_var",$scope.temp_var);

              
            }
            /*=====  End of move Enquiry Function  ======*/


            /*============================================
            =            Clear Modal on Click            =
            ============================================*/
            $scope.clearModalOnClose = function() {
                $scope.enquiryData = {};
                
            }
            /*=====  End of Clear Modal on Click  ======*/

              /*============================================
            =            Clear Modal on Click            =
            ============================================*/
            $scope.clearModalOnClosetech = function() {
                $scope.enquiryData = {};
                $scope.user.cTechnologyMasterId = [];
                $scope.viewtechnologiesData = {};
                
            }
            /*=====  End of Clear Modal on Click  ======*/
            
            /*==============================================
            =            Clear Model After Save            =
            ==============================================*/
            function ClearModels() {
                $scope.enquiryData = {};
            }
            /*=====  End of Clear Model After Save  ======*/

            /*==================================================
            =            Get enquiry on Edit Page            =
            ==================================================*/
            if ($scope.OperType != undefined && $scope.OperType != 0) {
              $window.document.title = "ITPreneur - Edit Enquiry";
              var urlEnquiryList = baseUrlSrvc.baseUrl + 'listEnquiryFormbyId/'+ $scope.OperType;
                var promiseGet = CRUD_SERVICE.getAllData(urlEnquiryList);
                promiseGet.then(function(pl) {
                    $scope.enquiry = pl.data;
                    for (var i = 0; i < $scope.enquiry.length; i++) {
                        if ($scope.enquiry[i].eEnquiryFormId == $scope.OperType) {
                            $scope.enquiryData = $scope.enquiry[i];
                            //console.log($scope.enquiryData);
                            Branch_Id.addBranch_Id($scope.enquiryData.bBranchId);
                            firstNameService.addFirstName($scope.enquiryData.firstname);
                            middleNameService.addMiddleName($scope.enquiryData.middlename);
                            lastNameService.addLastName($scope.enquiryData.lastname);

                            $timeout(function() {
                            $scope.$apply(function () {
                              if ($scope.enquiryData.sourcename == "ITPreneur Student") {
                                $scope.showStudent = true;
                                $scope.showStaff = false;
                              } else {
                                $scope.showStudent = false;
                              }

                              if ($scope.enquiryData.sourcename == "ITPreneur Staff") {
                                $scope.showStudent = false;
                                $scope.showStaff = true;
                              } else {
                                $scope.showStaff = false;
                              }
                                });
                            },2000);

                            $scope.fname = $scope.enquiryData.firstname;
                            
                            $scope.mname = $scope.enquiryData.middlename;
                            $scope.lname = $scope.enquiryData.lastname;
                            //console.log($scope.fname);
                            //console.log($scope.mname);
                            //console.log($scope.lname);

                            $scope.fullName = $scope.fname + ' ' + $scope.mname + ' ' + $scope.lname;
                            //console.log($scope.fullName);

                            $scope.HighestQualification = [{
                              "cDegreeId":$scope.enquiryData.cDegreeId,
                              "degreename":$scope.enquiryData.degreename
                            }];

                           var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentByBranchId/'+$scope.enquiryData.bBranchId;
                           var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
                           promiseStudentGet.then(function(pl) {
                                $scope.Students = pl.data;
                                //console.log($scope.Students);
                               },
                               function(errorPl) {
                                   $log.error('Some Error in Getting Records.', errorPl);
                               });

                          var StaffListUrl = baseUrlSrvc.baseUrl + 'listUserDetailsByBranchId/'+$scope.enquiryData.bBranchId;
                          var promiseStaffGet = CRUD_SERVICE.getAllData(StaffListUrl);
                           promiseStaffGet.then(function(pl) {
                                $scope.Staff = pl.data;

                              //console.log($scope.Staff);
                               },
                               function(errorPl) {
                                   $log.error('Some Error in Getting Records.', errorPl);
                               });

                           
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

                        }
                    }
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
             }
            /*=====  End of GetEnquiry on Edit Page  ======*/

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
                   toaster.success({title: "Success", body:"Forms Assigned Successfully!",tapToDismiss: true,showCloseButton: true});
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
            =            Save Enquiry            =
            ====================================*/
             $scope.saveEnquiry = function(data) {
                //console.log(data);

                if (data.eEnquiryFormId) {

                    //console.log("update");
                   
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.updatedby = $sessionStorage.updatedby;
                    data.bBranchIdSession = $sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;

                    if (!data.assignto) {
                      //console.log("assigned to self");
                      data.assignto = $sessionStorage.adUserId;
                    }


                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryForm'
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
                } else {

                  if (data.eLeadinformationId) {

                    var AboutusListUrl = baseUrlSrvc.baseUrl + 'updateStatusByLeadInformation/' + data.eLeadinformationId + '/' + "Completed";
                    var promiseAboutusGet = CRUD_SERVICE.getAllData(AboutusListUrl);
                    promiseAboutusGet.then(function(pl) {
                          $scope.Aboutus = pl.data;
                    },
                    function(errorPl) {
                        $log.error('Some Error in Getting Records.', errorPl);
                    });

                  }

                    if (!data.assignto) {
                      //console.log("assigned to self");
                      data.assignto = $sessionStorage.adUserId;
                    }
                    
                    data.enquiryformno = $scope.currentBranchInitials + $scope.currentYear;
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.createdby = $sessionStorage.createdby;
                    data.updatedby = $sessionStorage.updatedby;
                    data.bBranchIdSession = $sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;
                    
                    data.placementstatus = 'Open';
                    data.windowtype = 'Enquiry';
                    data.statusenquiry = 'New';
                    data.reference = $scope.selectedStudent1;
                    data.date = $scope.currentDate;
                    //console.log(data.date);

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
                        ClearModels();
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
            /*=====  End of Save Enquiry  ======*/

            /*======================================================
            =            Delete Enquiry Modal Funtion            =
            ======================================================*/
            $scope.delEnquiry = function(id, idata) {
                 //console.log(id); 

               
                $scope.temp_var = $filter('filter')(idata, { "eEnquiryFormId": id });
                   //console.log("$scope.temp_var",$scope.temp_var);

                   $scope.deleteenquiryData= {
                      "eEnquiryFormId": $scope.temp_var[0].eEnquiryFormId,
                      "firstname": $scope.temp_var[0].firstname
                   };
                }

                $scope.deleteEnquiry = function(id) {
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

             /*======================================================
            =            Move Enquiry Modal Funtion            =
            ======================================================*/
            $scope.movEnquiry = function(id, idata) {
                 //console.log(id); 

               
                $scope.temp_var2 = $filter('filter')(idata, { "eEnquiryFormId": id });
                   //console.log("$scope.temp_var2",$scope.temp_var2);

                   $scope.moveenquiryData= $scope.temp_var2[0];

                   // $scope.id = eEnquiryFormId;
                   $scope.id1 = $scope.temp_var2[0].windowtype;
                   $scope.id2 = $scope.temp_var2[0].statusenquiry;
                }

                $scope.moveEnquiry = function(id, idata) {
                //console.log(id);
                var myvar = id;
                    // var FormData = {
                    //     id: myvar,
                    //     url: baseUrlSrvc.baseUrl + 'updateWindowsType/' + id +'/'+ $scope.id1 +'/'+ $scope.id2
                    // };
                    var movestatusenquiryListUrl = baseUrlSrvc.baseUrl + 'updateWindowsType/' + id +'/'+'Registration'+'/'+'Draft';
                    var promiseStudentGet = CRUD_SERVICE.getAllData(movestatusenquiryListUrl);
             promiseStudentGet.then(function(pl) {
                  $scope.Students = pl.data;
                  if ($scope.Students.code == 1) {
                        toaster.success({title: "Success", body:"Enquiry Form Moved Successfully to Application!",tapToDismiss: true,showCloseButton: true});
                      } else {
                        toaster.error({title: "Error", body:"Error in Moving Enquiry Form!",tapToDismiss: true,showCloseButton: true});
                      }


                      GetAllEnquiryRecords(urlEnquiryList);

                      //console.log($scope.Students);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
                }
            /*=====  End of Move Enquiry Modal Funtion  ======*/


            /*=============================================
            =            Technology controller            =
            =============================================*/
           

    /*======================================
    =            Get List technologies            =
    ======================================*/

    // //console.log($scope.fname);
    // //console.log($scope.mname);
    // //console.log($scope.lname);

    


        //   var f_name =firstNameService.getFirstName();
        // var m_name =middleNameService.getMiddleName();
        // var l_name =lastNameService.getLastName();

        // $scope.fullName = l_name + ' ' + f_name + ' ' + m_name;

         

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
    
    // function ClearModels() {
    //     $scope.addtechnologies = {};
    //     $scope.technologiesdata = {};
       
    //     $scope.viewtechnologiesData = {};
    // }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    // $scope.clearModalOnClose = function() {
    //     $scope.technologiesData = {};
         
    //     $scope.viewtechnologiesData = {};
    // }
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
        $scope.temp_var_a = $filter('filter')(bdata, { "eTechnologyId": id });

       $scope.viewtechnologiesData= {
          "eTechnologyId": $scope.temp_var_a[0].eTechnologyId,
          "technologyname": $scope.temp_var_a[0].technologyname
       };
    }
    /*=====  End of View technologies  ======*/
      
    

    $scope.savetechnology1 = function(data_a) {
        //console.log("Save function");
        //console.log(data_a);
         $scope.user.cTechnologyMasterId = [];

         var sch_data = $scope.course_id;
            $scope.school_array=[];

        if (data_a.eTechnologyId == undefined) {

             data_a.updatedby=$sessionStorage.updatedby;
           
            data_a.inInstituteId=$sessionStorage.inInstituteId;
             data_a.bBranchId=$sessionStorage.bBranchId;
             data_a.eEnquiryFormId = $scope.OperType;
            
            
            for(var i=0; i < sch_data.length; i++ )
            {
                $scope.school_array.push({'cTechnologyMasterId': sch_data[i], 'eEnquiryFormId': $scope.OperType, 'inInstituteId':$sessionStorage.inInstituteId, 'updatedby':$sessionStorage.updatedby, 'bBranchId':$sessionStorage.bBranchId});
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

             data_a.updatedby=$sessionStorage.updatedby;
             data_a.createdby=$sessionStorage.createdby;
            data_a.inInstituteId=$sessionStorage.inInstituteId;
             data_a.bBranchId=$sessionStorage.bBranchId;
             data_a.eEnquiryFormId = $scope.OperType;

            
            for(var i=0; i < sch_data.length; i++ )
            {
                $scope.school_array.push({'cTechnologyMasterId': sch_data[i], 'eEnquiryFormId': $scope.OperType, 'inInstituteId':$sessionStorage.inInstituteId, 'createdby':$sessionStorage.createdby, 'bBranchId':$sessionStorage.bBranchId});
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
          "technologyname": $scope.temp_var[0].technologyname
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
            //ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords_tech(urlList_a);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete technologies  ======*/

    

            
            /*=====  End of Technology controller  ======*/
            

}]);
/*=====  End of Controller  ======*/