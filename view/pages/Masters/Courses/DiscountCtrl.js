/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("discountCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster) {
    //console.log("discount");
    $scope.discountArray = [];
    $scope.OperType = $routeParams.ID;

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

    $scope.adddiscount = function(){
        $scope.headingMessage = "Add Discount";
    }

    /*=========================================
    =            Valid Date Change            =
    =========================================*/
    $scope.validDateChange = function(dat) {
        $scope.val_date = dat;
    }
    /*=====  End of Valid Date Change  ======*/

    /*======================================
    =            Get List discount            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listDiscountByCourseId/'+ $scope.OperType;
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.discountArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.discount = pl.data;
                $scope.discountArray.push($scope.discount);
                //console.log("$scope.discount",$scope.discount);

                $scope.usersTable_discount = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.discount.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_discount = params.sorting() ? $filter('orderBy')($scope.discountArray[0], params.orderBy()) : $scope.discountArray[0];
                        $scope.data_discount = params.filter() ? $filter('filter')($scope.data_discount, params.filter()) : $scope.data_discount;
                       $scope.data_discount = $scope.data_discount.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_discount)
                    }
                });
                $scope.usersTable_discount.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List discount  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.adddiscount = {};
        $scope.discountData = {};
       
        $scope.viewdiscountData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.discountData = {};
       
        $scope.viewdiscountData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit discount Modal            =
    ========================================*/
    
    $scope.editDiscount = function(id) {
        $scope.headingMessage = "Edit Discount";
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.discount1 = pl.data;
                //console.log($scope.discount1);
                for (var i = 0; i < $scope.discount1.length; i++) {
                    if ($scope.discount1[i].cDiscountId == id) {
                        $scope.discountData = $scope.discount1[i];
                       
                          //console.log($scope.discountData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit discount Modal  ======*/
    
    /*==================================
    =            View discount            =
    ==================================*/
    $scope.viewDiscount = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "cDiscountId": id });

       $scope.viewdiscountData= {
          "cDiscountId": $scope.temp_var_a[0].cDiscountId,
          "title": $scope.temp_var_a[0].title,
          "validfrom": $scope.temp_var_a[0].validfrom,
          "validto": $scope.temp_var_a[0].validto,
          "percentage": $scope.temp_var_a[0].percentage,
          "description": $scope.temp_var_a[0].description
       };
    }
    /*=====  End of View discount  ======*/
    
    /*==================================
    =            Save discount            =
    ==================================*/
    
    $scope.saveDiscount = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.cDiscountId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.cCourseId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateDiscount'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.cDiscountId = pl.data.cDiscountId;
               
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

             data.createdby=$sessionStorage.createdby;
             data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
            data.cCourseId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;


            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateDiscount'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var discount = pl.discount;
               var promiseData = pl.data;
               //console.log("discount",discount);
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
    
    /*=====  End of Save discount  ======*/
   
    /*====================================
    =            Delete discount            =
    ====================================*/
    
    $scope.delDiscount = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "cDiscountId": id });

       $scope.deletediscountData= {
          "cDiscountId": $scope.temp_var[0].cDiscountId,
          "title": $scope.temp_var[0].title
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteDiscount'
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
    /*=====  End of Delete discount  ======*/
    
});
/*=====  End of Controller  ======*/
