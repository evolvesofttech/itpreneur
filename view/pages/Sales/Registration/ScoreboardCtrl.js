/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("scoreboardCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
  ngTableParams, Flash, inst_id, toaster,  firstNameService, middleNameService, lastNameService) {
       
      //console.log("scoreboardCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.scoreboardArray = [];
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

      var f_name =firstNameService.getFirstName();
      var m_name =middleNameService.getMiddleName();
      var l_name =lastNameService.getLastName();

      $scope.fullName = f_name + ' ' + m_name + ' ' + l_name;
      //console.log($scope.fullName);
      


      $scope.addscore = function(){
        $scope.headingMessage = "Add Score Board";
      }

      /*============================================
      =            Clear Modal on Click            =
      ============================================*/
      $scope.clearModalOnCloseScore = function() {
          // $scope.viewregistrationData = {};
          $scope.scoreboardData = {};
      }
      /*=====  End of Clear Modal on Click  ======*/


    var urlscoreboardList = baseUrlSrvc.baseUrl + 'listRegistrationOfficeUseById/' + $scope.OperType;
    GetAllScoreboardRecords(urlscoreboardList);

    //To Get All Records
    function GetAllScoreboardRecords(url) {
        $scope.scoreboardArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.scoreboard = pl.data;
                //console.log($scope.scoreboard);
                if ($scope.scoreboard == 0) {
                  $scope.hideBtn = false;
                } else {
                  $scope.hideBtn = true;
                }
                $scope.scoreboardArray.push($scope.scoreboard);
                //console.log("$scope.scoreboard",$scope.scoreboard);

                $scope.usersTable_scoreboard = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.scoreboard.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_scoreboard = params.sorting() ? $filter('orderBy')($scope.scoreboardArray[0], params.orderBy()) : $scope.scoreboardArray[0];
                        $scope.data_scoreboard = params.filter() ? $filter('filter')($scope.data_scoreboard, params.filter()) : $scope.data_scoreboard;
                       $scope.data_scoreboard = $scope.data_scoreboard.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_scoreboard)
                    }
                });
                $scope.usersTable_scoreboard.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }


     /*==========================================
    =            Edit scoreboard            =
    ==========================================*/
    $scope.editScoreboard = function(id) {
      $scope.headingMessage = "Edit Score Board";
         //console.log(id);


      var promiseGet = CRUD_SERVICE.getAllData(urlscoreboardList);
        promiseGet.then(function (pl) {
                $scope.Score_a = pl.data;
                //console.log($scope.Score_a);
                for (var i = 0; i < $scope.Score_a.length; i++) {
                    if ($scope.Score_a[i].eRegistrationofficeuseId == id) {
                        $scope.scoreboardData = $scope.Score_a[i];
                          //console.log($scope.scoreboardData);
                    }
                }

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Edit scoreboard  ======*/

    /*=======================================
    =            View score board            =
    =======================================*/
    $scope.viewScoreboard = function(id, bdata) {
    
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "eRegistrationofficeuseId": id });

       $scope.viewscoreboardData= {
          "eRegistrationofficeuseId": $scope.temp_var_a[0].eRegistrationofficeuseId,
          "technicalexamscore": $scope.temp_var_a[0].technicalexamscore,
          "aptitudeexamscore": $scope.temp_var_a[0].aptitudeexamscore,
          "hrroundscore": $scope.temp_var_a[0].hrroundscore,
          "comments": $scope.temp_var_a[0].comments,
          "admissiondate": $scope.temp_var_a[0].admissiondate,
         
       };
    }
    
    /*=====  End of View Office Use  ======*/
    


      
     $scope.saveScoreboard = function(data) {
        //console.log(data);

        if (data.eRegistrationofficeuseId) {
            
            data.inInstituteId = $sessionStorage.inInstituteId;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $scope.currentBranchId;
            data.eEnquiryFormId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateRegistrationOfficeUse'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.eRegistrationofficeuseId = pl.data.eRegistrationofficeuseId;
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllScoreboardRecords(urlscoreboardList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllScoreboardRecords(urlscoreboardList);
                    });
                },100);
                 toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            });
        } else {

            data.inInstituteId = $sessionStorage.inInstituteId;
            data.createdby = $sessionStorage.createdby;
            data.updatedby = $sessionStorage.updatedby;
            data.bBranchId = $scope.currentBranchId;
            data.eEnquiryFormId = $scope.OperType;
            data.adUserId = $sessionStorage.adUserId;
            
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateRegistrationOfficeUse'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllScoreboardRecords(urlscoreboardList);
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
                    GetAllScoreboardRecords(urlscoreboardList);
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
    =            Delete Scoreboard            =
    ============================================*/
    $scope.delScoreboard = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "eRegistrationofficeuseId": id });
//console.log($scope.temp_var);
       $scope.deletescoreboardData= {
          "eRegistrationofficeuseId": $scope.temp_var[0].eRegistrationofficeuseId,
          "type": $scope.temp_var[0].type
       };
     }

    $scope.deleteScoreboard = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteRegistrationOfficeUse'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   // GetAllofficeFilterRecords(urlgapFilterList);
                    GetAllScoreboardRecords(urlscoreboardList);

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
                    GetAllScoreboardRecords(urlscoreboardList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete Officeuse  ======*/

});
/*=====  End of Officeuse Controller  ======*/