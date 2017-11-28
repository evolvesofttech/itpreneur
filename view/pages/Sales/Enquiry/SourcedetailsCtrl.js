/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("sourceCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("sourceCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
      $scope.sourceArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;
      
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
      =            Source List            =
      ==================================*/
      var sourceListUrl = baseUrlSrvc.baseUrl + 'listAboutUs';
      var promiseSourceGet = CRUD_SERVICE.getAllData(sourceListUrl);
      promiseSourceGet.then(function(pl) {
          $scope.Source = pl.data;

          //console.log($scope.Source);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Source List  ======*/
      
    /*======================================
    =            Get List source            =
    ======================================*/
    //1 Mean New Entry
    var urlSourceList = baseUrlSrvc.baseUrl + 'listEnquiryAboutUsById/' + $scope.OperType;
    GetAllSourceRecords(urlSourceList);

    //To Get All Records
    function GetAllSourceRecords(url) {

        $scope.sourceArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.source = pl.data;
                $scope.sourceArray.push($scope.source);
                //console.log("$scope.source",$scope.source);

                $scope.usersTable_Source = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.source.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_source = params.sorting() ? $filter('orderBy')($scope.sourceArray[0], params.orderBy()) : $scope.sourceArray[0];
                        $scope.data_source = params.filter() ? $filter('filter')($scope.data_source, params.filter()) : $scope.data_source;
                       $scope.data_source = $scope.data_source.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_source)
                    }
                });
                $scope.usersTable_Source.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List source  ======*/


     /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addsource = {};
        $scope.sourcedata = {};
       
        $scope.viewsourceData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.sourceData = {};
       
        $scope.viewsourceData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit source Modal            =
    ========================================*/
    
    $scope.editEnquirySource = function(id) {
         //console.log(id); 

        var sourceListUrl = baseUrlSrvc.baseUrl + 'listAboutUs';
        var promiseSourceGet = CRUD_SERVICE.getAllData(sourceListUrl);
        promiseSourceGet.then(function(pl) {
            $scope.Source = pl.data;
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

        var promiseGet = CRUD_SERVICE.getAllData(urlSourceList);
        promiseGet.then(function (pl) {
            $scope.source1 = pl.data;
            //console.log("$scope.source1",$scope.source1);
            for (var i = 0; i < $scope.source1.length; i++) {
                if ($scope.source1[i].eEnquiryAboutUsId == id) {
                    $scope.enquirysourceData = $scope.source1[i];

                    //console.log("$scope.Source",$scope.Source);
                }
            }

        },
        function (errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
    }
    
    /*=====  End of Edit source Modal  ======*/
    
    /*==================================
    =            View source            =
    ==================================*/
    $scope.viewEnquirySource = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "eEnquiryAboutUsId": id });

       $scope.viewsourceData= {
          "eEnquiryAboutUsId": $scope.temp_var_a[0].eEnquiryAboutUsId,
          "sourcename": $scope.temp_var_a[0].sourcename
       };
    }
    /*=====  End of View source  ======*/
      
     $scope.saveSource = function(data) {
        
        if (data.eEnquiryAboutUsId) {

          //console.log("update");

                data.inInstituteId=$sessionStorage.inInstituteId;
                data.updatedby = $sessionStorage.userData1.adUserId;
                data.adUserId = $sessionStorage.adUserId;
                data.eEnquiryFormId = $scope.OperType;
              

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryAboutUs'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
               $scope.eEnquiryAboutUsId = pl.data.eEnquiryAboutUsId;
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllSourceRecords(urlSourceList);
                    });
                },100);

                 // if (promiseData.code == 2) {
                 //     toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                 //  } else {
                   toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                 //}

            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllSourceRecords(urlSourceList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

                data.inInstituteId=$sessionStorage.inInstituteId;
                data.createdby = $sessionStorage.userData1.adUserId;
                data.adUserId = $sessionStorage.adUserId;
                data.eEnquiryFormId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryAboutUs'
            };
            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {

                 $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllSourceRecords(urlSourceList);
                    });
                },100);

                // if (promiseData.code == 2) {
                //    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                // } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                //}
               
            }, function(err) {
                //console.log("Some Error Occured." + err);
                 $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllSourceRecords(urlSourceList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };


    /*====================================
    =            Delete source            =
    ====================================*/
    
    $scope.delEnquirySource = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "eEnquiryAboutUsId": id });

       $scope.deletesourceData= {
          "eEnquiryAboutUsId": $scope.temp_var[0].eEnquiryAboutUsId,
          "sourcename": $scope.temp_var[0].sourcename
       };
     }

    $scope.deleteSource = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteEnquiryAboutUs'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllSourceRecords(urlSourceList);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllSourceRecords(urlSourceList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete source  ======*/


});
/*=====  End of School Controller  ======*/