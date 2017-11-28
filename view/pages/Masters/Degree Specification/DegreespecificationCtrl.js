/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("degreeSpecificationCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("degreeSpecificationCtrl");
    $scope.degreeArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Degree Specialization";
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

    $scope.adddegreespecifi = function(){
      $scope.headingMessage = "Add Degree Specification";
    }

      /*==================================
      =            Qualification List            =
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
      /*=====  End of Qualification List  ======*/


      /*==================================
      =            Qualification change List            =
      ==================================*/

      $scope.streamChange = function(id) {   
        //console.log(id);
        var DegreeListUrl = baseUrlSrvc.baseUrl + 'listDegreeByQualificationMasterId/'+id;
        var promiseDegreeGet = CRUD_SERVICE.getAllData(DegreeListUrl);
        promiseDegreeGet.then(function(pl) {
            $scope.Degree = pl.data;

            //console.log($scope.Degree);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
      });
    }
      /*=====  End of Qualification change List  ======*/



    /*======================================
    =            Get List degreespecification            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listDegreeSpecification';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.degreeArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.degreespecification = pl.data;
                $scope.degreeArray.push($scope.degreespecification);
                //console.log("$scope.degreespecification",$scope.degreespecification);

                $scope.usersTable_degree = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.degreespecification.length, 
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
        $scope.degreespecificationData = {};
       
        $scope.viewdegreespecificationData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.degreespecificationData = {};
       
        $scope.viewdegreespecificationData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit degree Modal            =
    ========================================*/
    
    $scope.editDegreeSpecification = function(id) {
       $scope.headingMessage = "Edit Degree Specification";
         //console.log(id);

      var degListUrl = baseUrlSrvc.baseUrl + 'listDegree';
      var promisedegGet = CRUD_SERVICE.getAllData(degListUrl);
      promisedegGet.then(function(pl) {
          $scope.Degree = pl.data;

          //console.log($scope.Degree);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      }); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.degree1 = pl.data;
                //console.log($scope.degree1);
                for (var i = 0; i < $scope.degree1.length; i++) {
                    if ($scope.degree1[i].cDegreespecificationId == id) {
                        $scope.degreespecificationData = $scope.degree1[i];
                          //console.log($scope.degreespecificationData);
                          // $scope.EducationStream=[{
                          //   "cEducationrequiredId": $scope.degreespecificationData.cEducationrequiredId,
                          //   "educationname": $scope.degreespecificationData.educationname
                          // }];

                          // $scope.Degree=[{
                          //   "cDegreeId": $scope.degreeData.cDegreeId,
                          //   "degreename": $scope.degreeData.degreename
                          // }];
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
    $scope.viewDegreeSpecification = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cDegreespecificationId": id });

       $scope.viewdegreespecificationData= {
          "cDegreespecificationId": $scope.temp_var_a[0].cDegreespecificationId,
          "qualificationname": $scope.temp_var_a[0].qualificationname,
          "degreename": $scope.temp_var_a[0].degreename,
          "degreespecificationname": $scope.temp_var_a[0].degreespecificationname
       };
    }
    /*=====  End of View Degree  ======*/
    
    /*==================================
    =            Save Degree            =
    ==================================*/
    
    $scope.saveDegreeSpecification = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cDegreespecificationId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateDegreeSpecification'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cDegreespecificationId = pl.data.cDegreespecificationId;
               
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
                url: baseUrlSrvc.baseUrl + 'addUpdateDegreeSpecification'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var degreespecification = pl.degreespecification;
               var promiseData = pl.data;
               //console.log("degreespecification",degreespecification);
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
    
    $scope.delDegreeSpecification = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cDegreespecificationId": id });

       $scope.deletedegreespecificationData= {
          "cDegreespecificationId": $scope.temp_var[0].cDegreespecificationId,
          "degreespecificationname": $scope.temp_var[0].degreespecificationname
       };
     }

    $scope.deleteSpecification = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteDegreeSpecification'
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
