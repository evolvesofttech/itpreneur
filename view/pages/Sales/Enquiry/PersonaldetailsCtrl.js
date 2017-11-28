/*=========================================
=            School Controller            =
=========================================*/
angular.module('theGuru').controller("personaldataCtrl", function($rootScope, $scope, $log, $routeParams, 
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, $timeout, ngTableParams, Flash, inst_id) {
       
      //console.log("personaldataCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
      $scope.schoolArray = [];
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

      /*===========================================
      =            Enquiry Status List            =
      ===========================================*/
      var EnquiryStatusListUrl = baseUrlSrvc.baseUrl + 'listEnquiryStatus';
      var promiseEnquiryStatusGet = CRUD_SERVICE.getAllData(EnquiryStatusListUrl);
      promiseEnquiryStatusGet.then(function(pl) {
          $scope.EnquiryStatus = pl.data;
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
      });
      
      
      /*=====  End of Enquiry Status List  ======*/
      
      
     $scope.save = function(data) {
        //console.log(data);

        if (data.eEnquiryFormId) {
            
            data.inInstituteId=$sessionStorage.userData1.inInstituteId;
            data.adUserId = $sessionStorage.adUserId;
            
            data.updatedby = $sessionStorage.userData1.adUserId;
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryForm'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function(pl) {
                $scope.eEnquiryFormId = pl.data.eEnquiryFormId;
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },100);
                 Flash.create('success', $scope.SuccessMessage);
            }, function(err) {
                //console.log(err);
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },100);
                 Flash.create('danger', $scope.DangerMessage);
            });
        } else {

            data.inInstituteId=$sessionStorage.userData1.inInstituteId;
            data.adUserId = $sessionStorage.adUserId;
            data.createdby = $sessionStorage.userData1.adUserId;
            
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEnquiryForm'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function(pl) {
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },100);
                 Flash.create('success', $scope.SuccessMessage);
            }, function(err) {
                //console.log("Some Error Occured." + err);
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },100);
                 Flash.create('danger', $scope.DangerMessage);
            });
        }
    };

});
/*=====  End of School Controller  ======*/