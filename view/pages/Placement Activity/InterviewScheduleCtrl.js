/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("InterviewScheduleCtrl", ["$scope", "$log", "$filter", 
  "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, $window) {

         $scope.InterviewScheduleArray = [];
          $scope.OperType = $routeParams.ID;
          $scope.disableSendButton = false;
          $scope.disableEmail = true;

          $scope.user = {data_Placement: []};
          $scope.St_name = [];
          $scope.StName = [];
          $scope.Stat = [];
          $window.document.title = "ITPreneur - Interview Schedule";
          $scope.disableJobs = true;
          $scope.disableRounds = true;
           //$scope.role = $sessionStorage.userData1.roleName;

          // tabs
         $scope.viewGrid= $sessionStorage.userData1.inInstituteId;
         // $scope.windowtype  = "Enquiry";

         /*====================================
         =            Text angular            =
         ====================================*/
         var vm = this;
         vm.variable = '';
         vm.content = '';
          
          vm.getCursorPosition = function() {
            if(vm.variable){
              var sel, range;
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                //console.log(sel.getRangeAt(0))
                vm.rango = sel.getRangeAt(0);
                vm.rango.insertNode(document.createTextNode('['+vm.variable+']'));
                vm.variable = '';
                
                 return sel.getRangeAt(0);
              }
            }
          }
         
         
         /*=====  End of Text angular  ======*/
         

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

      /*======================================
      =            Checkbox Click            =
      ======================================*/
       $scope.check = function(value, checked, email, stname, contactno) {
         //console.log(value);
          ////console.log(email);
          ////console.log(stname);
          $scope.singleEmail = email;
          
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

         if($scope.user.data_Placement !=undefined)
         {
            var index=findIndexInData($scope.St_name, 'email', email);
            ////console.log(index);
            
            var idx = $scope.user.data_Placement.indexOf(value);
            var idx1 = $scope.St_name.indexOf(index);
            //console.log($scope.St_name);
            
         }
         
          if (idx >= 0 && !checked) {
            $scope.user.data_Placement.splice(idx, 1);
            //console.log("splice",$scope.user.data_Placement);

          }

          if (index >= 0 && !checked) {
            $scope.St_name.splice(index, 1);
          }
          // if (idx2 >= 0 && !checked) {
          //   $scope.StName.splice(idx2, 1);
          // }


          if (idx < 0 && checked) {
            $scope.user.data_Placement.push(value);
            //console.log("Push",$scope.user.data_Placement);

            

          }

          if (idx1 < 0 && checked) {
            $scope.St_name.push({"email":email,"name":stname, "contactno":contactno, "eEnquiryFormId":value});
          }

          //console.log("$scope.St_name",$scope.StName);


          $scope.studentNameArray = [];
          $scope.studentContact = [];
          $scope.studentNameArray1 = [];
           ////console.log($scope.user.data_Placement);

           ////console.log($scope.St_name);
           $scope.user_ID = $scope.user.data_Placement;
           for(var a=0;a<$scope.St_name.length;a++) {
            $scope.studentNameArray.push($scope.St_name[a].email);
            $scope.studentNameArray1.push($scope.St_name[a].name);
            $scope.studentContact.push({"contactno":$scope.St_name[a].contactno, "eEnquiryFormId":$scope.St_name[a].eEnquiryFormId});
           }

           //console.log("studentNameArray",$scope.studentNameArray);
           //console.log("studentContact",$scope.studentContact);
           $scope.studentnames = $scope.studentNameArray1;

        };
      
      
      /*=====  End of Checkbox Click  ======*/

      /*============================================
      =            Email Click Function            =
      ============================================*/
      $scope.emailClicked = function(emaildata) {
        //console.log(emaildata);

        $scope.emailHeading = emaildata;
      }
      /*=====  End of Email Click Function  ======*/      
      
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

      /*=====================================
      =            Template List            =
      =====================================*/
      var templateListUrl = baseUrlSrvc.baseUrl + 'listEmailTemplate';
      var promiseTemplateGet = CRUD_SERVICE.getAllData(templateListUrl);
      promiseTemplateGet.then(function(pl) {
          $scope.EmailTemplate = pl.data;
          //console.log($scope.EmailTemplate);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Template List  ======*/

      /*==================================
      =            Job Change            =
      ==================================*/
      $scope.jobChange = function(id) {
        data_Placement = [];
        //console.log(id);

        $scope.JobId = id;

        $scope.disableEmail = true;
        $scope.disableRounds = false;


        $scope.StudentList = [];
        var ListUrl1 = baseUrlSrvc.baseUrl + 'listClientJobRoundsByJobProfileId/' + id;
        var promiseGet1 = CRUD_SERVICE.getAllData(ListUrl1);
        promiseGet1.then(function(pl) {
            $scope.Round = pl.data;
            //console.log($scope.Round);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        var ListUrl2 = baseUrlSrvc.baseUrl + 'listClientJobProfileDegreeByClientJobProfileId/' + id;
        var promiseGet2 = CRUD_SERVICE.getAllData(ListUrl2);
        promiseGet2.then(function(pl) {
            $scope.JobProfileDegree = pl.data;
            //console.log("JobProfileDegree",$scope.JobProfileDegree);
            $scope.degArray = [];
            $scope.marks = "";
            for(var i=0;i<$scope.JobProfileDegree.length;i++) {
              $scope.marks = "Qualification: " + $scope.JobProfileDegree[i].qualificationname + "," +
              " Degree: " + $scope.JobProfileDegree[i].degreename + "," +
              " Specialization: " + $scope.JobProfileDegree[i].degreespecificationname + "," +
              " Percentage: " + $scope.JobProfileDegree[i].percentage + "," +
              " Year of Passing: " + $scope.JobProfileDegree[i].yearofpassing + "<br>";
              
              $scope.degArray.push($scope.marks);

            }
            //console.log("$scope.degArray",$scope.degArray);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        var ListUrl3 = baseUrlSrvc.baseUrl + 'listClientTechnologyByClientJobProfileId/' + id;
        var promiseGet3 = CRUD_SERVICE.getAllData(ListUrl3);
        promiseGet3.then(function(pl) {
            $scope.JobTechnology = pl.data;
            //console.log($scope.JobTechnology);

            $scope.tecArray = [];
            for(var i=0;i<$scope.JobTechnology.length;i++) {
              $scope.tecArray.push($scope.JobTechnology[i].technologyname);
            }
            //console.log($scope.tecArray);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        $scope.temp_var_job = $filter('filter')($scope.Job, { "clClientjobprofileId": id });
        //console.log("$scope.temp_var_job",$scope.temp_var_job);

        $scope.allJobData = $scope.temp_var_job[0];

          /*====================================
          =            Technologies            =
          ====================================*/
          var listTechOptionalUrl = baseUrlSrvc.baseUrl + 'listClientTechnologyOptionalByClientJobProfileId/' + $scope.JobId;
          var promiseOptionalGet = CRUD_SERVICE.getAllData(listTechOptionalUrl);
          promiseOptionalGet.then(function(pl) {
              $scope.OptTechData = pl.data;
              $scope.OptionalTech = [];
              for(var j=0;j<$scope.OptTechData.length;j++) {
                $scope.OptionalTech.push($scope.OptTechData[j].technologyname);
              }
              //console.log("$scope.OptionalTech",$scope.OptionalTech);

          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });

          var listTechCompUrl = baseUrlSrvc.baseUrl + 'listClientTechnologyCompulsoryByClientJobProfileId/' + $scope.JobId;
          var promiseCompGet = CRUD_SERVICE.getAllData(listTechCompUrl);
          promiseCompGet.then(function(pl) {
              $scope.CompTechData = pl.data;
              $scope.CompulsoryTech = [];
              for(var j=0;j<$scope.CompTechData.length;j++) {
                $scope.CompulsoryTech.push($scope.CompTechData[j].technologyname);
              }
              //console.log("$scope.CompulsoryTech",$scope.CompulsoryTech);

          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
          
          
          /*=====  End of Technologies  ======*/
          

        
      }
      /*=====  End of Job Change  ======*/

      /*=============================================
      =            Email Template Change            =
      =============================================*/
      $scope.emailTemplateChange = function(id) {

        // $scope.temp_var_email = $filter('filter')(bdata, { "eEmailtemplateId": id });

        //  //console.log($scope.temp_var_email);

        var urlListTags = baseUrlSrvc.baseUrl + 'listEmailTemplateByEmailtemplateId/' + id;
        GetAllTagRecords(urlListTags);

        //To Get All Records
        function GetAllTagRecords(url) {
            $scope.emailTagArray = [];
            var promiseTagGet = CRUD_SERVICE.getAllData(url);
            promiseTagGet.then(function (pl) {
                    $scope.EmailTemplateTagData2 = pl.data;
                    //console.log("$scope.EmailTemplateTagData2",$scope.EmailTemplateTagData2);
                    vm.content = $scope.EmailTemplateTagData2[0].text;
                    $scope.emailSubject = $scope.EmailTemplateTagData2[0].title;
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
      }
      /*=====  End of Email Template Change  ======*/
      
      
      /*===============================================
      =            Company Change Function            =
      ===============================================*/
      $scope.companyChange = function(id) {
        data_Placement = [];
        $scope.disableEmail = true;
         $scope.disableJobs = false;
         $scope.StudentList = [];
         $scope.companyId = id;

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
      
      

      /*========================================
      =            Get Student List            =
      ========================================*/
      $scope.InterviewScheduleChange = function(status) {
        $scope.disableSendButton = false;
        // $scope.disableEmail = false;
        //console.log(status);

        if (status == 'fifthround') {
          $scope.finalRound = true;
        } else {
          $scope.finalRound = false;
        }

        $scope.temp_var_round = $filter('filter')($scope.Round, { "round": status });
        //console.log("$scope.temp_var_round",$scope.temp_var_round);

        $scope.allRoData = $scope.temp_var_round[0];
        if ($scope.allRoData.round == 'firstround') {
          $scope.currentJobRound = 'First Round';
        }
        if ($scope.allRoData.round == 'seondround') {
          $scope.currentJobRound = 'Second Round';
        }
        if ($scope.allRoData.round == 'thirdround') {
          $scope.currentJobRound = 'Third Round';
        }
        if ($scope.allRoData.round == 'forthround') {
          $scope.currentJobRound = 'Fourth Round';
        }
        if ($scope.allRoData.round == 'fifthround') {
          $scope.currentJobRound = 'Fifth Round';
        }
        //console.log("$scope.currentJobRound",$scope.currentJobRound);
        //console.log("$scope.allRoData",$scope.allRoData);
        $scope.currentJobRoundLocation = $scope.allRoData.location;
        $scope.currentRoundInterviewDate = $scope.allRoData.interviewdate;

        $scope.StudentArray = [];
        $scope.roundStatus = status;
        var urlStudentList = baseUrlSrvc.baseUrl + 'listPlacementactivityByStatus/' + $scope.companyId + '/' + $scope.JobId + '/' + $scope.roundStatus;// + $scope.OperType;
        GetAllStudentRecords(urlStudentList);

        //To Get All Records
        function GetAllStudentRecords(url) {
            $scope.StudentArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.StudentList = pl.data;
                    $scope.StudentArray.push($scope.StudentList);
                    //console.log("$scope.StudentList",$scope.StudentList);

                    $scope.usersTable_InterviewSchedule = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.StudentList.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                        
                            $scope.data_InterviewSchedule = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
                            $scope.data_InterviewSchedule = params.filter() ? $filter('filter')($scope.data_InterviewSchedule, params.filter()) : $scope.data_InterviewSchedule;
                           $scope.data_InterviewSchedule = $scope.data_InterviewSchedule.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_InterviewSchedule)
                        }
                    });
                    $scope.usersTable_InterviewSchedule.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }

      }
      /*=====  End of Get Student List  ======*/

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
                  
                  //ClearModels();
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

    /*===================================
    =            Open Client            =
    ===================================*/
    
    $scope.openClientForm = function(id) {
      //console.log("id",id);

      var urlClientInfoList = baseUrlSrvc.baseUrl + 'listClientById/'+ id;
      var promiseclientGet = CRUD_SERVICE.getAllData(urlClientInfoList);
      promiseclientGet.then(function(pl) {
          $scope.client = pl.data;
          //console.log("=================",$scope.client);

          for (var i = 0; i < $scope.client.length; i++) {
              if ($scope.client[i].clClientId == id) {
                  $scope.clientData = $scope.client[i];

                  $scope.State = [{
                    "statename":$scope.clientData.statename,
                    "cStateId":$scope.clientData.cStateId,
                  }];

                  $scope.District = [{
                    "districtname":$scope.clientData.districtname,
                    "cDistrictId":$scope.clientData.cDistrictId,
                  }];
              }
          }
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

    }

     $scope.ngStateFocus = function() {

        var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
        var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseStateGet.then(function(pl) {
                $scope.State = pl.data;

                //console.log("State",$scope.State);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

        $scope.OnStateChange = function(id) {
            $scope.disableDistrict = false;
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

      }
    
    /*=====  End of Open Client  ======*/

     /*====================================
      =            Save client            =
      ====================================*/
       $scope.saveClientinfo = function(data) {
          //console.log(data);

          if (data.clClientId) {

              //console.log("update");
             
              data.inInstituteId = $sessionStorage.inInstituteId;
              data.updatedby = $sessionStorage.updatedby;
              data.bBranchId = $sessionStorage.bBranchId;
              data.adUserId = $sessionStorage.adUserId;

              var FormData = {
                  formdata: data,
                  url: baseUrlSrvc.baseUrl + 'addUpdateClient'
              };
              var promisePost = CRUD_SERVICE.post(FormData);
              promisePost.then(function(pl) {
                  $scope.clClientId = pl.data.clClientId;
                  $timeout(function() {
                      $scope.$apply(function () {
                      //GetAllClientInfoRecords(urlClientInfoList);
                      });
                  },100);
                   toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
              }, function(err) {
                  //console.log(err);
                  $timeout(function() {
                      $scope.$apply(function () {
                      //GetAllClientInfoRecords(urlClientInfoList);
                      });
                  },100);
                   toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
              });
          }
      };
      /*=====  End of Save Client  ======*/
    

      /*=====================================================================
      =            Student List For Refersh Aftrer Status Change            =
      =====================================================================*/
      //To Get All Records
      function GetAllStudentRecords(url) {
          $scope.StudentArray = [];
          var promiseGet = CRUD_SERVICE.getAllData(url);
          promiseGet.then(function (pl) {
                  $scope.StudentList = pl.data;
                  $scope.StudentArray.push($scope.StudentList);
                  //console.log("$scope.StudentList",$scope.StudentList);

                  $scope.usersTable_InterviewSchedule = new ngTableParams({
                      page: 1,
                      count: 10
                  }, {
                     total: $scope.StudentList.length, 
                      getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                      
                          $scope.data_InterviewSchedule = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
                          $scope.data_InterviewSchedule = params.filter() ? $filter('filter')($scope.data_InterviewSchedule, params.filter()) : $scope.data_InterviewSchedule;
                         $scope.data_InterviewSchedule = $scope.data_InterviewSchedule.slice((params.page() - 1) * params.count(), params.page() * params.count());
                         $defer.resolve($scope.data_InterviewSchedule)
                      }
                  });
                  $scope.usersTable_InterviewSchedule.reload();
              },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
      }
      
      
      /*=====  End of Student List For Refersh Aftrer Status Change  ======*/
      

      /*============================================
      =            Email Click Function            =
      ============================================*/
      $scope.statusClicked = function(stadata) {
        //console.log(stadata);

        $scope.statusHeading = stadata;
      }
      /*=====  End of Email Click Function  ======*/

      /*=====================================
      =            Email Clicked            =
      =====================================*/
      $scope.emailClicked = function(eml) {
        //console.log(eml);
        $scope.eml = eml;

      }
      /*=====  End of Email Clicked  ======*/
      
      /*=====================================================
      =            Qualification Post Graduation            =
      =====================================================*/
      var QuaListUrl = baseUrlSrvc.baseUrl + 'listEducationRequired';
      var promiseQuaGet = CRUD_SERVICE.getAllData(QuaListUrl);
      promiseQuaGet.then(function(pl) {
          $scope.Qualification = pl.data;

          //console.log($scope.Qualification);
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
      }
      /*=====  End of trainer change  ======*/

      /*==========================================
      =            Move to Next Modal            =
      ==========================================*/
      $scope.mToNext = function(id, bdata) {
        //console.log(id);

        $scope.temp_var_a = $filter('filter')(bdata, { "eEnquiryFormId": id });
        //console.log($scope.temp_var_a);

         $scope.viewMoveData = $scope.temp_var_a[0];
         console.log("mtonext",$scope.viewMoveData)
      }
      /*=====  End of Move to Next Modal  ======*/
      
       /*==========================================
      =            Move to Next Modal            =
      ==========================================*/
      $scope.Selectioninfo = function(eid, data) {
        //console.log(eid);
        //console.log("data",data);

        $scope.temp_var_b = $filter('filter')(data, { "eEnquiryFormId": eid });
        //console.log($scope.temp_var_b);

         $scope.selectionData = $scope.temp_var_b[0];
         //console.log("$scope.selectionData",$scope.selectionData);

      }

  
      /*=====  End of Move to Next Modal  ======*/
      

      /*====================================
      =            Move to Next            =
      ====================================*/
      $scope.moveToNext = function(rounddata) {
        console.log("rounddata",rounddata)

        if ($scope.InterviewScheduleData.status == 'firstround') {
          $scope.selStatus = 'secondround';
        }

        if ($scope.InterviewScheduleData.status == 'secondround') {
          $scope.selStatus = 'thirdround';
        }

        if ($scope.InterviewScheduleData.status == 'thirdround') {
          $scope.selStatus = 'forthround';
        }

        if ($scope.InterviewScheduleData.status == 'forthround') {
          $scope.selStatus = 'fifthround';
        }

        rounddata.roundstatus = $scope.selStatus;


        var FormData = {
            formdata: rounddata,
            url: baseUrlSrvc.baseUrl + 'updatePlacementactivityByStatusAndEnquiryformId'
        };
        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {



        //var stlist = baseUrlSrvc.baseUrl + 'updatePlacementactivityByStatusAndEnquiryformId/' + $scope.selStatus + '/' + id;
        //var promisestlistGet = CRUD_SERVICE.getAllData(url);
        //promisestlistGet.then(function(pl) {
            //$scope.StudntStatus = pl.data;

            //console.log($scope.StudntStatus);
            //if ($scope.StudntStatus.code == 1) {
              //toaster.success({title: "Success", body:$scope.StudntStatus.message,tapToDismiss: true,showCloseButton: true});
            //} else {
              //toaster.error({title: "Error", body:$scope.StudntStatus.message,tapToDismiss: true,showCloseButton: true});
            //}

            //list call
            //$scope.StudentArray = [];
            var urlStudentList = baseUrlSrvc.baseUrl + 'listPlacementactivityByStatus/' + $scope.companyId + '/' + $scope.JobId + '/' + $scope.roundStatus;// + $scope.OperType;
            GetAllStudentRecords(urlStudentList);

            //To Get All Records
            function GetAllStudentRecords(url) {
                $scope.StudentArray = [];
                var promiseGet = CRUD_SERVICE.getAllData(url);
                promiseGet.then(function (pl) {
                        $scope.StudentList = pl.data;
                        $scope.StudentArray.push($scope.StudentList);
                        //console.log("$scope.StudentList",$scope.StudentList);

                        $scope.usersTable_InterviewSchedule = new ngTableParams({
                            page: 1,
                            count: 10
                        }, {
                           total: $scope.StudentList.length, 
                            getData: function ($defer, params) {

                              if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                            
                                $scope.data_InterviewSchedule = params.sorting() ? $filter('orderBy')($scope.StudentArray[0], params.orderBy()) : $scope.StudentArray[0];
                                $scope.data_InterviewSchedule = params.filter() ? $filter('filter')($scope.data_InterviewSchedule, params.filter()) : $scope.data_InterviewSchedule;
                               $scope.data_InterviewSchedule = $scope.data_InterviewSchedule.slice((params.page() - 1) * params.count(), params.page() * params.count());
                               $defer.resolve($scope.data_InterviewSchedule)
                            }
                        });
                        $scope.usersTable_InterviewSchedule.reload();
                    },
                    function (errorPl) {
                        $log.error('Some Error in Getting Records.', errorPl);
                    });
            }
            //list call
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
      }
      
      
      /*=====  End of Move to Next  ======*/
      
      


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

      /*=====================================
      =            cource change            =
      =====================================*/
      
      $scope.courseChange = function(id){
        $scope.couId = id;
        //console.log($scope.couId);
      }
      
      /*=====  End of cource change  ======*/
      

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

       /*=====================================
      =            status change            =
      =====================================*/
      
      $scope.statusChange = function(id){
        $scope.staId = id;
        console.log($scope.staId);
      }
      
      /*=====  End of status change  ======*/

      /*===========================================
      =            batch List            =
      ===========================================*/
      var batchListUrl = baseUrlSrvc.baseUrl + 'listBatch';
      var promisebatchGet = CRUD_SERVICE.getAllData(batchListUrl);
      promisebatchGet.then(function(pl) {
          $scope.batch = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of batch List  ======*/

       /*=====================================
      =            batch change            =
      =====================================*/
      
      $scope.batchChange = function(id){
        $scope.batId = id;
        //console.log($scope.batId);
      }
      
      /*=====  End of batch change  ======*/


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

       /*=====================================
      =            technologies change            =
      =====================================*/
      
      $scope.technoChange = function(id){
        $scope.techId = id;
        //console.log($scope.techId);
      }
      
      /*=====  End of technologies change  ======*/

       /*=====================================
      =            Document change            =
      =====================================*/
      
      $scope.documentChange = function(id){
        $scope.docId = id;
        //console.log($scope.docId);
      }
      
      /*=====  End of Dacument change  ======*/

      /*=======================================
      =            Preview Clicked            =
      =======================================*/
      $scope.previewClicked = function(data1, data2) {
        $scope.previewClick = true;

        //console.log(data1);
        //console.log(data2);
        $scope.jobtitle = "<p> Job Title: " + data2.jobtitle + "</p>" + "\n";
        $scope.companyname = "<p> Company Name: " + data2.companyname + "</p>" + "\n";
        $scope.joblocation = "<p>Job Location: " + data2.joblocation + "</p>" + "\n";

        $scope.EData = $scope.jobtitle.concat($scope.companyname);
        $scope.EData = $scope.EData.concat($scope.joblocation);
        //console.log($scope.EData);
      }
      /*=====  End of Preview Clicked  ======*/

      /*============================================
      =            Email Click Function            =
      ============================================*/
      $scope.emailClickFunction = function(cid, jid) {
        //console.log(cid + '-----' +jid);
        // //console.log($scope.user_ID);

      }
      
      
      /*=====  End of Email Click Function  ======*/

      /*=====================================
      =            Email Preview            =
      =====================================*/
      $scope.saveEmailDataPreview = function(dat1,dat2) {

        //console.log(dat1);
        //console.log(dat2);

        $scope.saveTemplateArray = [];
        for(var j=0;j<$scope.studentNameArray.length;j++) {
         
          $scope.saveTemplateArray.push({"email":$scope.studentNameArray[j],"clClientId":$scope.companyId,"clClientjobprofileId":$scope.JobId,"name":$scope.studentNameArray1[j],"text":dat2});
          
        }

        //console.log("$scope.saveTemplateArray",$scope.saveTemplateArray);

      }
      /*=====  End of Email Preview  ======*/
      

      /*===========================================
      =            Send Email Function            =
      ===========================================*/
      $scope.saveEmailData = function(data1, data2) {
        //console.log(data1);
        //console.log(data2);

      
        $scope.saveTemplateArray = [];
        for(var j=0;j<$scope.studentNameArray.length;j++) {
         
          $scope.saveTemplateArray.push({"email":$scope.studentNameArray[j],"subject":$scope.emailSubject,"interviewdate":$scope.currentRoundInterviewDate,"round":$scope.currentJobRound,"location":$scope.currentJobRoundLocation,"marksrequired":$scope.degArray,"clClientId":$scope.companyId,"clClientjobprofileId":$scope.JobId,"name":$scope.studentNameArray1[j],"text":data2,"technologiescompulsory":$scope.CompulsoryTech,"technologiesoptional":$scope.OptionalTech});
          
        }
        //console.log($scope.saveTemplateArray);

        var FormData = {
            formdata: $scope.saveTemplateArray,
            url: baseUrlSrvc.baseUrl + 'sendEmailsForEmailTemplate'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {

   $timeout(function() {
                $scope.$apply(function () {
                
                });
            },100);
           
                toaster.success({title: "Success", body:"Email Send Successfully!",tapToDismiss: true,showCloseButton: true});
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
               
               toaster.error({title: "Error", body:"Error in Sending Email",tapToDismiss: true,showCloseButton: true});
                
              //ClearModels();
          });
      }
      /*=====  End of Send Email Function  ======*/

      /*=========================================
      =            Send SMS Function            =
      =========================================*/
      $scope.saveSMSData = function(data1) {
        //console.log(data1);
        ////console.log(data2);

      
        $scope.saveSMSArray = [];
        for(var j=0;j<$scope.studentContact.length;j++) {
          
          $scope.saveSMSArray.push({"contactno":$scope.studentContact[j].contactno,"messagebody":data1.message});
          // "Email":$scope.studentNameArray[j],
        }
        //console.log("saveSMSArray",$scope.saveSMSArray);

        var FormData = {
            formdata: $scope.saveSMSArray,
            url: baseUrlSrvc.baseUrl + 'sendSMSForSMSTemplate'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           
    $timeout(function() {
                $scope.$apply(function () {
                //$route.reload();
                //GetAllRecords(urlList);
                });
            },100);
           
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
      
      
      /*=====  End of Send SMS Function  ======*/
      

      /*===================================
      =            Save Status            =
      ===================================*/
      $scope.sendStatusData = function(data) {
        data.round = $scope.roundStatus;
        console.log("data",data);
        

        $scope.finalStatusData = [];
        //"eEnquiryFormId":$scope.user_ID[b],
        for(var b=0;b<$scope.St_name.length;b++) {
          $scope.finalStatusData.push({"eEnquiryFormId":$scope.user_ID[b], "roundstatusone": data.roundstatusone, "descriptionroundone": data.descriptionroundone,"clClientId":$scope.companyId,"clClientjobprofileId":$scope.JobId});
        }
        // var jsdata = JSON.stringify($scope.finalStatusData);
        // //console.log("jsdata",jsdata);

        var FormData = {
            formdata: $scope.finalStatusData,
            url: baseUrlSrvc.baseUrl + 'updatePlacementactivityStatusAndDescription/' + $scope.roundStatus
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           
        
           
            $timeout(function() {
                $scope.$apply(function () {
               
                var urlStudentList = baseUrlSrvc.baseUrl + 'listPlacementactivityByStatus/' + $scope.companyId + '/' + $scope.JobId + '/' + $scope.roundStatus;// + $scope.OperType;
                GetAllStudentRecords(urlStudentList);
                });
            },100);
    
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
      /*=====  End of Save Status  ======*/
      

      /*===========================================
      =            Send Advance  Function            =
      ===========================================*/
      // $scope.sendadvanceData = function(data1) {
      //   var AdvanceListUrl = baseUrlSrvc.baseUrl + 'listDacumentByEnquiryFormId';
      //   var promiseAdvanceGet = CRUD_SERVICE.getAllData(AdvanceListUrl);
      //   promiseAdvanceGet.then(function(pl) {
      //       $scope.dacument = pl.data;

      //       //console.log($scope.dacument);
      //   },
      //   function(errorPl) {
      //       $log.error('Some Error in Getting Records.', errorPl);
      //   });
      // }
      /*=====  End of Send Advance Function  ======*/
      
// }]);
/*=====  End of Controller  ======*/



/*=========================================
=            Selection  Controller            =
=========================================*/
// angular.module('theGuru').controller("selectionformCtrl", function($rootScope, $scope, $log, $routeParams, 
//   $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
//   ngTableParams, Flash, inst_id, toaster, Branch_Id) {
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.clientcpArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;


     $scope.yesChecked = function(){
      $scope.ye = true;
     }

     $scope.NoChecked = function(){
      $scope.no = false;
     }


     $scope.saveselection = function(data) {
        //console.log(data);

        if (data.eEnquirySelectionDetailsId) {
            
           data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            //data.bBranchId= $scope.bId;
            $scope.enqId = data.eEnquiryFormId; 
            data.adUserId = $sessionStorage.adUserId;
            //data.clClientId=$scope.companyId;
            //data.clClientjobprofileId=$scope.JobId;
            //data.eEnquiryFormId = $scope.enquiryId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquirySelectionDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.eEnquirySelectionDetailsId = pl.data.eEnquirySelectionDetailsId;
                $timeout(function() {
                    $scope.$apply(function () {
                    // GetAllselectionRecords(urlselectionList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    // GetAllselectionRecords(urlselectionList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

            data.updatedby=$sessionStorage.updatedby;
            data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            //data.eEnquiryFormId = $scope.enquiryId;
            //data.bBranchId= $scope.bId;
            data.adUserId = $sessionStorage.adUserId;
            //data.clClientId=$scope.companyId;
            //data.clClientjobprofileId=$scope.JobId;

            $scope.enqId = data.eEnquiryFormId; 

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquirySelectionDetails'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    // GetAllselectionRecords(urlselectionList);
                    updateStatusOfStudent($scope.enqId);
                    });
                },100);
                 
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                //}
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    // GetAllselectionRecords(urlselectionList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };

    /*=============================================
    =            Update Student Status            =
    =============================================*/
    function updateStatusOfStudent(id) {

      

    }
    
    
    /*=====  End of Update Student Status  ======*/
    

}]);
/*=====  End of clientcp Controller  ======*/