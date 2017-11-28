/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("selectionformCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
  ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("selectionformCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.clientcpArray = [];
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

     $scope.yesChecked = function(){
      $scope.ye = true;
     }

     $scope.NoChecked = function(){
      $scope.no = false;
     }


    var urlselectionList = baseUrlSrvc.baseUrl + 'listEnquirySelectionDetailsByEnquiryFormId/'+ $scope.OperType;
    GetAllselectionRecords(urlselectionList);

    //To Get All Records
    function GetAllselectionRecords(url) {
        $scope.selectionArray = [];
        var promiseSelectionGet = CRUD_SERVICE.getAllData(url);
        promiseSelectionGet.then(function (pl) {
                $scope.selection = pl.data;
                $scope.selectionArray.push($scope.selection);
                //console.log("$scope.selection",$scope.selection);

                $scope.usersTable_selection = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.selection.length, 
                    getData: function ($defer, params) {
                    
                        $scope.data_selection = params.sorting() ? $filter('orderBy')($scope.selectionArray[0], params.orderBy()) : $scope.selectionArray[0];
                        $scope.data_selection = params.filter() ? $filter('filter')($scope.data_selection, params.filter()) : $scope.data_selection;
                       $scope.data_selection = $scope.data_selection.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_selection)
                    }
                });
                $scope.usersTable_selection.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }


     /*==========================================
    =            Edit Gap            =
    ==========================================*/

      $scope.editselection = function(id) {
       //console.log(id);
      
      var promiseGet = CRUD_SERVICE.getAllData(urlselectionList);
      promiseGet.then(function (pl) {
              $scope.selection1 = pl.data;
              //console.log($scope.selection1);
              for (var i = 0; i < $scope.selection1.length; i++) {
                  if ($scope.selection1[i].eEnquirySelectionDetailsId == id) {
                      $scope.selectionData = $scope.selection1[i];
                     
                        //console.log($scope.selectionData);
                  }
              }

          },
          function (errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
     
    }
    
    /*=====  End of Edit Qualification  ======*/

    /*=======================================
    =            ViewClient Use            =
    =======================================*/
    $scope.viewselection1 = function(id, idata) {
         //console.log(id);
        $scope.temp_var = $filter('filter')(idata, { "eEnquirySelectionDetailsId": id });
       //console.log("$scope.temp_var",$scope.temp_var);

       $scope.viewselectionData= {
          "eEnquirySelectionDetailsId": $scope.temp_var[0].eEnquirySelectionDetailsId,
          "echnologies": $scope.temp_var[0].echnologies,
          "companyname": $scope.temp_var[0].companyname,
          "designation": $scope.temp_var[0].designation,
          "ctc": $scope.temp_var[0].ctc,
          "date": $scope.temp_var[0].date,
          "status": $scope.temp_var[0].status
         
       };
    }    
    /*=====  End of ViewClient Use  ======*/
    


      
     $scope.saveselection = function(data) {
        //console.log(data);

        if (data.eEnquirySelectionDetailsId) {
            
           data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.clClientId=$scope.OperType;
            data.eEnquiryFormId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquirySelectionDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.eEnquirySelectionDetailsId = pl.data.eEnquirySelectionDetailsId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllselectionRecords(urlselectionList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllselectionRecords(urlselectionList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

            data.updatedby=$sessionStorage.updatedby;
            data.createdby=$sessionStorage.createdby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.clClientId=$scope.OperType;
            data.eEnquiryFormId = $scope.OperType;
           

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquirySelectionDetails'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllselectionRecords(urlselectionList);
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
                    GetAllselectionRecords(urlselectionList);
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
    =            Delete clientcp            =
    ============================================*/
    $scope.delselection = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "eEnquirySelectionDetailsId": id });
//console.log($scope.temp_var);
       $scope.deleteselectionData= {
          "eEnquirySelectionDetailsId": $scope.temp_var[0].eEnquirySelectionDetailsId,
          "designation": $scope.temp_var[0].designation
       };
     }

    $scope.deleteselection = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteEnquirySelectionDetails'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllClientcpFilterRecords(urlgapFilterList);
                    GetAllselectionRecords(urlselectionList);

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
                    GetAllselectionRecords(urlselectionList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete clientcp  ======*/

});
/*=====  End of clientcp Controller  ======*/