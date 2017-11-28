/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("branchCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("branch");
    $scope.branchArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Branch";

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

    $scope.addbranchclick = function(){
      $scope.headingMessage = "Add Branch";
    }


    /*======================================
    =            Get List branch            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listBranch';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.branchArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.branch = pl.data;
                $scope.branchArray.push($scope.branch);
                //console.log("$scope.branch",$scope.branch);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.branch.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.branchArray[0], params.orderBy()) : $scope.branchArray[0];
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
    /*=====  End of Get List branch  ======*/


          /*==================================
          =            State List            =
          ==================================*/
          var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
          var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
          promiseStateGet.then(function(pl) {
              $scope.State = pl.data;

              //console.log($scope.branchArray);
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
          /*=====  End of State List  ======*/

          /*====================================
          =            State Change            =
          ====================================*/
          $scope.OnStateChange = function(id) {
            // $scope.disableRegion = false;
             //console.log(id);
             var stateUrl = baseUrlSrvc.baseUrl + 'listDistrictById/'+id;
             var promiseStateGet = CRUD_SERVICE.getAllData(stateUrl);
             promiseStateGet.then(function(pl) {
                $scope.District =pl.data;
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });
          }
          /*=====  End of State Change  ======*/

          /*=======================================
              =            District Change            =
              =======================================*/
          $scope.OnDistrictChange = function(id) {
             //console.log(id);
             $scope.disableTaluka = false;
             var districtUrl = baseUrlSrvc.baseUrl + 'listTalukaById/'+id;
             var promiseDistrictGet = CRUD_SERVICE.getAllData(districtUrl);
             promiseDistrictGet.then(function(pl) {
                 $scope.TalukaData = pl.data;

                 $scope.Taluka = $filter('filter')($scope.TalukaData, { "cDistrictId": id });
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });
          }
          /*=====  End of District Change  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addbranch = {};
        $scope.branchData = {};
       
        $scope.viewbranchData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.branchData = {};
       
        $scope.viewbranchData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit branch Modal            =
    ========================================*/
    
    $scope.editBranch = function(id) {
      $scope.headingMessage = "Edit Branch";
         //console.log(id); 


          $scope.OnStateChange = function(id) {
            // $scope.disableRegion = false;
             //console.log(id);
             var stateUrl = baseUrlSrvc.baseUrl + 'listDistrictById/'+id;
             var promiseStateGet = CRUD_SERVICE.getAllData(stateUrl);
             promiseStateGet.then(function(pl) {
                $scope.District =pl.data;
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });
          }

         
          $scope.OnDistrictChange = function(id) {
             //console.log(id);
             $scope.disableTaluka = false;
             var districtUrl = baseUrlSrvc.baseUrl + 'listTalukaById/'+id;
             var promiseDistrictGet = CRUD_SERVICE.getAllData(districtUrl);
             promiseDistrictGet.then(function(pl) {
                 $scope.TalukaData = pl.data;

                 $scope.Taluka = $filter('filter')($scope.TalukaData, { "cDistrictId": id });
             },
             function(errorPl) {
                 $log.error('Some Error in Getting Records.', errorPl);
             });
          }
       
    

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.branch1 = pl.data;
                //console.log($scope.branch1);
                for (var i = 0; i < $scope.branch1.length; i++) {
                    if ($scope.branch1[i].bBranchId == id) {
                        $scope.branchData = $scope.branch1[i];

                         $scope.District=[{
                          "cDistrictId":$scope.branchData.cDistrictId,
                          "districtname":$scope.branchData.districtname

                        }];
                        $scope.Taluka=[{
                           "cTalukaId":$scope.branchData.cTalukaId,
                          "talukaname":$scope.branchData.talukaname

                        }];
                        
                          //console.log($scope.branchData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit branch Modal  ======*/
    
    /*==================================
    =            View branch            =
    ==================================*/
    $scope.viewBranch = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "bBranchId": id });

       $scope.viewbranchData= {
          "bBranchId": $scope.temp_var_a[0].bBranchId,
          "branchname": $scope.temp_var_a[0].branchname,
          "description": $scope.temp_var_a[0].description,
          "email": $scope.temp_var_a[0].email,
          "contactno": $scope.temp_var_a[0].contactno,
          "address": $scope.temp_var_a[0].address,
          "statename": $scope.temp_var_a[0].statename,
          "city": $scope.temp_var_a[0].city,
          "districtname": $scope.temp_var_a[0].districtname,
          "talukaname": $scope.temp_var_a[0].talukaname,
          "pincode": $scope.temp_var_a[0].pincode
       };
    }
    /*=====  End of View branch  ======*/
    
    /*==================================
    =            Save branch            =
    ==================================*/
    
    $scope.save = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.bBranchId) {

            data.updatedby=$sessionStorage.updatedby;
             data.inInstituteId=$sessionStorage.inInstituteId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBranch'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.bBranchId = pl.data.bBranchId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    });
                },100);
                  toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
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
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateBranch'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var branch = pl.branch;
               var promiseData = pl.data;
               
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
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
                ////console.log("Some Error Occured." + err);

                ////console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save branch  ======*/
   
    /*====================================
    =            Delete branch            =
    ====================================*/
    
    $scope.delBranch = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "bBranchId": id });

       $scope.deletebranchData= {
          "bBranchId": $scope.temp_var[0].bBranchId,
          "branchname": $scope.temp_var[0].branchname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteBranch'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    });
                },100);
                 
             toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete branch  ======*/
    
});
/*=====  End of Controller  ======*/
