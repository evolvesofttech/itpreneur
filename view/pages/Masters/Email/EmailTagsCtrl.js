/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("emailTemplateTagsCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("emailTemplateTagsCtrl");
    $scope.emailTagsArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Email Tags";
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

    $scope.Addemailtag = function(){
        $scope.headingMessage = "Add Email Tags";
    }

    /*=======================================
    =            List Email Tags            =
    =======================================*/
    //1 Mean New Entry
    var urlListTags = baseUrlSrvc.baseUrl + 'listEmailTemplateDetails';
    GetAllTagRecords(urlListTags);

    //To Get All Records
    function GetAllTagRecords(url) {
        $scope.emailTagArray = [];
        var promiseTagGet = CRUD_SERVICE.getAllData(url);
        promiseTagGet.then(function (pl) {
                $scope.EmailTemplateTagData2 = pl.data;
                $scope.emailTagArray.push($scope.EmailTemplateTagData2);
                //console.log("$scope.EmailTemplateTagData2",$scope.EmailTemplateTagData2);

                $scope.usersTable_Tags = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.EmailTemplateTagData2.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.EmailTemplate_Tags = params.sorting() ? $filter('orderBy')($scope.emailTagArray[0], params.orderBy()) : $scope.emailTagArray[0];
                        $scope.EmailTemplate_Tags = params.filter() ? $filter('filter')($scope.EmailTemplate_Tags, params.filter()) : $scope.EmailTemplate_Tags;
                       $scope.EmailTemplate_Tags = $scope.EmailTemplate_Tags.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.EmailTemplate_Tags)
                    }
                });
                $scope.usersTable_Tags.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of List Email Tags  ======*/
    
    

    /*===================================
    =            Clear Model            =
    ===================================*/
    function ClearModels() {
        $scope.EmailTemplateData = {};
    }
    function ClearModelsTags() {
        $scope.EmailTemplateTagsData = {};
    }
    /*=====  End of Clear Model  ======*/

    /*============================================
    =            Clear Modal on Click            =
    ============================================*/
    $scope.clearModalOnClose = function() {
        $scope.EmailTemplateData = {};
    }
    $scope.clearModalOnCloseTags = function() {
        $scope.EmailTemplateTagsData = {};
    }
    /*=====  End of Clear Modal on Click  ======*/
    
    /*===========================================
    =            View Email Template            =
    ===========================================*/
    $scope.viewEmailTemplate = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_viewemail = $filter('filter')(bdata, { "eEmailtemplateId": id });
        //console.log($scope.temp_var_viewemail);
       $scope.viewEmailTemplateData = $scope.temp_var_viewemail[0];


       var editemailtemplatedetailsUrl = baseUrlSrvc.baseUrl + 'listEmailTemplateDetailsByEmailtemplateId/'+ id;
        var promiseeditemailtemplatedetailsUrlGet = CRUD_SERVICE.getAllData(editemailtemplatedetailsUrl);
        promiseeditemailtemplatedetailsUrlGet.then(function(pl) {
            $scope.editEmailTemplate_b = pl.data;
            //console.log($scope.editEmailTemplate_b);
            
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
    }
    /*=====  End of View Email Template  ======*/

      /*==================================
    =            View Tag Email          =
    ==================================*/
    $scope.viewTag = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var_a = $filter('filter')(bdata, { "eEmailtemplatedetailsId": id });

       $scope.viewtagData= {
          "eEmailtemplatedetailsId": $scope.temp_var_a[0].eEmailtemplatedetailsId,
          "emailtagname": $scope.temp_var_a[0].emailtagname,
          "emailtagvalue": $scope.temp_var_a[0].emailtagvalue
       };
    }
    /*=====  End of View Tag Email======*/

    /*========================================================
    =            Edit template data on other page            =
    ========================================================*/
    if ($scope.OperType != undefined && $scope.OperType != 0) {
        $window.document.title = "ITPreneur - Edit Email Tags";
      var editemailtemplateUrl = baseUrlSrvc.baseUrl + 'listEmailTemplateByEmailtemplateId/'+ $scope.OperType;
        var promiseeditemailtemplateUrlGet = CRUD_SERVICE.getAllData(editemailtemplateUrl);
        promiseeditemailtemplateUrlGet.then(function(pl) {
            $scope.editEmailTemplate_a = pl.data;
            for (var i = 0; i < $scope.editEmailTemplate_a.length; i++) {
                if ($scope.editEmailTemplate_a[i].eEmailtemplateId == $scope.OperType) {
                    $scope.EmailTemplateData = $scope.editEmailTemplate_a[i];
                    //console.log("$scope.EmailTemplateData",$scope.EmailTemplateData);
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
     }
    /*=====  End of Edit template data on other page  ======*/

    /*======================================
    =            Edit Email Tag            =
    ======================================*/
    $scope.editEmailTag = function(id) {
        $scope.headingMessage = "Edit Email Tags";

        var editemailtemplatedetailsUrl = baseUrlSrvc.baseUrl + 'listEmailTemplateDetailsByEmailtemplatedetailsId/'+ id;
        var promiseeditemailtemplatedetailsUrlGet = CRUD_SERVICE.getAllData(editemailtemplatedetailsUrl);
        promiseeditemailtemplatedetailsUrlGet.then(function(pl) {
            $scope.editEmailTemplate_b = pl.data;
            for (var i = 0; i < $scope.editEmailTemplate_b.length; i++) {
                if ($scope.editEmailTemplate_b[i].eEmailtemplatedetailsId == id) {
                    $scope.EmailTemplateTagsData = $scope.editEmailTemplate_b[i];
                    //console.log("$scope.EmailTemplateTagsData",$scope.EmailTemplateTagsData);
                }
            }
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });

    }
    /*=====  End of Edit Email Tag  ======*/
    
    
    
    /*===========================================
    =            Save Email Template            =
    ===========================================*/
    $scope.saveEmailTemplateTags = function (data) {

        //console.log(data);
        
        if (data.eEmailtemplatedetailsId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEmailTemplateDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.eEmailtemplatedetailsId = pl.data.eEmailtemplatedetailsId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModelsTags();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                ClearModelsTags();
            });
        } else {

             data.createdby=$sessionStorage.createdby;
             data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            //console.log("data", data);

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEmailTemplateDetails'
            };
            //console.log("FormData",FormData);
            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var promiseData = pl.data;
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    //GetAllRecords(urlList);
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                // if (promiseData.code == 0) {
                //     ////console.log("Add source successfully");
                //     Flash.create('danger', $scope.DangerMessage);
                //    }
                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
               ClearModelsTags();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModelsTags();
            });
        }
    };
    /*=====  End of Save Email Template  ======*/

    /*=======================================
    =            Save Email Tags            =
    =======================================*/
    $scope.saveEmailTemplateTags = function(data) {

        if (data.eEmailtemplatedetailsId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;
             data.eEmailtemplateId = $scope.OperType;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEmailTemplateDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.eEmailtemplatedetailsId = pl.data.eEmailtemplatedetailsId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                ClearModelsTags();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                ClearModelsTags();
            });
        } else {

             data.createdby=$sessionStorage.createdby;
             data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
            data.bBranchId=$sessionStorage.bBranchId;
            data.adUserId = $sessionStorage.adUserId;
            data.eEmailtemplateId = $scope.OperType;
            //console.log("data", data);

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEmailTemplateDetails'
            };
            //console.log("FormData",FormData);
            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var source = pl.source;
               var promiseData = pl.data;
               //console.log("source",source);
               //console.log("promiseData",promiseData);
               
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    //GetAllRecords(urlList);
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                // if (promiseData.code == 0) {
                //     ////console.log("Add source successfully");
                //     Flash.create('danger', $scope.DangerMessage);
                //    }
                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
               ClearModelsTags();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModelsTags();
            });
        }

    }
    /*=====  End of Save Email Tags  ======*/
    
   
    /*====================================
    =            Delete source            =
    ====================================*/
    
    $scope.delEmailTemplate = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var_email = $filter('filter')(bdata, { "eEmailtemplateId": id });

       $scope.deleteEmailData= $scope.temp_var_email[0];
     }

    $scope.deleteEmailTemplate = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteEmailTemplate'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllRecords(urlList);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete source  ======*/

    /*==================================================
    =            Delete Email Template Tags            =
    ==================================================*/
    $scope.delEmailTemplateTags = function(id, bdata) {
         //console.log(id); 
        $scope.temp_var_emailtags = $filter('filter')(bdata, { "eEmailtemplatedetailsId": id });

       $scope.deleteEmailTagsData= $scope.temp_var_emailtags[0];
     }

    $scope.deleteEmailTemplateTags = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteEmailTemplateDetails'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function (err) {
            //console.log("Some Error Occured." + err);
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTagRecords(urlListTags);
                    });
                },100);
                 
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            //ClearModels();
        });
    }
    /*=====  End of Delete Email Template Tags  ======*/
    
    
});
/*=====  End of Controller  ======*/
