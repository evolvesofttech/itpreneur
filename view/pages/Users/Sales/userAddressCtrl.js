/*==========================================
=            Contact Controller            =
==========================================*/
angular.module('theGuru').controller("userLocationCtrl", 
    ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", 
        "baseUrlSrvc","$sessionStorage", "$route", "$timeout", 
        "Flash", "$rootScope","toaster",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, 
            $routeParams, CRUD_SERVICE, baseUrlSrvc,$sessionStorage, 
            $route, $timeout, Flash, $rootScope, toaster) {


    $scope.OperType = $routeParams.ID;
    //console.log($scope.OperType);
    $scope.role = $sessionStorage.userData1.roleName;
    $scope.disableDistrict = true;
    $scope.disableTaluka = true;



    /*==============================================
    =            List Address on Click             =
    ==============================================*/
  // if($scope.OperType != '0' && $scope.OperType != undefined) {
    $scope.locArray = [];

    // if ($scope.role=='System Admin' || $scope.role=='Admin') {
    //     //console.log("if");
    //     var locationListUrl = baseUrlSrvc.baseUrl + 'listLocationbyInstituteId/'+ $scope.OperType;
    //   }
    //   else{
    //     //console.log("if");
    //     var locationListUrl = baseUrlSrvc.baseUrl + 'listLocationbyInstituteId/'+ $sessionStorage.userData1.inInstituteId;
    //   }
      var locationListUrl = baseUrlSrvc.baseUrl + 'listUserAddressDetailsByAdUserdetailId/' +$scope.OperType;
      GetAllUserLocationRecords(locationListUrl);

      //To Get All Records
      function GetAllUserLocationRecords(url) {
        $scope.locArray = [];
        var promiseStateGet = CRUD_SERVICE.getAllData(url);
        promiseStateGet.then(function(pl) {
                $scope.location = pl.data;

                     $scope.locArray.push($scope.location);

                     $scope.usersTable_location = new ngTableParams({
                          page: 1,
                          count: 10
                      }, {
                         total: $scope.location.length, 
                          getData: function ($defer, params) {

                            if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                          
                              $scope.data_location = params.sorting() ? $filter('orderBy')($scope.locArray[0], params.orderBy()) : $scope.locArray[0];
                              $scope.data_location = params.filter() ? $filter('filter')($scope.data_location, params.filter()) : $scope.data_location;
                             $scope.data_location = $scope.data_location.slice((params.page() - 1) * params.count(), params.page() * params.count());
                             $defer.resolve($scope.data_location)
                          }
                      });
                     $scope.usersTable_location.reload();
              },
              function(errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
      }
    /*=====  End of List Address on Click   ======*/

    /*==================================================
    =            Address in Institute Login            =
    ==================================================*/
    // if($scope.role == 'Privilege Institute System Admin' || $scope.role =='Normal Institute System Admin') {
    //   $scope.locArray = [];
    //   //console.log("Institute Login");

    //   var locationListUrl = baseUrlSrvc.baseUrl + 'listLocationbyInstituteId/'+ $sessionStorage.userData1.inInstituteId;

    //   // var locationListUrl = baseUrlSrvc.baseUrl + 'listLocation';
    //   var promiseStateGet = CRUD_SERVICE.getAllData(locationListUrl);
    //   promiseStateGet.then(function(pl) {
    //           $scope.location = pl.data;

    //            $scope.locArray.push($scope.location);

    //            $scope.usersTable_location = new ngTableParams({
    //                 page: 1,
    //                 count: 10
    //             }, {
    //                total: $scope.location.length, 
    //                 getData: function ($defer, params) {
                    
    //                     $scope.data_location = params.sorting() ? $filter('orderBy')($scope.locArray[0], params.orderBy()) : $scope.locArray[0];
    //                     $scope.data_location = params.filter() ? $filter('filter')($scope.data_location, params.filter()) : $scope.data_location;
    //                    $scope.data_location = $scope.data_location.slice((params.page() - 1) * params.count(), params.page() * params.count());
    //                    $defer.resolve($scope.data_location)
    //                 }
    //             });
    //         },
    //         function(errorPl) {
    //             $log.error('Some Error in Getting Records.', errorPl);
    //         });
    //   }
    /*=====  End of Address in Institute Login  ======*/

    /*==============================================
    =            Clear Model After Save            =
    ==============================================*/
    function ClearModels() {
        $scope.userData1Add = {};
    }
    /*=====  End of Clear Model After Save  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    
    $scope.clearModalOnClose = function() {
        $scope.userData1Add = {};
        $scope.viewAddressData = {};
    }
    
    /*=====  End of Clear Modal on Click  ======*/

    /*==========================================
    =            Save Edit Location            =
    ==========================================*/
    $scope.saveaddress = function(data) {
        
        if (data.adUseraddressdetailId) {

             data.inInstituteId=$sessionStorage.inInstituteId;
            data.createdby = $sessionStorage.createdby;
            data.updatedby = $sessionStorage.updatedby;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;
              data.adUserdetailId = $scope.OperType;


            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserAddressDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.adUseraddressdetailId = pl.data.adUseraddressdetailId;
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllUserLocationRecords(locationListUrl);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                  ClearModels();
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllUserLocationRecords(locationListUrl);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                   ClearModels();
            });
        } else {

            // if ($scope.role=='System Admin' || $scope.role=='Admin') {
            //     data.inInstituteId=$scope.OperType;
            //     data.createdby = $sessionStorage.userData1.adUserId;
            //      data.bBranchId=$sessionStorage.bBranchId;
            //   }else
            //   {
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.createdby = $sessionStorage.createdby;
                data.updatedby = $sessionStorage.updatedby;
                 data.bBranchId=$sessionStorage.bBranchId;
                 data.adUserId = $sessionStorage.adUserId;
                 data.adUserdetailId = $scope.OperType;
              //}

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserAddressDetails'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                  $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllUserLocationRecords(locationListUrl);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                   ClearModels();
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllUserLocationRecords(locationListUrl);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                   ClearModels();
            });
        }
    };

    $scope.editLocation = function(id) {
        $scope.disableField = false;

        $scope.headingMessage = "Edit Address";
        //console.log(id); 


          $scope.OnStateChange = function(id) {
              $scope.disableDistrict = false;
               //console.log(id);
               var stateUrl = baseUrlSrvc.baseUrl + 'listDistrict/'+id;
               var promiseStateGet = CRUD_SERVICE.getAllData(stateUrl);
               promiseStateGet.then(function(pl) {
                      $scope.District =pl.data;
                   },
                   function(errorPl) {
                       $log.error('Some Error in Getting Records.', errorPl);
                   });
            }
            $scope.OnDistrictChange = function(id) {
               //console.log(id);
               $scope.disableTaluka = false;
               var districtUrl = baseUrlSrvc.baseUrl + 'listTalukaById/'+id;
               var promiseDistrictGet = CRUD_SERVICE.getAllData(districtUrl);
               promiseDistrictGet.then(function(pl) {
                       $scope.TalukaData = pl.data;

                       $scope.Taluka = $filter('filter')($scope.TalukaData, { "cDistrictId": id });
                   },
                   function(errorPl) {
                       $log.error('Some Error in Getting Records.', errorPl);
                   });
           }
            // District change

            $scope.ngStateFocus = function() {
              var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
                 var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
                 promiseStateGet.then(function(pl) {
                         $scope.State = pl.data;
                     },
                     function(errorPl) {
                         $log.error('Some Error in Getting Records.', errorPl);
                     });
            }

         var locUrl = baseUrlSrvc.baseUrl + 'listUserAddressDetails';

        // if ($scope.role=='System Admin' || $scope.role=='Admin') {
        //      var locUrl = baseUrlSrvc.baseUrl + 'listLocationbyInstituteId/'+ $scope.OperType;
        // }
        // else{
        //      var locUrl = baseUrlSrvc.baseUrl + 'listLocationbyInstituteId/'+ $sessionStorage.userData1.inInstituteId;
        // }


        var promiseGet = CRUD_SERVICE.getAllData(locUrl);
        promiseGet.then(function (pl) {
                $scope.cop_a = pl.data;
                //console.log($scope.cop_a);
                for (var i = 0; i < $scope.cop_a.length; i++) {
                    if ($scope.cop_a[i].adUseraddressdetailId == id) {
                        $scope.userData1Add = $scope.cop_a[i];

                        $scope.State=[{
                            
                            "cStateId":$scope.userData1Add.cStateId,
                            "statename":$scope.userData1Add.statename

                        }];

                        //console.log("$scope.State",$scope.State);
                        $scope.District=[{
                          "cDistrictId":$scope.userData1Add.cDistrictId,
                          "districtname":$scope.userData1Add.districtname

                        }];
                        $scope.Taluka=[{
                         
                          
                           "cTalukaId":$scope.userData1Add.cTalukaId,
                          "talukaname":$scope.userData1Add.talukaname

                        }];
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Save Edit Location  ======*/

    /*=====================================
    =            View Location            =
    =====================================*/
    $scope.viewLocation = function(id, ldata) {
      $scope.viewLoc = $filter('filter')(ldata, { "adUseraddressdetailId": id });

      $scope.viewAddressData = $scope.viewLoc[0];
      //console.log($scope.viewAddressData);

    }
    /*=====  End of View Location  ======*/
    

    /*===================================================
    =            Add Location Click Function            =
    ===================================================*/
    $scope.addLocationClick = function() {

        var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
        var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseStateGet.then(function(pl) {
                $scope.State = pl.data;

                //console.log("State",$scope.State);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

        $scope.OnStateChange = function(id) {
            $scope.disableDistrict = false;
             //console.log(id);
             var stateUrl = baseUrlSrvc.baseUrl + 'listDistrictById/'+id;
             var promiseStateGet = CRUD_SERVICE.getAllData(stateUrl);
             promiseStateGet.then(function(pl) {
                    $scope.District =pl.data;
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
          }
          $scope.OnDistrictChange = function(id) {
             //console.log(id);
             $scope.disableTaluka = false;
             var districtUrl = baseUrlSrvc.baseUrl + 'listTalukaById/'+id;
             var promiseDistrictGet = CRUD_SERVICE.getAllData(districtUrl);
             promiseDistrictGet.then(function(pl) {
                     $scope.TalukaData = pl.data;

                     $scope.Taluka = $filter('filter')($scope.TalukaData, { "cDistrictId": id });
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
         }

    }
    /*=====  End of Add Location Click Function  ======*/


    /*=======================================
    =            Delete Location            =
    =======================================*/
    $scope.delLocation = function(id, ldata) {
            //console.log(id);
            $scope.temp_var = $filter('filter')(ldata, { "adUseraddressdetailId": id });

           $scope.deleteuserData1= {
              "adUseraddressdetailId": $scope.temp_var[0].adUseraddressdetailId,
              "addressone": $scope.temp_var[0].addressone,
              "addresstwo": $scope.temp_var[0].addresstwo,
              "addressthree": $scope.temp_var[0].addressthree
           };

    }
    
    $scope.deleteLocation = function(id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteUserAddressDetails'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function(pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllUserLocationRecords(locationListUrl);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function(err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllUserLocationRecords(locationListUrl);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Delete Location  ======*/
        
}]);
/*=====  End of Contact Controller  ======*/
