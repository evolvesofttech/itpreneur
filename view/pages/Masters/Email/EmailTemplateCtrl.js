/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("emailTemplateCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("emailTemplateCtrl");
    $scope.emailArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Email Template";
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

    $scope.addemail = function(){
        $scope.headingMessage = "Add Email Template";
    }

    /*=======================================
    =            List Email Tags            =
    =======================================*/
    var listTagsUrl = baseUrlSrvc.baseUrl + 'listEmailTemplateDetails';
    var listTagsUrlGet = CRUD_SERVICE.getAllData(listTagsUrl);
    listTagsUrlGet.then(function(pl) {
        $scope.EmailTags = pl.data;
        //console.log("$scope.EmailTags",$scope.EmailTags);
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of List Email Tags  ======*/
    

    /*============================
    =            Demo            =
    ============================*/
      var vm = this;
       vm.variable = '';
       vm.content = '';
        
        vm.getCursorPosition = function() {
          if(vm.variable){
            var sel, range;
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
              //console.log(sel.getRangeAt(0))
              vm.rango = sel.getRangeAt(0);
              vm.rango.insertNode(document.createTextNode('_'+vm.variable+'_'));
              vm.variable = '';
              
               return sel.getRangeAt(0);
            }
          }
        }
    /*=====  End of Demo  ======*/
    


    /*======================================
    =            Get List source            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listEmailTemplate';
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.emailArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(urlList);
        promiseGet.then(function (pl) {
                $scope.EmailTemplateData2 = pl.data;
                $scope.emailArray.push($scope.EmailTemplateData2);
                //console.log("$scope.EmailTemplateData2",$scope.EmailTemplateData2);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.EmailTemplateData2.length, 
                    getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.EmailTemplate = params.sorting() ? $filter('orderBy')($scope.emailArray[0], params.orderBy()) : $scope.emailArray[0];
                        $scope.EmailTemplate = params.filter() ? $filter('filter')($scope.EmailTemplate, params.filter()) : $scope.EmailTemplate;
                       $scope.EmailTemplate = $scope.EmailTemplate.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.EmailTemplate)
                    }
                });
                $scope.usersTable.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List source  ======*/

    /*=======================================
    =            List Email Tags            =
    =======================================*/
    //1 Mean New Entry
    var urlListTags = baseUrlSrvc.baseUrl + 'listEmailTemplateDetailsByEmailtemplateId/' + $scope.OperType;
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

       $scope.viewtagData = $scope.temp_var_a[0];
    }
    /*=====  End of View Tag Email======*/

    /*========================================================
    =            Edit template data on other page            =
    ========================================================*/
    if ($scope.OperType != undefined && $scope.OperType != 0) {


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

    /*===========================================
    =            Edit Email Template            =
    ===========================================*/
    $scope.editTemplate = function(id, data) {
        $scope.headingMessage = "Edit Email Template";

         //console.log(id); 
        $scope.temp_var_Tag = $filter('filter')(data, { "eEmailtemplateId": id });

       $scope.EmailTemplateData = $scope.temp_var_Tag[0];
       vm.content = $scope.temp_var_Tag[0].text;
       //console.log($scope.EmailTemplateData);

    }
    /*=====  End of Edit Email Template  ======*/
    
    
    
    
    /*===========================================
    =            Save Email Template            =
    ===========================================*/
    $scope.saveEmailTemplate = function (data, body) {

        //console.log(data);
        //console.log(body);
        
        if (data.eEmailtemplateId) {

            data.updatedby=$sessionStorage.updatedby;
            data.inInstituteId=$sessionStorage.inInstituteId;
             data.bBranchId=$sessionStorage.bBranchId;
             data.adUserId = $sessionStorage.adUserId;
             data.text = body;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEmailTemplate'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                $scope.eEmailtemplateId = pl.data.eEmailtemplateId;
               
               $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
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
            data.adUserId = $sessionStorage.adUserId;
            data.text = body;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'addUpdateEmailTemplate'
            };
            //console.log("FormData",FormData);
            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {
               
               var promiseData = pl.data;
               
                $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    });
                },100);
                if (promiseData.code == 2) {
                    toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                } else {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
               
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);

                //console.log("err.data",err.data);
                
               $timeout(function() {
                    $scope.$apply(function () {
                    GetAllRecords(urlList);
                    });
                },100);
                 
                 toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                  
                ClearModels();
            });
        }
    };
    /*=====  End of Save Email Template  ======*/
    
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
