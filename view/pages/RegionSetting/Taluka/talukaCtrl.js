/*==========================================
=            Taluka Controller            =
==========================================*/
    angular.module('theGuru').controller("talukaCtrl", function($scope, $log, $routeParams, 
        CRUD_SERVICE, baseUrlSrvc, $filter, ngTableParams, ngTableDataService, 
        $route, $timeout, Flash, $rootScope, $sessionStorage, $window) {
        //console.log("taluka");

        $scope.talukaArray = [];
        $scope.OperType = $routeParams.ID;
        $window.document.title = "ITPreneur - Taluka";
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

        /*==============================================
        =            Enable Select on Click            =
        ==============================================*/
        $scope.addForEnable = function() {
            $scope.disableCountry = false;
            $scope.disableState = true;
            $scope.disableDistrict = true;
        }
        /*=====  End of Enable Select on Click  ======*/
        
        /*============================================
        =            State Change Filter            =
        ============================================*/
        
        $scope.OnStateChange = function(id) {
            $scope.disableDistrict = false;
            //console.log(id);
            var districtListUrl = baseUrlSrvc.baseUrl + 'listDistrict';
            var promiseDistrictGet = CRUD_SERVICE.getAllData(districtListUrl);
            promiseDistrictGet.then(function(pl) {
                    $scope.DistrictData = pl.data;

                    $scope.District = $filter('filter')($scope.DistrictData, { "cStateId": id });
                    //console.log($scope.talukaArray);
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        
        /*=====  End of State Change Filter  ======*/
       

        var talukaListUrl = baseUrlSrvc.baseUrl + 'listTaluka';
        var promiseTalukaGet = CRUD_SERVICE.getAllData(talukaListUrl);
        promiseTalukaGet.then(function(pl) {
            $scope.Taluka = pl.data;
            $scope.talukaArray.push($scope.Taluka);
            $scope.usersTable = new ngTableParams({
                page: 1,
                count: 10
            }, {
               total: $scope.Taluka.length, 
                getData: function ($defer, params) {

                    if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                
                    $scope.data = params.sorting() ? $filter('orderBy')($scope.talukaArray[0], params.orderBy()) : $scope.talukaArray[0];
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                   $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                   $defer.resolve($scope.data)
                }
            });
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        var districtListUrl = baseUrlSrvc.baseUrl + 'listDistrict';
        var promiseDistrictGet = CRUD_SERVICE.getAllData(districtListUrl);
        promiseDistrictGet.then(function(pl) {
            $scope.District = pl.data;

            //console.log($scope.talukaArray);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });


        var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
        var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseStateGet.then(function(pl) {
            $scope.State = pl.data;

            //console.log($scope.talukaArray);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
        /*=====  End of Get taluka List  ======*/
        
        /*====================================
        =            Clear Models            =
        ====================================*/
        function ClearModels() {
            $scope.addtaluka = {};
        }
        /*=====  End of Clear Models  ======*/

        /*============================================
        =            Clear Modal on Click            =
        ============================================*/
        $scope.clearModalOnClose = function() {
            $scope.talukaData = {};
            // $scope.publicationData = {};
            $scope.viewtalukaData = {};
        }
        /*=====  End of Clear Modal on Click  ======*/
        

        /*==========================================
        =            Edit taluka Modal            =
        ==========================================*/
        
        $scope.editTaluka = function(id) {
             //console.log(id); 
             $scope.disableCountry = true;
             $scope.disableState = true;
             $scope.disableDistrict = true;

             //State
              var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
            var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
            promiseStateGet.then(function(pl) {
                    $scope.State = pl.data;
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
             //State

             // District
                var districtListUrl = baseUrlSrvc.baseUrl + 'listDistrict';
                var promiseDistrictGet = CRUD_SERVICE.getAllData(districtListUrl);
                promiseDistrictGet.then(function(pl) {
                        $scope.District = pl.data;
                    },
                    function(errorPl) {
                        $log.error('Some Error in Getting Records.', errorPl);
                    });
             // District

            var promiseGet = CRUD_SERVICE.getAllData(talukaListUrl);
            promiseGet.then(function (pl) {
                    $scope.taluka_a = pl.data;
                    //console.log($scope.taluka_a);
                    for (var i = 0; i < $scope.taluka_a.length; i++) {
                        if ($scope.taluka_a[i].cTalukaId == id) {
                            $scope.talukaData = $scope.taluka_a[i];
                            // $scope.publicationData = $scope.taluka_a[i];
                              //console.log("State Data",$scope.talukaData);
                        }
                    }

                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        
        /*=====  End of Edit Taluka Modal  ======*/
        
        
        /*==========================================
        =            View Taluka Modal            =
        ==========================================*/
        
        $scope.viewTaluka = function(id, sdata) {
            //console.log(id); 
            $scope.temp_var_a = $filter('filter')(sdata, { "cTalukaId": id });

           $scope.viewtalukaData= {
              "countryname": $scope.temp_var_a[0].countryname,
              "statename": $scope.temp_var_a[0].statename,
              "districtname": $scope.temp_var_a[0].districtname,
              "talukaname": $scope.temp_var_a[0].talukaname
           };
        }
        
        /*=====  End of View Taluka Modal  ======*/
        
        /*====================================
        =            Save Taluka            =
        ====================================*/
        
        $scope.save = function(data) {
            //console.log(data);

            if (data.cTalukaId) {

                data.updatedby=$sessionStorage.updatedby;
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.bBranchId=$sessionStorage.bBranchId;
                data.adUserId = $sessionStorage.adUserId;

                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateTaluka'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function(pl) {
                    $scope.cTalukaId = pl.data.cTalukaId;
                    $timeout(function() {
                        $scope.$apply(function () {
                        $route.reload();
                        });
                    },100);
                     Flash.create('success', $scope.SuccessMessage);
                ClearModels();

                }, function(err) {
                    //console.log(err);
                     $timeout(function() {
                        $scope.$apply(function () {
                        $route.reload();
                        });
                    },100);
                     Flash.create('danger', $scope.DangerMessage);
                     ClearModels();
                });
            } else {

                data.createdby=$sessionStorage.createdby;
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.bBranchId=$sessionStorage.bBranchId;
                data.adUserId = $sessionStorage.adUserId;
                 
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateTaluka'
                };
                //Edit the record
                // debugger;

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function(pl) {
                    $timeout(function() {
                        $scope.$apply(function () {
                        $route.reload();
                        });
                    },100);
                     Flash.create('success', $scope.SuccessMessage);
                ClearModels();
                }, function(err) {
                    //console.log("Some Error Occured." + err);
                     $timeout(function() {
                        $scope.$apply(function () {
                        $route.reload();
                        });
                    },100);
                     Flash.create('danger', $scope.DangerMessage);
                ClearModels();
                });
            }
        };
        
        /*=====  End of Save Taluka  ======*/

        /*======================================
        =            Delete Taluka            =
        ======================================*/
        
        $scope.delTaluka = function(id,sbdata) {
             //console.log(id);

            $scope.temp_var = $filter('filter')(sbdata, { "cTalukaId": id });
           //console.log("$scope.temp_var",$scope.temp_var);

           $scope.deletetalukaData= {
              "cTalukaId": $scope.temp_var[0].cTalukaId,
              "talukaname": $scope.temp_var[0].talukaname,
           };

           //console.log("=======",$scope.deleteTalukaData);



        }

        $scope.delete = function(id) {
            //console.log(id);
            var FormData = {
                id: id,
                url: baseUrlSrvc.baseUrl + 'deleteTaluka'
            };
            var promiseDelete = CRUD_SERVICE.delete(FormData);
            promiseDelete.then(function(pl) {
               $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },100);
                 Flash.create('success', $scope.SuccessMessage);
                ClearModels();
            }, function(err) {
                //console.log("Some Error Occured." + err);
                 $timeout(function() {
                        $scope.$apply(function () {
                        $route.reload();
                        });
                    },100);
                     Flash.create('danger', $scope.DangerMessage);
                ClearModels();
            });
        }
        
        /*=====  End of Delete Taluka  ======*/
        
    });
/*=====  End of Taluka Controller  ======*/