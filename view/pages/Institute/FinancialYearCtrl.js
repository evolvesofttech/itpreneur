/*==========================================
=            Contact Controller            =
==========================================*/
angular.module('theGuru').controller("academicYearCtrl", 
    function($rootScope, $scope, $log, $routeParams, $route,CRUD_SERVICE, 
        baseUrlSrvc, $filter, $sessionStorage, $timeout, ngTableParams, 
        Flash, toaster) {

        
        $scope.OperType = $routeParams.ID;

         
        /*===============================================
        =            Get School Contact List            =
        ===============================================*/
        if($scope.OperType != undefined) {
          $scope.yearArray = [];
          //console.log("OperType", $scope.OperType)

        var yearListUrl = baseUrlSrvc.baseUrl + 'listInstituteAcademicYearByInstituteId/' + $scope.OperType;
            GetAllYearRecords(yearListUrl);
            //To Get All Records
            function GetAllYearRecords(url) {
                $scope.yearArray = [];
              var promiseYearGet = CRUD_SERVICE.getAllData(url);
              promiseYearGet.then(function(pl) {
                      $scope.academicyear = pl.data;
                      if ($scope.academicyear == 0) {
                          $scope.hideBtn = false;
                        } else {
                          $scope.hideBtn = true;
                        }
                      $scope.yearArray.push($scope.academicyear);

                       $scope.usersTable_year = new ngTableParams({
                            page: 1,
                            count: 10
                        }, {
                           total: $scope.academicyear.length, 
                            getData: function ($defer, params) {

                              if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                            
                                $scope.data_year = params.sorting() ? $filter('orderBy')($scope.yearArray[0], params.orderBy()) : $scope.yearArray[0];
                                $scope.data_year = params.filter() ? $filter('filter')($scope.data_year, params.filter()) : $scope.data_year;
                               $scope.data_year = $scope.data_year.slice((params.page() - 1) * params.count(), params.page() * params.count());
                               $defer.resolve($scope.data_year)
                            }
                        });
                       $scope.usersTable_year.reload();
                  },
                  function(errorPl) {
                      $log.error('Some Error in Getting Records.', errorPl);
                  });
            }
        }

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

          /*=========================================
          =            Add Contact Click            =
          =========================================*/
          $scope.addYearClick = function() {
            $scope.headingMessage = "Add Academic Year";
          }
          /*=====  End of Add Contact Click  ======*/
          
           /*==================================
            =            Date Click            =
            ==================================*/
            $scope.dateClick = function(da) {
              //console.log(da);
              $scope.curDate = da;
              var d = new Date(da);
              var m = d.getMonth() + 01;
              var y = d.getFullYear();
             
              //console.log(m);
              //console.log(y);
            }
            
             /*=====  End of Date Click  ======*/

              /*==================================
            =            Date Click            =
            ==================================*/
            $scope.todateClick = function(tod) {
              //console.log(tod);
              $scope.curDate1 = tod;
              var d = new Date(tod);
              var m = d.getMonth() + 01;
              var y = d.getFullYear();
             
              //console.log(m);
              //console.log(y);
            }
            
             /*=====  End of Date Click  ======*/
             
          /*============================================
          =            Clear Modal on Click            =
          ============================================*/
          $scope.clearModalOnCloseYear = function() {
              $scope.instDataYear = {};
              $scope.viewyeardata = {};
          }
          function ClearModelsYear() {
              $scope.instDataYear = {};
              $scope.viewyeardata = {};
          }
          /*=====  End of Clear Modal on Click  ======*/

          /*================================================
          =            Save Edit Contact Person            =
          ================================================*/
            $scope.saveYear = function(data) {
                //console.log("data",data);
                if (data.inInstituteacademicyearId) {

                    data.inInstituteId = $scope.OperType;
                    data.updatedby = $sessionStorage.updatedby;


                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateInstituteAcademicYear'
                    };
                    var promisePost = CRUD_SERVICE.post(FormData);
                    promisePost.then(function(pl) {
                        $scope.inInstituteacademicyearId = pl.data.inInstituteacademicyearId;
                       $timeout(function() {
                            $scope.$apply(function () {
                            GetAllYearRecords(yearListUrl);
                            });
                        },100);
                       ClearModelsYear();
                         toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    }, function(err) {
                        //console.log(err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllYearRecords(yearListUrl);
                            });
                        },100);
                        ClearModelsYear();
                         toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                    });
                } else {

                    data.inInstituteId = $scope.OperType;
                    data.updatedby = $sessionStorage.updatedby;
                    data.createdby = $sessionStorage.createdby;

                    var FormData = {
                        formdata: data,
                        url: baseUrlSrvc.baseUrl + 'addUpdateInstituteAcademicYear'
                    };

                    var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                    promisePut.then(function(pl) {

                       var promiseData = pl.data;

                      //console.log("promiseData",promiseData);
                     
                        if (promiseData.code == 1) {
                          //console.log("Success");
                          toaster.pop({type:'success',title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                        }

                        if (promiseData.code == 2) {
                          //console.log("Duplicate");
                          toaster.pop({type:'error',title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                        }

                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllYearRecords(yearListUrl);
                            });
                        },100);
                        ClearModelsYear();
                        
                    }, function(err) {
                        //console.log("Some Error Occured." + err);
                        $timeout(function() {
                            $scope.$apply(function () {
                            GetAllYearRecords(yearListUrl);
                            });
                        },100);
                        ClearModelsYear();
                         toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                    });
                }
            };

             /*==================================
            =         Edit Academic Year   =
            ==================================*/

            $scope.editYear = function(id) {
                $scope.headingMessage = "Edit Financial Year";
                //console.log(id); 
                 
                 if ($scope.role == 'System Admin' || $scope.role=='Admin' || $scope.role == 'Privilege Institute System Admin' || $scope.role == 'Normal Institute System Admin') {
                    var yearListUrl1 = baseUrlSrvc.baseUrl + 'listInstituteAcademicYear';
                } else {
                    var yearListUrl1 = baseUrlSrvc.baseUrl + 'listInstituteAcademicYearbyInstituteId/' + $scope.OperType;;
                }


                var promiseGet = CRUD_SERVICE.getAllData(yearListUrl1);
                promiseGet.then(function (pl) {
                        $scope.year_a = pl.data;
                        //console.log($scope.year_a);
                        for (var i = 0; i < $scope.year_a.length; i++) {
                            if ($scope.year_a[i].inInstituteacademicyearId == id) {
                                $scope.instDataYear = $scope.year_a[i];
                            }
                        }

                    },
                    function (errorPl) {
                        $log.error('Some Error in Getting Records.', errorPl);
                    });

            }
            /*=====  End of Edit Academic Year  ======*/

            /*===========================================
            =            View Contact Person            =
            ===========================================*/
            $scope.viewYear = function(id, cdata) {
                $scope.temp_var = $filter('filter')(cdata, { "inInstituteacademicyearId": id });

               $scope.viewyeardata= $scope.temp_var[0];
            }
            /*=====  End of View Contact Person  ======*/
            

            /*=============================================
            =            Delete Contact Person            =
            =============================================*/
            $scope.delYear = function(id, cdata) {
                 //console.log(id);
                $scope.temp_var = $filter('filter')(cdata, { "inInstituteacademicyearId": id });

               $scope.deleteyearData= {
                  "inInstituteacademicyearId": $scope.temp_var[0].inInstituteacademicyearId,
                  "frommonthyear": $scope.temp_var[0].frommonthyear,
                  "tomonthyear": $scope.temp_var[0].tomonthyear 
               };

            }

            $scope.deleteYear = function(id) {
                //console.log(id);
                var FormData = {
                    id: id,
                    url: baseUrlSrvc.baseUrl + 'deleteInstituteAcademicYear'
                };
                var promiseDelete = CRUD_SERVICE.delete(FormData);
                promiseDelete.then(function(pl) {
                    $timeout(function() {
                            $scope.$apply(function () {
                            GetAllYearRecords(yearListUrl);
                            });
                        },100);
                         toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
                }, function(err) {
                    //console.log("Some Error Occured." + err);
                    $timeout(function() {
                            $scope.$apply(function () {
                            GetAllYearRecords(yearListUrl);
                            });
                        },100);
                         toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
                });
            }
            /*=====  End of Delete Contact Person  ======*/
});
/*=====  End of Contact Controller  ======*/
