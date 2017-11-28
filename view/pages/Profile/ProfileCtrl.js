angular.module('theGuru').controller("ProfileCtrl", ["$scope", "$log", "$filter", "ngTableParams", "$resource",
        "ngTableDataService", "$routeParams", "CRUD_SERVICE", "baseUrlSrvc",
        "$sessionStorage", "$route", "$timeout", "Flash", "$rootScope", "toaster",
        "feedback_Cid","feedback_Bid","feedback_Eid","branch_name","Form_no","course_fee",
        "firstNameService","middleNameService","lastNameService","Branch_Id","avg_att","$window",
        function($scope, $log, $filter,
            ngTableParams, $resource, ngTableDataService, $routeParams, CRUD_SERVICE, baseUrlSrvc,
            $sessionStorage, $route, $timeout, Flash, $rootScope, toaster, feedback_Cid, 
            feedback_Bid, feedback_Eid, branch_name, Form_no, course_fee, 
            firstNameService, middleNameService, lastNameService, Branch_Id, avg_att, $window) {

        	$window.document.title = "ITPreneur - Profile";

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

    	 	/*========================================
	       =            Get Current Date            =
	       ========================================*/
	       var today = new Date();
	        var dd = today.getDate();
	        var mm = today.getMonth()+1; //January is 0!
	        var yyyy = today.getFullYear();

	        if(dd<10) {
	            dd='0'+dd
	        } 

	        if(mm<10) {
	            mm='0'+mm
	        } 

	        today = yyyy+'-'+mm+'-'+dd;
	        $scope.currentDate =today;
	        //console.log("$scope.currentDate",$scope.currentDate);
	         /*=====  End of Get Current Date  ======*/

	         /*========================================
	         =            Get Current Year            =
	         ========================================*/
	         var d = new Date();
	         $scope.currentYear = d.getFullYear();
	         //console.log("$scope.currentYear",$scope.currentYear);
	         /*=====  End of Get Current Year  ======*/

	         /*===================================
	         =            Get Profile            =
	         ===================================*/
	         var urlProfile = baseUrlSrvc.baseUrl + 'listEnquiryFormByadUserId/'+ $sessionStorage.adUserId;
	         
	         var profileGet = CRUD_SERVICE.getAllData(urlProfile);
	        profileGet.then(function(pl) {
	            $scope.ProfileData1 = pl.data;
	            $scope.ProfileData = $scope.ProfileData1[0];
	            $scope.EnquiryStatus = [{
	            	"cStatusId":$scope.ProfileData.cStatusId,
	            	"statusname":$scope.ProfileData.statusname
	            }];
	            $scope.Source = [{
	            	"cSourceId":$scope.ProfileData.cSourceId,
	            	"sourcename":$scope.ProfileData.sourcename
	            }];
	            console.log($scope.ProfileData1);

	            /*----------  Course  ----------*/
	              var CourseListUrl = baseUrlSrvc.baseUrl + 'listCoursebyBranchId/' + $scope.ProfileData.bBranchId;
	              var promiseCourseGet = CRUD_SERVICE.getAllData(CourseListUrl);
	              promiseCourseGet.then(function(pl) {
	                  $scope.Course = pl.data;
	              },
	              function(errorPl) {
	                  $log.error('Some Error in Getting Records.', errorPl);
	              });
	            /*----------  Course  ----------*/

	            /*----------  Degree  ----------*/
	            var degListUrl = baseUrlSrvc.baseUrl + 'listDegree';
	              var promiseDegGet = CRUD_SERVICE.getAllData(degListUrl);
	              promiseDegGet.then(function(pl) {
	                  $scope.HighestQualification = pl.data;
	              },
	              function(errorPl) {
	                  $log.error('Some Error in Getting Records.', errorPl);
	              });
	            /*----------  Degree  ----------*/
	            
	        },
	        function(errorPl) {
	            $log.error('Some Error in Getting Records.', errorPl);
	        });
	         
	         /*=====  End of Get Profile  ======*/
	         

}]);