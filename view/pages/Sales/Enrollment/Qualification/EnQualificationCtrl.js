/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("EnQualificationCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster,  firstNameService, middleNameService, lastNameService, Branch_Id) {
    //console.log("source");
    $scope.quaMasterArray = [];
    $scope.OperType = $routeParams.ID;

    //console.log($scope.OperType);

    this.QuaCtrl = 1;

    this.setTab = function(tabId) {
        this.QuaCtrl = tabId;
    };

    this.isSet = function(tabId) {
        return this.QuaCtrl === tabId;
    };

      $scope.Bid = Branch_Id.getBranch_Id();
     //console.log($scope.Bid);
     $scope.disableField = false;

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

 /*=================================================
    =            List Qualification Master            =
    =================================================*/

    var urlFilterList = baseUrlSrvc.baseUrl + 'listQualificationFilterById/' + $scope.OperType;
    GetAllFilterRecords(urlFilterList);

    function GetAllFilterRecords(url) {
          var promiseQualificationGet = CRUD_SERVICE.getAllData(url);
            promiseQualificationGet.then(function(pl) {
              $scope.Qualification1 = pl.data;

          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
    }
    /*=====  End of List Qualification Master  ======*/

    /*=========================================
      =            Qualification change List       =
      =========================================*/

      $scope.streamChange = function(id) {   
        //console.log(id);
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
      /*=====  End of Qualification change List  ======*/

      /*==================================
      =            Degree change List            =
      ==================================*/

      $scope.degreeChange = function(id) {   
        //console.log(id);
        var DegreeSpecialisationListUrl = baseUrlSrvc.baseUrl + 'listDegreeSpecificationByDegreeId/'+id;
        var promiseDegreeSpecialisationGet = CRUD_SERVICE.getAllData(DegreeSpecialisationListUrl);
        promiseDegreeSpecialisationGet.then(function(pl) {
            $scope.DegreeSpecialisation = pl.data;

            //console.log($scope.DegreeSpecialisation);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
      });
    }
      /*=====  End of DegreeSpecialisation change List  ======*/


    /*======================================
    =            Get List source            =
    ======================================*/
    //1 Mean New Entry
    var urlQuaList = baseUrlSrvc.baseUrl + 'listQualificationByEnquiryFormId/' + $scope.OperType;
    GetAllQualificationRecords(urlQuaList);

    //To Get All Records
    function GetAllQualificationRecords(url) {
        $scope.quaMasterArray = [];
        //console.log("List Call");
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Qualification = pl.data;
                $scope.quaMasterArray.push($scope.Qualification);

                // for (var i = 0; i < $scope.Qualification.length; i++)  {
                //    if ($scope.Qualification[i].highestqualification=="Yes") {
                //     $scope.disablehighqualify = true;
                //    }
                //    else{
                //     $scope.disablehighqualify = false;
                //    }
                // }

                $scope.usersTable_qualification = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Qualification.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_qualification = params.sorting() ? $filter('orderBy')($scope.quaMasterArray[0], params.orderBy()) : $scope.quaMasterArray[0];
                        $scope.data_qualification = params.filter() ? $filter('filter')($scope.data_qualification, params.filter()) : $scope.data_qualification;
                       $scope.data_qualification = $scope.data_qualification.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_qualification)
                    }
                });
                $scope.usersTable_qualification.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List source  ======*/

    $scope.AddQualificationDetails = function(){
      $scope.headingMessage = "Add Qualification Details";
    }
    
    /*===================================
    =            Clear Model            =
    ===================================*/
    function ClearModels() {
        $scope.enquiryQualificationData = {};
        $scope.enquiryGapData = {};
    }
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.enquiryQualificationData = {};
        $scope.enquirygapData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*==========================================
    =            Edit Qualification            =
    ==========================================*/
    $scope.editQualification = function(id) {
      $scope.headingMessage = "Edit Qualification Details";
         //console.log(id);
         $scope.disableField = true;
   
          /*=========================================
      =            Qualification change List       =
      =========================================*/

      $scope.streamChange = function(id) {   
        //console.log(id);
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
      /*=====  End of Qualification change List  ======*/

      /*==================================
      =            Degree change List            =
      ==================================*/

      $scope.degreeChange = function(id) {   
        //console.log(id);
        var DegreeSpecialisationListUrl = baseUrlSrvc.baseUrl + 'listDegreeSpecificationByDegreeId/'+id;
        var promiseDegreeSpecialisationGet = CRUD_SERVICE.getAllData(DegreeSpecialisationListUrl);
        promiseDegreeSpecialisationGet.then(function(pl) {
            $scope.DegreeSpecialisation = pl.data;

            //console.log($scope.DegreeSpecialisation);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
      });
    }
      /*=====  End of DegreeSpecialisation change List  ======*/

        var promiseGet = CRUD_SERVICE.getAllData(urlQuaList);
        promiseGet.then(function (pl) {
                $scope.qualification_a = pl.data;
                for (var i = 0; i < $scope.qualification_a.length; i++) {
                    if ($scope.qualification_a[i].eQualificationId == id) {
                        $scope.enquiryQualificationData = $scope.qualification_a[i];

                         $scope.Qualification1=[{
                          "cQualificationmasterId":$scope.enquiryQualificationData.cQualificationmasterId,
                          "qualificationname":$scope.enquiryQualificationData.qualificationname

                        }];

                        $scope.Degree=[{
                          "cDegreeId":$scope.enquiryQualificationData.cDegreeId,
                          "degreename":$scope.enquiryQualificationData.degreename

                        }];

                        $scope.DegreeSpecialisation=[{
                          "cDegreespecificationId":$scope.enquiryQualificationData.cDegreespecificationId,
                          "degreespecificationname":$scope.enquiryQualificationData.degreespecificationname

                        }];

                        $scope.degreeFocus = function() {
                          var DegreeListUrl = baseUrlSrvc.baseUrl + 'listDegreeByQualificationMasterId/'+$scope.enquiryQualificationData.cQualificationmasterId;
                            var promiseDegreeGet = CRUD_SERVICE.getAllData(DegreeListUrl);
                            promiseDegreeGet.then(function(pl) {
                                $scope.Degree = pl.data;

                                //console.log($scope.Degree);
                            },
                            function(errorPl) {
                                $log.error('Some Error in Getting Records.', errorPl);
                            });
                        }

                        $scope.degreespecifyFocus = function() {
                            var DegreeSpecialisationListUrl = baseUrlSrvc.baseUrl + 'listDegreeSpecificationByDegreeId/'+$scope.enquiryQualificationData.cDegreeId;
                            var promiseDegreeSpecialisationGet = CRUD_SERVICE.getAllData(DegreeSpecialisationListUrl);
                            promiseDegreeSpecialisationGet.then(function(pl) {
                                $scope.DegreeSpecialisation = pl.data;

                                //console.log($scope.DegreeSpecialisation);
                            },
                            function(errorPl) {
                                $log.error('Some Error in Getting Records.', errorPl);
                            });
                        }
                    }
                }
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit Qualification  ======*/
  
    /*==================================
    =            View Qualification            =
    ==================================*/
    $scope.viewQualification = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "eQualificationId": id });

       $scope.viewqualificationData= $scope.temp_var_a[0];
    }
    /*=====  End of View Qualification  ======*/
    
    /*==================================
    =            Save Qualification            =
    ==================================*/
    
    $scope.saveQualification = function (data) {

        if (data.eQualificationId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId = $scope.Bid;
             data.eEnquiryFormId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateQualification'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.eQualificationId = pl.data.eQualificationId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllQualificationRecords(urlQuaList);
                    GetAllFilterRecords(urlFilterList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllQualificationRecords(urlQuaList);
                    GetAllFilterRecords(urlFilterList);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                ClearModels();
            });
        } else {

             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId = $scope.Bid;
            data.eEnquiryFormId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateQualification'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var qualification = pl.qualification;
               var promiseData = pl.data;
               //console.log("qualification",qualification);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllQualificationRecords(urlQuaList);
                    GetAllFilterRecords(urlFilterList);
                    });
                },100);
                // if (promiseData.code == 0) {
                //     ////console.log("Add qualification successfully");
                //     Flash.create('danger', $scope.DangerMessage);
                //    }
                 
                toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
               
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllQualificationRecords(urlQuaList);
                    GetAllFilterRecords(urlFilterList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save qualification  ======*/
   
    /*============================================
    =            Delete Qualification            =
    ============================================*/
    $scope.delQualification = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "eQualificationId": id });

       $scope.deletequalificationData= {
          "eQualificationId": $scope.temp_var[0].eQualificationId,
          "qualificationname": $scope.temp_var[0].qualificationname
       };
     }

    $scope.deleteQualification = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteQualification'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllFilterRecords(urlFilterList);
                    GetAllQualificationRecords(urlQuaList);

                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllFilterRecords(urlFilterList);
                    GetAllQualificationRecords(urlQuaList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete Qualification  ======*/

    /*=====================================
    =            Gap Functions            =
    =====================================*/
    
        /*======================================
        =            Get List gap            =
        ======================================*/
        $scope.gapArray = [];
        //1 Mean New Entry
        var gapurlList = baseUrlSrvc.baseUrl + 'listYearGapServiceById/' + $scope.OperType;
        GetAllGapRecords(gapurlList);

        //To Get All Records
        function GetAllGapRecords(url) {
            $scope.gapArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.Gap = pl.data;
                    $scope.gapArray.push($scope.Gap);

                    $scope.usersTable_gap = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.Gap.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                        
                            $scope.data_gap = params.sorting() ? $filter('orderBy')($scope.gapArray[0], params.orderBy()) : $scope.gapArray[0];
                            $scope.data_gap = params.filter() ? $filter('filter')($scope.data_gap, params.filter()) : $scope.data_gap;
                           $scope.data_gap = $scope.data_gap.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_gap)
                        }
                    });
                    $scope.usersTable_gap.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        /*=====  End of Get List gap  ======*/

        $scope.addgapclick = function(){
          $scope.headingMessage = "Add Gap & Other Info";
        }

        /*==========================================
        =            Edit Gap            =
        ==========================================*/
        $scope.editGap = function(id) {
          $scope.headingMessage = "Edit Gap & Other Info";
             //console.log(id);

             var gapListUrl = baseUrlSrvc.baseUrl + 'listYearGap';
              var promiseGapGet = CRUD_SERVICE.getAllData(gapListUrl);
              promiseGapGet.then(function(pl) {
                  $scope.EnquiryGap = pl.data;
              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              }); 

            var promiseGet = CRUD_SERVICE.getAllData(gapurlList);
            promiseGet.then(function (pl) {
                    $scope.gap_a = pl.data;
                    for (var i = 0; i < $scope.gap_a.length; i++) {
                        if ($scope.gap_a[i].eYearGapId == id) {
                            $scope.enquirygapData = $scope.gap_a[i];
                        }
                    }
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        /*=====  End of Edit Qualification  ======*/


        /*==================================
        =            Save Gap            =
        ==================================*/
        
        $scope.saveGap = function (data) {

            if (data.eYearGapId) {

                 data.inInstituteId = $sessionStorage.inInstituteId;
                data.updatedby = $sessionStorage.updatedby;
                data.bBranchId = $scope.currentBranchId;
                data.eEnquiryFormId = $scope.OperType;
                data.adUserId = $sessionStorage.adUserId;


                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateYearGap'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function (pl) {
                    $scope.eYearGapId = pl.data.eYearGapId;
                   
                   $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                        GetAllGapRecords(gapurlList);
                        // GetAllGapFilterRecords(urlgapFilterList);
                        });
                    },100);
                     toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    
                    ClearModels();
                }, function (err) {
                    //console.log(err);
                    
                    $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                        GetAllGapRecords(gapurlList);
                        // GetAllGapFilterRecords(urlgapFilterList);
                        });
                    },100);
                    toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                     
                    ClearModels();
                });
            } else {

                data.inInstituteId = $sessionStorage.inInstituteId;
                data.updatedby = $sessionStorage.updatedby;
                data.createdby = $sessionStorage.createdby;
                data.bBranchId = $scope.currentBranchId;
                data.eEnquiryFormId = $scope.OperType;
                data.adUserId = $sessionStorage.adUserId;

                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateYearGap'
                };

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function (pl) {
                   
                   var gap = pl.gap;
                   var promiseData = pl.data;
                   //console.log("gap",gap);
                   //console.log("promiseData",promiseData);
                   
                    $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                        GetAllGapRecords(gapurlList);
                        // GetAllGapFilterRecords(urlgapFilterList);
                        });
                    },100);
                    // if (promiseData.code == 0) {
                    //     ////console.log("Add gap successfully");
                    //     Flash.create('danger', $scope.DangerMessage);
                    //    }
                     
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                   
                    ClearModels();
                }, function (err) {
                    //console.log("Some Error Occured." + err);

                    //console.log("err.data",err.data);
                    
                   $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                        GetAllGapRecords(gapurlList);
                        // GetAllGapFilterRecords(urlgapFilterList);
                        });
                    },100);
                     
                     toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                      
                    ClearModels();
                });
            }
        };
        
        /*=====  End of Save Gap  ======*/


    /*==================================
    =            View Gap            =
    ==================================*/
    $scope.viewGap = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "eYearGapId": id });

       $scope.viewgapData= {
          "eYearGapId": $scope.temp_var_a[0].eYearGapId,
          "yeargap": $scope.temp_var_a[0].yeargap,
          "duringgap": $scope.temp_var_a[0].duringgap,
          "tarainingundergone": $scope.temp_var_a[0].tarainingundergone
       };
    }
    /*=====  End of View Gap  ======*/
    

        /*============================================
        =            Delete Gap            =
        ============================================*/
        $scope.delGap = function(id, bdata) {
             //console.log(id); 
            $scope.temp_var = $filter('filter')(bdata, { "eYearGapId": id });

           $scope.deletegapData= {
              "eYearGapId": $scope.temp_var[0].eYearGapId,
              "yeargap": $scope.temp_var[0].yeargap
           };
         }

        $scope.deleteGap = function (id) {
            //console.log(id);
            var FormData = {
                id: id,
                url: baseUrlSrvc.baseUrl + 'deleteYearGap'
            };
            var promiseDelete = CRUD_SERVICE.delete(FormData);
            promiseDelete.then(function (pl) {
                $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                       // GetAllGapFilterRecords(urlgapFilterList);
                        GetAllGapRecords(gapurlList);

                        });
                    },100);
                     
                    toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                        // GetAllGapFilterRecords(urlgapFilterList);
                        GetAllGapRecords(gapurlList);
                        });
                    },100);
                     
                    toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                ClearModels();
            });
        }
        /*=====  End of Delete Qualification  ======*/
    
    /*=====  End of Gap Functions  ======*/
    
    
});
/*=====  End of Controller  ======*/
