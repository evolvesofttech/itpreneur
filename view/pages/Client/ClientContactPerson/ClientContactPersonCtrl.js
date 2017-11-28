/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("clientcpCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
  ngTableParams, Flash, inst_id, toaster) {
       
      //console.log("clientcpCtrl");
      
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

       /*============================================
        =            Clear Modal on Click            =
        ============================================*/
        $scope.clearModalOnCloseContactPerson = function() {
            $scope.clientcpData = {};
            $scope.viewclientcpData = {};
        }
        /*=====  End of Clear Modal on Click  ======*/

        $scope.addcontactperson = function(){
          $scope.headingMessage = "Add Contact Person";
        }

        
        /*==============================================
        =            Clear Model After Save            =
        ==============================================*/
        function ClearModels() {
            $scope.clientcpData = {};
        }
        /*=====  End of Clear Model After Save  ======*/




    var urlclientcpList = baseUrlSrvc.baseUrl + 'listClientContactPersonByClientId/' + $scope.OperType;
    GetAllclientcpRecords(urlclientcpList);

    //To Get All Records
    function GetAllclientcpRecords(url) {
        $scope.clientcpArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.clientcp = pl.data;
                $scope.clientcpArray.push($scope.clientcp);
                //console.log("$scope.clientcp",$scope.clientcp);

                $scope.usersTable_clientcp = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.clientcp.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                    
                        $scope.data_clientcp = params.sorting() ? $filter('orderBy')($scope.clientcpArray[0], params.orderBy()) : $scope.clientcpArray[0];
                        $scope.data_clientcp = params.filter() ? $filter('filter')($scope.data_clientcp, params.filter()) : $scope.data_clientcp;
                       $scope.data_clientcp = $scope.data_clientcp.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_clientcp)
                    }
                });
                $scope.usersTable_clientcp.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }


     /*==========================================
    =            Edit Gap            =
    ==========================================*/

      $scope.editClientcp = function(id) {
        $scope.headingMessage = "Edit Contact Person";
         //console.log(id);

         var ClientcpListUrl = baseUrlSrvc.baseUrl + 'listClientContactPersonByClientId/' + $scope.OperType;
          // var promiseClientcpGet = CRUD_SERVICE.getAllData(ClientcpListUrl);
          // promiseClientcpGet.then(function(pl) {
          //     $scope.clientcpData = pl.data;
          // },
          // function(errorPl) {
          //     $log.error('Some Error in Getting Records.', errorPl);
          // }); 

        var promiseGet = CRUD_SERVICE.getAllData(ClientcpListUrl);
        promiseGet.then(function (pl) {
                $scope.clientcp_a = pl.data;
                for (var i = 0; i < $scope.clientcp_a.length; i++) {
                    if ($scope.clientcp_a[i].clClientcontactpersonId == id) {
                        $scope.clientcpData = $scope.clientcp_a[i];
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
    $scope.viewClientcp = function(id, idata) {
         //console.log(id);
        $scope.temp_var = $filter('filter')(idata, { "clClientcontactpersonId": id });
       //console.log("$scope.temp_var",$scope.temp_var);

       $scope.viewclientcpData= {
          "clClientcontactpersonId": $scope.temp_var[0].clClientcontactpersonId,
          "designation": $scope.temp_var[0].designation,
          "inchargeperson": $scope.temp_var[0].inchargeperson,
          "contactno": $scope.temp_var[0].contactno,
          "altcontactno": $scope.temp_var[0].altcontactno,
          "extension": $scope.temp_var[0].extension,
          "landline": $scope.temp_var[0].landline,
          "email": $scope.temp_var[0].email
       };
    }    
    /*=====  End of ViewClient Use  ======*/
    


      
     $scope.saveClientcp = function(data) {
        //console.log(data);

        if (data.clClientcontactpersonId) {
            
           data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.clClientId=$scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientContactPerson'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.clClientcontactpersonId = pl.data.clClientcontactpersonId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllclientcpRecords(urlclientcpList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                  ClearModels();
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllclientcpRecords(urlclientcpList);
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
            data.clClientId=$scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateClientContactPerson'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllclientcpRecords(urlclientcpList);
                    });
                },100);
                 // if (promiseData.code == 2) {
                //    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                // } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                     ClearModels();
                //}
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllclientcpRecords(urlclientcpList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  ClearModels();
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
    $scope.delClientcp = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "clClientcontactpersonId": id });
//console.log($scope.temp_var);
       $scope.deleteclientcpData= {
          "clClientcontactpersonId": $scope.temp_var[0].clClientcontactpersonId,
          "inchargeperson": $scope.temp_var[0].inchargeperson
       };
     }

    $scope.deleteClientcp = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteClientContactPerson'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllClientcpFilterRecords(urlgapFilterList);
                    GetAllclientcpRecords(urlclientcpList);

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
                    GetAllclientcpRecords(urlclientcpList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete clientcp  ======*/

});
/*=====  End of clientcp Controller  ======*/