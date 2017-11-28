/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("selectionformCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
  ngTableParams, Flash, inst_id, toaster, Branch_Id) {
       
      //console.log("selectionformCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.clientcpArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.role = $sessionStorage.userData1.roleName;

      $scope.B_Id = Branch_Id.getBranch_Id();
      //console.log($scope.B_Id);

      
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


     $scope.addselection = function(){
      $scope.headingMessage = "Add selection Form";
     }

     /*=====================================
     =            Technologies             =
     =====================================*/
     
      var technoListUrl = baseUrlSrvc.baseUrl + 'listFinalSelectionByEnquiryFormId/' + $scope.OperType;
      var promisetechnoGet = CRUD_SERVICE.getAllData(technoListUrl);
      promisetechnoGet.then(function(pl) {
          $scope.selectionData1 = pl.data;
          $scope.selectionData = $scope.selectionData1[0];
          //console.log($scope.selectionData);

          $scope.c_id = $scope.selectionData.clClientId;
          //console.log($scope.c_id);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
     
     
     /*=====  End of Technologies   ======*/

      /*=====================================
      =            technologies change            =
      =====================================*/
      
      // $scope.technoChange = function(id){
      //   $scope.techId = id;
      //   //console.log($scope.techId);
      // }
      
      /*=====  End of technologies change  ======*/
     

   
    var urlselectionList = baseUrlSrvc.baseUrl + 'listEnquirySelectionDetailsByEnquiryFormId/'+ $scope.OperType;
    GetAllselectionRecords(urlselectionList);

    //To Get All Records
    function GetAllselectionRecords(url) {
        $scope.selectionArray = [];
        var promiseSelectionGet = CRUD_SERVICE.getAllData(url);
        promiseSelectionGet.then(function (pl) {
                $scope.selection = pl.data;
                //console.log($scope.selection)
                if ($scope.selection == 0) {
                  $scope.hideBtn = false;
                } else {
                  $scope.hideBtn = true;
                }
                $scope.selectionArray.push($scope.selection);
                //console.log("$scope.selection",$scope.selection);

                $scope.usersTable_selection = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.selection.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
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
        $scope.headingMessage = "Edit selection Form";
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

       $scope.viewselectionData= $scope.temp_var[0];
    }    
    /*=====  End of ViewClient Use  ======*/
    


      
     $scope.saveselection = function(data) {
        //console.log(data);

        if (data.eEnquirySelectionDetailsId) {
            
           data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$scope.B_Id;
            data.adUserId = $sessionStorage.adUserId;
            data.clClientId=$scope.c_id;
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
            data.bBranchId=$scope.B_Id;
            data.adUserId = $sessionStorage.adUserId;
            data.clClientId=$scope.c_id;
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
          "companyname": $scope.temp_var[0].companyname
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