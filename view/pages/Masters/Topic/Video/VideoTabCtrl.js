/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("VideoTabCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window,pdfDelegate,$sce,Upload,courseTechtopic) {
    //console.log("courses");
    $scope.tArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Edit Topic";

    $scope.currentCourseId = courseTechtopic.cCourseId;
    $scope.currentTechnoId = courseTechtopic.cTechnologyMasterId;
    $scope.currentTopicId = courseTechtopic.cTopicId;
    $scope.currentcoursename = courseTechtopic.coursename;
    $scope.currenttechnologyname = courseTechtopic.technologyname;
    $scope.currenttopicname = courseTechtopic.topicname;
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

    /*=======================================
    =            File Validation            =
    =======================================*/
    $scope.fileSelected = function(file) {
      //////console.log(file);
      if (file != undefined) {
        //////console.log("File Selected");
        $scope.fileSelect = true;
      } else {
        //////console.log("File Not Selected");
        $scope.fileSelect = false;
      }
    }
    /*=====  End of File Validation  ======*/

    /*=================================
    =            Add Click            =
    =================================*/
    $scope.addVideoClick = function() {
      $scope.videoData = {};
      $scope.myFileVideo = "";
      $scope.videoHeading = "Add Video";
    }
    /*=====  End of Add Click  ======*/

    /*======================================
    =            Get Video List           =
    ======================================*/
   $scope.videosArray = [];
    
    var urlVideoList = baseUrlSrvc.baseUrl + 'listVideosByCourseIdTechnologyMasterIdAndTopicId/' + $scope.currentCourseId+'/'+$scope.currentTechnoId+'/'+$scope.currentTopicId;
    GetAllVideoRecords(urlVideoList);
    //To Get All Records
    function GetAllVideoRecords(url) {
        
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function(pl) {
                $scope.Videos = pl.data;
               
                $scope.videosArray.push($scope.Videos);
                $scope.usersTable_video = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.Videos.length, 
                    getData: function ($defer, params) {
                    
                        $scope.data_video = params.sorting() ? $filter('orderBy')($scope.videosArray[0], params.orderBy()) : $scope.videosArray[0];
                        $scope.data_video = params.filter() ? $filter('filter')($scope.data_video, params.filter()) : $scope.data_video;
                       $scope.data_video = $scope.data_video.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.data_video)
                    }
                });
                $scope.usersTable_video.reload();
                //console.log($scope.data_video);
            },
            function(errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
    }
   
    /*=====  End of  Get Video List  ======*/

    

    /*=======================================
    =            Save Video Text            =
    =======================================*/
    $scope.saveVideoText = function(vdata, fl) {
        
        $scope.filedata = fl;

        vdata.createdby= $sessionStorage.adUserId;
        vdata.updatedby= $sessionStorage.adUserId;
        vdata.inInstituteId = $sessionStorage.inInstituteId;
        vdata.cCourseId = $scope.currentCourseId;
        vdata.cTechnologyMasterId = $scope.currentTechnoId;
        vdata.cTopicId = $scope.currentTopicId;
        vdata.bBranchId = $sessionStorage.bBranchId;
        
        vdata.adUserId = $sessionStorage.adUserId;

        var file = $scope.myFileVideo;
        if (file == undefined) {
          var fileSelected1 = false;
        } else {
          var fileSelected1 = true;
        }

        var FormData = {
            formdata: vdata,
            url: baseUrlSrvc.baseUrl + 'addUpdateVideosText'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function(pl) {

           var promiseData = pl.data;
           //console.log("promiseData",promiseData);
           if (fileSelected1 != false) {
              if (promiseData.code == 1) {
                  if (vdata.conVideoId == undefined) {
                      $scope.saveFile(vdata, $scope.filedata, promiseData.id);
                  } else {
                      $scope.saveFile(vdata,$scope.filedata, vdata.conVideoId);
                  }
              }
              if (promiseData.code == 2) {
                toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
              }
            } //else fileSelected1 != false
            else {
              GetAllVideoRecords(urlVideoList);
              toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            } //else fileSelected1 != false
        }, function(err) {
             // Flash.create('danger', $scope.DangerMessage);
        });
    }
    /*=====  End of Save Video Text  ======*/

    /*==================================
    =            Save Video            =
    ==================================*/
    $scope.saveFile = function(videoData, fl, id) {
        console.log("videoData",videoData);
        var file = fl;
        var fdata = new FormData();
        fdata.append('file', file);
        fdata.append('conVideoId', id);
        fdata.append('concatPath',$scope.currentcoursename + '/' + $scope.currenttechnologyname + '/' + $scope.currenttopicname);
        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'addUpdateVideos',
          method: 'POST',
          headers: {
            'Content-Type': undefined,
            'Authorization':  'Basic ' + $sessionStorage.encodedString
          },
          data: fdata
        });

        file.upload.then(function (response) {
          file.result = response.data;

          var promiseData = response.data;
            if(promiseData.code == 1) {
                $timeout(function() {
                  $scope.$apply(function () {
                  GetAllVideoRecords(urlVideoList);
                  });
              },100);
             toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
            
            }

            if (promiseData.code == 2) {
                toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            }


        }, function (response) {
            toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });
      }
    /*=====  End of Save Video  ======*/
 
    /*==========================================
    =            Delete Video Modal            =
    ==========================================*/
    $scope.delVideo = function(id, ndata) {
         ////console.log(id); 
         
        $scope.temp_var = $filter('filter')(ndata, { "conVideoId": id });

       $scope.deletevideoData= {
          "conVideoId": $scope.temp_var[0].conVideoId,
          "name": $scope.temp_var[0].name
       };

    }
    /*=====  End of Delete Video Modal  ======*/
    
    /*====================================
    =            Delete Video            =
    ====================================*/
    $scope.deleteVideo = function(id) {
        ////console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteVideos'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function(pl) {

            $timeout(function() {
                $scope.$apply(function () {
                // $route.reload();
                GetAllVideoRecords(urlVideoList);
                });
            },100);
             toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        }, function(err) {
            $timeout(function() {
                $scope.$apply(function () {
                // $route.reload();
                GetAllVideoRecords(urlVideoList);
                });
            },100);
             toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
            ClearModels();
        });
    }
    /*=====  End of Delete Video  ======*/
    
    /*==================================
    =            Edit Video            =
    ==================================*/
    $scope.editVideo = function(id, vdata) {
     $scope.videoHeading = "Edit Video";
      var filteredVideoUrl = baseUrlSrvc.baseUrl + 'listVideosByVideoId/'+ id;
      var promiseGet = CRUD_SERVICE.getAllData(filteredVideoUrl);
      promiseGet.then(function (pl) {
              $scope.video_ab = pl.data;
              console.log("$scope.video_ab",$scope.video_ab);
              for (var i = 0; i < $scope.video_ab.length; i++) {
                  if ($scope.video_ab[i].conVideoId == id) {
                      $scope.videoData = $scope.video_ab[i];
                  }
              }
          },
          function (errorPl) {
              $log.error('Some Error in Getting Records.', errorPl);
          });
      }
    
    
    /*=====  End of Edit Video  ======*/

    /*========================================
      =            View Video Modal            =
      ========================================*/
      $scope.viewVideoModal = function(data) {
          $scope.videoModalData = data;
      }
      /*=====  End of View Video Modal  ======*/
    /*====================================
    =            Clear Models            =
    ====================================*/
    function ClearVideo_aModal() {
        $scope.videoData = {};
        $scope.picFile = {};
    }
    /*=====  End of Clear Models  ======*/

    
    
    
});
/*=====  End of Controller  ======*/
