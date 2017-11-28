angular.module("theGuru").controller("emailSettingCtrl", 
        function($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter, 
          ngTableParams, $timeout, $route, Flash, $rootScope, $sessionStorage, $window) {
        //console.log("emailSettingCtrl");
        $scope.OperType = $routeParams.ID;
        $window.document.title = "ITPreneur - Email Setting";
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

        /*================================
        =            Get List            =
        ================================*/
           var emailurlList = baseUrlSrvc.baseUrl + 'listEmailSetting';
            

            GetAllEmailRecords(emailurlList);

            //To Get All Records
            function GetAllEmailRecords(url) {
                $scope.emailArray = [];
                var promiseGet = CRUD_SERVICE.getAllData(url);
                promiseGet.then(function (pl) {
                    $scope.emailSetting = pl.data;
                    $scope.emailArray.push($scope.emailSetting);
                    //console.log("$scope.emailSetting",$scope.emailSetting);
                    if ($scope.emailSetting == 0) {}
                    else {$scope.disableAddEmail = true;}

                    $scope.usersTable_email = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.emailSetting.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                        
                            $scope.data_email = params.sorting() ? $filter('orderBy')($scope.emailArray[0], params.orderBy()) : $scope.emailArray[0];
                            $scope.data_email = params.filter() ? $filter('filter')($scope.data_email, params.filter()) : $scope.data_email;
                           $scope.data_email = $scope.data_email.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_email)
                        }
                    });
                    $scope.usersTable_email.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
         }
        /*=====  End of Get List  ======*/

        /*============================================
        =            Clear Modal on Click            =
        ============================================*/
        $scope.clearModalOnClose = function() {
            $scope.emailData = {};
        }
        /*=====  End of Clear Modal on Click  ======*/

        /*===========================================
        =            Edit Email Function            =
        ===========================================*/
        $scope.editEmailSetting = function(id, edata) {
            //console.log(id); 
            $scope.temp_var = $filter('filter')(edata, { "adEmailsettingId": id });
           $scope.emailData = $scope.temp_var[0];
        }
        /*=====  End of Edit Email Function  ======*/

        /*==================================
        =            View Email            =
        ==================================*/
        $scope.viewEmail = function(id, edata) {
           //console.log(id); 
            $scope.temp_var1 = $filter('filter')(edata, { "adEmailsettingId": id });
           $scope.viewEmailData = $scope.temp_var1[0];
        }
        /*=====  End of View Email  ======*/
        

        /*==========================================
        =            Save Email Setting            =
        ==========================================*/
        $scope.saveEmailSetting = function (data) {
              //console.log(data);
              if (data.adEmailsettingId) {

               data.updatedby=$sessionStorage.updatedby;
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.bBranchId = $sessionStorage.bBranchId;

                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateEmailSetting'
                  };
                  var promisePost = CRUD_SERVICE.post(FormData);
                  promisePost.then(function (pl) {
                      $scope.adEmailsettingId = pl.data.adEmailsettingId;
                     
                     $timeout(function() {
                          $scope.$apply(function () {
                          //$route.reload();
                          GetAllEmailRecords(emailurlList);
                          });
                      },100);
                       Flash.create('success', $scope.SuccessMessage);
                      
                      ClearModels();
                  }, function (err) {
                      //console.log(err);
                      
                      $timeout(function() {
                          $scope.$apply(function () {
                          //$route.reload();
                          GetAllEmailRecords(emailurlList);
                          });
                      },100);
                      Flash.create('danger', $scope.DangerMessage);
                       
                      ClearModels();
                  });
              } else {

                data.createdby=$sessionStorage.createdby;
               data.updatedby=$sessionStorage.updatedby;
                data.inInstituteId=$sessionStorage.inInstituteId;
                data.bBranchId = $sessionStorage.bBranchId;

                  
                  var FormData = {
                      formdata: data,
                      url: baseUrlSrvc.baseUrl + 'addUpdateEmailSetting'
                  };

                  var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                  promisePut.then(function (pl) {
                     
                      $timeout(function() {
                          $scope.$apply(function () {
                          //$route.reload();
                          GetAllEmailRecords(emailurlList);
                          });
                      },100);
                       toaster.success({title: "title", body:"text1"});
                      //Flash.create('success', $scope.SuccessMessage);
                     
                      ClearModels();
                  }, function (err) {
                      //console.log("Some Error Occured." + err);
                      
                     $timeout(function() {
                          $scope.$apply(function () {
                          //$route.reload();
                          GetAllEmailRecords(emailurlList);
                          });
                      },100);
                       toaster.pop('success', "title", "text");
                       //Flash.create('danger', $scope.DangerMessage);
                        
                      ClearModels();
                  });
              }
          };
        /*=====  End of Save Email Setting  ======*/

        /*============================================
        =            Delete Email Setting            =
        ============================================*/
        $scope.delEmailSetting = function(id, edata) {
             //console.log(id); 
            $scope.temp_var = $filter('filter')(edata, { "adEmailsettingId": id });

           $scope.deleteemailData = $scope.temp_var[0];
         }

        $scope.deleteEmailSetting = function (id) {
            //console.log(id);
            var FormData = {
                id: id,
                url: baseUrlSrvc.baseUrl + 'deleteEmailSetting'
            };
            var promiseDelete = CRUD_SERVICE.delete(FormData);
            promiseDelete.then(function (pl) {
                $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                        GetAllEmailRecords(emailurlList);
                        $scope.disableAddEmail = false;
                        });
                    },100);
                     
                    Flash.create('success', $scope.SuccessMessage);
                //ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                        $scope.$apply(function () {
                        //$route.reload();
                        GetAllEmailRecords(emailurlList);
                        });
                    },100);
                     
                    Flash.create('danger', $scope.DangerMessage);
                //ClearModels();
            });
        }
    /*=====  End of Delete Email Setting  ======*/
            
});