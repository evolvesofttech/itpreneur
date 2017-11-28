/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("TestTabCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, toaster, $window,courseTechtopic) {
     $scope.addedQuestions = [];
     $scope.addedQuArray = [];
    $window.document.title = "ITPreneur - Create Test";

    $scope.currentCourseId = courseTechtopic.cCourseId;
    $scope.currentTechnoId = courseTechtopic.cTechnologyMasterId;
    $scope.currentTopicId = courseTechtopic.cTopicId;

    /*=====================================
    =            Get Test List            =
    =====================================*/
    var testListUrl = baseUrlSrvc.baseUrl + 'listTestByCourseIdTechnologyMasterIdAndTopicId/' +$scope.currentCourseId+'/'+$scope.currentTechnoId+'/'+$scope.currentTopicId;
    GetAllTestRecords(testListUrl);
    function GetAllTestRecords(url){
        var promisetestGet = CRUD_SERVICE.getAllData(url);
        promisetestGet.then(function(pl) {
            $scope.testData = pl.data;
            console.log("$scope.testData",$scope.testData);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        }); 
    }
     
    /*=====  End of Get Test List  ======*/

    $scope.rightclick = function(value){
        console.log("value",value);
       $scope.questionrightanswer = value;

    }
       
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

    $scope.addtestclick = function(){
      $scope.headingMessage = "Create Test"
      $scope.saveTestData = {};
      $scope.essaySelected = false;
      $scope.multipleSelected = false;
        
      }

    $scope.addMore = function(args) {
            //console.log(args);
            $scope.addedQuestions.push(args);
            console.log("$scope.addedQuestions",$scope.addedQuestions);
            $scope.saveTestData = {};
            $scope.essaySelected = false;
            $scope.multipleSelected = false;
    };//addMore

    $scope.qTypeChange = function(name) {
       console.log(name);
      if (name == 'MCQ' || name == 'Fill in The Blank') {
          //console.log('mcq');
          $scope.multipleSelected = true;
          $scope.essaySelected = false;
      }
      if (name == 'Essay') {
          //console.log('Essay');
          $scope.essaySelected = true;
          $scope.multipleSelected = false;
      }
    };//qTypeChange

    /*=======================================
    =            View Test Model            =
    =======================================*/
    $scope.viewTestModal = function(data){
        $scope.viewTestData = data
    }
    /*=====  End of View Test Model  ======*/
    
    /*=================================
    =            Edit Test            =
    =================================*/
    $scope.editTest = function(args) {
        console.log("args",args);
        $scope.headingMessage = "Edit Create Test"
        $scope.saveTestData =args; 
        $scope.essaySelected = false;
        $scope.multipleSelected = false;

        
    };//editTest
    /*=====  End of Edit Test  ======*/


    /*=====================================
    =            Save All Data            =
    =====================================*/
    $scope.saveTest = function(data){
        console.log("data",data);

        if(data.tTestId){
           data = {"cCourseId":$scope.currentCourseId,"cTechnologyMasterId":$scope.currentTechnoId,"cTopicId":$scope.currentTopicId,"tTestId":data.tTestId,"title":data.title,"testtime":data.testtime,"testdate":data.testdate,"time":data.time,"totalquestions":data.totalquestions,"rightanswer":data.rightanswer,"passingpercentage":data.passingpercentage,"wronganswer":data.wronganswer,"description":data.description,"bBranchId":$sessionStorage.bBranchId,"createdby":$sessionStorage.adUserId,"updatedby":$sessionStorage.adUserId,"inInstituteId":$sessionStorage.inInstituteId}; 
     
        
        var FormData = {
            formdata: data,
            url: baseUrlSrvc.baseUrl + 'addUpdateTest'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {

                var promiseData = pl.data;
                //console.log("promiseData",promiseData);
                 $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                   GetAllTestRecords(testListUrl);
                    });
                },100);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});

                
            }, function (err) {
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });

        }else{

        data = {"cCourseId":$scope.currentCourseId,"cTechnologyMasterId":$scope.currentTechnoId,"cTopicId":$scope.currentTopicId,"title":data.title,"testtime":data.testtime,"testdate":data.testdate,"time":data.time,"totalquestions":data.totalquestions,"rightanswer":data.rightanswer,"passingpercentage":data.passingpercentage,"wronganswer":data.wronganswer,"description":data.description,"createdby":$sessionStorage.adUserId,"updatedby":$sessionStorage.adUserId,"inInstituteId":$sessionStorage.inInstituteId,"bBranchId":$sessionStorage.bBranchId}; 
    
        //test add
        var FormData = {
            formdata: data,
            url: baseUrlSrvc.baseUrl + 'addUpdateTest'
            };

            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {

                var promiseData = pl.data;
                //console.log("promiseData",promiseData);
                 $timeout(function() {
                  $scope.$apply(function () {
                  //$route.reload();
                  GetAllTestRecords(testListUrl);
                  });
                 },300);
                if (promiseData.code == 1) {
                    toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                    //$scope.saveTestQuestion(data1, promiseData.id);
                    
                }
                if (promiseData.code == 2) {
                  toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                }

                
            }, function (err) {
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            });
           
        }
    }
    /*=====  End of Save All Data  ======*/
    $scope.click = function(id){
        //console.log("id",id);
        $scope.testId = id
    }
    
    $scope.arraysingledelete = function(){
        for(var i = 0;i<$scope.addedQuestions.length;i++){
            $scope.addedQuestions.splice(i, 1);
        }
    }
    /*==========================================
    =            Save Test Question            =
    ==========================================*/
    $scope.saveTestQuestion = function(data){
        //console.log("data",data);
        for(var i = 0 ;i<$scope.addedQuestions.length; i++){
            if(!$scope.addedQuestions[i].text1){
                $scope.img1 = $scope.addedQuestions[i].image1.base64;
                $scope.img2 = $scope.addedQuestions[i].image2.base64;
                $scope.img3 = $scope.addedQuestions[i].image3.base64;
                $scope.img4 = $scope.addedQuestions[i].image4.base64;
            }
            $scope.addedQuArray.push({'image1':$scope.img1,'image2':$scope.img2,'image3':$scope.img3,'image4':$scope.img4,'cTopicId':$scope.currentTopicId,'inInstituteId':$sessionStorage.inInstituteId,'bBranchId':$sessionStorage.bBranchId,'createdby':$sessionStorage.adUserId,'tTestId':$scope.testId,'questiontype':$scope.addedQuestions[i].questiontype,'question':$scope.addedQuestions[i].question,'text1':$scope.addedQuestions[i].text1,'text2':$scope.addedQuestions[i].text2,'text3':$scope.addedQuestions[i].text3,'text4':$scope.addedQuestions[i].text4,'questionrightanswer':$scope.questionrightanswer,'explanation':$scope.addedQuestions[i].explanation,'marks':$scope.addedQuestions[i].marks});
         }
         console.log("$scope.addedQuArray",$scope.addedQuArray);
         data.listQuestion = $scope.addedQuArray;

        var FormData = {
            formdata: data,
            url: baseUrlSrvc.baseUrl + 'addUpdateTestQuestion'
            };
            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {

                var promiseData = pl.data;
                //console.log("promiseData1",promiseData);
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    //GetAllRecords(urlList);
                    });
                },400);
                if (promiseData.code == 1) {
                  toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                }
                if (promiseData.code == 2) {
                  toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
                }
            }, function (err) {
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
            }); 
    }
    
    
    /*=====  End of Save Test Question  ======*/
    
    
   
    /*====================================
    =            Delete Test            =
    ====================================*/
    $scope.delTest = function(id, bdata) {
        //console.log(id); 
        $scope.temp_var = $filter('filter')(bdata, { "tTestId": id });
        $scope.deletetestData= $scope.temp_var[0];
        console.log("$scope.deletetestData",$scope.deletetestData);
     }

    $scope.delete = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteTest'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    GetAllTestRecords(testListUrl);
                    });
                },500);
                 
                toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function (err) {
            GetAllTestRecords(testListUrl);
            toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of Delete Test  ======*/

    $scope.addimportclick = function(tid){
      console.log(tid);
      $scope.tId = tid;
    }

    /*============================================
    =            Import Test Question            =
    ============================================*/
    $scope.importTestQuestion = function(data){
      //console.log("data",data);
      var file = $scope.myFile;
     
      var fd = new FormData();
    
      fd.append('tTestId', $scope.tId);
      fd.append('cTopicId',$scope.currentTopicId);
      fd.append('cTechnologyMasterId',$scope.currentTechnoId);
      fd.append('cCourseId',$scope.currentCourseId);
      fd.append('inInstituteId',$sessionStorage.inInstituteId);
      fd.append('bBranchId', $sessionStorage.bBranchId);
      fd.append('createdby',$sessionStorage.adUserId);

      fd.append('file', file);
      var uploadUrl = baseUrlSrvc.baseUrl + 'addTestQuestionExcelsheet';
      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
      }).success(function() {
            toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        }).error(function() {
            toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });
    };
    /*=====  End of Import Test Question  ======*/
    
    
});
/*=====  End of Controller  ======*/
