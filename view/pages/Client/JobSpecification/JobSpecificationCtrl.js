/*=========================================
=            Job Spec Controller            =
=========================================*/
angular.module('theGuru').controller("jobCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
  ngTableParams, Flash, inst_id, toaster, $window) {
       
      //console.log("jobCtrl");
      // ////console.log("test");
      
      //$scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
      $scope.JobArray = [];
      $scope.JobRoundArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
      $scope.Technologies_Course = [];
      $scope.Technologies_Course_Opt = [];
      $scope.Technologies_Degree = [];
      $scope.user = {Technologies_Course: []};
      $scope.user2 = {Technologies_Course_Opt: []};
      $scope.user1 = {Technologies_Degree: []};
      $scope.editStateCheckbox = [];
      $scope.editTechOptionalCheckbox = [];

      $scope.disableSpecialization = true;
      $scope.disableDegree = true;
      $scope.disableValidTo = true;
      $scope.disableSalaryFrom = true;
      $scope.add = false;
      $scope.edit = false;



      /*============================
      =            Tabs            =
      ============================*/
      this.Jobs = 1;
      //console.log("aaaa",this.Jobs);

      this.setTab1 = function(tabId) {
          this.Jobs = tabId;
          ////console.log(this.Jobs);
      };

      this.isSet1 = function(tabId) {
          return this.Jobs === tabId;
          ////console.log(this.Jobs);
      };
      /*=====  End of Tabs  ======*/

      $scope.addJobDegreeClick = function(){
        $scope.add = true;
        $scope.edit = false;
      }

       $scope.addJobroundsClick = function(){
        $scope.add = true;
        $scope.edit = false;
      }


      function ClearModels() {
            $scope.jobData = {};
            $scope.jobRoundData = {};
            $scope.jobDegreeData = {};
      }


      $scope.clearModalOnCloseJobRounds = function(){
        $scope.jobRoundData = {};
        $scope.viewRoundData = {};
      }

       $scope.clearModalOnCloseJobDegrees = function(){
        $scope.jobDegreeData = {};
        $scope.viewDegreeData = {};
      }

      $scope.clearModalOnCloseSchedule = function(){
        $scope.jobData = {};
        $scope.viewJobData = {};
        $scope.user.cTechnologyMasterId = [];
        $scope.user2.cTechnologyMasterId = [];
      }

      /*=====================================
      =            Dropdown Demo            =
      =====================================*/

      // var QDSListUrl = baseUrlSrvc.baseUrl + 'listQualificationDegreeAndDegreeSpecification';
      // var promisQDSGet = CRUD_SERVICE.getAllData(QDSListUrl);
      // promisQDSGet.then(function(pl) {
      //     $scope.QDSData1 = pl.data;
      //     $scope.QDSData = $scope.QDSData1[0].children;
      //     //console.log("$scope.QDSData",$scope.QDSData);
      // },
      // function(errorPl) {
      //     $log.error('Some Error in Getting Records.', errorPl);
      // });

     // $scope.quaChecked = function(a) {
     //  //console.log(a);
     // }
     // $scope.list = $scope.QDSData;
     // //console.log("list",$scope.list);

     // $scope.list = [{
     //    name: 'BOX 2B',
     //    opened: true,
     //    children: [{
     //      name: 'Température',
     //      id: 'tempMean',
     //      children: [{
     //        name: 'Température 1',
     //        id: "temp1"
     //      }, {
     //        name: 'Température 2',
     //        id: "temp2"
     //      }, {
     //        name: 'Température 3',
     //        id: "temp3"
     //      }]
     //    }, {
     //      name: 'Présence',
     //      id: "presence"
     //    }]
     //  }];

      // $scope.toggleAllCheckboxes = function($event) {
      //   var i, item, len, ref, results, selected;
      //   selected = $event.target.checked;
      //   ref = $scope.list;
      //   results = [];
      //   for (i = 0, len = ref.length; i < len; i++) {
      //     item = ref[i];
      //     item.selected = selected;
      //     if (item.children != null) {
      //       results.push($scope.$broadcast('changeChildren', item));
      //     } else {
      //       results.push(void 0);
      //     }
      //   }
      //   return results;
      // };
      // $scope.initCheckbox = function(item, parentItem) {
      //   return item.selected = parentItem && parentItem.selected || item.selected || false;
      // };
      // $scope.toggleCheckbox = function(item, parentScope) {
      //   //console.log(item);
      //   //console.log(parentScope);
      //   if (item.children != null) {
      //     $scope.$broadcast('changeChildren', item);
      //   }
      //   if (parentScope.item != null) {
      //     return $scope.$emit('changeParent', parentScope);
      //   }
      // };
      // $scope.$on('changeChildren', function(event, parentItem) {
      //   var child, i, len, ref, results;
      //   ref = parentItem.children;
      //   results = [];
      //   for (i = 0, len = ref.length; i < len; i++) {
      //     child = ref[i];
      //     child.selected = parentItem.selected;
      //     if (child.children != null) {
      //       results.push($scope.$broadcast('changeChildren', child));
      //     } else {
      //       results.push(void 0);
      //     }
      //   }
      //   return results;
      // });
      // return $scope.$on('changeParent', function(event, parentScope) {
      //   var children;
      //   children = parentScope.item.children;
      //   parentScope.item.selected = $filter('selected')(children).length === children.length;
      //   parentScope = parentScope.$parent.$parent;
      //   if (parentScope.item != null) {
      //     return $scope.$broadcast('changeParent', parentScope);
      //   }
      // });
      
      /*=====  End of Dropdown Demo  ======*/
      

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

      /*============================
      =            Back            =
      ============================*/
      $scope.go_back = function() { 
          window.history.back();
      };
      /*=====  End of Back  ======*/

      /*=========================================
      =            Technologies List            =
      =========================================*/
      var TechListUrl = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
      var promiseTechGet = CRUD_SERVICE.getAllData(TechListUrl);
      promiseTechGet.then(function(pl) {
          $scope.Technologies_Course = pl.data;
          //$scope.Technologies_Course1 = pl.data;
          //console.log("Technologies_Course",$scope.Technologies_Course);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Technologies List  ======*/

      /*===================================
      =            Stream List            =
      ===================================*/
      var qualifyListUrl = baseUrlSrvc.baseUrl + 'listQualificationMaster';
      var promisequalifyGet = CRUD_SERVICE.getAllData(qualifyListUrl);
      promisequalifyGet.then(function(pl) {
          $scope.Qualification = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Qualification List  ======*/

      /*============================================
      =            State Checkbox Click            =
      ============================================*/
      $scope.check = function(value, checked) {
        //////console.log($scope.user.State);
        // ////console.log($scope.user.State)
     
         if($scope.user.Technologies_Course !=undefined)
         {
            var idx = $scope.user.Technologies_Course.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user.Technologies_Course.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user.Technologies_Course.push(value);
          }

          //console.log($scope.user.Technologies_Course);
          $scope.selectedTechnologies = $scope.user.Technologies_Course;
          //console.log("$scope.selectedTechnologies",$scope.selectedTechnologies);
           // $scope.seletedStateCheckbox = $scope.user.State;

           /*=============================================
            =            Check Checkbox Length            =
            =============================================*/
            if ($scope.user.Technologies_Course.length == 0) {
              $scope.disableFormCheckbox = false;
            }

            if ($scope.user.Technologies_Course.length > 0) {
              $scope.disableFormCheckbox = true;
            }
            /*=====  End of Check Checkbox Length  ======*/
      };
      /*=====  End of State Checkbox Click  ======*/

      /*===========================================
      =            Optional Tech Check            =
      ===========================================*/
      $scope.checkOptional = function(value, checked) {
        //////console.log($scope.user.State);
        // ////console.log($scope.user.State)
     
         if($scope.user2.Technologies_Course_Opt !=undefined)
         {
            var idx = $scope.user2.Technologies_Course_Opt.indexOf(value); 
         }
         
          if (idx >= 0 && !checked) 
          {
            $scope.user2.Technologies_Course_Opt.splice(idx, 1);
          }

          if (idx < 0 && checked)
          {
            $scope.user2.Technologies_Course_Opt.push(value);
          }

          //console.log($scope.user2.Technologies_Course_Opt);
          $scope.selectedTechnologies1 = $scope.user2.Technologies_Course_Opt;
          //console.log("$scope.selectedTechnologies1",$scope.selectedTechnologies1);

           /*=============================================
            =            Check Checkbox Length            =
            =============================================*/
            if ($scope.user2.Technologies_Course_Opt.length == 0) {
              $scope.disableFormCheckbox = false;
            }

            if ($scope.user2.Technologies_Course_Opt.length > 0) {
              $scope.disableFormCheckbox = true;
            }
            /*=====  End of Check Checkbox Length  ======*/
      };
      /*=====  End of Optional Tech Check  ======*/
      

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
        
        today1 = yyyy+'-'+mm+'-'+ (dd - 1);
        //console.log("today1",today1);
        $scope.currentDate =today;
        $scope.currentDate1 =today1;
        //console.log("$scope.currentDate",$scope.currentDate);
       /*=====  End of Get Current Date  ======*/
      
      /*========================================
      =            From Date Change            =
      ========================================*/
      $scope.fromDateChange = function(fromdate) {
        //console.log(fromdate);
        $scope.disableValidTo = false;
        $scope.minDateValidation = fromdate;
      }
      /*=====  End of From Date Change  ======*/

      /*==================================================
      =            Multiple Checkbox Dropdown            =
      ==================================================*/
      $scope.example16model = []; 
      $scope.example17model = []; 
      
      $scope.example16data = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}]; 
      $scope.example16settings = {styleActive: true,displayProp: 'technologyname'};
      $scope.example17settings = {styleActive: true,displayProp: 'technologyname'};
      //console.log($scope.example16model);

      $scope.setSelectedItemComp = function(a, b, c) {
        
        $scope.selTechComp = a;
        //console.log("$scope.selTechComp",$scope.selTechComp);

        $scope.selCompTech = [];
        for(var i=0;i<$scope.selTechComp.length;i++) {
          $scope.selCompTech.push({"cTechnologyMasterId":$scope.selTechComp[i].cTechnologyMasterId,"technologyname":$scope.selTechComp[i].technologyname, "isoptional":"No"});
        }

        //console.log("$scope.selCompTech",$scope.selCompTech);
      }

      $scope.setSelectedItemOpt = function(a, b, c) {
        
        $scope.selTechOpt = a;
        //console.log("$scope.selTechOpt",$scope.selTechOpt);

        $scope.selOptTech = [];
        for(var i=0;i<$scope.selTechOpt.length;i++) {
          $scope.selOptTech.push({"cTechnologyMasterId":$scope.selTechOpt[i].cTechnologyMasterId, "isoptional":"Yes"});
        }

        //console.log("$scope.selOptTech",$scope.selOptTech);
      }

      
      /*=====  End of Multiple Checkbox Dropdown  ======*/
      
      
      /*==========================================
      =            Salary From Change            =
      ==========================================*/
      $scope.salaryFromChange = function(minlakh) {
        //console.log(minlakh);
        $scope.disableSalaryFrom = false;
        $scope.minLakhValidation = minlakh;
        var min = minlakh - 1 ;
         ////console.log("min",min);

        /*====================================
        =            Salary Array            =
        ====================================*/
        $scope.SalaryTo1 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
        $scope.SalaryTo = $scope.SalaryTo1.slice(min,20);
        /*=====  End of Salary Array  ======*/
      }
      /*=====  End of Salary From Change  ======*/

      /*=====================================
      =            Stream Change            =
      =====================================*/
      $scope.streamChange = function(id) {
          ////console.log(id);
         var DegreeListUrl = baseUrlSrvc.baseUrl + 'listDegreeByEducationRequiredId/'+id;
          var promiseDegreeGet = CRUD_SERVICE.getAllData(DegreeListUrl);
          promiseDegreeGet.then(function(pl) {
              $scope.Degree = pl.data;
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
      }
      /*=====  End of Stream Change  ======*/

      /*=================================================
      =            Update Job Profile Status            =
      =================================================*/
      $scope.changeJobStatus = function(id, status) {
          //console.log(id);
          //console.log(status);
         var changeStatusUrl = baseUrlSrvc.baseUrl + 'updateClientJobProfileStatus/' + id + '/' + status;
          var promiseChangeStatus = CRUD_SERVICE.getAllData(changeStatusUrl);
          promiseChangeStatus.then(function(pl) {
              $scope.JobStatus = pl.data;
              //console.log($scope.JobStatus);

              if ($scope.JobStatus.code==0) {
                toaster.error({title: "Error", body:$scope.JobStatus.message,tapToDismiss: true,showCloseButton: true});
              } else {
                GetAllJobRecords(urlJobList);
                toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
              }
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
      }
      /*=====  End of Update Job Profile Status  ======*/
      
      
        /*==============================================
        =            Job Status Change in Table            =
        ==============================================*/
        $scope.OnJobStatusChange = function() {
          ////console.log("OnJobStatusChange");
        }
        /*=====  End Job of Status Change in Table  ======*/
      
    /*=============================================
    =            Get Job Profile By Id            =
    =============================================*/
    var urlJobList = baseUrlSrvc.baseUrl + 'listClientJobProfileByClientId/' + $scope.OperType;
    GetAllJobRecords(urlJobList);

    //To Get All Records
    function GetAllJobRecords(url) {
        $scope.JobArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Job = pl.data;
                $scope.JobArray.push($scope.Job);
                ////console.log("$scope.Job",$scope.Job);

                $scope.usersTable_Job = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Job.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                    
                        $scope.data_Job = params.sorting() ? $filter('orderBy')($scope.JobArray[0], params.orderBy()) : $scope.JobArray[0];
                        $scope.data_Job = params.filter() ? $filter('filter')($scope.data_Job, params.filter()) : $scope.data_Job;
                       $scope.data_Job = $scope.data_Job.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Job)
                    }
                });
                $scope.usersTable_Job.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get Job Profile By Id  ======*/

    /*======================================
    =            Get Round List            =
    ======================================*/
    var urlJobRoundList = baseUrlSrvc.baseUrl + 'listClientJobRoundsByJobProfileId/' + $scope.OperType;
    GetAllJobRoundRecords(urlJobRoundList);

    //To Get All Records
    function GetAllJobRoundRecords(url) {
        $scope.JobRoundArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.JobR = pl.data;
                $scope.JobRoundArray.push($scope.JobR);
                ////console.log("$scope.JobR",$scope.JobR);

                //to hide rounds in already added
                for(var i=0;i<$scope.JobR.length;i++) {

                  if ($scope.JobR[i].round == 'firstround') {
                    $scope.hide1 = true;
                  }

                  if ($scope.JobR[i].round == 'secondround') {
                    $scope.hide2 = true;
                  }

                  if ($scope.JobR[i].round == 'thirdround') {
                    $scope.hide3 = true;
                  }

                  if ($scope.JobR[i].round == 'forthround') {
                    $scope.hide4 = true;
                  }

                  if ($scope.JobR[i].round == 'fifthround') {
                    $scope.hide5 = true;
                  }

                }

                $scope.usersTable_JobRounds = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.JobR.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                    
                        $scope.data_jobrounds = params.sorting() ? $filter('orderBy')($scope.JobRoundArray[0], params.orderBy()) : $scope.JobRoundArray[0];
                        $scope.data_jobrounds = params.filter() ? $filter('filter')($scope.data_jobrounds, params.filter()) : $scope.data_jobrounds;
                       $scope.data_jobrounds = $scope.data_jobrounds.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_jobrounds)
                    }
                });
                $scope.usersTable_JobRounds.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get Round List  ======*/
    
    /*=====================================================
    =            Get Degrees by Job Profile Id            =
    =====================================================*/
     var urlJobDegreeList = baseUrlSrvc.baseUrl + 'listClientJobProfileDegreeByClientJobProfileId/' + $scope.OperType;
    GetAllJobDegreeRecords(urlJobDegreeList);

    //To Get All Records
    function GetAllJobDegreeRecords(url) {
        $scope.JobDegreeArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.JobDegree = pl.data;
                $scope.JobDegreeArray.push($scope.JobDegree);
                //console.log("$scope.JobDegree",$scope.JobDegree);

                $scope.usersTable_JobDegree = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.JobDegree.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                    
                        $scope.data_jobdegrees = params.sorting() ? $filter('orderBy')($scope.JobDegreeArray[0], params.orderBy()) : $scope.JobDegreeArray[0];
                        $scope.data_jobdegrees = params.filter() ? $filter('filter')($scope.data_jobdegrees, params.filter()) : $scope.data_jobdegrees;
                       $scope.data_jobdegrees = $scope.data_jobdegrees.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_jobdegrees)
                    }
                });
                $scope.usersTable_JobDegree.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get Degrees by Job Profile Id  ======*/

    /*============================================
    =            Qualification Change            =
    ============================================*/
    $scope.qualificationChange = function(id) {

      $scope.disableDegree = false;

      var DegreeListUrl = baseUrlSrvc.baseUrl + 'listDegreeByQualificationMasterId/'+id;
      var promiseDegreeGet = CRUD_SERVICE.getAllData(DegreeListUrl);
      promiseDegreeGet.then(function(pl) {
          $scope.Degree = pl.data;

          //console.log($scope.Degree);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

    }
    /*=====  End of Qualification Change  ======*/
    
    /*=====================================
    =            Degree Change            =
    =====================================*/
    $scope.degreeChange = function(id, data) {

      $scope.disableSpecialization = false;

      var DegreeSpecListUrl = baseUrlSrvc.baseUrl + 'listDegreeSpecificationByDegreeId/'+id;
      var promiseDegreeSpecGet = CRUD_SERVICE.getAllData(DegreeSpecListUrl);
      promiseDegreeSpecGet.then(function(pl) {
          $scope.DegreeSpecialization = pl.data;

          //console.log($scope.DegreeSpecialization);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

    }
    
    
    /*=====  End of Degree Change  ======*/
    
    

     /*==========================================
    =            Edit Job            =
    ==========================================*/
    $scope.editJob = function(id) {
         ////console.log(id);

         var officeListUrl = baseUrlSrvc.baseUrl + 'listJob';
          var promiseOfficeGet = CRUD_SERVICE.getAllData(officeListUrl);
          promiseOfficeGet.then(function(pl) {
              $scope.EnquiryOffice = pl.data;
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          }); 

        var promiseGet = CRUD_SERVICE.getAllData(officeListUrl);
        promiseGet.then(function (pl) {
                $scope.office_a = pl.data;
                for (var i = 0; i < $scope.office_a.length; i++) {
                    if ($scope.office_a[i].clClientjobprofileId == id) {
                        $scope.officeData = $scope.office_a[i];
                    }
                }
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit Qualification  ======*/

    /*=========================================================
    =            Get Job Profile Data on Next Page            =
    =========================================================*/
    if ($scope.OperType != undefined && $scope.OperType != 0) {

      $window.document.title = "ITPreneur - Edit Job Specification";

      var urlJobProfile1List = baseUrlSrvc.baseUrl + 'listClientJobProfileById/'+ $scope.OperType;
        var promiseJobProfile1Get = CRUD_SERVICE.getAllData(urlJobProfile1List);
        promiseJobProfile1Get.then(function(pl) {
            $scope.jobProfileData = pl.data;
            for (var i = 0; i < $scope.jobProfileData.length; i++) {
                if ($scope.jobProfileData[i].clClientjobprofileId == $scope.OperType) {
                    $scope.jobData = $scope.jobProfileData[i];
                    $scope.currentClientId = $scope.jobData.clClientId;
                    var min = $scope.jobData.minsalarylakh - 1;
                    /*====================================
                    =            Salary Array            =
                    ====================================*/
                    $scope.SalaryTo1 = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
                    $scope.SalaryTo = $scope.SalaryTo1.slice(min,20);
                    /*=====  End of Salary Array  ======*/

                    //console.log($scope.currentClientId);
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        var listTechMaster = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
          var promiseTechmaster = CRUD_SERVICE.getAllData(listTechMaster);
          promiseTechmaster.then(function(pl) {
              $scope.Technologies_Course = pl.data;
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          }); 



           var listTechUrl = baseUrlSrvc.baseUrl + 'listClientTechnologyCompulsoryByClientJobProfileId/' + $scope.OperType;
              var promiselistTechGet = CRUD_SERVICE.getAllData(listTechUrl);
              promiselistTechGet.then(function(pl) {
                  $scope.Technologies_Course1 = pl.data;


                  var listTechMaster = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
                  var promiseTechmaster = CRUD_SERVICE.getAllData(listTechMaster);
                  promiseTechmaster.then(function(pl) {
                      $scope.Technologies_Course = pl.data;
                      $scope.Technologies_Course_Opt = pl.data;

                      for(var j=0;j<$scope.Technologies_Course1.length;j++) {
                        $scope.editStateCheckbox.push($scope.Technologies_Course1[j].cTechnologyMasterId);
                      }
                      //console.log("$scope.editStateCheckbox",$scope.editStateCheckbox);

                      $scope.user = {
                        Technologies_Course: $scope.editStateCheckbox
                      };
                      $scope.selectedTechnologies = $scope.user.Technologies_Course;

                      
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  }); 

              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              }); 

              /*==============================================
              =            Set Optional Dropdowns            =
              ==============================================*/
              $timeout(function() {
                    $scope.$apply(function () {
                      var listTechOptionalUrl = baseUrlSrvc.baseUrl + 'listClientTechnologyOptionalByClientJobProfileId/' + $scope.OperType;
                        var promiseOptionalGet = CRUD_SERVICE.getAllData(listTechOptionalUrl);
                        promiseOptionalGet.then(function(pl) {
                            $scope.Technologies_Course1 = pl.data;

                            for(var j=0;j<$scope.Technologies_Course1.length;j++) {
                                $scope.editTechOptionalCheckbox.push($scope.Technologies_Course1[j].cTechnologyMasterId);
                              }
                              //console.log("$scope.editTechOptionalCheckbox",$scope.editTechOptionalCheckbox);

                              $scope.user2 = {
                                Technologies_Course_Opt: $scope.editTechOptionalCheckbox
                              };
                              $scope.selectedTechnologies1 = $scope.user2.Technologies_Course_Opt;
                              //console.log("selectedTechnologies1",$scope.selectedTechnologies1);
                        },
                        function(errorPl) {
                            $log.error('Some Error in Getting Records.', errorPl);
                        });
                  });
              },2000);
              /*=====  End of Set Optional Dropdowns  ======*/
              
              
        }
    /*=====  End of Get Job Profile Data on Next Page  ======*/
    

    /*=======================================
    =            Job Round Array            =
    =======================================*/
    $scope.JobRounds = [{

    }];
    /*=====  End of Job Round Array  ======*/
    $scope.addRow = function() {
      var rond = {
        rounddescription: $scope.rounddescription,
        interviewdate: $scope.interviewdate
      };
      $scope.JobRounds.push(rond);
    }

    $scope.removeRow = function(index) {
      $scope.JobRounds.splice(index,1);
    }

    /*=======================================
    =            View Job      =
    =======================================*/
   // $scope.viewJob = function(id, idata) {
   //       ////console.log(id);
   //      $scope.temp_var = $filter('filter')(idata, { "clClientjobprofileId": id });
   //     //console.log("$scope.temp_var",$scope.temp_var);

   //     $scope.jobData= $scope.temp_var[0];

       
   //  }
    /*=====  End of View Office Use  ======*/

    /*================================
    =            Save Job            =
    ================================*/
     $scope.saveJob = function(data) {
        //console.log(data);
        $scope.user.cTechnologyMasterId = [];
        $scope.user2.cTechnologyMasterId = [];

        if (data.clClientjobprofileId) {
            
            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            $scope.saveArray1 = [];
            $scope.saveArray = [];
            
            
              // for(var j = 0; j<$scope.selectedTechnologies.length;j++) {
              //   $scope.saveArray1.push({"clClienttechnologyId1":$scope.selectedTechnologies[j],"createdby": $sessionStorage.createdby, "updatedby": $sessionStorage.updatedby, "bBranchId": $sessionStorage.bBranchId, "inInstituteId": $sessionStorage.inInstituteId, "clientJobProfile" : data}); //"clClientjobroundId":$scope.roundArray[j]
              // }
              for(var j = 0; j<$scope.selectedTechnologies.length;j++) {
                $scope.saveArray1.push({"clClienttechnologyId1":$scope.selectedTechnologies[j],"isoptional":"No","createdby": $sessionStorage.createdby, "updatedby": $sessionStorage.updatedby, "bBranchId": $sessionStorage.bBranchId, "inInstituteId": $sessionStorage.inInstituteId, "clientJobProfile" : data}); //"clClientjobroundId":$scope.roundArray[j]
              }

              for(var k = 0; k<$scope.selectedTechnologies1.length;k++) {
                $scope.saveArray1.push({"clClienttechnologyId1":$scope.selectedTechnologies1[k],"isoptional":"Yes","createdby": $sessionStorage.createdby, "updatedby": $sessionStorage.updatedby, "bBranchId": $sessionStorage.bBranchId, "inInstituteId": $sessionStorage.inInstituteId, "clientJobProfile" : data}); //"clClientjobroundId":$scope.roundArray[j]
              }

              //console.log($scope.saveArray1);

            //$scope.saveArray.push({"clientJobRoundsList":$scope.saveArray1});

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientJobProfile'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.clClientjobprofileId = pl.data.clClientjobprofileId;
                $timeout(function() {
                    $scope.$apply(function () {
                    //GetAllJobRecords(urlJobList);
                    // call for another api
                    saveTechnology($scope.saveArray1);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                // ClearModels();
            }, function(err) {
                ////console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobRecords(urlJobList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                  // ClearModels();
            });
        } else {

          ////console.log("in Save");

            data.updatedby=$sessionStorage.updatedby;
            data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.clClientId=$scope.OperType;
            data.jobstatus = "Open";

            $scope.saveArray1 = [];
            $scope.saveArray = [];

            // $scope.selCompTech = $scope.selCompTech.concat($scope.selOptTech);
            // //console.log("$scope.selCompTech",$scope.selCompTech);
            
            
              for(var j = 0; j<$scope.selectedTechnologies.length;j++) {
                $scope.saveArray1.push({"clClienttechnologyId1":$scope.selectedTechnologies[j],"isoptional":"No","createdby": $sessionStorage.createdby, "updatedby": $sessionStorage.updatedby, "bBranchId": $sessionStorage.bBranchId, "inInstituteId": $sessionStorage.inInstituteId, "clientJobProfile" : data}); //"clClientjobroundId":$scope.roundArray[j]
              }
              for(var k = 0; k<$scope.selectedTechnologies1.length;k++) {
                $scope.saveArray1.push({"clClienttechnologyId1":$scope.selectedTechnologies1[k],"isoptional":"Yes","createdby": $sessionStorage.createdby, "updatedby": $sessionStorage.updatedby, "bBranchId": $sessionStorage.bBranchId, "inInstituteId": $sessionStorage.inInstituteId, "clientJobProfile" : data}); //"clClientjobroundId":$scope.roundArray[j]
              }
              // for(var j = 0; j<$scope.selCompTech.length;j++) {
              //   $scope.saveArray1.push({"clClienttechnologyId1":$scope.selCompTech[j].cTechnologyMasterId,"isoptional":$scope.selCompTech[j].isoptional,"createdby": $sessionStorage.createdby, "updatedby": $sessionStorage.updatedby, "bBranchId": $sessionStorage.bBranchId, "inInstituteId": $sessionStorage.inInstituteId, "clientJobProfile" : data}); //"clClientjobroundId":$scope.roundArray[j]
              // }

            $scope.saveArray.push({"saveArray1":$scope.saveArray1});



            
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientJobProfile'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobRecords(urlJobList);
                    saveTechnology($scope.saveArray1);
                    //saveRounds($scope.roundArray);
                    });
                },100);
                 // if (promiseData.code == 2) {
                //    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                // } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                      ClearModels();
                //}
            }, function(err) {
                ////console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobRecords(urlJobList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                   ClearModels();
            });
        }
    };
    /*=====  End of Save Job  ======*/

    /*=======================================
    =            Save Technology            =
    =======================================*/
    function saveTechnology(data) {
      //console.log(data);

      var FormData = {
          formdata: data,
          url: baseUrlSrvc.baseUrl + 'addUpdateClientJobProfileTechnology'
      };

      var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
      promisePut.then(function(pl) {
          $timeout(function() {
              $scope.$apply(function () {
              GetAllJobRecords(urlJobList);
              //saveTechnology($scope.saveArray1);
              //saveRounds($scope.roundArray);
              });
          },100);
           // if (promiseData.code == 2) {
          //    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
          // } else {
              toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          //}
      }, function(err) {
          ////console.log("Some Error Occured." + err);
          $timeout(function() {
              $scope.$apply(function () {
              GetAllJobRecords(urlJobList);
              });
          },100);
           toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
      });
    }
    /*=====  End of Save Technology  ======*/
    

    /*==================================
    =            Edit Round            =
    ==================================*/
    $scope.editJobRound = function(id) {
      $scope.edit = true;
      $scope.add = false;
      var promisejobroundGet = CRUD_SERVICE.getAllData(urlJobRoundList);
      promisejobroundGet.then(function (pl) {
          $scope.round_a = pl.data;
          for (var i = 0; i < $scope.round_a.length; i++) {
              if ($scope.round_a[i].clClientjobroundId == id) {
                  $scope.jobRoundData = $scope.round_a[i];
                  ////console.log($scope.jobRoundData);
              }
          }
      },
      function (errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
    }
    
    /*=====  End of Edit Round  ======*/
    
    /*======================================
    =            View Job Round            =
    ======================================*/
    $scope.viewJob = function(id, idata) {
         ////console.log(id);
         ////console.log(idata);
        $scope.temp_var_j = $filter('filter')(idata, { "clClientjobprofileId": id });
       //console.log("$scope.temp_var_j",$scope.temp_var_j);

       $scope.viewJobData= $scope.temp_var_j[0];

       var listTechUrl = baseUrlSrvc.baseUrl + 'listClientTechnologyByClientJobProfileId/' + id;
        var promiselistTechGet = CRUD_SERVICE.getAllData(listTechUrl);
        promiselistTechGet.then(function(pl) {
            $scope.viewTech = pl.data;
            //console.log("viewTech",$scope.viewTech);

        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        }); 
    }
    /*=====  End of View Job Round  ======*/


     /*======================================
    =            View  Round            =
    ======================================*/
    $scope.viewJobRound = function(id, idata) {
         ////console.log(id);
         ////console.log(idata);
        $scope.temp_var_a = $filter('filter')(idata, { "clClientjobroundId": id });
       ////console.log("$scope.temp_var_j",$scope.temp_var_j);

       $scope.viewRoundData= $scope.temp_var_a[0];
    }
    /*=====  End of View Round  ======*/
    

    /*===================================
    =            Save Rounds            =
    ===================================*/
    $scope.saveJobRound = function(data) {
        ////console.log(data);

        if (data.clClientjobroundId) {

            
           
            data.inInstituteId = $sessionStorage.inInstituteId;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $sessionStorage.bBranchId;
            data.adUserId - $sessionStorage.adUserId;
            data.clClientjobprofileId  = $scope.OperType;


            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientJobRounds'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.clClientId = pl.data.clClientId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobRoundRecords(urlJobRoundList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            }, function(err) {
                ////console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobRoundRecords(urlJobRoundList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            });
        } else {

            data.inInstituteId = $sessionStorage.inInstituteId;
            data.createdby = $sessionStorage.createdby;
            data.updatedby = $sessionStorage.updatedby;
            data.adUserId = $sessionStorage.adUserId;
            data.bBranchId = $sessionStorage.bBranchId;
            data.clClientjobprofileId  = $scope.OperType;
            data.clClientId = $scope.currentClientId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientJobRounds'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobRoundRecords(urlJobRoundList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            }, function(err) {
                ////console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobRoundRecords(urlJobRoundList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            });
        }
    };
    /*=====  End of Save Rounds  ======*/
    

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
         /*=====  End of Get Current Date  ======*/


    /*============================================
    =            Delete Job            =
    ============================================*/
    $scope.delJob = function(id, bdata) {
         ////console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "clClientjobprofileId": id });

       $scope.deleteJobData= {
          "clClientjobprofileId": $scope.temp_var[0].clClientjobprofileId,
          "jobprofile": $scope.temp_var[0].jobprofile
       };
     }

    $scope.deleteJob = function (id) {
        ////console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteClientJobProfile'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllofficeFilterRecords(urlgapFilterList);
                    GetAllJobRecords(urlJobList);

                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        }, function (err) {
            ////console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    // GetAllGapFilterRecords(urlgapFilterList);
                    GetAllJobRecords(urlJobList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete Job  ======*/

    /*=====================================
    =            Delete Rounds            =
    =====================================*/
    $scope.delJobRound = function(id, bdata) {
         ////console.log(id); 
        $scope.temp_var_p = $filter('filter')(bdata, { "clClientjobroundId": id });

       $scope.deleteJobRoundData= $scope.temp_var_p[0];
     }

    $scope.deleteJobRound = function (id, round) {

        //to show round in list on delete
        if (round == 'firstround') {
          $scope.hide1 = false;
        }

        if (round == 'secondround') {
          $scope.hide2 = false;
        }

        if (round == 'thirdround') {
          $scope.hide3 = false;
        }

        if (round == 'forthround') {
          $scope.hide4 = false;
        }

        if (round == 'fifthround') {
          $scope.hide5 = false;
        }

        ////console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteClientJobRounds'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllofficeFilterRecords(urlgapFilterList);
                    GetAllJobRoundRecords(urlJobRoundList);

                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        }, function (err) {
            ////console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    // GetAllGapFilterRecords(urlgapFilterList);
                    //GetAllJobRecords(urlJobList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete Rounds  ======*/

    /**
     *
     * Degrees
     *
     */
    
    /*=========================================
    =            Graduation Change            =
    =========================================*/
    $scope.graduationChange = function(id) {
      //console.log(id);

      var degListUrl = baseUrlSrvc.baseUrl + 'listDegreeByQualificationMasterId/' + id;
      var promiseDegGet = CRUD_SERVICE.getAllData(degListUrl);
      promiseDegGet.then(function(pl) {
          $scope.Technologies_Degree = pl.data;

          //console.log($scope.Technologies_Degree);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
    }
    /*=====  End of Graduation Change  ======*/

    /*======================================
    =            Check Function            =
    ======================================*/
     $scope.check1 = function(value, checked) {
        //////console.log($scope.user.State);
        // ////console.log($scope.user.State)
     
         if($scope.user1.Technologies_Degree !=undefined)
         {
            var idx_a = $scope.user1.Technologies_Degree.indexOf(value); 
         }
         
          if (idx_a >= 0 && !checked) 
          {
            $scope.user1.Technologies_Degree.splice(idx_a, 1);
          }

          if (idx_a < 0 && checked)
          {
            $scope.user1.Technologies_Degree.push(value);
          }

          
          $scope.selectedDegrees = $scope.user1.Technologies_Degree;
          //console.log($scope.selectedDegrees);
      };
    /*=====  End of Check Function  ======*/

    /*=======================================
    =            Edit Job Degree            =
    =======================================*/
    $scope.editJobDegree = function(id, data) {

      $scope.disableSpecialization = false;
      $scope.disableDegree = false;
      $scope.edit = true;
      $scope.add = false;
      var qualifyListUrl = baseUrlSrvc.baseUrl + 'listQualificationMaster';
      var promisequalifyGet = CRUD_SERVICE.getAllData(qualifyListUrl);
      promisequalifyGet.then(function(pl) {
          $scope.Qualification = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

      


      var JobDegListUrl = baseUrlSrvc.baseUrl + 'listClientJobProfileDegreeByClientjobprofiledegreeId/' +id;
      var promiseGet = CRUD_SERVICE.getAllData(JobDegListUrl);
        promiseGet.then(function (pl) {
          $scope.deg1 = pl.data;
          //console.log($scope.deg1);
          for (var i = 0; i < $scope.deg1.length; i++) {
              if ($scope.deg1[i].clClientjobprofiledegreeId == id) {
                  $scope.jobDegreeData = $scope.deg1[i];
                  $scope.qua_id = $scope.jobDegreeData.cQualificationmasterId;
                  $scope.deg_id = $scope.jobDegreeData.cDegreeId;
                  //console.log($scope.qua_id);
                  //console.log($scope.deg_id);
                 
                    //console.log($scope.jobDegreeData);

                  var DegreeListUrl = baseUrlSrvc.baseUrl + 'listDegreeByQualificationMasterId/' + $scope.qua_id;
                  var promiseDegreeGet = CRUD_SERVICE.getAllData(DegreeListUrl);
                  promiseDegreeGet.then(function(pl) {
                      $scope.Degree = pl.data;

                      //console.log($scope.Degree);
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });

                  var DegreeSpecListUrl = baseUrlSrvc.baseUrl + 'listDegreeSpecificationByDegreeId/' + $scope.deg_id;
                  var promiseDegreeSpecGet = CRUD_SERVICE.getAllData(DegreeSpecListUrl);
                  promiseDegreeSpecGet.then(function(pl) {
                      $scope.DegreeSpecialization = pl.data;

                      //console.log($scope.DegreeSpecialization);
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });

                    // $scope.Qualification = [{
                    //   "cQualificationmasterId":$scope.jobDegreeData.cQualificationmasterId,
                    //   "qualificationname":$scope.jobDegreeData.qualificationname
                    // }];

                    // $scope.Degree = [{
                    //   "cDegreeId":$scope.jobDegreeData.cDegreeId,
                    //   "degreename":$scope.jobDegreeData.degreename
                    // }];

                    // $scope.DegreeSpecialization = [{
                    //   "cDegreespecificationId":$scope.jobDegreeData.cDegreespecificationId,
                    //   "degreespecificationname":$scope.jobDegreeData.degreespecificationname
                    // }];
              }
          }

      },
      function (errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });

      

    }
    /*=====  End of Edit Job Degree  ======*/
    

    /*===================================
    =            Save Degree            =
    ===================================*/
    $scope.saveJobDegree = function(data) {
        ////console.log(data);

        if (data.clClientjobprofiledegreeId) {
            
           
            data.inInstituteId = $sessionStorage.inInstituteId;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $sessionStorage.bBranchId;
            data.adUserId - $sessionStorage.adUserId;
            data.clClientjobprofileId  = $scope.OperType;


            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientJobProfileDegree'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.clClientId = pl.data.clClientId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobDegreeRecords(urlJobDegreeList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            }, function(err) {
                ////console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobDegreeRecords(urlJobDegreeList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            });
        } else {

            data.inInstituteId = $sessionStorage.inInstituteId;
            data.createdby = $sessionStorage.createdby;
            data.updatedby = $sessionStorage.updatedby;
            data.adUserId = $sessionStorage.adUserId;
            data.bBranchId = $sessionStorage.bBranchId;
            data.clClientjobprofileId  = $scope.OperType;
            data.clClientId = $scope.currentClientId;
            //$scope.eduReq = data.cQualificationmasterId;

            // $scope.multipleDegreeArray = [];

            // for(var a=0;a<$scope.selectedDegrees.length;a++) {
            //   $scope.multipleDegreeArray.push({"inInstituteId":$sessionStorage.inInstituteId,
            //     "bBranchId":$sessionStorage.bBranchId,
            //     "createdby":$sessionStorage.createdby,
            //     "updatedby":$sessionStorage.updatedby,
            //     "adUserId":$sessionStorage.adUserId,
            //     "clClientjobprofileId":$scope.OperType,
            //     "clClientId":$scope.currentClientId,
            //     "cQualificationmasterId":$scope.eduReq,
            //     "cDegreeId":$scope.selectedDegrees[a]

            //   });
            // }

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientJobProfileDegree'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobDegreeRecords(urlJobDegreeList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            }, function(err) {
                ////console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllJobDegreeRecords(urlJobDegreeList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                 ClearModels();
            });
        }
    };
    /*=====  End of Save Degree  ======*/

    /*=======================================
    =            View Job Degree            =
    =======================================*/
    $scope.viewJobDegree = function(id, data) {

      $scope.viewDegree = $filter('filter')(data, { "clClientjobprofiledegreeId": id });

       $scope.viewDegreeData = $scope.viewDegree[0];

    }
    /*=====  End of View Job Degree  ======*/
    
    /*=====================================
    =            Delete Degree            =
    =====================================*/
    $scope.delJobDegree = function(id, bdata) {
         ////console.log(id); 
        $scope.delDeg = $filter('filter')(bdata, { "clClientjobprofiledegreeId": id });

       $scope.deleteJobDegreeData= {
          "clClientjobprofiledegreeId": $scope.delDeg[0].clClientjobprofiledegreeId,
          "degreename": $scope.delDeg[0].degreename
       };
     }

    $scope.deleteJobDegree = function (id) {
        ////console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteClientJobProfileDegree'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllofficeFilterRecords(urlgapFilterList);
                    GetAllJobDegreeRecords(urlJobDegreeList);

                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        }, function (err) {
            ////console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    // GetAllGapFilterRecords(urlgapFilterList);
                    GetAllJobDegreeRecords(urlJobDegreeList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    
    
    /*=====  End of Delete Degree  ======*/
    
    
    

});
/*=====  End of Job Controller  ======*/