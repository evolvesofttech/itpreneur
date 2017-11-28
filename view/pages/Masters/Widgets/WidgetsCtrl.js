/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("WidgetsCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("bankCtrl");
    $scope.WidgetArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Widget";

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

    $scope.addWidgetclick = function(){
        $scope.headingMessage = "Add Widget";
    }

    /*======================================
    =            Get List Widget            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listWidget';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.WidgetArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Widget = pl.data;
                $scope.WidgetArray.push($scope.Widget);
                //console.log("$scope.bank",$scope.bank);

                $scope.usersTable_Widget = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Widget.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_Widget = params.sorting() ? $filter('orderBy')($scope.WidgetArray[0], params.orderBy()) : $scope.WidgetArray[0];
                        $scope.data_Widget = params.filter() ? $filter('filter')($scope.data_Widget, params.filter()) : $scope.data_Widget;
                       $scope.data_Widget = $scope.data_Widget.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Widget)
                    }
                });
                $scope.usersTable_Widget.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List Widget  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.addWidget = {};
        $scope.WidgetData = {};
       
        $scope.viewWidgetData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.WidgetData = {};
       
        $scope.viewWidgetData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit Widget Modal            =
    ========================================*/
    
    $scope.editWidget = function(id) {
        $scope.headingMessage = "Edit Widget";
         //console.log(id);


        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.Widget1 = pl.data;
                //console.log($scope.bank1);
                for (var i = 0; i < $scope.Widget1.length; i++) {
                    if ($scope.Widget1[i].adWidgetId == id) {
                        $scope.WidgetData = $scope.Widget1[i];
                          //console.log($scope.WidgetData);
                          // $scope.EducationStream=[{
                          //   "cEducationrequiredId": $scope.WidgetData.cEducationrequiredId,
                          //   "educationname": $scope.WidgetData.educationname
                          // }];
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit Widget Modal  ======*/
    
    /*==================================
    =            View Widget            =
    ==================================*/
    $scope.viewWidget = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_b = $filter('filter')(bdata, { "adWidgetId": id });

       $scope.viewWidgetData= {
          "adWidgetId": $scope.temp_var_b[0].adWidgetId,
          "name": $scope.temp_var_b[0].name,
          "description": $scope.temp_var_b[0].description
          
       };
    }
    /*=====  End of View Widget  ======*/
    
    /*==================================
    =            Save Widget            =
    ==================================*/
    
    $scope.saveWidget = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.adWidgetId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateWidget'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.adWidgetId = pl.data.adWidgetId;
               
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
                url: baseUrlSrvc.baseUrl + 'addUpdateWidget'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var bank = pl.bank;
               var promiseData = pl.data;
               //console.log("bank",bank);
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
    
    /*=====  End of Save Widget  ======*/
   
    /*====================================
    =            Delete Widget            =
    ====================================*/
    
    $scope.delWidget = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "adWidgetId": id });

       $scope.deleteWidgetData= {
          "adWidgetId": $scope.temp_var[0].adWidgetId,
          "name": $scope.temp_var[0].name
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteWidget'
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
    /*=====  End of Delete Widget  ======*/
    
});
/*=====  End of Controller  ======*/
