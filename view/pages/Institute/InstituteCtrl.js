/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').controller("instituteCtrl", ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc","$sessionStorage", "$route", 
        "$timeout", "Flash", "$rootScope","toaster","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,$sessionStorage, 
            $route, $timeout, Flash, $rootScope, toaster, $window) {
            $window.document.title = "ITPreneur - Institute";
            $scope.instituteArray = [];
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

            $scope.toggle_ins_a = function() {
                $scope.institute_a = !$scope.institute_a;
            };

            $scope.toggle_ins_b = function() {
                $scope.institute_b = !$scope.institute_b;
            };

            $scope.toggle_ins_c = function() {
                $scope.institute_c = !$scope.institute_c;
            };
           /*=====  End of Tabs  ======*/

           /*======================================
           =            List Institute            =
           ======================================*/
           var urlList = baseUrlSrvc.baseUrl + 'listInstitute';
           if ($scope.role == 'System Admin' || $scope.role == 'Admin') {
            GetAllRecords(urlList);

            //To Get All Records
            function GetAllRecords(url) {
                var promiseGet = CRUD_SERVICE.getAllData(urlList);
                promiseGet.then(function(pl) {
                    $scope.institute = pl.data;
                    $scope.instituteArray.push($scope.institute);
                    //console.log($scope.instituteArray);

                    $scope.usersTable = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.institute.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                            params.settings().$scope = $scope;
                          }
                          
                            $scope.data = params.sorting() ? $filter('orderBy')($scope.instituteArray[0], params.orderBy()) : $scope.instituteArray[0];
                            $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                           $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data)
                        }
                    });

                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
              }
            }
           /*=====  End of List Institute  ======*/
           
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

            /*==========================================
            =            Role Select Change            =
            ==========================================*/
            $scope.roleSelect = function(id, rdata) {
              //console.log("id",id);
              //console.log("rdata",rdata);
              $scope.temp_var = $filter('filter')(rdata, { "adRoleId": id });
                   //console.log("$scope.temp_var",$scope.temp_var);

                   $scope.addinstitute.conAccounttypeId= $scope.temp_var[0].conAccounttypeId;
                   //console.log("$scope.addinstitute.conAccounttypeId",$scope.addinstitute.conAccounttypeId);
            }
            /*=====  End of Role Select Change  ======*/


            /*=========================================
            =            Add Account Click            =
            =========================================*/
            
            $scope.addInstituteClick = function() {

                  // role
                  var roleListUrl = baseUrlSrvc.baseUrl + 'listRole';
                  var promiseRoleGet = CRUD_SERVICE.getAllData(roleListUrl);
                  promiseRoleGet.then(function(pl) {
                          $scope.Roles_a = pl.data;
                          $scope.Roles = $filter('filter')($scope.Roles_a, { "type": "Yes" });
                      },
                      function(errorPl) {
                          $log.error('Some Error in Getting Records.', errorPl);
                      });
                  // role
            }
            
            /*=====  End of Add Account Click  ======*/

            /*===============================================
            =            View Institute Function            =
            ===============================================*/
            $scope.viewInstitute = function(id, idata) {
                 //console.log(id);
                $scope.temp_var = $filter('filter')(idata, { "inInstituteId": id });
               //console.log("$scope.temp_var",$scope.temp_var);

               $scope.instituteData= $scope.temp_var[0];
            }
            /*=====  End of View Institute Function  ======*/

            /*============================================
            =            Clear Modal on Click            =
            ============================================*/
            
            $scope.clearModalOnClose = function() {
                $scope.instituteData = {};
            }
            
            /*=====  End of Clear Modal on Click  ======*/
            

            /*==============================================
            =            Clear Model After Save            =
            ==============================================*/
            function ClearModels() {
                $scope.instituteData = {};
            }
            /*=====  End of Clear Model After Save  ======*/

            /*==================================================
            =            Get Institute on Edit Page            =
            ==================================================*/
            if ($scope.OperType != undefined) {

              $window.document.title = "ITPreneur - Edit Institute";

              var urlList = baseUrlSrvc.baseUrl + 'listInstitutebyInstituteId/'+ $scope.OperType;
                var promiseGet = CRUD_SERVICE.getAllData(urlList);
                promiseGet.then(function(pl) {
                  $scope.institute = pl.data;

                  for (var i = 0; i < $scope.institute.length; i++) {
                      if ($scope.institute[i].inInstituteId == $scope.OperType) {
                          $scope.instituteData = $scope.institute[i];
                      }
                  }
              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });

            }
            /*=====  End of Get Institute on Edit Page  ======*/
            
            /*===========================================
            =            Save Edit Institute            =
            ===========================================*/
            $scope.saveInstitute = function(data) {
                //console.log(data);

                if (data.inInstituteId) {
                  
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;
                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateInstitute'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.inInstituteId = pl.data.inInstituteId;
                        $timeout(function() {
                            $scope.$apply(function () {
                            $route.reload();
                            });
                        },100);
                         Flash.create('success', $scope.UpdateMessage);
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            $route.reload();
                            });
                        },100);
                         Flash.create('danger', $scope.DangerMessage);
                    });
                } else {
                    data.createdby = $sessionStorage.createdby;
                    data.updatedby = $sessionStorage.updatedby;
                    data.adUserId = $sessionStorage.adUserId;
                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateInstitute'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {

                        var promiseData = pl.data;

                        //console.log("promiseData",promiseData);

                        if (promiseData.code == 1) {
                          //console.log("Success");
                          toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                        }
                        if (promiseData.code == 2) {
                          //console.log("Duplicate");
                          toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                        }

                        $timeout(function() {
                            $scope.$apply(function () {
                            $route.reload();
                            });
                        },100);
                         
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            $route.reload();
                            });
                        },100);
                         Flash.create('danger', $scope.DangerMessage);
                    });
                }
            };
            /*=====  End of Save Edit Institute  ======*/

            /*======================================================
            =            Delete Institute Modal Funtion            =
            ======================================================*/
            $scope.delInstitute = function(id, idata) {
                 //console.log(id); 

                //  var promiseGet = CRUD_SERVICE.getAllData(urlList);
                // promiseGet.then(function (pl) {
                //         $scope.inst_a = pl.data;
                //         //console.log($scope.inst_a);
                //         for (var i = 0; i < $scope.inst_a.length; i++) {
                //             if ($scope.inst_a[i].inInstituteId == id) {
                //                 $scope.deleteinstituteData = $scope.inst_a[i];
                //                   //console.log($scope.deleteinstituteData);
                //             }
                //         }
                //     },
                //     function (errorPl) {
                //         $log.error('Some Error in Getting Records.', errorPl);
                //     });
                $scope.temp_var = $filter('filter')(idata, { "inInstituteId": id });
                   //console.log("$scope.temp_var",$scope.temp_var);

                   $scope.deleteinstituteData = $scope.temp_var[0];
                }

                $scope.deleteInstitute = function(id) {
                //console.log(id);
                    var FormData = {
                        id: id,
                        url: baseUrlSrvc.baseUrl + 'deleteInstitute'
                    };
                    var promiseDelete = CRUD_SERVICE.delete(FormData);
                    promiseDelete.then(function(pl) {
                       $timeout(function() {
                                $scope.$apply(function () {
                                $route.reload();
                                });
                            },100);
                             Flash.create('success', $scope.SuccessMessage);
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                                $scope.$apply(function () {
                                $route.reload();
                                });
                            },100);
                             Flash.create('danger', $scope.DangerMessage);
                    });
                }

            /*=====  End of Delete Institute Modal Funtion  ======*/

}]);
/*=====  End of Controller  ======*/