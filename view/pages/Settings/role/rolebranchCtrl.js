angular.module("theGuru").controller("roleBranchCtrl", 
        function($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter, 
          ngTableParams, $timeout, $route, Flash, $rootScope, $sessionStorage, toaster) {
        //console.log("roleBranchCtrl");
        $scope.OperType = $routeParams.ID;

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

        /*============================================
        =            Get List Role Window            =
        ============================================*/
        $scope.roleBranchArray = [];

        //Role Window
        //1 Mean New Entry
        var urlRoleBranchList = baseUrlSrvc.baseUrl + 'listRoleWindowBranchById/' + $scope.OperType;
        GetAllRoleBranchRecords(urlRoleBranchList);
        //To Get All Records
        function GetAllRoleBranchRecords(url) {
            $scope.roleBranchArray = [];
            var promiseWindowGet = CRUD_SERVICE.getAllData(url);
            promiseWindowGet.then(function(pl) {
                $scope.roleBranch = pl.data;
                $scope.roleBranchArray.push($scope.roleBranch);
                //console.log($scope.roleBranchArray);

                //========================================for pagination ========================
                  $scope.usersTable_rolebranch = new ngTableParams({
                      page: 1,
                      count: 10
                  }, {
                     total: $scope.roleBranch.length, 
                      getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                      
                          $scope.data_roleBranch = params.sorting() ? $filter('orderBy')($scope.roleBranchArray[0], params.orderBy()) : $scope.roleBranchArray[0];
                          $scope.data_roleBranch = params.filter() ? $filter('filter')($scope.data_roleBranch, params.filter()) : $scope.data_roleBranch;
                         $scope.data_roleBranch = $scope.data_roleBranch.slice((params.page() - 1) * params.count(), params.page() * params.count());
                         $defer.resolve($scope.data_roleBranch)
                      }
                  });
                  $scope.usersTable_rolebranch.reload();
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }
        /*=====  End of Get List Role Window  ======*/

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

        /*========================================
        =            Edit Role Branch            =
        ========================================*/
        $scope.editroleBranch = function(id) {

            var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
            var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
            promiseBranchGet.then(function(pl) {
                $scope.Branch = pl.data;
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });


           var urlEditBranchList = baseUrlSrvc.baseUrl + 'listRoleWindowBranchById/' + $scope.OperType;

           var promiseEditBranchGet = CRUD_SERVICE.getAllData(urlEditBranchList);
           promiseEditBranchGet.then(function (pl) {
                $scope.rolebranch_a = pl.data;
                //console.log($scope.rolebranch_a);
                for (var i = 0; i < $scope.rolebranch_a.length; i++) {
                    if ($scope.rolebranch_a[i].adWindowbranchId == id) {
                        $scope.roleBranchData = $scope.rolebranch_a[i];

                        $scope.Branch = [{
                          "bBranchId": $scope.roleBranchData[0].bBranchId,
                          "branchname": $scope.roleBranchData[0].branchname
                        }];
                    }
                }
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }
        /*=====  End of Edit Role Branch  ======*/
        

        /*========================================
        =            Save Role Branch            =
        ========================================*/
        $scope.saveRoleBranch = function(data) {
              //console.log(data);

              if (data.adWindowbranchId) {
                  data.adRoleId = $scope.OperType;
                  data.adUserId = $sessionStorage.adUserId;
                 data.updatedby=$sessionStorage.updatedby;
                  data.inInstituteId=$sessionStorage.inInstituteId;
                 


                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateRoleWindowBranch'
                  };
                  var promisePost = CRUD_SERVICE.post(FormData);
                  promisePost.then(function(pl) {
                      $scope.adWindowbranchId = pl.data.adWindowbranchId;
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleBranchRecords(urlRoleBranchList);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                      ClearModels();
                  }, function(err) {
                      //console.log(err);
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleBranchRecords(urlRoleBranchList);
                          });
                      },100);
                       toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                  });
              } else {

                 data.createdby=$sessionStorage.createdby;
                 data.updatedby=$sessionStorage.updatedby;
                 data.adUserId = $sessionStorage.adUserId;
                  data.inInstituteId=$sessionStorage.inInstituteId;
                  data.adRoleId = $scope.OperType;


                  //  //console.log(/edit);
                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateRoleWindowBranch'
                  };

                  var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                  promisePut.then(function(pl) {
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleBranchRecords(urlRoleBranchList);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                      ClearModels();
                  }, function(err) {
                      //console.log("Some Error Occured." + err);
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleBranchRecords(urlRoleBranchList);
                          });
                      },100);
                       toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  });
              }
          };
        /*=====  End of Save Role Branch  ======*/

        /*==========================================
        =            Delete Role Branch            =
        ==========================================*/
        $scope.delRoleBranch = function(id, rdata) {
            $scope.temp_var = $filter('filter')(rdata, { "adWindowbranchId": id });

             $scope.deleteroleBranchData= {
                "adWindowbranchId": $scope.temp_var[0].adWindowbranchId,
                "branchname": $scope.temp_var[0].branchname
              };
          }
          
          //To Delete Role
          $scope.deleteRoleBranch = function(id) {
              //console.log(id);
              var FormData = {
                  id: id,
                  url: baseUrlSrvc.baseUrl + 'deleteRoleWindowBranch'
              };
              var promiseDelete = CRUD_SERVICE.delete(FormData);
              promiseDelete.then(function(pl) {
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllRoleBranchRecords(urlRoleBranchList);
                      });
                  },100);
                   toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                  ClearModels();
              }, function(err) {
                  //console.log("Some Error Occured." + err);
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllRoleBranchRecords(urlRoleBranchList);
                      });
                  },100);
                   toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
              });
          }
        
        
        /*=====  End of Delete Role Branch  ======*/
        
        

            
});