/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("educationstreamCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("educationstreamCtrl");
    $scope.educationstreamArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Education Stream";
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


    /*======================================
    =            Get List educationstream            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listEducationRequired';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.educationstreamArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.educationstream = pl.data;
                $scope.educationstreamArray.push($scope.educationstream);
                //console.log("$scope.educationstream",$scope.educationstream);

                $scope.usersTable_educationstream = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.educationstream.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_educationstream = params.sorting() ? $filter('orderBy')($scope.educationstreamArray[0], params.orderBy()) : $scope.educationstreamArray[0];
                        $scope.data_educationstream = params.filter() ? $filter('filter')($scope.data_educationstream, params.filter()) : $scope.data_educationstream;
                       $scope.data_educationstream = $scope.data_educationstream.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_educationstream)
                    }
                });
                $scope.usersTable_educationstream.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List educationstream  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addeducationstream = {};
        $scope.educationstreamData = {};
       
        $scope.vieweducationstreamData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.educationstreamData = {};
       
        $scope.vieweducationstreamData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit educationstream Modal            =
    ========================================*/
    
    $scope.editEducationstream = function(id) {
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.educationstream1 = pl.data;
                //console.log($scope.educationstream1);
                for (var i = 0; i < $scope.educationstream1.length; i++) {
                    if ($scope.educationstream1[i].cEducationrequiredId == id) {
                        $scope.educationstreamData = $scope.educationstream1[i];
                          //console.log($scope.educationstreamData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit educationstream Modal  ======*/
    
    /*==================================
    =            View educationstream            =
    ==================================*/
    $scope.viewEducationstream = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cEducationrequiredId": id });

       $scope.vieweducationstreamData= {
          "cEducationrequiredId": $scope.temp_var_a[0].cEducationrequiredId,
          "educationname": $scope.temp_var_a[0].educationname
       };
    }
    /*=====  End of View educationstream  ======*/
    
    /*==================================
    =            Save educationstream            =
    ==================================*/
    
    $scope.saveEducationStream = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cEducationrequiredId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEducationRequired'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cEducationrequiredId = pl.data.cEducationrequiredId;
               
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
             data.updatedby=$sessionStorage.updatedby;
             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEducationRequired'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var educationstream = pl.educationstream;
               var promiseData = pl.data;
               //console.log("educationstream",educationstream);
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
    
    /*=====  End of Save educationstream  ======*/
   
    /*====================================
    =            Delete educationstream            =
    ====================================*/
    
    $scope.delEducationstream = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cEducationrequiredId": id });

       $scope.deleteeducationstreamData= {
          "cEducationrequiredId": $scope.temp_var[0].cEducationrequiredId,
          "educationname": $scope.temp_var[0].educationname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteEducationRequired'
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
    /*=====  End of Delete educationstream  ======*/
    
});
/*=====  End of Controller  ======*/
