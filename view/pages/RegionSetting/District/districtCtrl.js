/*========================================
=            District Controller            =
========================================*/

     angular.module('theGuru').controller("districtCtrl", function($scope, $log, $routeParams, 
        CRUD_SERVICE, baseUrlSrvc, $filter, ngTableParams, 
        ngTableDataService, $timeout, $route, Flash, $rootScope, $sessionStorage, $window) {
        //console.log("District");
        $window.document.title = "ITPreneur - District";
        $scope.districtArray = [];
        $scope.OperType = $routeParams.ID;

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
        }
        
        /*=====  End of Enable Select on Click  ======*/

        /*======================================
        =            Get Country List            =
        ======================================*/

        var districtListUrl = baseUrlSrvc.baseUrl + 'listDistrict';
            var promiseDistrictGet = CRUD_SERVICE.getAllData(districtListUrl);
            promiseDistrictGet.then(function(pl) {
                $scope.District = pl.data;
                $scope.districtArray.push($scope.District);
                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.District.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.districtArray[0], params.orderBy()) : $scope.districtArray[0];
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                       $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data)
                    }
                });

                //console.log($scope.District);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        /*=====  End of Get Country List  ======*/

        /*==================================
        =            State List            =
        ==================================*/
        var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
        var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseStateGet.then(function(pl) {
            $scope.State = pl.data;

            //console.log($scope.districtArray);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
        /*=====  End of State List  ======*/
        
        /*====================================
        =            Clear Models            =
        ====================================*/
        
        function ClearModels() {
            $scope.districtData = {};
           
        }
        
        /*=====  End of Clear Models  ======*/

        /*============================================
        =            Clear Modal on Click            =
        ============================================*/
        
        $scope.clearModalOnClose = function() {
            $scope.districtData = {};
            
        }
        
        /*=====  End of Clear Modal on Click  ======*/
        
        /*========================================
        =            Edit District Modal            =
        ========================================*/
        
        $scope.editDistrict = function(id) {
         //console.log(id); 
         $scope.disableState = true;

        var promiseGet = CRUD_SERVICE.getAllData(districtListUrl);
        promiseGet.then(function (pl) {
                $scope.district_a = pl.data;
                //console.log($scope.district_a);
                for (var i = 0; i < $scope.district_a.length; i++) {
                    if ($scope.district_a[i].cDistrictId == id) {
                        $scope.districtData = $scope.district_a[i];
                        // $scope.classData = $scope.district_a[i];
                          //console.log("District Data",$scope.districtData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
         }

        
        /*=====  End of Edit District Modal  ======*/

        /*========================================
        =            View District Modal            =
        ========================================*/
        $scope.viewDistrict = function(id, cdata) {
            //console.log(id); 
            $scope.temp_var_a = $filter('filter')(cdata, { "cDistrictId": id });

           $scope.viewdistrictData= {
              "countryname": $scope.temp_var_a[0].countryname,
              "statename": $scope.temp_var_a[0].statename,
              "districtname": $scope.temp_var_a[0].districtname
           };
        }
        /*=====  End of View District Modal  ======*/
        
        /*==================================
        =            Save District            =
        ==================================*/
        
        $scope.save = function(data) {
            //console.log(data);
            if (data.cDistrictId) {

                data.updatedby=$sessionStorage.updatedby;
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.bBranchId=$sessionStorage.bBranchId;
                data.adUserId = $sessionStorage.adUserId;
                
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateDistrict'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function(pl) {
                    $scope.cDistrictId = pl.data.cDistrictId;
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
                    url: baseUrlSrvc.baseUrl + 'addUpdateDistrict'
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
        
        /*=====  End of Save Class  ======*/

        /*====================================
        =            Delete Class            =
        ====================================*/
        
        $scope.delDistrict = function(id,cdata) {
             //console.log(id);
            $scope.temp_var = $filter('filter')(cdata, { "cDistrictId": id });
           //console.log("$scope.temp_var",$scope.temp_var);

           $scope.deletedistrictData= $scope.temp_var[0];
       }

        //To Delete Record
        $scope.delete = function(id) {
            //console.log(id);
            var FormData = {
                id: id,
                url: baseUrlSrvc.baseUrl + 'deleteDistrict'
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
        
        /*=====  End of Delete Class  ======*/
        
    });

/*=====  End of Class Controller  ======*/