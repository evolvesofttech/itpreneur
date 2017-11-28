angular.module("theGuru").controller("roleWidgetCtrl", 
        function($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter, 
          ngTableParams, $timeout, $route, Flash, $rootScope, $sessionStorage, toaster,$window) {
        //console.log("roleWidgetCtrl");
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
        $scope.roleWidgetArray = [];

        //Role Window
        //1 Mean New Entry
        var urlRoleWidgetList = baseUrlSrvc.baseUrl + 'listRoleWidgetByRoleId/' + $scope.OperType;
        GetAllRoleWidgetRecords(urlRoleWidgetList);
        //To Get All Records
        function GetAllRoleWidgetRecords(url) {
            $scope.roleWidgetArray = [];
            var promiseWindowGet = CRUD_SERVICE.getAllData(url);
            promiseWindowGet.then(function(pl) {
                $scope.roleWidget = pl.data;
                $scope.roleWidgetArray.push($scope.roleWidget);
                //console.log($scope.roleWidgetArray);

                //========================================for pagination ========================
                  $scope.usersTable_roleWidget = new ngTableParams({
                      page: 1,
                      count: 10
                  }, {
                     total: $scope.roleWidget.length, 
                      getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                      
                          $scope.data_roleWidget = params.sorting() ? $filter('orderBy')($scope.roleWidgetArray[0], params.orderBy()) : $scope.roleWidgetArray[0];
                          $scope.data_roleWidget = params.filter() ? $filter('filter')($scope.data_roleWidget, params.filter()) : $scope.data_roleWidget;
                         $scope.data_roleWidget = $scope.data_roleWidget.slice((params.page() - 1) * params.count(), params.page() * params.count());
                         $defer.resolve($scope.data_roleWidget)
                      }
                  });
                  $scope.usersTable_roleWidget.reload();
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }
        /*=====  End of Get List Role Window  ======*/

        /*===================================
        =            Widget List            =
        ===================================*/
        var WidgetListUrl = baseUrlSrvc.baseUrl + 'listWidget';
        var promiseWidgetGet = CRUD_SERVICE.getAllData(WidgetListUrl);
        promiseWidgetGet.then(function(pl) {
            $scope.Widget = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
        /*=====  End of Widget List  ======*/

        /*========================================
        =            Edit Role Widget            =
        ========================================*/
        $scope.editroleWidget = function(id) {

            var WidgetListUrl = baseUrlSrvc.baseUrl + 'listWidget';
            var promiseWidgetGet = CRUD_SERVICE.getAllData(WidgetListUrl);
            promiseWidgetGet.then(function(pl) {
                $scope.Widget = pl.data;
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });


           var urlList = baseUrlSrvc.baseUrl + 'listRoleWidget';

              var promiseGet = CRUD_SERVICE.getAllData(urlList);
              promiseGet.then(function (pl) {
                      $scope.roleWidget = pl.data;
                      //console.log($scope.roleWidget);
                      for (var i = 0; i < $scope.roleWidget.length; i++) {
                          if ($scope.roleWidget[i].adRolewidgetId == id) {
                              $scope.roleWidgetData = $scope.roleWidget[i];
                                //console.log("Role Window Data",$scope.roleWindowData);
                          }
                      }

                  },
                  function (errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });
        }
        /*=====  End of Edit Role Widget  ======*/
        

        /*========================================
        =            Save Role Widget            =
        ========================================*/
        $scope.saveRoleWidget = function(data) {
              //console.log(data);

              if (data.adRolewidgetId) {

                  data.adRoleId = $scope.OperType;
                  data.adUserId = $sessionStorage.adUserId;
                 data.updatedby=$sessionStorage.updatedby;
                  data.inInstituteId=$sessionStorage.inInstituteId;
                 
                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateRoleWidget'
                  };
                  var promisePost = CRUD_SERVICE.post(FormData);
                  promisePost.then(function(pl) {
                      
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleWidgetRecords(urlRoleWidgetList);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                      //ClearModels();
                  }, function(err) {
                      //console.log(err);
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleWidgetRecords(urlRoleWidgetList);
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

                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateRoleWidget'
                  };

                  var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                  promisePut.then(function(pl) {
                    var promiseData = pl.data;
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleWidgetRecords(urlRoleWidgetList);
                          });
                      },100);
                       if (promiseData.code == 2) {
                          toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                      } else {
                          toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                      }
                      //ClearModels();
                  }, function(err) {
                      //console.log("Some Error Occured." + err);
                      $timeout(function() {
                          $scope.$apply(function () {
                          GetAllRoleWidgetRecords(urlRoleWidgetList);
                          });
                      },100);
                       toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  });
              }
          };
        /*=====  End of Save Role Widget  ======*/

        /*==================================
        =            View Role Widget            =
        ==================================*/
        $scope.viewRoleWidget = function(id, bdata) {
            //console.log(id); 
            $scope.temp_var_b = $filter('filter')(bdata, { "adRolewidgetId": id });

           $scope.viewWidgetData= $scope.temp_var_b[0];
        }
        /*=====  End of View Widget  ======*/


        /*==========================================
        =            Delete Role Widget            =
        ==========================================*/
        $scope.delRoleWidget = function(id, rdata) {
            $scope.temp_var = $filter('filter')(rdata, { "adRolewidgetId": id });

             $scope.deleteroleWidgetData = $scope.temp_var[0];
             // console.log($scope.deleteroleWidgetData);
          }
          
          //To Delete Role
          $scope.deleteRoleWidget = function(id) {
              //console.log(id);
              var FormData = {
                  id: id,
                  url: baseUrlSrvc.baseUrl + 'deleteRoleWidget'
              };
              var promiseDelete = CRUD_SERVICE.delete(FormData);
              promiseDelete.then(function(pl) {
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllRoleWidgetRecords(urlRoleWidgetList);
                      });
                  },100);
                   toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                  //ClearModels();
              }, function(err) {
                  //console.log("Some Error Occured." + err);
                  $timeout(function() {
                      $scope.$apply(function () {
                      GetAllRoleWidgetRecords(urlRoleWidgetList);
                      });
                  },100);
                   toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
              });
          }
        
        
        /*=====  End of Delete Role Widget  ======*/
        
        

            
});


