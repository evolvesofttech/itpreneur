/*==================================
=            Controller            =
==================================*/
//console.log('begin')
  angular.module('theGuru')
   .controller('dashboardCtrl', function($scope,$log,$location,$http,CRUD_SERVICE,
    baseUrlSrvc,$filter,ngTableParams,ngTableDataService,$route,hideHeader,
    $sessionStorage,$log,$timeout, $window, toaster) {

    $scope.hideheader1 =hideHeader.getHeader();
    $window.document.title = "ITPreneur - Dashboard";
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
    $timeout(function() {
           $scope.$apply(function () {


     if (!$scope.fullAccess) {
      $scope.selID = $sessionStorage.bBranchId;
     }
     if ($scope.fullAccess && $scope.role != 'Admin') {
      $scope.selID = $sessionStorage.bBranchId;
     }
     if ($scope.role == 'Admin') {
      $scope.selID = $sessionStorage.bBranchId;
     }


    $scope.branchChangeFunction = function(id, name) {
      console.log(name);
      $scope.selID = id;


      /*======================================
      =            For Executives            =
      ======================================*/
      if (!$scope.fullAccess) {

        //Funnel Pie chart
        if ($scope.funnelReport || $scope.collectionRevenueDue) {
          var dashListUrl = baseUrlSrvc.baseUrl + 'listDashboardByadUserId/' + $sessionStorage.adUserId + '/' + id;
          GetAllRecords(dashListUrl);
        }

        //Executivewise Lead/Conversion
        if ($scope.leadConversion) {
          var ExecutiveList = baseUrlSrvc.baseUrl + 'listExecutivewiseLeadConversionByadUserId/' + $sessionStorage.adUserId + '/' + id;
          GetAllExecutiveRecords(ExecutiveList);
        }

        //Payment Collections
        if ($scope.paymentCollections) {
          var PaymentList = baseUrlSrvc.baseUrl + 'listStudentPaymentDashboardByadUserId/' + $sessionStorage.adUserId + '/' + id;
          GetAllPaymentRecords(PaymentList);
        }

        //sales activity
        if ($scope.salesActivity) {
          var ActivityList = baseUrlSrvc.baseUrl + 'listActivityDashboardByadUserId/' + $sessionStorage.adUserId + '/' + id;
          GetAllActivityRecords(ActivityList);
        }

        //placement activity
        if ($scope.clientActivity) {
          var placementactivityurl = baseUrlSrvc.baseUrl + 'listActivityPlacementbyadUserId/' + $sessionStorage.adUserId + '/' + id;
          GetAllPlacementActivityRecords(placementactivityurl);
        }

        //sales exe leads
        if ($scope.totalLeads) {
          var leadList = baseUrlSrvc.baseUrl + 'listSalesExecutiveLeadsbyadUserId/' + $sessionStorage.adUserId + '/' + id;
          GetAllLeadRecords(leadList);
        }

      }
      /*=====  End of For Executives  ======*/

      /*===========================================
      =            For Admin and Owner            =
      ===========================================*/
      if ($scope.fullAccess) {

        $sessionStorage.bBranchId = id;
        $sessionStorage.branchname = name;

        //funnel and pie chart
        if ($scope.funnelReport || $scope.collectionRevenueDue) {
          var dashListUrl = baseUrlSrvc.baseUrl + 'listDashboardByBranchId/' + id;
          GetAllRecords(dashListUrl);
        }

        //Lead conversion
        if ($scope.leadConversion) {
          var ExecutiveList = baseUrlSrvc.baseUrl + 'listExecutivewiseLeadConversionByBranchId/' + id;
          GetAllExecutiveRecords(ExecutiveList);
        }

        //sales activity dashboard
        if ($scope.salesActivity) {
          var ActivityList = baseUrlSrvc.baseUrl + 'listActivityDashboardByBranchId/' + id;
          GetAllActivityRecords(ActivityList);
        }

        //Placement activity
        if ($scope.clientActivity) {
          var placementactivityurl = baseUrlSrvc.baseUrl + 'listActivityPlacementDashboardByBranchId/' + id;
          GetAllPlacementActivityRecords(placementactivityurl);
        }

        //sales executive leads
        if ($scope.totalLeads) {
          var leadList = baseUrlSrvc.baseUrl + 'listSalesExecutiveLeadsByBranchId/' + id;
          GetAllLeadRecords(leadList);
        }

        //student payment
        if ($scope.paymentCollections) {
          var PaymentList = baseUrlSrvc.baseUrl + 'listStudentPaymentDashboardByBranchId/' + id;
          GetAllPaymentRecords(PaymentList);
        }
      }
      /*=====  End of For Admin and Owner  ======*/

      toaster.success({title: "Success", body:"Changed Branch to - " + name,tapToDismiss: true,showCloseButton: true});

    }    

    $scope.branchChangeFunctionAdmin = function(id, name) {
      //console.log(id);
      $scope.selID = id;
      $sessionStorage.bBranchId = id;
      $sessionStorage.branchname = name;
      toaster.success({title: "Success", body:"Changed Branch to - " + name,tapToDismiss: true,showCloseButton: true});

    }


    /*==========================================
    =            Get Dashboard List            =
    ==========================================*/
    if ($scope.funnelReport || $scope.collectionRevenueDue) {
      if ($scope.role == 'Admin') {
        var dashListUrl = baseUrlSrvc.baseUrl + 'listAdminDashboard';
        GetAllRecords(dashListUrl);
      }

       if ($scope.fullAccess && $scope.role != 'Admin') {
          var dashListUrl = baseUrlSrvc.baseUrl + 'listDashboardByBranchId/' + $scope.selID;
           //console.log("dashListUrl",dashListUrl);
           GetAllRecords(dashListUrl);

       } 
       if (!$scope.fullAccess) {
           var dashListUrl = baseUrlSrvc.baseUrl + 'listDashboardByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.bBranchId;
           //console.log("dashListUrl1",dashListUrl);
           GetAllRecords(dashListUrl);
       }
     }

      function GetAllRecords(url) {
            $scope.totalArray = [];
            var promiseDashGet = CRUD_SERVICE.getAllData(url);
            promiseDashGet.then(function(pl) {
            $scope.Dashboard = pl.data;
            //console.log("Dashboard",$scope.Dashboard);
            $scope.total = $scope.Dashboard[0].listDashborad;
            $scope.totalArray.push($scope.total);
            //console.log("total",$scope.total);

            /*========================================
            =            Total Lead            =
            ========================================*/
            $scope.totalLead = $scope.total[0].lead;
            ////console.log("totalLead",$scope.totalLead);
            /*=====  Total Lead  ======*/

            /*=====================================
            =            Total Enquiry            =
            =====================================*/
            $scope.totalEnquiry = $scope.total[0].Enquiry;
            /*=====  End of Total Enquiry  ======*/
            
            /*======================================
            =            Total Application            =
            ======================================*/
            $scope.totalApplication = $scope.total[0].Application;
            ////console.log("totalApplication",$scope.totalApplication);
            /*=====  End of Total Application   ======*/

            /*======================================
            =            Total Admission            =
            ======================================*/
            $scope.totalAdmission = $scope.total[0].Admission;
            /*=====  End of Total Admission  ======*/
            
            /*======================================
            =            Due            =
            ======================================*/
            $scope.due = $scope.total[0].Due;
            //console.log("due",$scope.due);
            /*=====  End of Due  ======*/

            /*======================================
            =            Due            =
            ======================================*/
            $scope.Collection = $scope.total[0].Collection;
            //console.log("Collection",$scope.Collection);
            /*=====  End of Due  ======*/

            /*======================================
            =            Due            =
            ======================================*/
            $scope.Revenue = $scope.total[0].Revenue;
            //console.log("Revenue",$scope.Revenue);
            /*=====  End of Due  ======*/
           
            /*====================================
            =           Funnel Chart            =
            ====================================*/
            var chart = AmCharts.makeChart( "chartdiv", {
              "type": "funnel",
              "theme": "light",
              "fontSize": "14",
              "startEffect":"easeOutSine",
              "dataProvider": [ {
                "title": "Lead",
                "value": $scope.totalLead,
              }, {
                "title": "Enquiry",
                "value": $scope.totalEnquiry,
              }, {
                "title": "Application",
                "value": $scope.totalApplication,
              }, {
                "title": "Admission",
                "value": $scope.totalAdmission,
              },
             ],
              "balloon": {
                "fixedPosition": true
              },
              "valueField": "value",
              "titleField": "title",
              "marginRight": 150,
              "marginLeft": 100,
              "startX": -500,
              "depth3D": 100,
              "angle": 40,
              "outlineAlpha": 1,
              "outlineColor": "#FFFFFF",
              "outlineThickness": 2,
              "labelPosition": "right",
              "balloonText": "[[title]]: [[value]]",
              "export": {
                "enabled": true
              }
            } );

            /*=====  End of Funnel Chart  ======*/

            /*=================================
            =            Bar Chart            =
            =================================*/
            var chart1 = AmCharts.makeChart("chartdiv1",
            {
                "type": "serial",
                "theme": "light",
                "depth3D": 20,
                "angle": 30,  
                "dataProvider": [{
                    "name": "Revenue",
                    "points": $scope.Revenue,
                    "color": "#FFD600"
                    // "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
                },{
                    "name": "Collection",
                    "points": $scope.Collection,
                    "color": "#8BC34A"
                    // "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
                },  {
                    "name": "Due",
                    "points": $scope.due,
                    "color": "#D32F2F"
                    // "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
                }],
                "valueAxes": [{
                    "maximum": $scope.Revenue,
                    "minimum": 0,
                    "axisAlpha": 0,
                    "dashLength": 4,
                    "position": "left",
                    "title":"Amount in Thousand, INR"
                }],
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "<span style='font-size:13px;'>[[category]]: <b>[[value]] K</b></span>",
                    "bulletOffset": 10,
                    "bulletSize": 52,
                    "colorField": "color",
                    "cornerRadiusTop": 8,
                    "customBulletField": "bullet",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0,
                    "type": "column",
                    "valueField": "points"
                }],
                "marginTop": 50,
                "marginRight": 0,
                "marginLeft": 0,
                "marginBottom": 0,
                "autoMargins": true,
                "categoryField": "name",
                "categoryAxis": {
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "inside": true,
                    "tickLength": 0
                },
                "export": {
                  "enabled": true
                 }
            });
            /*=====  End of Bar Chart  ======*/
            
            
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
    }
    /*=====  End of Get Dashboard List  ======*/

   

    /*======================================
    =            Get List Executivewise Lead/Conversion            =
    ======================================*/
    if ($scope.leadConversion) {
      if ($scope.role == 'Admin') {
          var ExecutiveList = baseUrlSrvc.baseUrl + 'listExecutivewiseLeadConversion';
           GetAllExecutiveRecords(ExecutiveList);
        }

       if ($scope.fullAccess && $scope.role != 'Admin') {
          var ExecutiveList = baseUrlSrvc.baseUrl + 'listExecutivewiseLeadConversionByBranchId/' + $scope.selID;
           //console.log("ExecutiveList",ExecutiveList);
           GetAllExecutiveRecords(ExecutiveList);
       } 
       if (!$scope.fullAccess) {
          var ExecutiveList = baseUrlSrvc.baseUrl + 'listExecutivewiseLeadConversionByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.bBranchId;
          //console.log("ExecutiveList1",ExecutiveList);
          GetAllExecutiveRecords(ExecutiveList);
       }
    }

    //To Get All Records
    function GetAllExecutiveRecords(url) {
        $scope.ExecutiveArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Executive = pl.data;
                //console.log("$scope.Executive",$scope.Executive);
                
                $scope.Executive_data = $scope.Executive[0].listExecutivewiseLeadConversion;
                $scope.ExecutiveArray.push($scope.Executive_data);
                //console.log("$scope.Executive_data",$scope.Executive_data);

                $scope.usersTable_Executive = new ngTableParams({
                    page: 1,
                    count: 5
                }, {

                   total: $scope.Executive_data.length, 
                    getData: function ($defer, params) {
                        if (params.settings().$scope == null) {
                          params.settings().$scope = $scope;
                        }
                    
                        $scope.data_Executive = params.sorting() ? $filter('orderBy')($scope.ExecutiveArray[0], params.orderBy()) : $scope.ExecutiveArray[0];
                        $scope.data_Executive = params.filter() ? $filter('filter')($scope.data_Executive, params.filter()) : $scope.data_Executive;
                       $scope.data_Executive = $scope.data_Executive.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Executive)
                    }
                });
                $scope.usersTable_Executive.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get Executivewise Lead/Conversion  ======*/


    /*======================================
    =            Get List Activity Report            =
    ======================================*/
    if ($scope.salesActivity) {
      if ($scope.role == 'Admin') {
        var ActivityList = baseUrlSrvc.baseUrl + 'listActivityDashboard';
             //console.log("ActivityList",ActivityList);
             GetAllActivityRecords(ActivityList);
      }

      if ($scope.fullAccess && $scope.role != 'Admin') {
            var ActivityList = baseUrlSrvc.baseUrl + 'listActivityDashboardByBranchId/' + $scope.selID;
             //console.log("ActivityList",ActivityList);
             GetAllActivityRecords(ActivityList);
         } 
      if (!$scope.fullAccess) {
            var ActivityList = baseUrlSrvc.baseUrl + 'listActivityDashboardByadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.bBranchId;
            //console.log("ActivityList1",ActivityList);
            GetAllActivityRecords(ActivityList);
        }
      }
    

    //To Get All Records
    function GetAllActivityRecords(url) {
        $scope.ActivityArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Activity = pl.data;
                //console.log("$scope.Activity",$scope.Activity);
                
                $scope.Activity_data = $scope.Activity[0].listActivity;
                $scope.ActivityArray.push($scope.Activity_data);
                //console.log("$scope.Activity_data",$scope.Activity_data);

                $scope.usersTable_Activity = new ngTableParams({
                    page: 1,
                    count: 5
                }, {
                   total: $scope.Activity_data.length, 
                    getData: function ($defer, params) {
                      if (params.settings().$scope == null) {
                             params.settings().$scope = $scope;
                       }
                    
                        $scope.data_Activity = params.sorting() ? $filter('orderBy')($scope.ActivityArray[0], params.orderBy()) : $scope.ActivityArray[0];
                        $scope.data_Activity = params.filter() ? $filter('filter')($scope.data_Activity, params.filter()) : $scope.data_Activity;
                       $scope.data_Activity = $scope.data_Activity.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_Activity)
                    }
                });
                $scope.usersTable_Activity.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get Activity Report   ======*/

    /*==========================================
    =            Placement Activity            =
    ==========================================*/
    if ($scope.clientActivity) {
      if ($scope.role == 'Admin') {
        var placementactivityurl = baseUrlSrvc.baseUrl + 'listActivityPlacementDashboard';
         //console.log("placementactivityurl",placementactivityurl);
         GetAllPlacementActivityRecords(placementactivityurl);
      }

      if ($scope.fullAccess && $scope.role != 'Admin') {
            var placementactivityurl = baseUrlSrvc.baseUrl + 'listActivityPlacementDashboardByBranchId/' + $scope.selID;
             //console.log("placementactivityurl",placementactivityurl);
             GetAllPlacementActivityRecords(placementactivityurl);
         } 
       if (!$scope.fullAccess) {
            var placementactivityurl = baseUrlSrvc.baseUrl + 'listActivityPlacementbyadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.bBranchId;
            //console.log("placementactivityurl1",placementactivityurl);
            GetAllPlacementActivityRecords(placementactivityurl);
        }
    }
    

    //To Get All Records
    function GetAllPlacementActivityRecords(url) {
        $scope.PlacementActivityArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.PlacementActivity = pl.data;
                //console.log("$scope.PlacementActivity",$scope.PlacementActivity);
                
                $scope.PlacementActivity_data = $scope.PlacementActivity[0].listActivityPlacement;
                $scope.PlacementActivityArray.push($scope.PlacementActivity_data);
                //console.log("$scope.PlacementActivity_data",$scope.PlacementActivity_data);

                $scope.usersTable_PlacementActivity = new ngTableParams({
                    page: 1,
                    count: 5
                }, {
                   total: $scope.PlacementActivity_data.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                             params.settings().$scope = $scope;
                       }
                    
                        $scope.data_PlacementActivity = params.sorting() ? $filter('orderBy')($scope.PlacementActivityArray[0], params.orderBy()) : $scope.PlacementActivityArray[0];
                        $scope.data_PlacementActivity = params.filter() ? $filter('filter')($scope.data_PlacementActivity, params.filter()) : $scope.data_PlacementActivity;
                       $scope.data_PlacementActivity = $scope.data_PlacementActivity.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_PlacementActivity)
                    }
                });
                $scope.usersTable_PlacementActivity.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    
    /*=====  End of Placement Activity  ======*/
    


    /*======================================
    =            Get List Total Leads            =
    ======================================*/
    if ($scope.totalLeads) {
      if ($scope.role == 'Admin') {
        var leadList = baseUrlSrvc.baseUrl + 'listSalesExecutiveLeads';
             //console.log("leadList",leadList);
             GetAllLeadRecords(leadList);
      }

      if ($scope.fullAccess && $scope.role != 'Admin') {
            var leadList = baseUrlSrvc.baseUrl + 'listSalesExecutiveLeadsByBranchId/' + $scope.selID;
             //console.log("leadList",leadList);
             GetAllLeadRecords(leadList);
         } 
      if (!$scope.fullAccess){
            var leadList = baseUrlSrvc.baseUrl + 'listSalesExecutiveLeadsbyadUserId/' + $sessionStorage.adUserId + '/' + $sessionStorage.bBranchId;
            //console.log("leadList1",leadList);
            GetAllLeadRecords(leadList);
        }
    }
    

    //To Get All Records
    function GetAllLeadRecords(url) {
        $scope.leadArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.lead = pl.data;
                //console.log("$scope.lead",$scope.lead);
                
                $scope.lead_data = $scope.lead[0].listSalesExecutiveLeads;
                $scope.leadArray.push($scope.lead_data);
                //console.log("$scope.lead_data",$scope.lead_data);

                $scope.usersTable_lead = new ngTableParams({
                    page: 1,
                    count: 5
                }, {
                   total: $scope.lead_data.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                             params.settings().$scope = $scope;
                       }
                    
                        $scope.data_lead = params.sorting() ? $filter('orderBy')($scope.leadArray[0], params.orderBy()) : $scope.leadArray[0];
                        $scope.data_lead = params.filter() ? $filter('filter')($scope.data_lead, params.filter()) : $scope.data_lead;
                       $scope.data_lead = $scope.data_lead.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_lead)
                    }
                });
                $scope.usersTable_lead.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List Total Leads ======*/


    /*======================================
    =            Get List Payment Collections            =
    ======================================*/
    if ($scope.paymentCollections) {
      if ($scope.role == 'Admin') {
        var PaymentList = baseUrlSrvc.baseUrl + 'listStudentPaymentDashboard';
             //console.log("PaymentList",PaymentList);
             GetAllPaymentRecords(PaymentList);
      }

      if ($scope.fullAccess && $scope.role != 'Admin') {
            var PaymentList = baseUrlSrvc.baseUrl + 'listStudentPaymentDashboardByBranchId/' + $scope.selID;
             //console.log("PaymentList",PaymentList);
             GetAllPaymentRecords(PaymentList);
         } 
      if (!$scope.fullAccess) {
            var PaymentList = baseUrlSrvc.baseUrl + 'listStudentPaymentDashboardByadUserId/' + $sessionStorage.adUserId +'/' + $sessionStorage.adUserId;
            //console.log("PaymentList1",PaymentList);
            GetAllPaymentRecords(PaymentList);
      }
    }
    

    //To Get All Records
    function GetAllPaymentRecords(url) {
        $scope.PaymentArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Payment = pl.data;
                //console.log("$scope.Payment",$scope.Payment);
                
                $scope.Payment_data = $scope.Payment[0].listStudentPayment;
                $scope.PaymentArray.push($scope.Payment_data);
                //console.log("$scope.Payment_data",$scope.Payment_data);

                $scope.usersTable_Payment = new ngTableParams({
                    page: 1,
                    count: 5
                }, {
                   total: $scope.Payment_data.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                             params.settings().$scope = $scope;
                       }
                    
                        $scope.data_payment = params.sorting() ? $filter('orderBy')($scope.PaymentArray[0], params.orderBy()) : $scope.PaymentArray[0];
                        $scope.data_payment = params.filter() ? $filter('filter')($scope.data_payment, params.filter()) : $scope.data_payment;
                       $scope.data_payment = $scope.data_payment.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_payment)
                    }
                });
                $scope.usersTable_Payment.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of Get List Payment Collections  ======*/
    });
  },2000);

});
/*=====  End of Controller  ======*/
