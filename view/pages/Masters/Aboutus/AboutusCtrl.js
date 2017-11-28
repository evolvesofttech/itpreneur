/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("sourceCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,
        Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("source");
    $scope.sourceArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Hear About Us";
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

    $scope.addsourceclick = function(){
        $scope.headingMessage = "Add Source";
    }

    /*======================================
    =            Get List source            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listAboutUs';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.sourceArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.source = pl.data;
                $scope.sourceArray.push($scope.source);
                //console.log("$scope.source",$scope.source);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.source.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.sourceArray[0], params.orderBy()) : $scope.sourceArray[0];
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
    /*=====  End of Get List source  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addsource = {};
        $scope.sourceData = {};
        
        $scope.viewsourceData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.sourceData = {};
        
        $scope.viewsourceData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit source Modal            =
    ========================================*/
    
    $scope.editSource = function(id) {
        $scope.headingMessage = "Edit Source";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.source1 = pl.data;
                //console.log($scope.source1);
                for (var i = 0; i < $scope.source1.length; i++) {
                    if ($scope.source1[i].cSourceId == id) {
                        $scope.sourceData = $scope.source1[i];
                       
                          //console.log($scope.sourceData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit source Modal  ======*/
    
    /*==================================
    =            View Source            =
    ==================================*/
    $scope.viewSource = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cSourceId": id });

       $scope.viewsourceData= {
          "cSourceId": $scope.temp_var_a[0].cSourceId,
          "sourcename": $scope.temp_var_a[0].sourcename
       };
    }
    /*=====  End of View Source  ======*/
    
    /*==================================
    =            Save source            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cSourceId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateAboutUs'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cSourceId = pl.data.cSourceId;
               
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
                url: baseUrlSrvc.baseUrl + 'addUpdateAboutUs'
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
                // if (promiseData.code == 0) {
                //     ////console.log("Add source successfully");
                //     Flash.create('danger', $scope.DangerMessage);
                //    }
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
    
    /*=====  End of Save source  ======*/
   
    /*====================================
    =            Delete source            =
    ====================================*/
    
    $scope.delSource = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cSourceId": id });

       $scope.deletesourceData= {
          "cSourceId": $scope.temp_var[0].cSourceId,
          "sourcename": $scope.temp_var[0].sourcename
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteAboutUs'
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
    /*=====  End of Delete source  ======*/
    
});
/*=====  End of Controller  ======*/
