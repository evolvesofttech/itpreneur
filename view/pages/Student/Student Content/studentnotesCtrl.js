/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("studentnotesCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window,$sce) {
    //console.log("branch");
    $scope.NotesArray = [];
    $scope.NotesTopicArray = [];
    $scope.CourseId = $routeParams.ID;
    $scope.TechnoId = $routeParams.ID1;
    $scope.TopicId = $routeParams.ID2;

    $window.document.title = "ITPreneur - Notes";

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

    

    /*======================================
    =            Get List Topic wise Notes            =
    ======================================*/
    //1 Mean New Entry
    var urlList = baseUrlSrvc.baseUrl + 'listNotesByCourseIdTechnologyMasterIdAndTopicId/'+$scope.CourseId +'/'+ $scope.TechnoId+'/'+$scope.TopicId;
    GetAllRecords(urlList);

    //To Get All Records
    function GetAllRecords(url) {
        $scope.NotesTopicArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Notes_ab = pl.data;
                for (var i = 0; i < $scope.Notes_ab.length; i++) {
                        if ($scope.Notes_ab[i].cTopicId == $scope.TopicId) {
                            $scope.topicData_View = $scope.Notes_ab[i];
                            //console.log("$scope.topicData_View",$scope.topicData_View);
                        }
                    }
                $scope.NotesTopicArray.push($scope.Notes_ab);
                console.log("$scope.Notes_ab",$scope.Notes_ab);

                $scope.usersTable_notes = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Notes_ab.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data_notes = params.sorting() ? $filter('orderBy')($scope.NotesTopicArray[0], params.orderBy()) : $scope.NotesTopicArray[0];
                        $scope.data_notes = params.filter() ? $filter('filter')($scope.data_notes, params.filter()) : $scope.data_notes;
                       $scope.data_notes = $scope.data_notes.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_notes)
                       //console.log("$scope.data_notes11",$scope.data_notes);
                    }
                    
                });
                $scope.usersTable_notes.reload();

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of   Get List Topic wise Notes ======*/
    

    /*======================================
    =            Get List Notes            =
    ======================================*/
    //1 Mean New Entry
    var urlNotesList = baseUrlSrvc.baseUrl + 'listCourseTechnologyAndTopicByadUserId/'+ $sessionStorage.adUserId;
    GetAllNotesRecords(urlNotesList);

    //To Get All Records
    function GetAllNotesRecords(url) {
        $scope.NotesArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Notes_a = pl.data;
                $scope.NotesArray.push($scope.Notes_a);
                console.log("$scope.Notes_a",$scope.Notes_a);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Notes_a.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.NotesArray[0], params.orderBy()) : $scope.NotesArray[0];
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                       $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data)
                    }
                    
                });
                $scope.usersTable.reload();

            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
    /*=====  End of  Get List Notes  ======*/

    /*=========================================
    =            Edit Button Click            =
    =========================================*/
    $scope.ViewNotes = function(data){
        $scope.currentTopicId = data.cTopicId;
        $scope.currentTechnoId = data.cTechnologyMasterId;
        $scope.currentCourseId = data.cCourseId;
        $scope.topicname = data.topicname;
        console.log("$scope.topicname",$scope.topicname);
    }
    
    
    /*=====  End of Edit Button Click  ======*/

    /*=================================
    =            File Show            =
    =================================*/
    $scope.viewFileModal = function(id, data) {

        $scope.temp_viewnote = $filter('filter')(data, { "conNotesId": id });

       $scope.noteViewData_View = $scope.temp_viewnote[0];
       console.log($scope.noteViewData_View);

        $scope.url1 = $scope.noteViewData_View.path;

        $scope.url2 = $scope.url1.replace(/\s/g,"%20");

        $scope.fileExtension = $scope.url2.substr($scope.url2.lastIndexOf(".") + 1);

        $scope.url = $sce.trustAsHtml($scope.url2);

        $scope.NotesDocUrl="https://docs.google.com/gview?url="+$scope.url+"&embedded=true";

     }
    
    
    /*=====  End of File Show  ======*/


          

          

          
    

    

    

    
    
    
    
    
   
    
    
});
/*=====  End of Controller  ======*/
