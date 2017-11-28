/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("departmentCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("department");
    $scope.departmentArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Department";
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

    $scope.adddepartment = function(){
        $scope.headingMessage = "Add Department";
    }


    /*======================================
    =            Get List department            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listDepartment';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.departmentArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.department = pl.data;
                $scope.departmentArray.push($scope.department);
                //console.log("$scope.department",$scope.department);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.department.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.departmentArray[0], params.orderBy()) : $scope.departmentArray[0];
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
    /*=====  End of Get List department  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.adddepartment = {};
        $scope.departmentData = {};
       
        $scope.viewdepartmentData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.departmentData = {};
       
        $scope.viewdepartmentData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit department Modal            =
    ========================================*/
    
    $scope.editDepartment = function(id) {
        $scope.headingMessage = "Edit Department";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.department1 = pl.data;
                //console.log($scope.department1);
                for (var i = 0; i < $scope.department1.length; i++) {
                    if ($scope.department1[i].cDepartmentId == id) {
                        $scope.departmentData = $scope.department1[i];
                          //console.log($scope.departmentData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit department Modal  ======*/
    
    /*==================================
    =            View department            =
    ==================================*/
    $scope.viewDepartment = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cDepartmentId": id });

       $scope.viewdepartmentData= {
          "cDepartmentId": $scope.temp_var_a[0].cDepartmentId,
          "departmentname": $scope.temp_var_a[0].departmentname,
          "description": $scope.temp_var_a[0].description
       };
    }
    /*=====  End of View department  ======*/
    
    /*==================================
    =            Save department            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cDepartmentId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateDepartment'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cDepartmentId = pl.data.cDepartmentId;
               
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
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateDepartment'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var department = pl.department;
               var promiseData = pl.data;
               //console.log("department",department);
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
    
    /*=====  End of Save department  ======*/
   
    /*====================================
    =            Delete department            =
    ====================================*/
    
    $scope.delDepartment = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cDepartmentId": id });

       $scope.deletedepartmentData= {
          "cDepartmentId": $scope.temp_var[0].cDepartmentId,
          "departmentname": $scope.temp_var[0].departmentname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteDepartment'
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
    /*=====  End of Delete department  ======*/
    
});
/*=====  End of Controller  ======*/
