angular.module("theGuru").controller("roleCtrl", 
        function($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter, 
          ngTableParams, $timeout, $route, Flash, $rootScope, $sessionStorage, toaster, $window) {
        //console.log("role");
        $scope.roleArray = [];
        $scope.OperType = $routeParams.ID;
        $window.document.title = "ITPreneur - Role";
        //console.log("role",$scope.role);

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
        /*=====  End of Tabs  ======*/
        

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

        /*------------------------------  Role Functions  ------------------------------*/

        /*=====================================
        =            Get Role List            =
        =====================================*/
        var urlList = baseUrlSrvc.baseUrl + 'listRole';
        GetAllRecords(urlList);
        //To Get All Records
        function GetAllRecords(url) {
          $scope.roleArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function(pl) {
                    $scope.Roles = pl.data;
                    $scope.roleArray.push($scope.Roles);
                    //console.log($scope.roleArray);

                      $scope.usersTable_b = new ngTableParams({
                          page: 1,
                          count: 10
                      }, {
                         total: $scope.Roles.length, 
                          getData: function ($defer, params) {

                            if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                          
                              $scope.data_b = params.sorting() ? $filter('orderBy')($scope.roleArray[0], params.orderBy()) : $scope.roleArray[0];
                              $scope.data_b = params.filter() ? $filter('filter')($scope.data_b, params.filter()) : $scope.data_b;
                             $scope.data_b = $scope.data_b.slice((params.page() - 1) * params.count(), params.page() * params.count());
                             $defer.resolve($scope.data_b)
                          }
                      });
                      $scope.usersTable_b.reload();
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        /*=====  End of Get Role List  ======*/

        /*=========================================
        =            Role on Edit Page            =
        =========================================*/
        if ($scope.OperType != undefined && $scope.OperType != 0) {
          $window.document.title = "ITPreneur - Edit Role";

          var roleByIdListUrl = baseUrlSrvc.baseUrl + 'listRoleById/'+ $scope.OperType;
            var promiseroleByIdListUrlGet = CRUD_SERVICE.getAllData(roleByIdListUrl);
            promiseroleByIdListUrlGet.then(function(pl) {
                $scope.roleData1 = pl.data;
                for (var i = 0; i < $scope.roleData1.length; i++) {
                    if ($scope.roleData1[i].adRoleId == $scope.OperType) {
                        $scope.roleData = $scope.roleData1[i];
                        $scope.currentRoleName = $scope.roleData.roleName;
                    }
                }
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
         }
        /*=====  End of Role on Edit Page  ======*/

        /*============================================
        =            Clear Modal on Click            =
        ============================================*/

        function ClearModels() {
            $scope.addRole = {};
            $scope.roleData = {};
            $scope.roleWindowData = {};
        }
        
        $scope.clearModalOnClose = function() {
            $scope.roleData = {};
            $scope.roleWindowData = {};
            $scope.addRole = {};
        }
        
        /*=====  End of Clear Modal on Click  ======*/

        /*=================================
        =            Edit Role            =
        =================================*/
        $scope.editRole = function(id) {
             //console.log(id); 

            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.role_a = pl.data;
                    //console.log($scope.role_a);
                    for (var i = 0; i < $scope.role_a.length; i++) {
                        if ($scope.role_a[i].adRoleId == id) {
                            $scope.roleData = $scope.role_a[i];
                              //console.log($scope.roleData);
                        }
                    }

                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
          }
        /*=====  End of Edit Role  ======*/      

          /*=================================
          =            Save Role            =
          =================================*/
          $scope.saveRole = function(data) {
              //console.log(data);

              if (data.adRoleId) {

                 data.updatedby=$sessionStorage.updatedby;
                  data.inInstituteId=$sessionStorage.inInstituteId;
                  data.bBranchId = $sessionStorage.bBranchId;
                  data.adUserId = $sessionStorage.adUserId;


                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateRole'
                  };
                  var promisePost = CRUD_SERVICE.post(FormData);
                  promisePost.then(function(pl) {
                      $scope.adRoleId = pl.data.adRoleId;
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRecords(urlList);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                      //ClearModels();
                  }, function(err) {
                      //console.log(err);
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRecords(urlList);
                          });
                      },100);
                       toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                  });
              } else {

                 data.updatedby=$sessionStorage.updatedby;
                 data.createdby=$sessionStorage.createdby;
                  data.inInstituteId=$sessionStorage.inInstituteId;
                  data.bBranchId = $sessionStorage.bBranchId;
                  data.adUserId = $sessionStorage.adUserId;


                  //  //console.log(/edit);
                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateRole'
                  };

                  var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                  promisePut.then(function(pl) {
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRecords(urlList);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                      ClearModels();
                  }, function(err) {
                      //console.log("Some Error Occured." + err);
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRecords(urlList);
                          });
                      },100);
                       toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  });
              }
          };
          /*=====  End of Save Role  ======*/

          /*===================================
          =            Delete Role            =
          ===================================*/

          $scope.delRole = function(id, rdata) {
            $scope.temp_var = $filter('filter')(rdata, { "adRoleId": id });

             $scope.deleteroleData= {
                "adRoleId": $scope.temp_var[0].adRoleId,
                "roleName": $scope.temp_var[0].roleName
              };
          }
          
          //To Delete Role
          $scope.deleteRole = function(id) {
              //console.log(id);
              var FormData = {
                  id: id,
                  url: baseUrlSrvc.baseUrl + 'deleteRole'
              };
              var promiseDelete = CRUD_SERVICE.delete(FormData);
              promiseDelete.then(function(pl) {
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllRecords(urlList);
                      });
                  },100);
                   toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                  ClearModels();
              }, function(err) {
                  //console.log("Some Error Occured." + err);
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllRecords(urlList);
                      });
                  },100);
                   toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
              });
          }
          
          /*=====  End of Delete Role  ======*/

        /*------------------------------  Role Functions Ends  ------------------------------*/



        /*------------------------------  Window Function Starts  ------------------------------*/

        /*============================================
        =            Get List Role Window            =
        ============================================*/
        if ($scope.OperType != undefined && $scope.OperType != 0) {
          $scope.roleWindowArray = [];
            var urlRoleWindowList = baseUrlSrvc.baseUrl + 'listRoleWindowByRoleId/' + $scope.OperType;
            GetAllRoleWindowRecords(urlRoleWindowList);
            //To Get All Records
            function GetAllRoleWindowRecords(url) {
                $scope.roleWindowArray = [];
                var promiseWindowGet = CRUD_SERVICE.getAllData(url);
                promiseWindowGet.then(function(pl) {
                    $scope.roleWindow = pl.data;
                    //console.log("roleWindow",$scope.roleWindow);

                    $scope.roleWindowArray.push($scope.roleWindow);
                    

                    //========================================for pagination ========================
                      $scope.usersTable_roleWindow = new ngTableParams({
                          page: 1,
                          count: 10
                      }, {
                         total: $scope.roleWindow.length, 
                          getData: function ($defer, params) {

                            if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                          
                              $scope.data_roleWindow = params.sorting() ? $filter('orderBy')($scope.roleWindowArray[0], params.orderBy()) : $scope.roleWindowArray[0];
                              $scope.data_roleWindow = params.filter() ? $filter('filter')($scope.data_roleWindow, params.filter()) : $scope.data_roleWindow;
                             $scope.data_roleWindow = $scope.data_roleWindow.slice((params.page() - 1) * params.count(), params.page() * params.count());
                             $defer.resolve($scope.data_roleWindow)
                          }
                      });
                      $scope.usersTable_roleWindow.reload();
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
            }
          }
          /*=====  End of Get List Role Window  ======*/

          /*===================================
          =            Window List            =
          ===================================*/
          //if ($scope.OperType != undefined && $scope.OperType != 0) {
            // var windowListUrl = baseUrlSrvc.baseUrl + 'listWindow';
            var windowListUrl = baseUrlSrvc.baseUrl + 'listWindowByRoleId/' + $scope.OperType;
            GetAllWindowRecords(windowListUrl);

            function GetAllWindowRecords(url) {
              var promiseWindowGet = CRUD_SERVICE.getAllData(url);
              promiseWindowGet.then(function(pl) {
                      $scope.Window = pl.data;
                      //console.log("$scope.Window",$scope.Window);
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
              });
            }
          //}
          /*=====  End of Window List  ======*/

          /*========================================
          =            Edit Role Window            =
          ========================================*/
          
            $scope.editRoleWindow = function(id) {

               //window
                var windowListUrl = baseUrlSrvc.baseUrl + 'listWindow';
              var promiseWindowGet = CRUD_SERVICE.getAllData(windowListUrl);
              promiseWindowGet.then(function(pl) {
                      $scope.Window = pl.data;
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });
               //window
               var urlList = baseUrlSrvc.baseUrl + 'listRoleWindow';

              var promiseGet = CRUD_SERVICE.getAllData(urlList);
              promiseGet.then(function (pl) {
                      $scope.rolewindow_a = pl.data;
                      //console.log($scope.rolewindow_a);
                      for (var i = 0; i < $scope.rolewindow_a.length; i++) {
                          if ($scope.rolewindow_a[i].adWindowaccessId == id) {
                              $scope.roleWindowData = $scope.rolewindow_a[i];
                                //console.log("Role Window Data",$scope.roleWindowData);
                          }
                      }

                  },
                  function (errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });
            }
          
          /*=====  End of Edit Role Window  ======*/
          

          /*========================================
          =            Save Role Window            =
          ========================================*/
          $scope.saveRoleWindow = function(data) {
                //console.log(data);
               
               data.updatedby=$sessionStorage.updatedby;
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.bBranchId = $sessionStorage.bBranchId;

                if (data.adWindowaccessId) {
                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateRoleWindow'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        
                        $timeout(function() {
                          $scope.$apply(function () {
                          //$route.reload();
                          GetAllRoleWindowRecords(urlRoleWindowList);
                          GetAllWindowRecords(windowListUrl);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                       
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            //$route.reload();
                            GetAllRoleWindowRecords(urlRoleWindowList);
                            GetAllWindowRecords(windowListUrl);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {
                  
                  data.createdby=$sessionStorage.createdby;
               data.updatedby=$sessionStorage.updatedby;
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.bBranchId = $sessionStorage.bBranchId;
                data.adRoleId = $scope.OperType;


                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateRoleWindow'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {
                        $timeout(function() {
                          $scope.$apply(function () {
                          //$route.reload();
                          GetAllRoleWindowRecords(urlRoleWindowList);
                          GetAllWindowRecords(windowListUrl);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                        // GetAllRoleWindowRecords(urlRoleWindowList);
                        ClearModels();
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                          $scope.$apply(function () {
                          //$route.reload();
                          GetAllRoleWindowRecords(urlRoleWindowList);
                          GetAllWindowRecords(windowListUrl);
                          });
                      },100);
                       toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };
          /*=====  End of Save Role Window  ======*/

          /*==========================================
            =            Delete Rolw Window            =
            ==========================================*/
            
            $scope.delRoleWindow = function(id, rwdata) {
              $scope.temp_var = $filter('filter')(rwdata, { "adWindowaccessId": id });
              //console.log(id);
               $scope.deleterolewindowData= {
                  "adWindowaccessId": $scope.temp_var[0].adWindowaccessId,
                  "roleName": $scope.temp_var[0].roleName,
                  "windowName": $scope.temp_var[0].windowName
                };
            }

            //To Delete Role Window
            $scope.deleteRoleWindow = function(id) {
                //console.log(id);
                var FormData = {
                    id: id,
                    url: baseUrlSrvc.baseUrl + 'deleteRoleWindow'
                };
                var promiseDelete = CRUD_SERVICE.delete(FormData);
                promiseDelete.then(function(pl) {
                    $timeout(function() {
                        $scope.$apply(function () {
                        GetAllRoleWindowRecords(urlRoleWindowList);
                        GetAllWindowRecords(windowListUrl);
                        });
                    },100);
                     toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                    ClearModels();
                }, function(err) {
                    //console.log("Some Error Occured." + err);
                    $timeout(function() {
                        $scope.$apply(function () {
                       GetAllRoleWindowRecords(urlRoleWindowList);
                       GetAllWindowRecords(windowListUrl);
                        });
                    },100);
                     toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                });
            }
            
            /*=====  End of Delete Rolw Window  ======*/
          

        /*------------------------------  Window Function Ends  ------------------------------*/  
});