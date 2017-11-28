/*==================================
=            Controller            =
==================================*/
angular.module('theGuru').
controller("starttestCtrl", 
    function ($scope, $log, $routeParams, $http, CRUD_SERVICE, baseUrlSrvc,
        ngTableParams,$filter, ngTableDataService, $timeout, 
        $route,Flash,$rootScope, $sessionStorage, $localStorage, toaster, $window,$location,topic_id) {

    $scope.OperType = $routeParams.ID;
    //console.log("$scope.OperType",$scope.OperType);
    $window.document.title = "ITPreneur - Student Test";
    var vm = this;
    $scope.testArray = [];

    /*=============================
    =            timer            =
    =============================*/
    // $scope.countd = $localStorage.Count;
    /*=====  End of timer  ======*/
    

    /*=====================================
    =            Get Test List            =
    =====================================*/

    if ($scope.role == 'System Admin' || $scope.role == 'Admin') {
        var testListUrl = baseUrlSrvc.baseUrl + 'listTestQuestionBytTestId/' + $scope.OperType;
    }else{
        var testListUrl = baseUrlSrvc.baseUrl + 'listTestQuestionBytTestIdByUsers/' + $scope.OperType;
    }
    GetAllRecords(testListUrl);
    function GetAllRecords(url){
        var promisetestGet = CRUD_SERVICE.getAllData(url);
    promisetestGet.then(function(pl) {
            $scope.questionData = pl.data;
            // console.log("$scope.questionData", $scope.questionData);
            $scope.bBranchId = $scope.questionData[0].bBranchId;
            $scope.cTopicId = $scope.questionData[0].cTopicId;
            topic_id.addTopic_id($scope.cTopicId);
            // console.log("$scope.cTopicId",$scope.cTopicId);
            // console.log("$scope.questionData",$scope.questionData);
        },
        function(errorPl) {
            $log.error('Some Error in Getting Records.', errorPl);
        });  
    }
    
    /*==============================================
   =            Test Que Attempt count            =
   ==============================================*/
   var attemptListUrl = baseUrlSrvc.baseUrl + 'listTestAnswerAttemptnoByadUserIdAndtTestId/' + $sessionStorage.adUserId +'/'+ $scope.OperType +'/'+$scope.cTopicId;
    var promisetestGet = CRUD_SERVICE.getAllData(attemptListUrl);
    promisetestGet.then(function(pl) {
        $scope.attemptnumber = pl.data;
        console.log("$scope.attemptnumber", $scope.attemptnumber);
        $scope.totalquestionmarks = $scope.attemptnumber[0].totalmarks;
        $scope.testtitle = $scope.attemptnumber[0].title;
        $scope.testtime = $scope.attemptnumber[0].time;
        $scope.countd = $scope.testtime * 60;
        // $scope.countd = 30;
        $localStorage.Count = $scope.countd;
        $scope.passingpercentage = $scope.attemptnumber[0].passingpercentage;
        $scope.attemp = $scope.attemptnumber[0].attemptno + 1;
        // console.log("$scope.attemp", $scope.attemp);
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
    /*=====  End of Test Que Attempt count  ======*/
    
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

    /*================================
    =            Time End            =
    ================================*/
    $scope.timeEnd = function(data) {
        console.log("Time ended");
        alert("Time Ended");
        $scope.savetestquestion(data);
    }
    /*=====  End of Time End  ======*/
    
    /*=================================
    =            Save Test            =
    =================================*/
    vm.subClick = function(data) {
        console.log(data);
        $scope.testArray = [];
        for(var i in data) {
            if (data[i] != undefined) {
                $scope.testArray.push({"tQuestionId": i, "attemptedanswer": data[i] });
            }
        }
    }

    $scope.savetestquestion = function(tdata) {
        // console.log("tdata",tdata);
        var locaData = {};
        $scope.tArray = [];
        
        for(var i in tdata) {
            if (tdata[i] != undefined) {
                 $scope.tArray.push({
                    "cTopicId":$scope.cTopicId,
                    // "attemptno":$scope.attemp,
                    "attemptedanswer":tdata[i],
                    "tTestId":$scope.OperType,
                    "tQuestionId":i,
                    "createdby":$sessionStorage.adUserId,
                    "updatedby":$sessionStorage.adUserId,
                    "inInstituteId":$sessionStorage.inInstituteId,
                    "adUserId":$sessionStorage.adUserId,
                    "bBranchId":$scope.bBranchId
                });
            } 
        } //FOR ENDS    
       
       var FormData = {
            formdata: $scope.tArray,
            url: baseUrlSrvc.baseUrl + 'addUpdateTestAnswer'
            };
            var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
            promisePut.then(function (pl) {

            var promiseData = pl.data;
            //console.log("promiseData1",promiseData);
            $timeout(function() {
                $scope.$apply(function () {
                $location.path("/Summary/" + $scope.OperType);
                });
            },900);
            if (promiseData.code == 1) {
              toaster.success({title: "Success", body:$scope.toasterSubmitTestSuccess,tapToDismiss: true,showCloseButton: true});
            }
            if (promiseData.code == 2) {
              toaster.error({title: "Error", body:$scope.toasterAddedDuplicate,tapToDismiss: true,showCloseButton: true});
            }
        }, function (err) {
           toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        });

    }
    /*=====  End of Save Test  ======*/
    
});
/*=====  End of Controller  ======*/




