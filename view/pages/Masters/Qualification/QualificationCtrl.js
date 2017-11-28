/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("qualificationCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("source");
    $scope.QualificationArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Qualification";
    //console.log($scope.OperType);

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

    $scope.addqualification = function(){
        $scope.headingMessage = "Add Qualification";
    }

     /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.qualificationData = {};
        $scope.viewqualificationData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.qualificationData = {};
       
        $scope.viewqualificationData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*==========================================
    =            List Qualification            =
    ==========================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listQualificationMaster';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.QualificationArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Qualification = pl.data;
                $scope.QualificationArray.push($scope.Qualification);
                //console.log("$scope.Qualification",$scope.Qualification);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Qualification.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.QualificationArray[0], params.orderBy()) : $scope.QualificationArray[0];
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
    /*=====  End of List Qualification  ======*/

    /*==========================================
    =            Edit Qualification            =
    ==========================================*/
    $scope.editQualification = function(id) {
        $scope.headingMessage = "Edit Qualification";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.qualification1 = pl.data;
                //console.log($scope.qualification1);
                for (var i = 0; i < $scope.qualification1.length; i++) {
                    if ($scope.qualification1[i].cQualificationmasterId == id) {
                        $scope.qualificationData = $scope.qualification1[i];
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
        $scope.temp_var_a = $filter('filter')(bdata, { "cQualificationmasterId": id });

       $scope.viewqualificationData= {
          "cQualificationmasterId": $scope.temp_var_a[0].cQualificationmasterId,
          "qualificationname": $scope.temp_var_a[0].qualificationname
       };
    }
    /*=====  End of View Qualification  ======*/
    
    
    /*==========================================
    =            Save Qualification            =
    ==========================================*/
    $scope.save = function (data) {
        if (data.cQualificationmasterId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateQualificationMaster'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cQualificationmasterId = pl.data.cQualificationmasterId;
               
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
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateQualificationMaster'
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
    /*=====  End of Save Qualification  ======*/
    
    /*============================================
    =            Delete Qualification            =
    ============================================*/
    $scope.delQualification = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cQualificationmasterId": id });

       $scope.deletequalificationData= {
          "cQualificationmasterId": $scope.temp_var[0].cQualificationmasterId,
          "qualificationname": $scope.temp_var[0].qualificationname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteQualificationMaster'
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
    /*=====  End of Delete Qualification  ======*/
    
    
});
/*=====  End of Controller  ======*/
