/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("userroleCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("userroleCtrl");
    $scope.userroleArray = [];
    $scope.OperType = $routeParams.ID;

    $scope.disableUsername = false;
    $scope.user = {Roles: []};
    $window.document.title = "ITPreneur - User Roles";
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

    /*=========================================
    =            Assign Role Click            =
    =========================================*/
    $scope.assignRoleClick = function() {
        $scope.disableUsername = false;
    }
    /*=====  End of Assign Role Click  ======*/
    

    /*===================================
      =            Branch List            =
      ===================================*/
      var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
      var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
      promiseBranchGet.then(function(pl) {
          $scope.Branch = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Branch List  ======*/

      /*===================================
      =            Users List            =
      ===================================*/
      var UserListUrl = baseUrlSrvc.baseUrl + 'listUserDetails';
      var promiseUserGet = CRUD_SERVICE.getAllData(UserListUrl);
      promiseUserGet.then(function(pl) {
          $scope.Users = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Users List  ======*/

      /*===================================
      =            Roles List            =
      ===================================*/
      var RoleListUrl = baseUrlSrvc.baseUrl + 'listRole';
      var promiseRoleGet = CRUD_SERVICE.getAllData(RoleListUrl);
      promiseRoleGet.then(function(pl) {
          $scope.Roles = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Roles List  ======*/


    /*======================================
    =            Get List userrole            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listUsersRole';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.userroleArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.userrole = pl.data;
                $scope.userroleArray.push($scope.userrole);
                //console.log("$scope.userrole",$scope.userrole);

                $scope.usersTable_userrole = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.userrole.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_userrole = params.sorting() ? $filter('orderBy')($scope.userroleArray[0], params.orderBy()) : $scope.userroleArray[0];
                        $scope.data_userrole = params.filter() ? $filter('filter')($scope.data_userrole, params.filter()) : $scope.data_userrole;
                       $scope.data_userrole = $scope.data_userrole.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_userrole)
                    }
                });
                $scope.usersTable_userrole.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List userrole  ======*/

    /*============================================
    =            Roles Checkbox Click            =
    ============================================*/
    $scope.checkboxRolesClick = function(id) {
        //console.log(id);
        $scope.rol_id = id;

     }
    /*=====  End of Roles Checkbox Click  ======*/

    /*==============================
    =            Filter            =
    ==============================*/
    $scope.shouldHide = function (roleName) {
        return roleName.roleName !== 'ITP Admin' && roleName.roleName !== 'Admin';
    }
    /*=====  End of Filter  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    function ClearModels() {
        $scope.adduserrole = {};
        $scope.userroleData = {};
        
        $scope.viewuserroleData = {};
    }
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.userroleData = {};
        
        $scope.viewuserroleData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit userrole Modal            =
    ========================================*/
    $scope.editUserrole = function(id) {
         //console.log(id); 
         $scope.disableUsername = false;

        /*===================================
        =            Users List            =
        ===================================*/
        // var UserListUrl = baseUrlSrvc.baseUrl + 'listUserDetails';
        // var promiseUserGet = CRUD_SERVICE.getAllData(UserListUrl);
        // promiseUserGet.then(function(pl) {
        //     $scope.Users = pl.data;
        // },
        // function(errorPl) {
        //     $log.error('Some Error in Getting Records.', errorPl);
        // });
        /*=====  End of Users List  ======*/

        /*===================================
        =            Roles List            =
        ===================================*/
        var RoleListUrl = baseUrlSrvc.baseUrl + 'listRole';
        var promiseRoleGet = CRUD_SERVICE.getAllData(RoleListUrl);
        promiseRoleGet.then(function(pl) {
            $scope.Roles = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
        /*=====  End of Roles List  ======*/

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.userrole1 = pl.data;
                //console.log($scope.userrole1);
                for (var i = 0; i < $scope.userrole1.length; i++) {
                    if ($scope.userrole1[i].adUserroleId == id) {
                        $scope.userroleData = $scope.userrole1[i];
                        //console.log($scope.userroleData);

                        $scope.Users = [{
                            "adUserId":$scope.userroleData.adUserId,
                            "firstname":$scope.userroleData.firstname,
                            "middlename":$scope.userroleData.middlename,
                            "lastname":$scope.userroleData.lastname
                        }];
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit userrole Modal  ======*/
    
    /*==================================
    =            View Userrole            =
    ==================================*/
    $scope.viewUserrole = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "adUserroleId": id });
        //console.log("$scope.temp_var_a",$scope.temp_var_a);

       $scope.viewuserroleData= $scope.temp_var_a[0];
    }
    /*=====  End of View Userrole  ======*/
    
    /*==================================
    =            Save Userrole            =
    ==================================*/
    $scope.saveUserrole = function (data) {
        //console.log(data);
        // $scope.ur_array = [];
        if (data.adUserroleId) {
            //console.log("Update");
            data.updatedby=$sessionStorage.updatedby;
            data.bBranchId=$sessionStorage.bBranchId;
            //data.adUserId = data.adUserdetailId;
            data.inInstituteId=$sessionStorage.inInstituteId;
             // data.bBranchId=$sessionStorage.bBranchId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUsersRole'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.adUserdetailroleId = pl.data.adUserdetailroleId;
               
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

            // var ur_data = $scope.rol_id;

            // for(var i=0; i < ur_data.length; i++ )
            // {
            //     $scope.ur_array.push({'adRoleId': ur_data[i], 'createdby': 1, 'updatedby':1, 'inInstituteId':1, 'adUserId':data.adUserId, "bBranchId":0});
            // }

            data.createdby=$sessionStorage.createdby;
            data.bBranchId = $sessionStorage.bBranchId;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.updatedby=$sessionStorage.updatedby;
            //data.adUserId = data.adUserdetailId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUsersRole'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var promiseData = pl.data;
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
                if (promiseData.code == 0) {
                    toaster.error({title: "Error", body:"Role already assigned!",tapToDismiss: true,showCloseButton: true});
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
    
    /*=====  End of Save Userrole  ======*/
   
    /*====================================
    =            Delete Userrole            =
    ====================================*/
    
    $scope.delUserrole = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "adUserroleId": id });

       $scope.deleteuserroleData= {
          "adUserroleId": $scope.temp_var[0].adUserroleId,
          "username": $scope.temp_var[0].username
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteUsersRole'
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
    /*=====  End of Delete Userrole  ======*/
    
});
/*=====  End of Controller  ======*/
