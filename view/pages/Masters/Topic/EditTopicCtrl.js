/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("EditTopicCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window,pdfDelegate,$sce,courseTechtopic) {
    //console.log("courses");
    $scope.tArray = [];
    $scope.OperType = $routeParams.ID;
    $window.document.title = "ITPreneur - Edit Topic";
   
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

    /*==================================
    =            Topic List            =
    ==================================*/
    var urlList = baseUrlSrvc.baseUrl + 'listTopicByTopicId/' + $scope.OperType;
    GetAllRecords(urlList);

    function GetAllRecords(url) {
        $scope.topicArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.EditTopicData = pl.data[0];
                $scope.currentCourseId = $scope.EditTopicData.cCourseId;
                $scope.currentTechnologyId = $scope.EditTopicData.cTechnologyMasterId;
                $scope.currentTopicId = $scope.EditTopicData.cTopicId;

                $scope.coursename = $scope.EditTopicData.coursename;
                $scope.technologyname = $scope.EditTopicData.technologyname;
                $scope.topicname = $scope.EditTopicData.topicname

                  
                courseTechtopic['cCourseId'] = $scope.EditTopicData.cCourseId;
                courseTechtopic['coursename'] = $scope.EditTopicData.coursename;
                courseTechtopic['cTechnologyMasterId'] = $scope.EditTopicData.cTechnologyMasterId;
                courseTechtopic['technologyname'] = $scope.EditTopicData.technologyname;
                courseTechtopic['cTopicId'] = $scope.EditTopicData.cTopicId;
                courseTechtopic['topicname'] = $scope.EditTopicData.topicname;

                console.log("courseTechtopic",courseTechtopic);
               
                

                $scope.Courses = [{
                    "cCourseId": $scope.EditTopicData.cCourseId,
                    "coursename": $scope.EditTopicData.coursename
                }];

                $scope.Technologies = [{
                    "cTechnologyMasterId": $scope.EditTopicData.cTechnologyMasterId,
                    "technologyname": $scope.EditTopicData.technologyname
                }];

                getNotes();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
           
    }
    /*=====  End of Topic List  ======*/

    /*==================================
    =            Save Topic            =
    ==================================*/
    $scope.saveTopic = function(data) {
        data.inInstituteId=$sessionStorage.inInstituteId;
        data.bBranchId=$sessionStorage.bBranchId;
        data.updatedby=$sessionStorage.updatedby;
        data.adUserId = $sessionStorage.adUserId;

        var FormData = {
            formdata: data,
            url: baseUrlSrvc.baseUrl + 'addUpdateTopic'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {
           var promiseData = pl.data;
           GetAllRecords(urlList);
            if (promiseData.code == 2) {
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
            } else {
                toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
            }
        }, function (err) {
             toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Save Topic  ======*/

    $scope.addNotesbtn = function(){
        $scope.notesData = {};
    }

    /*======================================
    =            Get Notes List           =
    ======================================*/
    function getNotes(){
        $scope.notesArray = [];
        // console.log("getNotes");
        var urlNotesList = baseUrlSrvc.baseUrl + 'listNotesByCourseIdTechnologyMasterIdAndTopicId/' + $scope.currentCourseId+'/'+$scope.currentTechnologyId+'/'+$scope.OperType;
        GetAllNotesRecords(urlNotesList);

        function GetAllNotesRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(url);
            promiseGet.then(function(pl) {
                    $scope.Notes = pl.data;
                    $scope.notesArray.push($scope.Notes);
                    $scope.usersTable_notes = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                       total: $scope.Notes.length, 
                        getData: function ($defer, params) {
                        
                            $scope.data_notes = params.sorting() ? $filter('orderBy')($scope.notesArray[0], params.orderBy()) : $scope.notesArray[0];
                            $scope.data_notes = params.filter() ? $filter('filter')($scope.data_notes, params.filter()) : $scope.data_notes;
                           $scope.data_notes = $scope.data_notes.slice((params.page() - 1) * params.count(), params.page() * params.count());
                           $defer.resolve($scope.data_notes)
                        }
                    });
                    $scope.usersTable_notes.reload();
                },
                function(errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
    }
    /*=====  End of  Get Notes List  ======*/

    /*=======================================
    =            Save JSON Notes            =
    =======================================*/
    $scope.saveJsonNotes = function(ndata) {
        ndata.conNotesId= ndata.conNotesId;
        ndata.createdby= $sessionStorage.adUserId;
        ndata.updatedby= $sessionStorage.adUserId;
        ndata.inInstituteId = $sessionStorage.inInstituteId;
        ndata.bBranchId = $sessionStorage.bBranchId;
        ndata.adUserId = $sessionStorage.adUserId;
        ndata.cCourseId = $scope.currentCourseId;
        ndata.cTechnologyMasterId = $scope.currentTechnologyId;
        ndata.cTopicId = $scope.currentTopicId;
        var file = $scope.myFile;
        if (file == undefined) {
          var fileSelected1 = false;
        } else {
          var fileSelected1 = true;
        }

        var FormData = {
            formdata: ndata,
            url: baseUrlSrvc.baseUrl + 'addUpdateNotesText'
        };

        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function(pl) {

           var promiseData = pl.data;
           // console.log("promiseData",promiseData);

           $timeout(function() {

            $scope.$apply(function () {
              // console.log("$scope.fileSelected1",fileSelected1);

              if (fileSelected1 != false) {

                    if (promiseData.code == 1) {
                        if (ndata.conNotesId == undefined) {
                            $scope.saveFile(ndata, promiseData.id);
                        } else {
                            $scope.saveFile(ndata, ndata.conNotesId);
                        }
                    } //promiseData.code == 1
                    if (promiseData.code == 2) {
                      
                    } //promiseData.code == 2
                } //if fileSelected1
                else {
                    toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                    getNotes();
                } //else fileSelected1 != false
                });
            },500);
             
        }, function(err) {
            toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Save JSON Notes  ======*/
    
    /*==================================
    =            Save Notes            =
    ==================================*/
    $scope.saveFile = function(notesData, id) {
        // console.log("saveFile");
        var file = $scope.myFile;
        var uploadUrl = baseUrlSrvc.baseUrl + 'addUpdateNotes';
        var fd = new FormData();

        fd.append('file', file);
        fd.append('conNotesId',id);
        fd.append('concatPath',$scope.coursename + '/' + $scope.technologyname + '/' + $scope.topicname);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Authorization':  'Basic ' + $sessionStorage.encodedString
            }
        }).success(function(data) {
            var promiseData = data;
            console.log("promiseData",promiseData);
            if(promiseData.code == 1) {
                toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                getNotes();
            }

            if (promiseData.code == 2) {
                toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
             }
        }).error(function() {
            toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Save Notes  ======*/

    /*==================================
    =            Edit Notes            =
    ==================================*/
    $scope.editNotes = function(id){
        var editUrlList = baseUrlSrvc.baseUrl + 'listNotesByNotesId/' + id;
        var promiseeditGet = CRUD_SERVICE.getAllData(editUrlList);
        promiseeditGet.then(function(pl) {
            $scope.notesData = pl.data[0];
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });
    }
    
    
    /*=====  End of Edit Notes  ======*/
    

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

    /*==========================================
    =            Delete Notes Modal            =
    ==========================================*/
    $scope.delNotes = function(id, ndata) {
        $scope.temp_var = $filter('filter')(ndata, { "conNotesId": id });
       $scope.deletenotesData= {
          "conNotesId": $scope.temp_var[0].conNotesId,
          "name": $scope.temp_var[0].name
       };
    }
    /*=====  End of Delete Notes Modal  ======*/
    
    /*====================================
    =            Delete Notes            =
    ====================================*/
    $scope.deleteNotes = function(id) {
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteNotes'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function(pl) {
            getNotes();
            toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function(err) {
            toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Delete Notes  ======*/
    
    
    
});
/*=====  End of Controller  ======*/
