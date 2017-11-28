/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("userQualificationCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster) {
    //console.log("source");
    $scope.quaMasterArray = [];
    $scope.OperType = $routeParams.ID;

    //console.log($scope.OperType);
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


    /*======================================
    =            Get List source            =
    ======================================*/
    //1 Mean New Entry
    var urlQuaList = baseUrlSrvc.baseUrl + 'listUserQualificationByadUserdetailId/'+ $scope.OperType;
    GetAllQualificationRecords(urlQuaList);

    //To Get All Records
    function GetAllQualificationRecords(url) {
        $scope.quaMasterArray = [];
        //console.log("List Call");
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Qualification = pl.data;
                $scope.quaMasterArray.push($scope.Qualification);

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
        //console.log("kkkkk",id);
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
        $scope.enquiryGapData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/


    $scope.qualificationFocus = function() {
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
    }

    /*==========================================
    =            Edit Qualification            =
    ==========================================*/
    $scope.editQualification = function(id) {
         //console.log(id);
         $scope.disableField = true;
         
          $scope.streamChange = function(id) {   
        //console.log("jjjj",id);
       
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
     
      $scope.degreeChange = function(id) {   
        //console.log(id);
         // $scope.disabledegreespecify = false;
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


        var promiseGet = CRUD_SERVICE.getAllData(urlQuaList);
        promiseGet.then(function (pl) {
                $scope.qualification_a = pl.data;
                for (var i = 0; i < $scope.qualification_a.length; i++) {
                    if ($scope.qualification_a[i].adUserqualificationId == id) {
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
    =            View Source            =
    ==================================*/
    $scope.viewqualification = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "adUserqualificationId": id });

       $scope.viewqualificationData= $scope.temp_var_a[0];
    }
    /*=====  End of View Source  ======*/
    
    /*==================================
    =            Save source            =
    ==================================*/
    
    $scope.saveQualification = function (data) {

        if (data.adUserqualificationId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
              data.bBranchId=$sessionStorage.bBranchId;
              data.adUserdetailId = $scope.OperType;

             //console.log("update");

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserQualification'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.adUserqualificationId = pl.data.adUserqualificationId;
               
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
             data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserdetailId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserQualification'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var source = pl.source;
               var promiseData = pl.data;
               //console.log("source",source);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllQualificationRecords(urlQuaList);
                    GetAllFilterRecords(urlFilterList);
                    });
                },100);
                // if (promiseData.code == 0) {
                //     ////console.log("Add source successfully");
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
    
    /*=====  End of Save source  ======*/
   
    /*============================================
    =            Delete Qualification            =
    ============================================*/
    $scope.delQualification = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "adUserqualificationId": id });

       $scope.deletequalificationData= {
          "adUserqualificationId": $scope.temp_var[0].adUserqualificationId,
          "qualificationname": $scope.temp_var[0].qualificationname
       };
     }

    $scope.deleteQualification = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteUserQualification'
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
    
});
/*=====  End of Controller  ======*/
