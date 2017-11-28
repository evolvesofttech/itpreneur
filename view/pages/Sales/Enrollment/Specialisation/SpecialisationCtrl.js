/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("technologyspecialisationCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, feedback_Cid, feedback_Bid,) {
    //console.log("technology");
    $scope.specialisationtechArray = [];
    $scope.OperType = $routeParams.ID;
    $scope.technology_tech= [];

    $scope.C_Id = feedback_Cid.getCourse_id();
    //console.log($scope.C_Id);
  
    $scope.B_Id = feedback_Bid.getBatch_id();
    //console.log($scope.B_Id);

    $scope.user = {technology_tech: []};

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

      /*==============================================
    =            List Technology Master            =
    ==============================================*/
    var listTechUrl = baseUrlSrvc.baseUrl + 'listTechnologyByCourseId/' + $sessionStorage.cCourseId;
    var listTechUrlGet = CRUD_SERVICE.getAllData(listTechUrl);
    listTechUrlGet.then(function(pl) {
        $scope.Technology = pl.data;
        //console.log("$scope.Technology",$scope.Technology);
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of List Technology  ======*/
    


    /*======================================
    =            Get List technology            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listSpecializationTechnologyByEnquiryFormId' + '/' + $scope.OperType;
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.specialisationtechArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.technology = pl.data;
                $scope.specialisationtechArray.push($scope.technology);
                //console.log("$scope.technology",$scope.technology);

                $scope.usersTable_specialisation = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.technology.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_specialisation = params.sorting() ? $filter('orderBy')($scope.specialisationtechArray[0], params.orderBy()) : $scope.specialisationtechArray[0];
                        $scope.data_specialisation = params.filter() ? $filter('filter')($scope.data_specialisation, params.filter()) : $scope.data_specialisation;
                       $scope.data_specialisation = $scope.data_specialisation.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_specialisation)
                    }
                });
                $scope.usersTable_specialisation.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List technology  ======*/
    
    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.technologymasterData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.technologyData = {};
        $scope.technologymasterData = {};
       
        $scope.viewtechnologyData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    $scope.addtech = function(){
        $scope.headingMessage = "Add Technology";
    }

    /*========================================
    =            Edit technology Modal            =
    ========================================*/
    
    $scope.edittechnology = function(id) {
        $scope.headingMessage = "Edit Technology";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.technology1 = pl.data;
                //console.log($scope.technology1);
                for (var i = 0; i < $scope.technology1.length; i++) {
                    if ($scope.technology1[i].eSpecializationtechnologyId == id) {
                        $scope.technologymasterData = $scope.technology1[i];
                       
                          //console.log($scope.technologymasterData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit technology Modal  ======*/
    
    /*==================================
    =            View technology            =
    ==================================*/
    $scope.viewtechnology = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "eSpecializationtechnologyId": id });

       $scope.viewtechnologyData= {
          "eSpecializationtechnologyId": $scope.temp_var_a[0].eSpecializationtechnologyId,
          "technologyname": $scope.temp_var_a[0].technologyname
       };
    }
    /*=====  End of View technology  ======*/
    
    /*==================================
    =            Save technology            =
    ==================================*/
    
    $scope.saveTechnologyMaster = function (data) {
        //console.log("data",data);

        if (data.eSpecializationtechnologyId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            // data.cCourseId=$sessionStorage.cCourseId;
            data.eEnquiryFormId = $scope.OperType;
            data.cCourseId = $scope.C_Id;
            data.cBatchId = $scope.B_Id;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateSpecializationTechnology'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.eSpecializationtechnologyId = pl.data.eSpecializationtechnologyId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                ClearModels();
            });
        } else {

            data.createdby=$sessionStorage.createdby;
            data.updatedby=$sessionStorage.updatedby;
            // data.cCourseId=$sessionStorage.cCourseId;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.eEnquiryFormId = $scope.OperType;
            data.cCourseId = $scope.C_Id;
            data.cBatchId = $scope.B_Id;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateSpecializationTechnology'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var technology = pl.technology;
               var promiseData = pl.data;
               //console.log("technology",technology);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);

                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save technology  ======*/
   
    /*====================================
    =            Delete technology            =
    ====================================*/
    
    $scope.delTechnology = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "eSpecializationtechnologyId": id });

       $scope.deletetechnologymasterData= {
          "eSpecializationtechnologyId": $scope.temp_var[0].eSpecializationtechnologyId,
          "technologyname": $scope.temp_var[0].technologyname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteSpecializationTechnology'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete technology  ======*/
    
});
/*=====  End of Controller  ======*/
