/*=========================================
=            State Controller            =
=========================================*/

angular.module('theGuru').controller("stateCtrl", function($scope, $log, $routeParams, CRUD_SERVICE, 
    baseUrlSrvc, $filter, ngTableParams, ngTableDataService, $route, $timeout,
     Flash, $rootScope, $sessionStorage, $window) {
    //console.log("state");
    $scope.stateArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - State";
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
    }
    /*=====  End of Enable Select on Click  ======*/

    /*==================================
    =            Country List            =
    ==================================*/
    var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
    var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
    promiseStateGet.then(function(pl) {
        $scope.State = pl.data;
        $scope.stateArray.push($scope.State);
        $scope.usersTable = new ngTableParams({
            page: 1,
            count: 10
        }, {
           total: $scope.State.length, 
            getData: function ($defer, params) {

                if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
            
                $scope.data = params.sorting() ? $filter('orderBy')($scope.stateArray[0], params.orderBy()) : $scope.stateArray[0];
                $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
               $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
               $defer.resolve($scope.data)
            }
        });

        //console.log($scope.State);
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of Country List  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
       
        $scope.stateData = {};
        $scope.viewstateData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/


    /*====================================
    =            Clear Models            =
    ====================================*/
    function ClearModels() {
        $scope.addstate = {};
        $scope.stateData = {};
    }
    /*=====  End of Clear Models  ======*/

    /*===================================
    =            Edit State            =
    ===================================*/
    $scope.editState = function(id) {
         //console.log(id); 
         $scope.disableCountry = true;

        var promiseGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseGet.then(function (pl) {
                $scope.state_a = pl.data;
                //console.log($scope.state_a);
                for (var i = 0; i < $scope.state_a.length; i++) {
                    if ($scope.state_a[i].cStateId == id) {
                        $scope.stateData = $scope.state_a[i];
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit state  ======*/

    /*=========================================
    =            View State Modal            =
    =========================================*/
    $scope.viewState = function(id, mdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(mdata, { "cStateId": id });

       $scope.viewstateData= {
          "countryname": $scope.temp_var_a[0].countryname,
          "statename": $scope.temp_var_a[0].statename
       };
    }
    /*=====  End of View State Modal  ======*/

    /*========================================
    =            Save Edit State            =
    ========================================*/
    $scope.save = function(data) {
        //console.log(data);

        if (data.cStateId) {

            //data=angular.extend(data, $scope.StorageData);
            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateState'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.cStateId = pl.data.cStateId;
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
                url: baseUrlSrvc.baseUrl + 'addUpdateState'
            };

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
    /*=====  End of Save Edit State  ======*/

    /*=====================================
    =            Delete State            =
    =====================================*/
    $scope.delState = function(id,mdata) {
         //console.log(id);
        $scope.temp_var = $filter('filter')(mdata, { "cStateId": id });
       //console.log("$scope.temp_var",$scope.temp_var);

       $scope.deletestateData= {
          "cStateId": $scope.temp_var[0].cStateId,
          "statename": $scope.temp_var[0].statename,
       };
    }

    $scope.delete = function(id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteState'
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
    /*=====  End of Delete State  ======*/

});
/*=====  End of State Controller  ======*/