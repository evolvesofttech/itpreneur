/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("clientCtrl", ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, $window) {

         $scope.clientArray = [];
          $scope.OperType = $routeParams.ID;
           $scope.role = $sessionStorage.userData1.roleName;
           $window.document.title = "ITPreneur - Client Info";

           $scope.user11 = {data_Cli: []};

          $scope.St_name = [];
          $scope.StName = [];

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
        ////console.log("$scope.currentDate",$scope.currentDate);
         /*=====  End of Get Current Date  ======*/

        /*========================================
         =            Get Current Year            =
         ========================================*/
         var d = new Date();
         $scope.currentYear = d.getFullYear();
         ////console.log("$scope.currentYear",$scope.currentYear);
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

      /*=================================
         =            Check Enq            =
         =================================*/
         $scope.checkClient = function(value, checked, email, stname) {
         ////console.log(value);
          // ////console.log(email);
          ////console.log(stname);
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

         if($scope.user11.data_Cli !=undefined)
         {
           
            //////console.log(index);
            
            var idx = $scope.user11.data_Cli.indexOf(index);
            var idx1 = $scope.St_name.indexOf(index);
             var index=findIndexInData($scope.St_name, 'name', stname, 'email', email);
            ////console.log("St_name",$scope.St_name);
            
         }
         
          if (index >= 0 && !checked) {
            $scope.user11.data_Cli.splice(idx, 1);
            ////console.log("splice",$scope.user11.data_Cli);

          }

          if (index >= 0 && !checked) {
            $scope.St_name.splice(index, 1);
          }
          // if (idx2 >= 0 && !checked) {
          //   $scope.StName.splice(idx2, 1);
          // }


          if (idx < 0 && checked) {
            $scope.user11.data_Cli.push(value);
            //console.log("Push",$scope.user11.data_Cli);

            

          }

          if (idx1 < 0 && checked) {
            $scope.St_name.push({"name":stname, "email":email, "clClientId":value});
          }

          ////console.log("$scope.St_name",$scope.St_name);
          //console.log("$scope.user11.data_Cli",$scope.user11.data_Cli);


          $scope.studentNameArray = [];
          // $scope.studentContact = [];
          $scope.studentNameArray1 = [];
          $scope.studentNameArray2 = [];
           
           for(var a=0;a<$scope.St_name.length;a++) {
            // $scope.studentNameArray.push($scope.St_name[a].email);
            $scope.studentNameArray1.push({"name":$scope.St_name[a].name, "clClientId":$scope.St_name[a].clClientId,"email":$scope.St_name[a].email});
            // $scope.studentContact.push({"eEnquiryFormId":$scope.St_name[a].eEnquiryFormId});
           }

           $scope.studentnames = $scope.studentNameArray1;

        };
         /*=====  End of Check Enq  ======*/

         /*=================================
      =            Check All            =
      =================================*/
      $scope.checkAll = function() {
        //console.log("All");
        //$scope.user.eEnquiryformId = angular.copy($scope.data_Placement);
        $scope.studentNameArray1 = [];
        //$scope.user11.clClientId = $scope.data_client.map(function(item) { return item.clClientId; });
        $scope.user11.clClientId = $scope.data_client.map(function(item) { return item.clClientId; });
       
        //console.log($scope.data_client);
        $scope.user11.data_Cli = $scope.user11.clClientId;
        
        for(var a=0;a<$scope.data_client.length;a++) {
          $scope.studentNameArray1.push({"name":$scope.data_client[a].companyname, "email":$scope.data_client[a].companyemail });
         }
         $scope.St_name = $scope.studentNameArray1;
         $scope.studentnames = $scope.studentNameArray1;
         //console.log($scope.studentNameArray1);
         //console.log("$scope.user11.data_Cli",$scope.user11.data_Cli);
      };
      /*=====  End of Check All  ======*/

      /*===================================
      =            Uncheck All            =
      ===================================*/
      $scope.uncheckAll = function() {
        $scope.user11.data_Cli = [];
        $scope.user11 = {data_Cli: []};
        //console.log("$scope.user11.data_Cli",$scope.user11.data_Cli);
        $scope.studentNameArray = [];
        $scope.St_name = [];
        ;
      };
      /*=====  End of Uncheck All  ======*/

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

      /*==================================
      =            Companyclient List            =
      ==================================*/
      var CompanyclientListUrl = baseUrlSrvc.baseUrl + 'listClient';
      var promiseCompanyclientGet = CRUD_SERVICE.getAllData(CompanyclientListUrl);
      promiseCompanyclientGet.then(function(pl) {
          $scope.Company = pl.data;

          ////console.log($scope.Company);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Companyclient List  ======*/


       $scope.companyChange = function(id) {
           
             ////console.log(id);
             $scope.disableAllInput = false;

             var ComapanyUrl = baseUrlSrvc.baseUrl + 'listClientById/'+id;
             var promiseComapanyGet = CRUD_SERVICE.getAllData(ComapanyUrl);
             promiseComapanyGet.then(function(pl) {
                    $scope.clientData1 =pl.data;
                    $scope.clientData = $scope.clientData1[0];
                    ////console.log($scope.clientData[0]);
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
          }


        /*==================================
      =            Status List            =
      ==================================*/
      var StatusListUrl = baseUrlSrvc.baseUrl + 'listEnquiryStatus';
      var promiseStatusGet = CRUD_SERVICE.getAllData(StatusListUrl);
      promiseStatusGet.then(function(pl) {
          $scope.Status = pl.data;

          ////console.log($scope.Status);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Status List  ======*/
     

        /*==================================
      =            Technologies List            =
      ==================================*/
      var TechnologiesListUrl = baseUrlSrvc.baseUrl + 'listTechnologyMaster';
      var promiseTechnologiesGet = CRUD_SERVICE.getAllData(TechnologiesListUrl);
      promiseTechnologiesGet.then(function(pl) {
          $scope.Technologies = pl.data;

          ////console.log($scope.Technologies);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Technologies List  ======*/
     
      
      /*==================================
      =            Source List            =
      ==================================*/
      var sourceListUrl = baseUrlSrvc.baseUrl + 'listAboutUs';
      var promiseSourceGet = CRUD_SERVICE.getAllData(sourceListUrl);
      promiseSourceGet.then(function(pl) {
          $scope.Source = pl.data;

          ////console.log($scope.Source);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Source List  ======*/

      $scope.enableAll = function() {
        $scope.existing = false;
        $scope.clientData = {};
      }
     

    
    /*===================================================
    =            Add Location Click Function            =
    ===================================================*/
    $scope.clientDataformClick = function() {

        var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
        var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseStateGet.then(function(pl) {
                $scope.State = pl.data;

                ////console.log("State",$scope.State);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

        $scope.OnStateChange = function(id) {
            $scope.disableDistrict = false;
             ////console.log(id);
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
    /*=====  End of Add Location Click Function  ======*/


     
      /*========================================
      =            Get ClientInfo List            =
      ========================================*/
      var urlClientInfoList = baseUrlSrvc.baseUrl  + 'listClient';
      GetAllClientInfoRecords(urlClientInfoList);

      function GetAllClientInfoRecords(url) {
          $scope.clientArray = [];
          var promiseGet = CRUD_SERVICE.getAllData(url);
          promiseGet.then(function (pl) {
                  $scope.client = pl.data;
                  $scope.clientArray.push($scope.client);
                  ////console.log("$scope.client",$scope.client);

                  $scope.usersTable_client = new ngTableParams({
                      page: 1,
                      count: 10
                  }, {
                     total: $scope.client.length, 
                      getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                      
                          $scope.data_client = params.sorting() ? $filter('orderBy')($scope.clientArray[0], params.orderBy()) : $scope.clientArray[0];
                          $scope.data_client = params.filter() ? $filter('filter')($scope.data_client, params.filter()) : $scope.data_client;
                         $scope.data_client = $scope.data_client.slice((params.page() - 1) * params.count(), params.page() * params.count());
                         $defer.resolve($scope.data_client)
                      }
                  });
                  $scope.usersTable_client.reload();
              },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
          }
          /*=====  End of Get client List  ======*/

          /*==========================================
          =            Role Select Change            =
          ==========================================*/
          $scope.roleSelect = function(id, rdata) {
            ////console.log("id",id);
            ////console.log("rdata",rdata);
            $scope.temp_var = $filter('filter')(rdata, { "adRoleId": id });
                 ////console.log("$scope.temp_var",$scope.temp_var);

                 $scope.addenquiry.conAccounttypeId= $scope.temp_var[0].conAccounttypeId;
                 ////console.log("$scope.addenquiry.conAccounttypeId",$scope.addenquiry.conAccounttypeId);
          }
          /*=====  End of Role Select Change  ======*/

            
            /*===============================================
            =            View Client Function            =
            ===============================================*/
            $scope.viewClient = function(id, idata) {
                 ////console.log(id);
                $scope.temp_var_c = $filter('filter')(idata, { "clClientId": id });
               ////console.log("$scope.temp_var_c",$scope.temp_var_c);

               $scope.clientData= $scope.temp_var_c[0];
            }
            /*=====  End of View Client Function  ======*/


            /*============================================
            =            Clear Modal on Click            =
            ============================================*/
            $scope.clearModalOnCloseclient = function() {
                $scope.clientData = {};
            }
            /*=====  End of Clear Modal on Click  ======*/
            
            /*==============================================
            =            Clear Model After Save            =
            ==============================================*/
            function ClearModels() {
                $scope.clientData = {};
            }
            /*=====  End of Clear Model After Save  ======*/

            /*==================================================
            =            Get client on Edit Page            =
            ==================================================*/
            if ($scope.OperType != undefined && $scope.OperType != 0) {
              $window.document.title = "ITPreneur - Edit Client Info";

              var urlClientInfoList = baseUrlSrvc.baseUrl + 'listClientById/'+ $scope.OperType;
                var promiseclientGet = CRUD_SERVICE.getAllData(urlClientInfoList);
                promiseclientGet.then(function(pl) {
                    $scope.client = pl.data;
                    ////console.log("=================",$scope.client);

                    for (var i = 0; i < $scope.client.length; i++) {
                        if ($scope.client[i].clClientId == $scope.OperType) {
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
            /*=====  End of Getclient on Edit Page  ======*/

            /*===================================
            =            State Focus            =
            ===================================*/
            $scope.ngStateFocus = function() {

              var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
              var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
              promiseStateGet.then(function(pl) {
                      $scope.State = pl.data;

                      ////console.log("State",$scope.State);
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });

              $scope.OnStateChange = function(id) {
                  $scope.disableDistrict = false;
                   ////console.log(id);
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
            /*=====  End of State Focus  ======*/
            

            /*====================================
            =            Save client            =
            ====================================*/
             $scope.saveClientinfo = function(data) {
                ////console.log(data);

                if (data.clClientId) {

                    ////console.log("update");
                   
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.updatedby = $sessionStorage.updatedby;
                    data.bBranchId = $sessionStorage.bBranchId;
                    data.adUserId = $sessionStorage.adUserId;
                    data.clClientId = $scope.OperType;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateClient'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.clClientId = pl.data.clClientId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllClientInfoRecords(urlClientInfoList);
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        ////console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllClientInfoRecords(urlClientInfoList);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {

                    
                    data.enquiryformno = $scope.currentBranchInitials + $scope.currentYear;
                    data.inInstituteId = $sessionStorage.inInstituteId;
                    data.createdby = $sessionStorage.createdby;
                    data.updatedby = $sessionStorage.updatedby;
                    data.bBranchId = $sessionStorage.bBranchId;
                    data.reference = $scope.selectedStudent1;
                    data.adUserId = $sessionStorage.adUserId;
                    data.clClientId = $scope.OperType;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateClient'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllClientInfoRecords(urlClientInfoList);
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                         ClearModels();
                    }, function(err) {
                        ////console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllClientInfoRecords(urlClientInfoList);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                         ClearModels();
                    });
                }
            };
            /*=====  End of Save Client  ======*/

            /*===========================================
            =            Send Email Function            =
            ===========================================*/
            $scope.saveEmailData = function(data1, data2) {
              //console.log(data1);
              //console.log(data2);
              //console.log($scope.user11.data_Cli);

            
              $scope.saveTemplateArray = [];
              for(var j=0;j<$scope.studentNameArray1.length;j++) {
               
                $scope.saveTemplateArray.push({"email":$scope.studentNameArray1[j].email,"subject":$scope.emailSubject,"name":$scope.studentNameArray1[j].name,"text":data2});
                
              }
              //console.log($scope.saveTemplateArray);

              var FormData = {
                  formdata: $scope.saveTemplateArray,
                  url: baseUrlSrvc.baseUrl + 'sendClientEmailsForEmailTemplate'
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
            =            Send Email Single            =
            =========================================*/
            $scope.saveEmailDataSingle = function(data1, data2, em, nm) {
              //console.log(data1);
              //console.log(data2);
              //console.log(em);

            
              $scope.saveTemplateArray = [];
              // for(var j=0;j<$scope.studentNameArray1.length;j++) {
               $scope.saveTemplateArray.push({"email":em,"subject":$scope.emailSubject,"name":nm,"text":data2});
                //$scope.saveTemplateArray.push({"email":em,"subject":$scope.emailSubject,"interviewdate":$scope.currentRoundInterviewDate,"round":$scope.currentJobRound,"location":$scope.currentJobRoundLocation,"marksrequired":$scope.degArray,"clClientId":$scope.companyId,"clClientjobprofileId":$scope.JobId,"text":data2,"technologiescompulsory":$scope.CompulsoryTech,"technologiesoptional":$scope.OptionalTech});
                //"name":$scope.studentNameArray1[j].name,
              //}
              //console.log($scope.saveTemplateArray);

              var FormData = {
                  formdata: $scope.saveTemplateArray,
                  url: baseUrlSrvc.baseUrl + 'sendClientEmailsForEmailTemplate'
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
            /*=====  End of Send Email Single  ======*/
            

            /*======================================================
            =            Delete Client Modal Funtion            =
            ======================================================*/
            $scope.delClient = function(id, idata) {
                 ////console.log(id); 

               
                $scope.temp_var_3 = $filter('filter')(idata, { "clClientId": id });
                   ////console.log("$scope.temp_var_3",$scope.temp_var_3);

                   $scope.deleteclientData= {
                      "clClientId": $scope.temp_var_3[0].clClientId,
                      "companyname": $scope.temp_var_3[0].companyname
                   };
                }

                $scope.deleteClient = function(id) {
                ////console.log(id);
                    var FormData = {
                        id: id,
                        url: baseUrlSrvc.baseUrl + 'deleteClient'
                    };
                    var promiseDelete = CRUD_SERVICE.delete(FormData);
                    promiseDelete.then(function(pl) {
                       $timeout(function() {
                                $scope.$apply(function () {
                                GetAllClientInfoRecords(urlClientInfoList);
                                });
                            },100);
                             toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        ////console.log("Some Error Occured." + err);
                        $timeout(function() {
                                $scope.$apply(function () {
                                GetAllClientInfoRecords(urlClientInfoList);
                                });
                            },100);
                             toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            /*=====  End of Delete Institute Modal Funtion  ======*/

}]);
/*=====  End of Controller  ======*/