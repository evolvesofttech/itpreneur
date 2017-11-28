/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("officeuseCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
  ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("officeuseCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.officeuseArray = [];
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


      /*===================================
      =            Batch List            =
      ===================================*/
      var BatchListUrl = baseUrlSrvc.baseUrl + 'listBatch';
      var promiseBatchGet = CRUD_SERVICE.getAllData(BatchListUrl);
      promiseBatchGet.then(function(pl) {
          $scope.Batch = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Batch List  ======*/

      /*==================================================
      =            Get batch on Edit Page            =
      ==================================================*/

        // var urlofficeuseList = baseUrlSrvc.baseUrl + 'listBatchById/'+ $scope.OperType;
        //   var promiseGet = CRUD_SERVICE.getAllData(urlofficeuseList);
        //   promiseGet.then(function(pl) {
        //           $scope.batch = pl.data;
        //           //console.log("=================",$scope.batch);

        //           for (var i = 0; i < $scope.batch.length; i++) {
        //               if ($scope.batch[i].cBatchId == $scope.OperType) {
        //                   $scope.batchData = $scope.batch[i];
        //               }
        //           }
        //       },
        //       function(errorPl) {
        //           $log.error('Some Error in Getting Records.', errorPl);
        //       });
       
      /*=====  End of Get Batch on Edit Page  ======*/

      $scope.OnBatchChange = function(id) {
           
           //console.log(id);
           var batchUrl = baseUrlSrvc.baseUrl + 'listBatchById/'+id;
           var promiseBatchGet = CRUD_SERVICE.getAllData(batchUrl);
           promiseBatchGet.then(function(pl) {
                  $scope.Batch1 =pl.data;
                  //console.log("$scope.Batch1[0].fromdate",$scope.Batch1[0].fromdate);
                  $scope.batchfromdate = $scope.Batch1[0].fromdate;
                  $scope.batchtodate = $scope.Batch1[0].todate;
                  $scope.batchfromtime = $scope.Batch1[0].fromtime;
                  $scope.batchtotime = $scope.Batch1[0].totime;
               },
               function(errorPl) {
                   $log.error('Some Error in Getting Records.', errorPl);
               });
        }


    var urlofficeuseList = baseUrlSrvc.baseUrl + 'listOfficeUseById/' + $scope.OperType;
    GetAllOfficeuseRecords(urlofficeuseList);

    //To Get All Records
    function GetAllOfficeuseRecords(url) {
        $scope.officeuseArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.officeuse = pl.data;
                $scope.officeuseArray.push($scope.officeuse);
                //console.log("$scope.officeuse",$scope.officeuse);

                $scope.usersTable_officeuse = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.officeuse.length, 
                    getData: function ($defer, params) {
                    
                        $scope.data_officeuse = params.sorting() ? $filter('orderBy')($scope.officeuseArray[0], params.orderBy()) : $scope.officeuseArray[0];
                        $scope.data_officeuse = params.filter() ? $filter('filter')($scope.data_officeuse, params.filter()) : $scope.data_officeuse;
                       $scope.data_officeuse = $scope.data_officeuse.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_officeuse)
                    }
                });
                $scope.usersTable_officeuse.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }


     /*==========================================
    =            Edit Gap            =
    ==========================================*/
    $scope.editOfficeuse = function(id) {
         //console.log(id);

         var officeListUrl = baseUrlSrvc.baseUrl + 'listOfficeUse';
          var promiseOfficeGet = CRUD_SERVICE.getAllData(officeListUrl);
          promiseOfficeGet.then(function(pl) {
              $scope.EnquiryOffice = pl.data;
          },
          function(errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          }); 

        var promiseGet = CRUD_SERVICE.getAllData(officeListUrl);
        promiseGet.then(function (pl) {
                $scope.office_a = pl.data;
                for (var i = 0; i < $scope.office_a.length; i++) {
                    if ($scope.office_a[i].aOfficeUseId == id) {
                        $scope.officeData = $scope.office_a[i];
                    }
                }
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit Qualification  ======*/

    /*=======================================
    =            View Office Use            =
    =======================================*/
    $scope.viewOfficeuse = function(id, odata) {
      $scope.temp_var_a = $filter('filter')(odata, { "aOfficeUseId": id });
      //console.log($scope.temp_var_a);
       $scope.viewofficeuseData= $scope.temp_var_a[0];

       //console.log(id);
       var batchUrl = baseUrlSrvc.baseUrl + 'listBatchById/'+$scope.temp_var_a[0].cBatchId;
       var promiseBatchGet = CRUD_SERVICE.getAllData(batchUrl);
       promiseBatchGet.then(function(pl) {
              $scope.Batch1 =pl.data;
              //console.log("$scope.Batch1[0].fromdate",$scope.Batch1[0].fromdate);
              $scope.batchfromdate = $scope.Batch1[0].fromdate;
              $scope.batchtodate = $scope.Batch1[0].todate;
              $scope.batchfromtime = $scope.Batch1[0].fromtime;
              $scope.batchtotime = $scope.Batch1[0].totime;
           },
           function(errorPl) {
               $log.error('Some Error in Getting Records.', errorPl);
           });
    }
    
    
    /*=====  End of View Office Use  ======*/
    


      
     $scope.saveOfficeuse = function(data) {
        //console.log(data);

        if (data.aOfficeUseId) {
            
            data.inInstituteId=$sessionStorage.inInstituteId;
            
            data.updatedby = $sessionStorage.userData1.adUserId;
            data.eEnquiryFormId = $scope.OperType;
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateOfficeUse'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.aOfficeUseId = pl.data.aOfficeUseId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllOfficeuseRecords(urlofficeuseList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllOfficeuseRecords(urlofficeuseList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

            data.inInstituteId=$sessionStorage.inInstituteId;
            
            data.createdby = $sessionStorage.userData1.adUserId;
            data.eEnquiryFormId = $scope.OperType;
            
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateOfficeUse'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllOfficeuseRecords(urlofficeuseList);
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
                    GetAllOfficeuseRecords(urlofficeuseList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
        }
    };

      /*========================================
         =            Get Current Date            =
         ========================================*/
         var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();

          if(dd<10) {
              dd='0'+dd
          } 

          if(mm<10) {
              mm='0'+mm
          } 

          today = yyyy+'-'+mm+'-'+dd;
          $scope.currentDate =today;
          //console.log("$scope.currentDate",$scope.currentDate);
         /*=====  End of Get Current Date  ======*/


    /*============================================
    =            Delete Officeuse            =
    ============================================*/
    $scope.delOfficeuse = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "aOfficeUseId": id });
//console.log($scope.temp_var);
       $scope.deleteofficeuseData= {
          "aOfficeUseId": $scope.temp_var[0].aOfficeUseId,
          "type": $scope.temp_var[0].type
       };
     }

    $scope.deleteOfficeUse = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteOfficeUse'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllofficeFilterRecords(urlgapFilterList);
                    GetAllOfficeuseRecords(urlofficeuseList);

                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    // GetAllGapFilterRecords(urlgapFilterList);
                    GetAllOfficeuseRecords(urlofficeuseList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete Officeuse  ======*/

});
/*=====  End of Officeuse Controller  ======*/