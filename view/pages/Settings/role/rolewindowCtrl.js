angular.module("theGuru").controller("roleWindowCtrl", 
        function($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter, 
          ngTableParams, $timeout, $route, Flash, $rootScope, $sessionStorage, role_name) {
        //console.log("roleWindowCtrl");
        $scope.OperType = $routeParams.ID;
        $scope.currentRoleName = role_name.getRole_name();
        //console.log($scope.currentRoleName);

        /*============================
        =            Tabs            =
        ============================*/
        this.Inst = 1;

        this.setTab = function(tabId) {
            this.Inst = tabId;
        };

        this.isSet = function(tabId) {
            return this.Inst === tabId;
        };
        /*=====  End of Tabs  ======*/
        

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

        /*============================================
        =            Get List Role Window            =
        ============================================*/
        $scope.roleWindowArray = [];

        //Role Window
        //1 Mean New Entry
        var urlRoleWindowList = baseUrlSrvc.baseUrl + 'listRoleWindowByRoleId/' + $scope.OperType;
        GetAllRoleWindowRecords(urlRoleWindowList);
        //To Get All Records
        function GetAllRoleWindowRecords(url) {
            $scope.roleWindowArray = [];
            var promiseWindowGet = CRUD_SERVICE.getAllData(url);
            promiseWindowGet.then(function(pl) {
                $scope.roleWindow = pl.data;
                $scope.roleWindowArray.push($scope.roleWindow);
                //console.log($scope.roleWindowArray);

                //========================================for pagination ========================
                  $scope.usersTable_roleWindow = new ngTableParams({
                      page: 1,
                      count: 10
                  }, {
                     total: $scope.roleWindow.length, 
                      getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                      
                          $scope.data_roleWindow = params.sorting() ? $filter('orderBy')($scope.roleWindowArray[0], params.orderBy()) : $scope.roleWindowArray[0];
                          $scope.data_roleWindow = params.filter() ? $filter('filter')($scope.data_roleWindow, params.filter()) : $scope.data_roleWindow;
                         $scope.data_roleWindow = $scope.data_roleWindow.slice((params.page() - 1) * params.count(), params.page() * params.count());
                         $defer.resolve($scope.data_roleWindow)
                      }
                  });
                  $scope.usersTable_roleWindow.reload();
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }
        /*=====  End of Get List Role Window  ======*/

        /*===================================
        =            Window List            =
        ===================================*/
        var windowListUrl = baseUrlSrvc.baseUrl + 'listWindow';
        var promiseWindowGet = CRUD_SERVICE.getAllData(windowListUrl);
        promiseWindowGet.then(function(pl) {
                $scope.Window = pl.data;
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
        });
        /*=====  End of Window List  ======*/
        
        

            
});