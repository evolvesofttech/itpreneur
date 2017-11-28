  /*==============================
=            App JS            =
==============================*/
(function() {

  "use strict";

  var App = angular.module("theGuru", [
    "App.controllers",
    "App.services",
    "App.directives",
    "App.filters",
    "ngRoute",
    "ngResource",
    "App.routes",
    "ngFlash",
    "ngAnimate",
    "ngScrollbars",
    "ngTable",
  "ngStorage",
  'mwl.calendar',
  'ui.bootstrap', 
  'colorpicker.module',
  'ngLoadingSpinner',
  '$strap.directives',
    "ngScrollbars",
    "pdf",
    "ngSanitize",
    "checklist-model",
    //"nvd3",
    "angular.filter",
    "720kb.datepicker",
    "angularScreenfull",
    "toaster",
    "moment-picker",
    "ngFileUpload",
    "ui.select",
    //"ui.mask",
    "textAngular",
    "angularjs-dropdown-multiselect",
    "ngTagsInput",
    "naif.base64",
    "angular-thumbnails",
    "timer"
  ]);

  /*==================================
  =            Base URL's            =
  ==================================*/
  App.factory('baseUrlSrvc', function () {
    return {
        baseUrl: 'http://192.168.1.14:8080/ITPreneur/', //amol
        //baseUrl: 'http://192.168.1.15:8080/ITPreneur/', //vishant
        //baseUrl: 'http://173.212.238.200:8080/ITPreneur/', //server
        baseUrlOfForms: 'view/forms/'
      }
  });
  /*=====  End of Base URL's  ======*/

  /*======================================
  =            Config Methods            =
  ======================================*/
  App.config(
    function($controllerProvider, $provide, $compileProvider, $sceProvider, ScrollBarsProvider) {

        $sceProvider.enabled(false);
        App._controller = App.controller;
        App._service = App.service;
        App._factory = App.factory;
        App._value = App.value;
        App._directive = App.directive;
        App.controller = function(name, constructor) {
            $controllerProvider.register(name, constructor);
            return (this);
        };
        // Provider-based service.
        App.service = function(name, constructor) {
            $provide.service(name, constructor);
            return (this);
        };
        // Provider-based factory.
        App.factory = function(name, factory) {
            $provide.factory(name, factory);
            return (this);
        };
        // Provider-based value.
        App.value = function(name, value) {
            $provide.value(name, value);
            return (this);
        };
        // Provider-based directive.
        App.directive = function(name, factory) {
            $compileProvider.directive(name, factory);
            return (this);
        };

        // custom scrollbar
        ScrollBarsProvider.defaults = {
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: true // enable scrolling buttons by default
            },
            scrollInertia: 300,
            axis: 'y', // enable 2 axis scrollbars by default
            autoHideScrollbar: true,
            theme: '3d-thick-dark',
            setHeight:500,
            advanced: {
                updateOnContentResize: true
            }
        };
        // custom scrollbar

    });
  /*=====  End of Config Methods  ======*/

  /*=====================================
  =            Flash Message            =
  =====================================*/
   App.run(function($rootScope, $anchorScroll) {
      // initialize variables
      $rootScope.flash = {};
      $rootScope.flash.text = '';
      $rootScope.flash.type = '';
      $rootScope.flash.timeout = 5000;
      $rootScope.hasFlash = false;
      $anchorScroll.yOffset = 50;
   });
   /*=====  End of Flash Message  ======*/

   /*================================
    =            App Ctrl            =
    ================================*/ 
    App.controller('AppCtrl', function($scope, $location,$http, CRUD_SERVICE, baseUrlSrvc, 
      $filter,$sessionStorage,$routeParams,$route,$window, $timeout) {

      /*=========================================================================
      =            Create localstorage if browser history is cleared            =
      =========================================================================*/
      if ($sessionStorage.userData1) {
        
      } else {
        $sessionStorage.userData1="";
      }
      /*=====  End of Create localstorage if browser history is cleared  ======*/

    /*==============================================================================
    =            Check whether localstorage is already available or not            =
    ==============================================================================*/
    if($sessionStorage.userData1!="")
    {

        $scope.listUserRole = $sessionStorage.userData1[0].listUser.listuserrole;
        $scope.RoleNames = $scope.listUserRole;
        $scope.selID = $sessionStorage.bBranchId;

        /*=====================================
        =            Identify role            =
        =====================================*/
        $scope.fullAccess = $sessionStorage.Access;
        /*=====  End of Identify role  ======*/

        /*======================================
         =            Dashboard Init            =
         ======================================*/
         $scope.funnelReport = false;
         $scope.collectionRevenueDue = false;
         $scope.leadConversion = false;
         $scope.paymentCollections = false;
         $scope.salesActivity = false;
         $scope.clientActivity = false;
         $scope.totalLeads = false;
         /*=====  End of Dashboard Init  ======*/
        
        /*==========================================
        =            Assign Window Menu            =
        ==========================================*/
        $scope.User_Role = $sessionStorage.userData1[0].listUser.listuserrole;
        for (var i = 0; i < $scope.User_Role.length; i++) {

            if ($scope.User_Role[i].adRoleId == $sessionStorage.cRoleId) {

              $scope.User_Role1 = $scope.User_Role[i];
              /*==============================================
              =            Check Assigned Widgets            =
              ==============================================*/
              for(var k=0;k<$scope.User_Role1.listWidget.length;k++) {

                  if ($scope.User_Role1.listWidget[k].widgetName == 'Funnel Report') {
                    $scope.funnelReport = true;
                  }
                  
                  if ($scope.User_Role1.listWidget[k].widgetName == 'Collection Revenue Due') {
                    $scope.collectionRevenueDue = true;
                  }

                  if ($scope.User_Role1.listWidget[k].widgetName == 'Sales Activity') {
                    $scope.salesActivity = true;
                  }

                  if ($scope.User_Role1.listWidget[k].widgetName == 'Total Leads') {
                    $scope.totalLeads = true;
                  }

                  if ($scope.User_Role1.listWidget[k].widgetName == 'Client Activity') {
                    $scope.clientActivity = true;
                  }

                  if ($scope.User_Role1.listWidget[k].widgetName == 'Payment Collections') {
                    $scope.paymentCollections = true;
                  }

                  if ($scope.User_Role1.listWidget[k].widgetName == 'Lead Conversion') {
                    $scope.leadConversion = true;
                  }

                } //for ends
              /*=====  End of Check Assigned Widgets  ======*/

              $scope.role = $scope.User_Role1.roleName;

              $scope.userCurrentBranch = $scope.User_Role1.listBranch;

              /*===============================================
              =            Check Assigned Branches            =
              ===============================================*/
              if ($scope.role == 'Admin' || $scope.role == 'System Admin') {

                var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
                var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
                promiseBranchGet.then(function(pl) {
                    $scope.currentRoleBranches1 = pl.data;
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });

              } else {
                $scope.currentRoleBranches1 = $sessionStorage.currBranch;

              }
              /*=====  End of Check Assigned Branches  ======*/

              $scope.role = $scope.User_Role1.roleName;
              
              /*==========================================
              =            Assign Menu Window            =
              ==========================================*/
              var lookup = {};
        
              var items = [];
              items = $scope.User_Role1.listWindows;
              var result = [];

              for (var item, i = 0; item = items[i++];) {

                 var menuName = item.menuName;
                 var adMenuId = item.adMenuId;

                 if (!(menuName in lookup) && !(adMenuId in lookup)) {
                    lookup[menuName] = 1;
                    lookup[adMenuId] = 1;
                    $scope.win = $filter('filter')(items, {
                       "adMenuId": adMenuId
                    });
                    result.push({
                       "menuName": menuName,
                       "adMenuId": adMenuId,
                       "window": $scope.win
                    });

                 }
              } //for ends

            } //if ends

            $scope.menuData = result;
            /*=====  End of Assign Menu Window  ======*/

        }
        /*=====  End of Assign Window Menu  ======*/
    } else {

        $scope.absUrl = $location.absUrl();

        $scope.currentWord = "forgotpassword";
        $scope.currentWord1 = "Studentprofile";
        $scope.currentWord2 = "Invitation";

        if ($scope.absUrl.includes($scope.currentWord)) {
          $window.location.href =$scope.absUrl;
        } else if ($scope.absUrl.includes($scope.currentWord1)) {
          $window.location.href =$scope.absUrl;
        } else if ($scope.absUrl.includes($scope.currentWord2)) {
          $window.location.href =$scope.absUrl;
        } else {
          $location.path('/');
        }

    } //else ends
    /*=====  End of Check whether localstorage is already available or not  ======*/

    /*============================
    =            Back            =
    ============================*/
    $scope.go_back = function() { 
        window.history.back();
    };
    /*=====  End of Back  ======*/

    /*==============================
    =            Toggle            =
    ==============================*/    
    $scope.state = false;
    $scope.toggleState = function() {
      ////console.log("toggleState");
        $scope.state = !$scope.state;
    };
    /*=====  End of Toggle  ======*/
  
    /*======================================
    =            Login Function            =
    ======================================*/
    $scope.login = function(user) {
     
     /*======================================
     =            Dashboard Init            =
     ======================================*/
     $scope.funnelReport = false;
     $scope.collectionRevenueDue = false;
     $scope.leadConversion = false;
     $scope.paymentCollections = false;
     $scope.salesActivity = false;
     $scope.clientActivity = false;
     $scope.totalLeads = false;
     /*=====  End of Dashboard Init  ======*/

     $http.post(baseUrlSrvc.baseUrl + 'userlogin', user)
        .success(function(data, status, headers, config) {
           $scope.PostDataResponse = data;

           if ($scope.PostDataResponse.roleName == 'Teacher System Admin') {
              alert("Teacher login is not available.");
              $location.path('#/');
              $sessionStorage.userData1 ="";
           } else {
            
           // if starts
           if ($scope.PostDataResponse[0].listUser.code == 1) {
              $sessionStorage.userData1 = $scope.PostDataResponse;
              $sessionStorage.cRoleId = $sessionStorage.userData1[0].listUser.listuserrole[0].adRoleId;

              /*=========================================
              =            Localstorage Data            =
              =========================================*/
              $sessionStorage.createdby = $sessionStorage.userData1[0].listUser.adUserId;
              $sessionStorage.adUserId = $sessionStorage.userData1[0].listUser.adUserId;
              $sessionStorage.updatedby = $sessionStorage.userData1[0].listUser.adUserId;
              $sessionStorage.inInstituteId = $sessionStorage.userData1[0].listUser.inInstituteId;
              $sessionStorage.username = $sessionStorage.userData1[0].listUser.username;
              
              $sessionStorage.bBranchId = $sessionStorage.userData1[0].listUser.listuserrole[0].listBranch[0].bBranchId;  
              $sessionStorage.branchname = $sessionStorage.userData1[0].listUser.listuserrole[0].listBranch[0].branchname;  
              

                $scope.listUserRole = $scope.PostDataResponse[0].listUser.listuserrole;
                $scope.RoleNames = $scope.listUserRole;

                $scope.listUserWidget = $scope.PostDataResponse[0].listUser.listuserrole[0].listWidget;
               
                /*===============================================
                =            Check Available Widgets            =
                ===============================================*/
                for(var k=0;k<$scope.listUserWidget.length;k++) {

                  if ($scope.listUserWidget[k].widgetName == 'Funnel Report') {
                    $scope.funnelReport = true;
                  }
                  
                  if ($scope.listUserWidget[k].widgetName == 'Collection Revenue Due') {
                    $scope.collectionRevenueDue = true;
                  }

                  if ($scope.listUserWidget[k].widgetName == 'Sales Activity') {
                    $scope.salesActivity = true;
                  }

                  if ($scope.listUserWidget[k].widgetName == 'Total Leads') {
                    $scope.totalLeads = true;
                  }

                  if ($scope.listUserWidget[k].widgetName == 'Client Activity') {
                    $scope.clientActivity = true;
                  }

                  if ($scope.listUserWidget[k].widgetName == 'Payment Collections') {
                    $scope.paymentCollections = true;
                  }

                  if ($scope.listUserWidget[k].widgetName == 'Lead Conversion') {
                    $scope.leadConversion = true;
                  }

                } //for ends
                /*=====  End of Check Available Widgets  ======*/

                $scope.currentRoleId = $sessionStorage.cRoleId;

                /*===================================================
                =            Check Role Executive or Not            =
                ===================================================*/
                var roleListUrl = baseUrlSrvc.baseUrl + 'listRoleById/' + $sessionStorage.cRoleId;
                var promiseRoleGet = CRUD_SERVICE.getAllData(roleListUrl);
                promiseRoleGet.then(function(pl) {
                    $scope.userCurrentR1 = pl.data;
                    $scope.userCurrentR = $scope.userCurrentR1[0];
                    //console.log("$scope.userCurrentR",$scope.userCurrentR);
                    if($scope.userCurrentR.isexecutive == 'Yes') {
                      $scope.fullAccess = false;
                      $sessionStorage.Access = $scope.fullAccess;
                      $scope.adminUser = false;
                      //console.log("No fullAccess");
                    }
                    if($scope.userCurrentR.roleName == 'Admin' || $scope.userCurrentR.roleName == 'ITP Admin') {
                      $scope.fullAccess = true;
                      $scope.adminUser = true;
                      $sessionStorage.Access = $scope.fullAccess;
                      //console.log("Yes fullAccess");
                    }
                    if($scope.userCurrentR.isexecutive == 'No') {
                      $scope.fullAccess = true;
                      $scope.adminUser = false;
                      $sessionStorage.Access = $scope.fullAccess;
                      //console.log("Yes fullAccess");
                    }
                    //console.log("$scope.userCurrentRole",$scope.userCurrentR);
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
                /*=====  End of Check Role Executive or Not  ======*/
                
                /*==========================================
                =            Assign Window Menu            =
                ==========================================*/
                $scope.User_Role = $scope.PostDataResponse[0].listUser.listuserrole;
                ////console.log("$scope.User_Role",$scope.User_Role);
                for (var i = 0; i < $scope.User_Role.length; i++) {

                    if ($scope.User_Role[i].adRoleId == $scope.currentRoleId) {

                      $scope.User_Role1 = $scope.User_Role[i];
                      ////console.log("$scope.User_Role1",$scope.User_Role1);

                       $scope.userCurrentBranch = $scope.User_Role1.listBranch;
                    }

                }
                /*=====  End of Assign Window Menu  ======*/
                $sessionStorage.currRole = $sessionStorage.userData1[0].listUser.listuserrole[0].roleName;
              $scope.role = $sessionStorage.currRole;
              //console.log("$scope.role",$scope.role);

              /*================================================
              =            Check Available Branches            =
              ================================================*/
              if ($scope.role == 'Admin' || $scope.role == 'System Admin') {

                ////console.log("Admin Login");
                var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
                var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
                promiseBranchGet.then(function(pl) {
                    $scope.currentRoleBranches1 = pl.data;
                    $sessionStorage.bBranchId = $scope.currentRoleBranches1[0].bBranchId;
                    $sessionStorage.branchname = $scope.currentRoleBranches1[0].branchname;
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });

              } else {

                ////console.log("Not Admin Login");
                $scope.currentRoleBranches1 = $scope.User_Role1.listBranch;
                $sessionStorage.currBranch = $scope.currentRoleBranches1;

              }
              /*=====  End of Check Available Branches  ======*/

              // Response Messages
              $scope.SuccessMessage = '<strong>Success!</strong> Your message has been sent successfully.';
              $scope.InfoMessage = '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.';
              $scope.WarningMessage = '<strong>Warning!</strong> Better check yourself, you\'re not looking too good.';
              $scope.DangerMessage = '<strong>Error!</strong> A problem has been occurred while submitting your data.';
              // Response Messages

              //$http.get(baseUrlSrvc.baseUrl + 'listMenuRoleWindowByUserId/' + $scope.PostDataResponse[0].listUser.adUserId)
                // .success(function(data, status, headers, config) {
                  $scope.menuArr = [];
                  $scope.menuArr = $scope.PostDataResponse[0].listUser.listuserrole[0].listWindows;
                  $scope.PostDataMenuResponse = $scope.menuArr;

                    ////console.log("$scope.PostDataMenuResponse",$scope.PostDataMenuResponse);

                    /*==========================================
                    =            Assign Menu Window            =
                    ==========================================*/
                    var lookup = {};
                    
                    var items = $scope.PostDataMenuResponse;
                    //////console.log("items",items);
                    var result = [];

                    for (var item, i = 0; item = items[i++];) {
                      //////console.log("for loop");
                       var menuName = item.menuName;
                       //////console.log("menuName",menuName);
                       var adMenuId = item.adMenuId;
                       //////console.log("adMenuId",adMenuId);

                       if (!(menuName in lookup) && !(adMenuId in lookup)) {
                          lookup[menuName] = 1;
                          lookup[adMenuId] = 1;
                          $scope.win = $filter('filter')(items, {
                             "adMenuId": adMenuId
                          });
                          result.push({
                             "menuName": menuName,
                             "adMenuId": adMenuId,
                             "window": $scope.win
                          });

                       }
                    }
                    /*=====  End of Assign Menu Window  ======*/

                    $scope.menuData = result;
                    //console.log("$scope.menuData",$scope.menuData);

                    
                    

                     $location.path('/dashboard');
                 // })
                 // .error(function(data, status, header, config) {
                 //    $scope.ResponseDetails = "Data: " + data +
                 //       "<hr />status: " + status +
                 //       "<hr />headers: " + header +
                 //       "<hr />config: " + config;
                 // });
                 //http get ends


                 $scope.invalidCred = false;
           } else {
            $scope.invalidCred = true;
           }

           // if ends
          }//else ends
        })
        .error(function(data, status, header, config) {
           $scope.ResponseDetails = "Data: " + data +
              "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
        });
  };
  /*=====  End of Login Function  ======*/

  /*============================================
  =            Change Role on Click            =
  ============================================*/
  

  $scope.roleChange = function(id) {

    $scope.listUserRole = $sessionStorage.userData1[0].listUser.listuserrole;
    //console.log("$scope.listUserRole",$scope.listUserRole);
    $scope.RoleNames = $scope.listUserRole;

    $scope.currentRoleId = id;

    $sessionStorage.cRoleId = id;

    /*======================================
     =            Dashboard Init            =
     ======================================*/
     $scope.funnelReport = false;
     $scope.collectionRevenueDue = false;
     $scope.leadConversion = false;
     $scope.paymentCollections = false;
     $scope.salesActivity = false;
     $scope.clientActivity = false;
     $scope.totalLeads = false;
     /*=====  End of Dashboard Init  ======*/

    /*===================================================
    =            Check Role Executive or Not            =
    ===================================================*/
    var roleListUrl = baseUrlSrvc.baseUrl + 'listRoleById/' + $sessionStorage.cRoleId;
    var promiseRoleGet = CRUD_SERVICE.getAllData(roleListUrl);
    promiseRoleGet.then(function(pl) {
        $scope.userCurrentR1 = pl.data;
        $scope.userCurrentR = $scope.userCurrentR1[0];
        if($scope.userCurrentR.isexecutive == 'Yes') {
          $scope.fullAccess = false;
          $scope.adminUser = false;
          $sessionStorage.Access = $scope.fullAccess;
          //console.log("No fullAccess");

        }
        if($scope.userCurrentR.roleName == 'Admin' || $scope.userCurrentR.roleName == 'ITP Admin') {
          $scope.fullAccess = true;
          $scope.adminUser = true;
          $sessionStorage.Access = $scope.fullAccess;
          //console.log("Yes fullAccess");
        }
        if($scope.userCurrentR.isexecutive == 'No') {
          $scope.fullAccess = true;
          $scope.adminUser = false;
          $sessionStorage.Access = $scope.fullAccess;
          //console.log("Yes fullAccess");
        }
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of Check Role Executive or Not  ======*/

    $scope.User_Role = $sessionStorage.userData1[0].listUser.listuserrole;
    //console.log("$scope.User_Role",$scope.User_Role.length);


    for (var i = 0; i < $scope.User_Role.length; i++) {

        if ($scope.User_Role[i].adRoleId == id) {

          $scope.User_Role1 = $scope.User_Role[i]; //particular role data
          ////console.log("$scope.User_Role1",$scope.User_Role1);

          /*===============================================
          =            Check Available Widgets            =
          ===============================================*/
          for(var k=0;k<$scope.User_Role1.listWidget.length;k++) {

            if ($scope.User_Role1.listWidget[k].widgetName == 'Funnel Report') {
              $scope.funnelReport = true;
            }
            
            if ($scope.User_Role1.listWidget[k].widgetName == 'Collection Revenue Due') {
              $scope.collectionRevenueDue = true;
            }

            if ($scope.User_Role1.listWidget[k].widgetName == 'Sales Activity') {
              $scope.salesActivity = true;
            }

            if ($scope.User_Role1.listWidget[k].widgetName == 'Total Leads') {
              $scope.totalLeads = true;
            }

            if ($scope.User_Role1.listWidget[k].widgetName == 'Client Activity') {
              $scope.clientActivity = true;
            }

            if ($scope.User_Role1.listWidget[k].widgetName == 'Payment Collections') {
              $scope.paymentCollections = true;
            }

            if ($scope.User_Role1.listWidget[k].widgetName == 'Lead Conversion') {
              $scope.leadConversion = true;
            }

          } //for ends
          /*=====  End of Check Available Widgets  ======*/

          /*================================================
          =            Check Available Branches            =
          ================================================*/
          if ($scope.role == 'Admin' || $scope.role == 'System Admin') {

            //console.log("Admin Login");
            var BranchListUrl = baseUrlSrvc.baseUrl + 'listBranch';
            var promiseBranchGet = CRUD_SERVICE.getAllData(BranchListUrl);
            promiseBranchGet.then(function(pl) {
                $scope.currentRoleBranches1 = pl.data;
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

          } else {

            //console.log("Not Admin Login");
            $sessionStorage.currBranch = $scope.User_Role1.listBranch;
            $scope.currentRoleBranches1 = $sessionStorage.currBranch;

          }

          /*=====  End of Check Available Branches  ======*/

          $scope.userCurrentBranch = $scope.User_Role1.listBranch;

          //console.log("$scope.userCurrentBranch",$scope.userCurrentBranch);

          $sessionStorage.bBranchId = $scope.User_Role1.listBranch[0].bBranchId;
          $sessionStorage.branchname = $scope.User_Role1.listBranch[0].branchname;
          $sessionStorage.currRole = $scope.User_Role1.roleName;
          $scope.role = $sessionStorage.currRole;
          //console.log("Role",$scope.role);

          /*==========================================
          =            Assign Menu Window            =
          ==========================================*/
          var lookup = {};
    
          var items = [];
          items = $scope.User_Role1.listWindows;
          //console.log("items",items);
          var result = [];

          for (var item, i = 0; item = items[i++];) {
            ////console.log("for loop");
             var menuName = item.menuName;
             ////console.log("menuName",menuName);
             var adMenuId = item.adMenuId;
             ////console.log("roleName",item.roleName);

             if (!(menuName in lookup) && !(adMenuId in lookup)) {
                lookup[menuName] = 1;
                lookup[adMenuId] = 1;
                $scope.win = $filter('filter')(items, {
                   "adMenuId": adMenuId
                });
                result.push({
                   "menuName": menuName,
                   "adMenuId": adMenuId,
                   "window": $scope.win
                });

             }
             //console.log("result",result);
          } //for ends

        }
        $scope.menuData = result;
        //console.log("$scope.menuData",$scope.menuData);

    }
  }
  /*=====  End of Change Role on Click  ======*/

  /*========================================
  =            Toaster Messages            =
  ========================================*/
  $scope.toasterAddedSuccess = "Added Successfully";
  $scope.toasterDeletedSuccess = "Deleted Successfully";
  $scope.toasterUpdatedSuccess = "Updated Successfully";
  $scope.toasterAddedError = "Error In Adding Record";
  $scope.toasterDeletedError = "Error In Deleting Record";
  $scope.toasterUpdatedError = "Error In Updating Record";
  $scope.toasterAddedDuplicate = "Error! Record Already Exists";
  /*=====  End of Toaster Messages  ======*/
  
  /*======================================
  =            Menu Bar Click            =
  ======================================*/
  $scope.menuClick=function(name,id)
  {
    $scope.windowName=name;
  }
  /*=====  End of Menu Bar Click  ======*/
  
  /*==============================
  =            Logout            =
  ==============================*/
  $scope.logout=function()
  {
    $location.path('#/');
    $sessionStorage.userData1 ="";
    $sessionStorage.cRoleId ="";
    $sessionStorage.createdby ="";
    $sessionStorage.updatedby ="";
    $sessionStorage.inInstituteId ="";
    $sessionStorage.bBranchId ="";
    $sessionStorage.adUserId ="";
    $sessionStorage.currBranch ="";
    $sessionStorage.Access ="";
    $sessionStorage.batchName ="";
    $sessionStorage.cCourseId ="";
    $sessionStorage.courseName ="";
    $sessionStorage.currRole ="";
    $sessionStorage.username ="";
    $sessionStorage.branchname ="";
  }
  /*=====  End of Logout  ======*/

  /*=======================================
  =            Forgot Password            =
  =======================================*/
  $scope.forgotPassword=function()
  {
    $location.path('#/forgotpassword/0');
  }
  /*=====  End of Forgot Password  ======*/

});
/*=====  End of App Ctrl  ======*/

}());
/*=====  End of App JS  ======*/
