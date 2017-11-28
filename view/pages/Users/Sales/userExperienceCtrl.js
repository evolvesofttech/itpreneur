/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("userExperienceCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, $route,Flash,$rootScope, $sessionStorage, toaster) {
    //console.log("userExperienceCtrl");
    $scope.experienceArray = [];
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

    /*======================================
    =            Get List userExperience            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listUserProfessionalExperienceByUserdetailId/' + $scope.OperType;
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.experienceArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.userExperience = pl.data;
                $scope.experienceArray.push($scope.userExperience);
                //console.log("$scope.userExperience",$scope.userExperience);

                $scope.usersTable_Experience = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.userExperience.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_Experience = params.sorting() ? $filter('orderBy')($scope.experienceArray[0], params.orderBy()) : $scope.experienceArray[0];
                        $scope.data_Experience = params.filter() ? $filter('filter')($scope.data_Experience, params.filter()) : $scope.data_Experience;
                       $scope.data_Experience = $scope.data_Experience.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Experience)
                    }
                });
                $scope.usersTable_Experience.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List userExperience  ======*/
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    
    function ClearModels() {
        $scope.adduserExperience = {};
        $scope.userexperienceDataAdd = {};
       
        $scope.viewuserExperienceData = {};
    }
    
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.userexperienceDataAdd = {};
       
        $scope.viewuserExperienceData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/

    /*========================================
    =            Edit userExperience Modal            =
    ========================================*/
    
    $scope.editExperience = function(id) {
         //console.log(id); 

        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.userExperience1 = pl.data;
                //console.log($scope.userExperience1);
                for (var i = 0; i < $scope.userExperience1.length; i++) {
                    if ($scope.userExperience1[i].adUserprofessionalexperienceId == id) {
                        $scope.userexperienceDataAdd = $scope.userExperience1[i];
                       
                          //console.log($scope.userexperienceDataAdd);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Edit user Experience Modal  ======*/
    
    /*==================================
    =            View Experience            =
    ==================================*/
    $scope.viewExperience = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "adUserprofessionalexperienceId": id });

       $scope.viewExperienceData= {
          "adUserprofessionalexperienceId": $scope.temp_var_a[0].adUserprofessionalexperienceId,
          "companyname": $scope.temp_var_a[0].companyname,
          "description": $scope.temp_var_a[0].description,
          "jobtitle": $scope.temp_var_a[0].jobtitle,
          "workarea": $scope.temp_var_a[0].workarea,
          "startdate": $scope.temp_var_a[0].startdate,
          "enddate": $scope.temp_var_a[0].enddate
       };
    }
    /*=====  End of View Experience  ======*/
    
    /*==================================
    =            Save Experience            =
    ==================================*/
    
    $scope.saveexperience = function (data) {
        //console.log("$scope.StorageData",$scope.StorageData);
        if (data.adUserprofessionalexperienceId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
             data.adUserdetailId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserProfessionalExperience'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.adUserprofessionalexperienceId = pl.data.adUserprofessionalexperienceId;
               
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
              data.adUserdetailId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateUserProfessionalExperience'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var batch = pl.batch;
               var promiseData = pl.data;
               //console.log("batch",batch);
               //console.log("promiseData",promiseData);
              
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
    
    /*=====  End of Save batch  ======*/
   
    /*====================================
    =            Delete batch            =
    ====================================*/
    
    $scope.delExperience = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "adUserprofessionalexperienceId": id });

       $scope.deleteuserexperienceData= {
          "adUserprofessionalexperienceId": $scope.temp_var[0].adUserprofessionalexperienceId,
          "companyname": $scope.temp_var[0].companyname
       };
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteUserProfessionalExperience'
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
