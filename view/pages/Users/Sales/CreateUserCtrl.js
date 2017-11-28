/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("createUserCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("createUserCtrl");
    $scope.userArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Create Users";
    $scope.thisInstitute = $sessionStorage.userData1.instituteName;

    //console.log($scope.OperType);

    $scope.hideSalesExecutive = true;

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

     /*============================
           =            Tabs            =
           ============================*/
            this.Inst = 1;

            this.setTab = function(tabId) {
                this.Inst = tabId;
            };

            this.isSet = function(tabId) {
                return this.Inst === tabId;
            };

            $scope.toggle_ins_a = function() {
                $scope.institute_a = !$scope.institute_a;
            };

            $scope.toggle_ins_b = function() {
                $scope.institute_b = !$scope.institute_b;
            };

            $scope.toggle_ins_c = function() {
                $scope.institute_c = !$scope.institute_c;
            };
           /*=====  End of Tabs  ======*/

           /*==========================================
           =            Radio Button Click            =
           ==========================================*/
           $scope.staffClick = function() {
            $scope.hideSalesExecutive = false;
           }
           $scope.trainerClick = function() {
            $scope.hideSalesExecutive = true;
           }
           
           
           /*=====  End of Radio Button Click  ======*/

           /*======================================
           =            Add User Click            =
           ======================================*/
           $scope.addUserClick = function() {
              $scope.hideSalesExecutive = true;
           }
           /*=====  End of Add User Click  ======*/
           
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

    /*====================================
      =           checkIsExecutive Checkbox            =
      ====================================*/
      $scope.checkIsExecutive = function(val) {
        //console.log(val);
        // if (val == true) {
        //     $scope.isexecutive = "Yes";
        //     //console.log("isexecutive", $scope.isexecutive);
        // } else {
        //     $scope.isexecutive = "No";
        //     //console.log("isexecutive", $scope.isexecutive);
        // }   
      }
      /*=====  End of checkIsExecutive Checkbox  ======*/

     /*===================================
      =            Branch List            =
      ===================================*/
      var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
      var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
      promiseBranchGet.then(function(pl) {
          $scope.Branch = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      /*=====  End of Branch List  ======*/

    /*======================================
    =            Get List batch            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listUserDetails';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.userArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.SalesExecutive = pl.data;
                $scope.userArray.push($scope.SalesExecutive);
                //console.log("$scope.SalesExecutive",$scope.SalesExecutive);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.SalesExecutive.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_user = params.sorting() ? $filter('orderBy')($scope.userArray[0], params.orderBy()) : $scope.userArray[0];
                        $scope.data_user = params.filter() ? $filter('filter')($scope.data_user, params.filter()) : $scope.data_user;
                       $scope.data_user = $scope.data_user.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_user)
                    }
                });
                $scope.usersTable.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List batch  ======*/

    /*=================================================
    =            User Details on Edit Page            =
    =================================================*/
    if ($scope.OperType != undefined && $scope.OperType != 0) {
      $window.document.title = "ITPreneur - Edit Users";
      var urlUserList = baseUrlSrvc.baseUrl + 'listUserDetailsById/'+ $scope.OperType;
        var promiseGet = CRUD_SERVICE.getAllData(urlUserList);
        promiseGet.then(function(pl) {
            $scope.userdetails = pl.data;

            for (var i = 0; i < $scope.userdetails.length; i++) {
                if ($scope.userdetails[i].adUserdetailId == $scope.OperType) {
                    $scope.userData1 = $scope.userdetails[i];

                    if ($scope.userData1.issalesexecutive == "Yes") {
                      $scope.hideSalesExecutive = false;
                    } else {
                      $scope.hideSalesExecutive = true;
                    }
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
     }
    /*=====  End of User Details on Edit Page  ======*/
    

    /*========================================
    =            Designation List            =
    ========================================*/
    var designationUrl = baseUrlSrvc.baseUrl + 'listDesignation';
    var promiseDesignationGet = CRUD_SERVICE.getAllData(designationUrl);
    promiseDesignationGet.then(function(pl) {
        $scope.Designation = pl.data;
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of Designation List  ======*/

    /*===================================
    =            Clear Model            =
    ===================================*/
    function ClearModels() {
        $scope.adduserData = {};
        $scope.userData1 = {};
        $scope.userData1.usertype = "";
        $scope.viewuserData = {};
    }
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.userData1 = {};
        $scope.userData1.usertype = "";
        $scope.viewuserData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/
    
    /*==================================
    =            View batch            =
    ==================================*/
    $scope.viewSalesExecutive = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "adUserdetailId": id });
        //console.log($scope.temp_var_a);

       $scope.viewuserData= $scope.temp_var_a[0];
    }
    /*=====  End of View batch  ======*/
    
    /*==================================
    =            Save User             =
    ==================================*/
    
    $scope.saveUser = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.adUserdetailId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;

            if (data.usertype == "Trainer") {
              data.issalesexecutive = "No";
            }

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.adUserdetailId = pl.data.adUserdetailId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                //ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                //ClearModels();
            });
        } else {

             data.createdby=$sessionStorage.createdby;
             data.updatedby=$sessionStorage.updatedby;
             data.inInstituteId=$sessionStorage.inInstituteId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserDetails'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var batch = pl.batch;
               var promiseData = pl.data;


                if (promiseData.code == 2) {
                    
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
                     GetAllRecords(urlList);
                // Flash.create('success', $scope.SuccessMessage);
               
                ClearModels();
                //}
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                   GetAllRecords(urlList);
                ClearModels();
            });
        }
    };
    
    /*=====  End of Save User   ======*/
   
    /*====================================
    =            Delete batch            =
    ====================================*/
    
    $scope.delCreateUser = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "adUserdetailId": id });

       $scope.deleteCreateuserData1 = $scope.temp_var[0];
     }

    $scope.deleteCreateUser = function (id, uid) {
        //console.log(id);
        var FormData = {
            id: id + '/' + uid,
            url: baseUrlSrvc.baseUrl + 'deleteUserDetails/'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                    });
                },100);
                 
                //Flash.create('success', $scope.SuccessMessage);
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                    });
                },100);
                 
                //Flash.create('danger', $scope.DangerMessage);
            ClearModels();
        });
    }
    /*=====  End of Delete batch  ======*/
    
});
/*=====  End of Controller  ======*/
