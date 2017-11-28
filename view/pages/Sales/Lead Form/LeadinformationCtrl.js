/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("leadinfoCtrl", ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster",
        "feedback_Cid","feedback_Bid","feedback_Eid",
        "branch_name","Form_no","course_fee","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, feedback_Cid, 
            feedback_Bid, feedback_Eid, branch_name, Form_no, course_fee, $window) {

         $scope.leadArray = [];
         $window.document.title = "ITPreneur - Lead";
          $scope.OperType = $routeParams.ID;
           $scope.role = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;

           $scope.disableAllInput = true;
           $scope.showStaticCourseInfo = true;
           $scope.showDyanmicCourseInfo = true;
          $scope.enquiryButton = false;
           $scope.status = "Incomplete"; 

           $scope.user11 = {data_Enq: []};
          $scope.St_name = [];
          $scope.StName = [];
          // $scope.data_Enq = [];
          $scope.studentNameArray1 = [];   

          // tabs
         $scope.viewGrid= $sessionStorage.userData1.inInstituteId;
         // $scope.windowtype  = "Enquiry";

         /*====================================
         =            Text angular            =
         ====================================*/
         var Inst = this;
         Inst.variable = '';
         Inst.content = '';
          
          Inst.getCursorPosition = function() {
            if(Inst.variable){
              var sel, range;
              sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                //console.log(sel.getRangeAt(0))
                Inst.rango = sel.getRangeAt(0);
                Inst.rango.insertNode(document.createTextNode('['+Inst.variable+']'));
                Inst.variable = '';
                
                 return sel.getRangeAt(0);
              }
            }
          }
         
         
         /*=====  End of Text angular  ======*/

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

      //      $scope.fullName = l_name + ' ' + f_name + ' ' + m_name;
      // //console.log($scope.fullName);

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
            
            var idx = $scope.user11.data_Enq.indexOf(index);
            var idx1 = $scope.St_name.indexOf(index);
             var index=findIndexInData($scope.St_name, 'name', stname, 'email', email);
            //console.log("St_name",$scope.St_name);
            
         }
         
          if (index >= 0 && !checked) {
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
            $scope.user11.data_Enq.push({'eLeadinformationId':value,'email':email});
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
          $scope.studentNameArray2 = [];
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

           for(var a=0;a<$scope.user11.data_Enq.length;a++) {
            // $scope.studentNameArray.push($scope.St_name[a].email);
            $scope.studentNameArray2.push({"email":$scope.user11.data_Enq[a].email});
            // $scope.studentContact.push({"eEnquiryFormId":$scope.St_name[a].eEnquiryFormId});
           }

           //console.log("$scope.studentNameArray2",$scope.studentNameArray2);
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
        $scope.user11.eLeadinformationId = $scope.data_leadinfo.map(function(item) { return item.eLeadinformationId; });
       
        //console.log($scope.data_leadinfo);
        $scope.user11.data_Enq = $scope.user11.eLeadinformationId;
        
        for(var a=0;a<$scope.data_leadinfo.length;a++) {
          $scope.studentNameArray1.push({"name":$scope.data_leadinfo[a].firstname + ' ' + $scope.data_leadinfo[a].middlename + ' ' + $scope.data_leadinfo[a].lastname });
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

      /*=====================================
      =            Template List            =
      =====================================*/
      var templateListUrl = baseUrlSrvc.baseUrl + 'listEmailTemplate';
      var promiseTemplateGet = CRUD_SERVICE.getAllData(templateListUrl);
      promiseTemplateGet.then(function(pl) {
          $scope.EmailTemplate = pl.data;
          //console.log("EmailTemplate",$scope.EmailTemplate);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Template List  ======*/

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
                    Inst.content = $scope.EmailTemplateTagData2[0].text;
                    $scope.emailSubject = $scope.EmailTemplateTagData2[0].title;
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
      }
      /*=====  End of Email Template Change  ======*/

      /*======================================================
      =            Branch Change for User Details            =
      ======================================================*/
      $scope.branchChangeForUser1 = function(id) {
        $scope.disableAssign = false;
        //console.log(id);
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

      /*===================================================
      =            Source Lead Change Function            =
      ===================================================*/
      $scope.showOther = false;
            
      $scope.otherChange = function(id, sdata) {
        // //console.log(name);

        //console.log(sdata);

        $scope.temp_var3 = $filter('filter')(sdata, { "cSourceofLeadId": id });
         // //console.log($scope.temp_var3[0]);
        var selectedname = $scope.temp_var3[0].sourceofleadname;

        if (selectedname == "Other") {  
          $scope.showOther = true;

        } else {
          $scope.showOther = false;
        }
      }
      /*=====  End of Source Lead Change Function  ======*/
      

     

       $scope.addLeadInfoClick = function() {
          var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
          var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
          promiseBranchGet.then(function(pl) {
              $scope.Branch = pl.data;
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
       }
      
      /*=====  End of branch list  ======*/

      /*=====================================
      =            Branch Change            =
      =====================================*/
      $scope.branchChange = function(id) {
         //console.log(id);
          $scope.branchID = id;

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


          var StaffListUrl = baseUrlSrvc.baseUrl + 'listUserDetailsByBranchId/'+id;
           var promiseStaffGet = CRUD_SERVICE.getAllData(StaffListUrl);
           promiseStaffGet.then(function(pl) {
                $scope.Staff = pl.data;

              //console.log($scope.Staff);
               },
               function(errorPl) {
                   $log.error('Some Error in Getting Records.', errorPl);
               });


            var StudentListUrl = baseUrlSrvc.baseUrl + 'listEnrollmentByBranchId/'+id;
             var promiseStudentGet = CRUD_SERVICE.getAllData(StudentListUrl);
             promiseStudentGet.then(function(pl) {
                  $scope.Students = pl.data;

                //console.log($scope.Students);
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });

      }
      /*=====  End of Branch Change  ======*/
      

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

      /*==============================================
      =            Source Change Function            =
      ==============================================*/
      $scope.showStudent = false;
      $scope.showStaff = false;
      $scope.sourceChange = function(id, sdata) {
        //console.log(name);

        $scope.temp_var2 = $filter('filter')(sdata, { "cSourceId": id });

        var selectedname = $scope.temp_var2[0].sourcename;

        if (selectedname == "ITPreneur Student") {
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
      
      /*===========================================
      =            Enquiry Status List            =
      ===========================================*/
      var AboutusListUrllead = baseUrlSrvc.baseUrl + 'listSourceofLead';
      var promiseAboutusGetlead = CRUD_SERVICE.getAllData(AboutusListUrllead);
      promiseAboutusGetlead.then(function(pl) {
          $scope.Leadsource = pl.data;
          // $scope.Leadsource.push({
          //       "cSourceofLeadId": '1', "sourceofleadname": 'Other'
          //     })

          //console.log("Hello", $scope.Leadsource);
          // $scope.Leadsource=[];

      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Enquiry Status List  ======*/
      
     /*======================================
     =            Get List Lead Information          =
     ======================================*/
     if ($scope.role == 'Admin' || $scope.role == 'ITP Admin') {
       var leadurlList = baseUrlSrvc.baseUrl + 'listLeadInformation';
     } else {
       var leadurlList = baseUrlSrvc.baseUrl  + 'listLeadInformationByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.cRoleId;
     }
     GetAllLeadRecords(leadurlList);

     //To Get All Records
     function GetAllLeadRecords(url) {
        $scope.leadinfoArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.leadinfo = pl.data;
                $scope.leadinfoArray.push($scope.leadinfo);
                //console.log("$scope.leadinfo",$scope.leadinfo);

                $scope.usersTable_leadinfo = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.leadinfo.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_leadinfo = params.sorting() ? $filter('orderBy')($scope.leadinfoArray[0], params.orderBy()) : $scope.leadinfoArray[0];
                        $scope.data_leadinfo = params.filter() ? $filter('filter')($scope.data_leadinfo, params.filter()) : $scope.data_leadinfo;
                       $scope.data_leadinfo = $scope.data_leadinfo.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_leadinfo)
                    }
                });
                $scope.usersTable_leadinfo.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
     }
    /*=====  End of Get List Lead Information  ======*/

    /*=========================================
    =            Add Enquiry Modal            =
    =========================================*/
    $scope.addEnquiryFromLead = function(id, data) {
        $scope.leadId = id;
      //console.log(id);
      $scope.temp_leaddata = $filter('filter')(data, { "eLeadinformationId": id });
     //console.log("$scope.temp_leaddata",$scope.temp_leaddata);

     $scope.enquiryData = $scope.temp_leaddata[0];

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
     

     var brnchName1 = $scope.temp_leaddata[0].branchname.replace(/[\. ,:-]+/g, "");
      var brnchName = brnchName1.toUpperCase();
      $scope.currentBranchInitials = brnchName.substring(0, 3);
      //console.log($scope.currentBranchInitials);


      var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
      var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
      promiseBranchGet.then(function(pl) {
          $scope.Branch = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });


       $scope.enquiryButton = true;

    }
    /*=====  End of Add Enquiry Modal  ======*/

            /*===============================================
            =            View Lead Info Function            =
            ===============================================*/
            $scope.viewleadinfo = function(id, idata) {
                 //console.log(id);
                $scope.temp_var = $filter('filter')(idata, { "eLeadinformationId": id });
               //console.log("$scope.temp_var",$scope.temp_var);

               var selectednameview = $scope.temp_var[0].sourceofleadname;

                if (selectednameview == "Other") {  
                  $scope.showOtherview = true;

                } else {
                  $scope.showOtherview = false;
                }

               $scope.viewleadinfoData= {
                  "eLeadinformationId": $scope.temp_var[0].eLeadinformationId,
                  "branchname": $scope.temp_var[0].branchname,
                  "firstname": $scope.temp_var[0].firstname,
                  "middlename": $scope.temp_var[0].middlename,
                  "lastname": $scope.temp_var[0].lastname,
                  "location": $scope.temp_var[0].location,                 
                  "contactno": $scope.temp_var[0].contactno,
                  "email": $scope.temp_var[0].email,
                  "leadtype": $scope.temp_var[0].leadtype,
                  "statusname": $scope.temp_var[0].statusname,
                  "firstnameuser":$scope.temp_var[0].firstnameuser,
                  "middlenameuser":$scope.temp_var[0].middlenameuser,
                  "lastnameuser":$scope.temp_var[0].lastnameuser,
                  "other":$scope.temp_var[0].other,
                  "sourceofleadname":$scope.temp_var[0].sourceofleadname
               };
            }
            /*=====  End of View Lead Info Function  ======*/
  /*=====================================
    =            View Activity            =
    =====================================*/
    $scope.viewLeadActivity = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "acActivityId": id });

       $scope.viewActivityData = $scope.temp_var_a[0];
       // $scope.viewActivityData.studentname = $scope.temp_var_a[0].firstname + ' ' + $scope.temp_var_a[0].middlename + ' ' + $scope.temp_var_a[0].lastname;
    }
    /*=====  End of View Activity  ======*/


      /*======================================================
      =            Branch Change for User Details            =
      ======================================================*/
      $scope.branchChangeForUser = function(id) {

        /*==================================
        =            Users List            =
        ==================================*/
        var userDetailsListUrl = baseUrlSrvc.baseUrl + 'listUserDetailByBranchId/' + id;
        var promiseUserDetailsGet = CRUD_SERVICE.getAllData(userDetailsListUrl);
        promiseUserDetailsGet.then(function(pl) {
            $scope.UserDetails = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
        /*=====  End of Users List  ======*/

      }
      /*=====  End of Branch Change for User Details  ======*/

            /*===================================
            =            Lead Change            =
            ===================================*/
            $scope.leadChange = function(id, data) {
              //console.log(id);
              //console.log(data);

              $scope.temp_var_lead = $filter('filter')(data, { "adUserId": id });

              $scope.user_detail_id = $scope.temp_var_lead[0].adUserdetailId;
               //console.log("$scope.user_detail_id",$scope.user_detail_id);


            }
            /*=====  End of Lead Change  ======*/
            
            

            /*============================================
            =            Clear Modal on Click            =
            ============================================*/
            $scope.clearModalOnClose = function() {
                $scope.viewleadinfoData = {};
                $scope.leadinfoData = {};
                //$scope.existing = false;
            }
            /*=====  End of Clear Modal on Click  ======*/
            
            /*==============================================
            =            Clear Model After Save            =
            ==============================================*/
            function ClearModels() {
                $scope.viewleadinfoData = {};
                $scope.leadinfoData = {};
            }
            /*=====  End of Clear Model After Save  ======*/

            /*==================================================
            =            Get Lead Info on Edit Page            =
            ==================================================*/
            if ($scope.OperType != undefined && $scope.OperType != 0) {
              // var userDetailsListUrl = baseUrlSrvc.baseUrl + 'listUserDetails';
              // var promiseUserDetailsGet = CRUD_SERVICE.getAllData(userDetailsListUrl);
              // promiseUserDetailsGet.then(function(pl) {
              //     $scope.UserDetails = pl.data;
              // },
              // function(errorPl) {
              //     $log.error('Some Error in Getting Records.', errorPl);
              // });
              $window.document.title = "ITPreneur - Edit Lead";

              var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
              var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
              promiseBranchGet.then(function(pl) {
                  $scope.Branch = pl.data;
              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });

              var leadurlList = baseUrlSrvc.baseUrl + 'listLeadInformationById/'+ $scope.OperType;
                var promiseGet = CRUD_SERVICE.getAllData(leadurlList);
                promiseGet.then(function(pl) {
                  
                    $scope.lead = pl.data;

                    for (var i = 0; i < $scope.lead.length; i++) {
                        if ($scope.lead[i].eLeadinformationId == $scope.OperType) {
                            $scope.leadinfoData = $scope.lead[i];
                            //console.log($scope.leadinfoData);

                            var fname = $scope.leadinfoData.firstname;
                            var mname = $scope.leadinfoData.middlename;
                            var lname = $scope.leadinfoData.lastname;

                            $scope.LeadFullName = fname + ' ' + mname + ' ' + lname; 

                            // var other = $scope.leadinfoData.sourceofleadname;
                            if ($scope.leadinfoData.sourceofleadname == "Other") {
                              $scope.showOther = true;
                            }
                            else{
                              $scope.showOther = false;
                            }

                            $scope.UserDetails = [{
                              "assignuser":$scope.leadinfoData.assignuser,
                              "lastnameuser":$scope.leadinfoData.lastnameuser,
                              "firstnameuser":$scope.leadinfoData.firstnameuser,
                              "middlenameuser":$scope.leadinfoData.middlenameuser
                            }];

                        }
                    }
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
             }
            /*=====  End of GetLead Info on Edit Page  ======*/


            /*===============================================
            =            move Enquiry Function            =
            ===============================================*/
            $scope.moveLead = function(id, idata) {
                 //console.log(id);
                 // $scope.leadId = id;
                 // $scope.status = "Completed";  

                $scope.temp_var = $filter('filter')(idata, { "eLeadinformationId": id });
               //console.log("$scope.temp_var",$scope.temp_var);

              
            }
            /*=====  End of move Enquiry Function  ======*/

            /*======================================
          =            Change Student            =
          ======================================*/
          $scope.changeStudent = function(id, sdata) {
            //console.log(id);
              $scope.selectedStudent = $filter('filter')(sdata, { "eEnquiryFormId": id });

              $scope.selectedStudent1 = $scope.selectedStudent[0].firstname + ' ' + $scope.selectedStudent[0].middlename; + ' ' + $scope.selectedStudent[0].lastname;
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

              $scope.selectedStudent1 = $scope.selectedStudent[0].firstname + ' ' + $scope.selectedStudent[0].middlename + ' ' + $scope.selectedStudent[0].lastname;
              //console.log("$scope.selectedStudent1",$scope.selectedStudent1);
          }
          
          
          /*=====  End of Change Staff  ======*/

          /*===================================
            =            Assign Send            =
            ===================================*/
            $scope.assignSubmit = function(adata) {

              //console.log(adata);
              $scope.selectedStudentIds = $scope.user11.data_Enq;
              //console.log("$scope.selectedStudentIds",$scope.selectedStudentIds);
              $scope.sendAssignArray = [];
              for(var i=0;i<$scope.selectedStudentIds.length;i++) {

                $scope.sendAssignArray.push({"assignuser":adata.assignuser,"eLeadinformationId":$scope.selectedStudentIds[i].eLeadinformationId});

              }

              //console.log("$scope.sendAssignArray",$scope.sendAssignArray);

              var FormData = {
                  formdata: $scope.sendAssignArray,
                  url: baseUrlSrvc.baseUrl + 'updateLeadInformationByMultipleLeadinformationId'
              };

              var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
              promisePut.then(function(pl) {
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllLeadRecords(leadurlList);
                      $scope.user11 = {data_Enq: []};
                      $scope.St_name = [];
                      $scope.StName = [];
                      $scope.studentNameArray1 = [];
                      $scope.assignData = {};
                      });
                  },100);
                  ClearModels();
                   toaster.success({title: "Success", body:"Lead Forms Assigned Successfully!",tapToDismiss: true,showCloseButton: true});
              }, function(err) {
                  //console.log("Some Error Occured." + err);
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllLeadRecords(leadurlList);
                      });
                  },100);
                   toaster.error({title: "Error", body:"Error in Assigning Lead Forms!",tapToDismiss: true,showCloseButton: true});
              });


            }
            /*=====  End of Assign Send  ======*/

            /*====================================
            =            Save Lead Info            =
            ====================================*/
             $scope.saveleadinfo = function(data) {
                //console.log(data);

                if (data.eLeadinformationId) {

                    //console.log("update");           
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;

                    if (!data.assignuser) {
                      data.assignuser = $sessionStorage.adUserId;
                    }

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateLeadInformation'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.eLeadinformationId = pl.data.eLeadinformationId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllLeadRecords(leadurlList);
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllLeadRecords(leadurlList);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {

                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.createdby = $sessionStorage.createdby;
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;
                    data.adUserdetailId = $scope.user_detail_id;

                    if (!data.assignuser) {
                      data.assignuser = $sessionStorage.adUserId;
                    }

                    
                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateLeadInformation'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllLeadRecords(leadurlList);
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllLeadRecords(leadurlList);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };
            /*=====  End of Save Lead Info  ======*/

            /*===========================================
            =            Send Email Function            =
            ===========================================*/
            $scope.saveEmailData = function(data1, data2) {
              //console.log(data1);
              //console.log(data2);
              //console.log($scope.user11.data_Enq);
              //console.log($scope.studentnames);

            
              $scope.saveTemplateArray = [];
              for(var j=0;j<$scope.user11.data_Enq.length;j++) {
               
                $scope.saveTemplateArray.push({"email":$scope.user11.data_Enq[j].email,"subject":$scope.emailSubject,"name":$scope.studentnames[j].name,"text":data2});
                
              }
              //console.log($scope.saveTemplateArray);

              var FormData = {
                  formdata: $scope.saveTemplateArray,
                  url: baseUrlSrvc.baseUrl + 'sendLeadEmailsForEmailTemplate'
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

            /*===========================================
            =            Send Email Function            =
            ===========================================*/
            $scope.saveEmailDataSingle = function(data1, data2, em) {
              //console.log(data1);
              //console.log(data2);
              //console.log($scope.user11.data_Enq);

            
              $scope.saveTemplateArray = [];
            
               
                $scope.saveTemplateArray.push({"email":em,"subject":$scope.emailSubject,"name":$scope.LeadFullName,"text":data2});
                
              
              //console.log($scope.saveTemplateArray);

              var FormData = {
                  formdata: $scope.saveTemplateArray,
                  url: baseUrlSrvc.baseUrl + 'sendLeadEmailsForEmailTemplate'
              };

              var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
              promisePut.then(function (pl) {

                $timeout(function() {
                        $scope.$apply(function () {
                        $route.reload();
                        //GetAllRecords(urlList);
                        });
                    },3000);
                 
                      toaster.success({title: "Success", body:"Email Send Successfully!",tapToDismiss: true,showCloseButton: true});
                  //}
                 
                  //ClearModels();
              }, function (err) {
                //console.log("Some Error Occured." + err);

                ////console.log("err.data",err.data);
                    
                   $timeout(function() {
                        $scope.$apply(function () {
                        $route.reload();
                        //GetAllRecords(urlList);
                        });
                    },100);
                     
                     toaster.error({title: "Error", body:"Error in Sending Email",tapToDismiss: true,showCloseButton: true});
                      
                    //ClearModels();
                });
            }
            /*=====  End of Send Email Function  ======*/

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
                            //GetAllEnquiryRecords(urlEnquiryList);
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            //GetAllEnquiryRecords(urlEnquiryList);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {

                  var AboutusListUrl = baseUrlSrvc.baseUrl + 'updateStatusByLeadInformation/' + $scope.leadId + '/' + "Completed";
                  var promiseAboutusGet = CRUD_SERVICE.getAllData(AboutusListUrl);
                  promiseAboutusGet.then(function(pl) {
                        $scope.Aboutus = pl.data;
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });

                    
                    data.enquiryformno = $scope.currentBranchInitials + $scope.currentYear;
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.createdby = $sessionStorage.createdby;
                    data.updatedby = $sessionStorage.updatedby;
                    data.bBranchIdSession = $sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;

                    if (!data.assignto) {
                      data.assignto = $sessionStorage.adUserId;
                    }
                    
                    data.windowtype = 'Enquiry';
                    data.statusenquiry = 'New';
                    data.reference = $scope.selectedStudent1;
                    // data.date = $scope.currentDate;
                    //console.log(data.date);
                    data.placementstatus = 'Open';

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryForm'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                            $scope.$apply(function () {
                              $route.reload();
                            });
                        },3000);
                         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            //GetAllEnquiryRecords(urlEnquiryList);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };
            /*=====  End of Save Enquiry  ======*/

            /*======================================================
            =            Delete Lead Info Modal Funtion            =
            ======================================================*/
            $scope.delleadinfo = function(id, idata) {
               //console.log(id); 

             
              $scope.temp_var_i = $filter('filter')(idata, { "eLeadinformationId": id });
                 //console.log("$scope.temp_var_i",$scope.temp_var_i);

                 $scope.deleteleadinfoData= {
                    "eLeadinformationId": $scope.temp_var_i[0].eLeadinformationId,
                    "firstname": $scope.temp_var_i[0].firstname
                 };
              }

              $scope.deleteleadinfo = function(id) {
              //console.log(id);
                  var FormData = {
                      id: id,
                      url: baseUrlSrvc.baseUrl + 'deleteLeadInformation'
                  };
                  var promiseDelete = CRUD_SERVICE.delete(FormData);
                  promiseDelete.then(function(pl) {
                     $timeout(function() {
                              $scope.$apply(function () {
                              GetAllLeadRecords(leadurlList);
                              });
                          },100);
                           toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                  }, function(err) {
                      //console.log("Some Error Occured." + err);
                      $timeout(function() {
                              $scope.$apply(function () {
                              GetAllLeadRecords(leadurlList);
                              });
                          },100);
                           toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                  });
              }
            /*=====  End of Delete Lead Info Funtion  ======*/

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
            

            /**
             *
             * Activity Controller
             *
             */

             /*====================================
             =            Clear Models            =
             ====================================*/
             $scope.clearModalOnCloseActivity = function() {
              $scope.leadactivitiesData = {};
              $scope.leadactivitiesData.activitystatus = 'Pending';
              $scope.leadactivitiesData.activityagainst = 'Lead';
             }

             function ClearModels() {
              $scope.leadactivitiesData = {};
              $scope.leadactivitiesData.activitystatus = 'Pending';
              $scope.leadactivitiesData.activityagainst = 'Lead';
             }
             /*=====  End of Clear Models  ======*/
             

             /*==========================================
            =            Full Payment Click            =
            ==========================================*/
            $scope.EditHideActivityStatus = function() {
              //console.log(); 
               $scope.hideActivityStatus= false;
            }
            /*=====  End of Full Payment Click  ======*/

            /*=============================================
            =            Partial Payment Click            =
            =============================================*/
            $scope.AddHideActivityStatus = function() {
              $scope.headingMessage = "Add Activity";
             
               $scope.hideActivityStatus= true;
            }
            /*=====  End of Partial Payment Click  ======*/

            /*======================================
            =            Get List enquiryactivities            =
            ======================================*/
            //1 Mean New Entry
            var urlList_a = baseUrlSrvc.baseUrl + 'listActivityByLeadinformationId/' + $scope.OperType;
            GetAllRecords_act(urlList_a);

            //To Get All Records
            function GetAllRecords_act(url) {
                $scope.enquiryactivitiesArray = [];
                var promiseGet = CRUD_SERVICE.getAllData(url);
                promiseGet.then(function (pl) {
                        $scope.enquiryactivities = pl.data;
                        $scope.enquiryactivitiesArray.push($scope.enquiryactivities);
                        //console.log("$scope.enquiryactivities",$scope.enquiryactivities);

                        $scope.usersTable_enquiryactivities = new ngTableParams({
                            page: 1,
                            count: 10
                        }, {
                           total: $scope.enquiryactivities.length, 
                            getData: function ($defer, params) {

                              if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                            
                                $scope.data_enquiryactivities = params.sorting() ? $filter('orderBy')($scope.enquiryactivitiesArray[0], params.orderBy()) : $scope.enquiryactivitiesArray[0];
                                $scope.data_enquiryactivities = params.filter() ? $filter('filter')($scope.data_enquiryactivities, params.filter()) : $scope.data_enquiryactivities;
                               $scope.data_enquiryactivities = $scope.data_enquiryactivities.slice((params.page() - 1) * params.count(), params.page() * params.count());
                               $defer.resolve($scope.data_enquiryactivities)
                            }
                        });
                        $scope.usersTable_enquiryactivities.reload();
                    },
                    function (errorPl) {
                        $log.error('Some Error in Getting Records.', errorPl);
                    });
            }
            /*=====  End of Get List enquiryactivities  ======*/

            /*=====================================
            =            Edit Activity            =
            =====================================*/
            $scope.editLeadActivity = function(id) {
              $scope.headingMessage = "Add Activity";
              var urlEditActivityList = baseUrlSrvc.baseUrl + 'listActivityByLeadinformationId/' + $scope.OperType;
                var promiseEditActivityGet = CRUD_SERVICE.getAllData(urlEditActivityList);
                promiseEditActivityGet.then(function(pl) {
                    $scope.editAct = pl.data;
                    for (var i = 0; i < $scope.editAct.length; i++) {
                        if ($scope.editAct[i].acActivityId == id) {
                            $scope.leadactivitiesData = $scope.editAct[i];
                            //console.log($scope.leadactivitiesData);
                            
                        }
                    }
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });

            }
            /*=====  End of Edit Activity  ======*/
            

            /*=====================================
            =            Save Activity            =
            =====================================*/
            $scope.saveActivities = function (data) {
                //console.log("$scope.StorageData",$scope.StorageData);
                if (data.acActivityId) {

                    data.updatedby=$sessionStorage.updatedby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                    data.bBranchId=$sessionStorage.bBranchId;
                    data.eLeadinformationId = $scope.OperType;
                    data.adUserId = $sessionStorage.adUserId;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateActivity'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function (pl) {
                        $scope.acActivityId = pl.data.acActivityId;
                       
                       $timeout(function() {
                            $scope.$apply(function () {
                            //$

                            
                            GetAllRecords_act(urlList_a);
                            ClearModels();
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                        
                        ClearModels();
                    }, function (err) {
                        //console.log(err);
                        
                        $timeout(function() {
                            $scope.$apply(function () {
                            //$route.reload();
                            ClearModels();
                            GetAllRecords_act(urlList_a);
                            });
                        },100);
                        toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                         
                        ClearModels();
                    });
                } else {
                     data.updatedby=$sessionStorage.updatedby;
                     data.createdby=$sessionStorage.createdby;
                    data.inInstituteId=$sessionStorage.inInstituteId;
                     data.bBranchId=$sessionStorage.bBranchId;
                     data.eLeadinformationId = $scope.OperType;
                     data.adUserId = $sessionStorage.adUserId;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateActivity'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function (pl) {
                       
                       var batch = pl.batch;
                       var promiseData = pl.data;
                       //console.log("batch",batch);
                       //console.log("promiseData",promiseData);
                       
                        if (promiseData.code == 2) {
                            
                            toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                        } else {
                            toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                        }
                             GetAllRecords_act(urlList_a);
                        // Flash.create('success', $scope.SuccessMessage);
                       
                        ClearModels();
                        //}
                    }, function (err) {
                        //console.log("Some Error Occured." + err);

                        //console.log("err.data",err.data);
                         
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                           GetAllRecords_act(urlList_a);
                        ClearModels();
                    });
                }
            };
            /*=====  End of Save Activity  ======*/

}]);
/*=====  End of Controller  ======*/