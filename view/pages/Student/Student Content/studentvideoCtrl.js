/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("studentvideoCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window) {
    //console.log("branch");
    $scope.videoArray = [];
    $scope.CourseId = $routeParams.ID;
    $scope.TechnoId = $routeParams.ID1;
    $scope.TopicId = $routeParams.ID2;
    $window.document.title = "ITPreneur - Video";

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

    var urlTechCourseTopicList = baseUrlSrvc.baseUrl + 'listVideosByCourseIdTechnologyMasterIdAndTopicId/'+$scope.CourseId +'/'+ $scope.TechnoId+'/'+$scope.TopicId;
        var promisetestGet = CRUD_SERVICE.getAllData(urlTechCourseTopicList);
        promisetestGet.then(function(pl) {
            $scope.Video_abc = pl.data;
            for (var i = 0; i < $scope.Video_abc.length; i++) {
                        if ($scope.Video_abc[i].cTopicId == $scope.TopicId) {
                            $scope.topicData_View = $scope.Video_abc[i];
                            //console.log("$scope.topicData_View",$scope.topicData_View);
                        }
                    }
            //console.log("$scope.Video_abc",$scope.Video_abc);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        }); 

    /*=========================================
    =            Edit Button Click            =
    =========================================*/
    $scope.editVideo = function(data){
        $scope.currentTopicId = data.cTopicId;
        $scope.currentTechnoId = data.cTechnologyMasterId;
        $scope.currentCourseId = data.cCourseId;
        $scope.topicname = data.topicname;
        console.log("$scope.topicname",$scope.topicname);
    }
    
    
    /*=====  End of Edit Button Click  ======*/
    
    /*======================================
    =            Get List Video            =
    ======================================*/
    //1 Mean New Entry
    var urlVideoList = baseUrlSrvc.baseUrl + 'listCourseTechnologyAndTopicByadUserId/'+ $sessionStorage.adUserId;
    GetAllVideoRecords(urlVideoList);

    //To Get All Records
    function GetAllVideoRecords(url) {
        $scope.videoArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.Video_a = pl.data;
                
                $scope.videoArray.push($scope.Video_a);
                //console.log("$scope.Video_a",$scope.Video_a);

                $scope.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Video_a.length, 
                    getData: function ($defer, params) {

                      if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                    
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.videoArray[0], params.orderBy()) : $scope.videoArray[0];
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
    /*=====  End of Get List Video  ======*/

    /*========================================
      =            View Video Modal            =
      ========================================*/
      
      $scope.viewVideoModal = function(id) {

         var filteredVideoUrl = baseUrlSrvc.baseUrl + 'listVideosByCourseIdTechnologyMasterIdAndTopicId/'+$scope.CourseId +'/'+ $scope.TechnoId+'/'+$scope.TopicId;
          var promiseGet = CRUD_SERVICE.getAllData(filteredVideoUrl);
          promiseGet.then(function (pl) {
              $scope.vid_ab = pl.data;
              ////console.log($scope.vid_ab);
              for (var i = 0; i < $scope.vid_ab.length; i++) {
                  if ($scope.vid_ab[i].conVideoId == id) {
                      //$scope.videoModalData = $sce.trustAsHtml($scope.vid_ab[i]);
                      $scope.videoModalData =$scope.vid_ab[i];
                      //console.log("$scope.videoModalData",$scope.videoModalData);
                  }
              }

          },
          function (errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });

      }
      
      /*=====  End of View Video Modal  ======*/

});
/*=====  End of Controller  ======*/
