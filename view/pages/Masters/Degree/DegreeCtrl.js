/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("degreeCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("degreeCtrl");
    $scope.degreeArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Degree";

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

      /*==================================
      =            qualify List            =
      ==================================*/
      var qualifyListUrl = baseUrlSrvc.baseUrl + 'listQualificationMaster';
      var promisequalifyGet = CRUD_SERVICE.getAllData(qualifyListUrl);
      promisequalifyGet.then(function(pl) {
          $scope.Qualification = pl.data;

          //console.log($scope.Qualification);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Stream List  ======*/

      $scope.adddegreeclick = function(){
        $scope.headingMessage = "Add Degree";
      }

    /*======================================
    =            Get List degree            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listDegree';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.degreeArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.degree = pl.data;
                $scope.degreeArray.push($scope.degree);
                //console.log("$scope.degree",$scope.degree);

                $scope.usersTable_degree = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.degree.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_degree = params.sorting() ? $filter('orderBy')($scope.degreeArray[0], params.orderBy()) : $scope.degreeArray[0];
                        $scope.data_degree = params.filter() ? $filter('filter')($scope.data_degree, params.filter()) : $scope.data_degree;
                       $scope.data_degree = $scope.data_degree.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_degree)
                    }
                });
                $scope.usersTable_degree.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List degree  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.adddegree = {};
        $scope.degreeData = {};
       
        $scope.viewdegreeData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.degreeData = {};
       
        $scope.viewdegreeData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit degree Modal            =
    ========================================*/
    
    $scope.editDegree = function(id) {
      $scope.headingMessage = "Edit Degree";
         //console.log(id);

      //  var qualifyListUrl = baseUrlSrvc.baseUrl + 'listQualificationMaster';
      // var promisequalifyGet = CRUD_SERVICE.getAllData(qualifyListUrl);
      // promisequalifyGet.then(function(pl) {
      //     $scope.Qualification = pl.data;

      //     //console.log($scope.Qualification);
      // },
      // function(errorPl) {
      //     $log.error('Some Error in Getting Records.', errorPl);
      // });

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.degree1 = pl.data;
                //console.log($scope.degree1);
                for (var i = 0; i < $scope.degree1.length; i++) {
                    if ($scope.degree1[i].cDegreeId == id) {
                        $scope.degreeData = $scope.degree1[i];
                          //console.log($scope.degreeData);
                          $scope.Qualification=[{
                            "cQualificationmasterId": $scope.degreeData.cQualificationmasterId,
                            "qualificationname": $scope.degreeData.qualificationname
                          }];
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit degree Modal  ======*/
    
    /*==================================
    =            View degree            =
    ==================================*/
    $scope.viewDegree = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cDegreeId": id });

       $scope.viewdegreeData= {
          "cDegreeId": $scope.temp_var_a[0].cDegreeId,
          "qualificationname": $scope.temp_var_a[0].qualificationname,
          "degreename": $scope.temp_var_a[0].degreename
       };
    }
    /*=====  End of View Degree  ======*/
    
    /*==================================
    =            Save Degree            =
    ==================================*/
    
    $scope.saveDegree = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cDegreeId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateDegree'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cDegreeId = pl.data.cDegreeId;
               
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
             data.updatedby=$sessionStorage.updatedby;
             data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateDegree'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var degree = pl.degree;
               var promiseData = pl.data;
               //console.log("degree",degree);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
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
    
    /*=====  End of Save degree  ======*/
   
    /*====================================
    =            Delete degree            =
    ====================================*/
    
    $scope.delDegree = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cDegreeId": id });

       $scope.deletedegreeData= {
          "cDegreeId": $scope.temp_var[0].cDegreeId,
          "degreename": $scope.temp_var[0].degreename
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteDegree'
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
    /*=====  End of Delete educationstream  ======*/
    
});
/*=====  End of Controller  ======*/
