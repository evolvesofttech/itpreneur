/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("TestQuestionCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $route,
        $timeout,Flash,$rootScope, $sessionStorage, toaster, $window,courseTechtopic) {
    //console.log("branch");
   
    $scope.OperType = $routeParams.ID;
    $scope.currentCourseId = $routeParams.ID1;
    $scope.currentTechnologyId = $routeParams.ID2;
    $scope.currentTopicId = $routeParams.ID3;
    var vm = this;
    
    $window.document.title = "ITPreneur - Create Test";

    /*======================================
    =            Get List Question            =
    ======================================*/
    var TestQuestionList = baseUrlSrvc.baseUrl + 'listTestQuestionByTestId/' + $scope.OperType;
    GetAllTestQuestionRecords(TestQuestionList);

    function GetAllTestQuestionRecords(url) {
         $scope.testArray = [];
        var promiseGet = CRUD_SERVICE.getAllData(url);
        promiseGet.then(function (pl) {
                $scope.TestQuest = pl.data;
                $scope.testArray.push($scope.TestQuest);
                $scope.testQuestionTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                   total: $scope.TestQuest.length, 
                    getData: function ($defer, params) {
                    
                        $scope.testdata = params.sorting() ? $filter('orderBy')($scope.testArray[0], params.orderBy()) : $scope.testArray[0];
                        $scope.testdata = params.filter() ? $filter('filter')($scope.testdata, params.filter()) : $scope.testdata;
                       $scope.testdata = $scope.testdata.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       $defer.resolve($scope.testdata)
                    }
                });
                $scope.testQuestionTable.reload();
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
   }
  /*=====  End of Get List Question  ======*/
   
    
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

    $scope.rightclick = function(value){
        console.log("value",value);
       // $scope.questionrightanswer = value;

    }

    $scope.addSingleQuestionClick = function() {
      $scope.modalHeading = "Add Single Question";
      $scope.singleTestQueData = {};
      $scope.essaySelected = false;
      $scope.multipleSelected = false;
    };//addSingleQuestionClick


    $scope.qTypeChange = function(name) {
       //console.log(name);
       $scope.singleTestQueData1 = {
            option1: 'Text'
        };
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
    
    /*============================================
    =            Edit Single Question            =
    ============================================*/
    $scope.editSingleQuestion = function(data){
        console.log(data);
        $scope.modalHeading = "Edit Single Question";
        if(data.questiontype == 'MCQ' || data.questiontype == 'Fill in The Blank'){
            $scope.multipleSelected = true;
            $scope.essaySelected = false;

            if (data.image1 == undefined) {
                $scope.singleTestQueData1 = {
                    option1: 'Text'
                };
            }// if data.image1 == undefined
            else {
                $scope.singleTestQueData1 = {
                    option1: 'Image'
                };
            } //else data.image1 == undefined
        }

        if(data.questiontype == 'Essay'){
          $scope.essaySelected = true;
          $scope.multipleSelected = false;
        }

        $scope.singleTestQueData = data;
    }
    
    
    /*=====  End of Edit Single Question  ======*/
    

    /*============================================
    =            Save Single Question            =
    ============================================*/
    $scope.saveSingleQuestion = function(data){
        console.log("data",data);
        var data1 = {};
        if(!data.text1){
            if (data.image1.base64) {
                $scope.img1 = data.image1.base64;
            } else {
                $scope.img1 = data.image1;
            } //if 1   
            if (data.image2.base64) {
                $scope.img2 = data.image2.base64;
            } else {
                $scope.img2 = data.image2;
            } //if 2
            if (data.image3.base64) {
                $scope.img3 = data.image3.base64;
            } else {
                $scope.img3 = data.image3;
            } //if 3
            if (data.image4.base64) {
                $scope.img4 = data.image4.base64;
            } else {
                $scope.img4 = data.image4;
            } //if 4
        }

        data1.listQuestion = [{
            "cTopicId":$scope.currentTopicId,
            "cCourseId":$scope.currentCourseId,
            "cTechnologyMasterId":$scope.currentTechnologyId,
            "tQuestionId":data.tQuestionId, 
            "tTestId":$scope.OperType,
            "keyword":$scope.keyword,
            "questiontype":data.questiontype,
            "question":data.question,
            "text1":data.text1,
            "text2":data.text2,
            "text3":data.text3,
            "text4":data.text4,
            "questionrightanswer":data.questionrightanswer,
            "explanation":data.explanation,
            "marks":data.marks,
            "createdby":$sessionStorage.adUserId,
            "updatedby":$sessionStorage.adUserId,
            "inInstituteId":$sessionStorage.inInstituteId,
            "bBranchId":$sessionStorage.bBranchId,
            "image1":$scope.img1,
            "image2":$scope.img2,
            "image3":$scope.img3,
            "image4":$scope.img4
        }];
        console.log("data1",data1);
        var FormData = {
        formdata: data1,
        url: baseUrlSrvc.baseUrl + 'addUpdateTestQuestion'
        };
        var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        promisePut.then(function (pl) {

            var promiseData = pl.data;
            GetAllTestQuestionRecords(TestQuestionList);
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
    
    
    /*=====  End of Save Single Question  ======*/

    /*============================================
    =            View Single Question            =
    ============================================*/
    $scope.viewSingleQuestion = function(data){
        $scope.viewSingleata = data;
    }
    /*=====  End of View Single Question  ======*/
   
    /*====================================
    =            Delete Single Question             =
    ====================================*/
    $scope.delSingleQuestion = function(id, bdata) {
        $scope.temp_var = $filter('filter')(bdata, { "tQuestionId": id });
        $scope.deleteSingleQueData= $scope.temp_var[0];
     }

    $scope.deleteSingleQuestion = function (id) {
        //console.log(id);
        var FormData = {
            id: id,
            url: baseUrlSrvc.baseUrl + 'deleteTestQuestion'
        };
        var promiseDelete = CRUD_SERVICE.delete(FormData);
        promiseDelete.then(function (pl) {
            $timeout(function() {
                  $scope.$apply(function () {
                  $route.reload();
                  });
             },300);
                 
            toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
        }, function (err) {
            $timeout(function() {
                $scope.$apply(function () {
                });
            },300);
             
            toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
        });
    }
    /*=====  End of  Delete Single Question   ======*/
    
});
/*=====  End of Controller  ======*/
