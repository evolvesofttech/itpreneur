/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("paymentCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, 
  ngTableParams, Flash, toaster,  firstNameService, middleNameService, lastNameService) {
       
      //console.log("paymentCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
      $scope.PaymentArray = [];
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



       
        var urlPaymentList = baseUrlSrvc.baseUrl + 'listPaymentInwardByEnquiryFormId/' + $scope.OperType;
        GetAllPaymentRecords(urlPaymentList);

        //To Get All Records
        function GetAllPaymentRecords(url) {
            $scope.PaymentArray = [];
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function (pl) {
                    $scope.Payment = pl.data;
                    $scope.PaymentArray.push($scope.Payment);
                    //console.log("$scope.Payment",$scope.Payment);

                    $scope.usersTable_Payment = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.Payment.length, 
                        getData: function ($defer, params) {

                          if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                            $scope.data_Payment = params.sorting() ? $filter('orderBy')($scope.PaymentArray[0], params.orderBy()) : $scope.PaymentArray[0];
                            $scope.data_Payment = params.filter() ? $filter('filter')($scope.data_Payment, params.filter()) : $scope.data_Payment;
                           $scope.data_Payment = $scope.data_Payment.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_Payment)
                        }
                    });
                    $scope.usersTable_Payment.reload();
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }


      /*=======================================
      =            Update Payment            =
      =======================================*/
      $scope.OnPaymentStatusChange = function(id, data) {
             //console.log(id);
             //console.log(data);
            
             var PaymentUrl = baseUrlSrvc.baseUrl + 'updatePaymentClearStatus/'+ id + '/' + data;
             var promisePaymentGet = CRUD_SERVICE.getAllData(PaymentUrl);
             promisePaymentGet.then(function(pl) {
                     $scope.PaymentStatus = pl.data;
                     //console.log("$scope.PaymentStatus",$scope.PaymentStatus);
                     if ($scope.PaymentStatus.code == 1) {
                        toaster.success({title: "Success", body:"Payment Updated Successfully!",tapToDismiss: true,showCloseButton: true});
                     } else {
                        toaster.error({title: "Error", body:"Error In Updating Payment!",tapToDismiss: true,showCloseButton: true});
                     }
                     // $scope.Paymentstatus = $filter('filter')($scope.PaymentStatus, { "acPaymentId": id });
                 },
                 function(errorPl) {
                     $log.error('Some Error in Getting Records.', errorPl);
                 });
         }
         /*=====  End of Update Payment  ======*/

         /*=======================================
          =            Export to Excel            =
          =======================================*/
          $scope.exportAction = function(export_action,tbname){ 

            //console.log(export_action);
            //console.log(tbname);

                tbname = tbname + '-' + $scope.currentDate;

                switch(export_action){ 
                    case 'excel': $scope.$broadcast('export-excel', {type:'excel',tableName:tbname,escape:'false'}); 
                                break;
                    default: //console.log('no event caught');
                 }
          }
          /*=====  End of Export to Excel  ======*/

});
/*=====  End of Officeuse Controller  ======*/