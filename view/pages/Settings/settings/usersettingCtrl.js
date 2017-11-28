angular.module('theGuru')
.controller('userSettingCtrl', function($scope,$location,$http, CRUD_SERVICE, baseUrlSrvc, 
	$filter,$sessionStorage, $timeout, $route, Flash, $log, toaster, Upload, $window) {

	//console.log("userSettingCtrl");
  $window.document.title = "ITPreneur - User Settings";
  $scope.role = $scope.User_Role1.roleName;
  /*============================
  =            Tabs            =
  ============================*/
  
  if ($scope.role == 'Student') {
    this.uCtrl = 2;
  } else {
    this.uCtrl = 1;
  }
  this.setTab = function(newTab){
    this.uCtrl = newTab;
  };
  this.isSet = function(tabNum){
    return this.uCtrl === tabNum;
  };
  /*=====  End of Tabs  ======*/

  /*===================================
  =            Clearmodels            =
  ===================================*/
  function ClearModels() {
    //console.log("ClearModels",ClearModels);
    $scope.passwordData = {};
    $scope.passwordData.currentPassword = "";
    $scope.passwordData.newPassword = "";
    $scope.passwordData.confirmPassword = "";
  }
  /*=====  End of Clearmodels  ======*/
  
  
  /*=================================
  =            User Data            =
  =================================*/
  $scope.username=$sessionStorage.userData1[0].listUser.username;
  $scope.instituteName=$sessionStorage.userData1[0].listUser.instituteName;
  /*=====  End of User Data  ======*/

  /*========================================
  =            Get User Details            =
  ========================================*/
  if ($scope.role != 'Student') {
    var urlUserList = baseUrlSrvc.baseUrl + 'listUserDetailsByadUserId/'+ $sessionStorage.adUserId;
    var promiseGet = CRUD_SERVICE.getAllData(urlUserList);
    promiseGet.then(function(pl) {
        $scope.userdetails = pl.data;
        $scope.userData1 = {
          "firstname":$scope.userdetails[0].firstname,
          "middlename":$scope.userdetails[0].middlename,
          "lastname":$scope.userdetails[0].lastname,
          "gender":$scope.userdetails[0].gender,
          "maritalstatus":$scope.userdetails[0].maritalstatus,
          "contactno":$scope.userdetails[0].contactno,
          "dob":$scope.userdetails[0].dob,
          "email":$scope.userdetails[0].email,
          "username":$scope.userdetails[0].username
        };
        $scope.Uname = $scope.userdetails[0].username;
        $scope.Utype = $scope.userdetails[0].usertype;
        //console.log("$scope.userData1 ",$scope.userData1);
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
  }
  /*=====  End of Get User Details  ======*/

  /*=================================
  =            Get Image            =
  =================================*/
  var userImageListUrl = baseUrlSrvc.baseUrl + 'listProfileImageByadUserId/' + $sessionStorage.adUserId;
    GetImage(userImageListUrl);

    //To Get All Records
    function GetImage(url) {
      var promiseUserImageGet = CRUD_SERVICE.getAllData(url);
      promiseUserImageGet.then(function(pl) {
          $scope.UserImage = pl.data;
          $scope.imageBase64 = $scope.UserImage[0].data;
          //console.log("$scope.UserImage",$scope.UserImage);
      },
      function(errorPl) {
          $log.error('Some Error in Getting Records.', errorPl);
    });
  }
  /*=====  End of Get Image  ======*/
  

  /*====================================
  =            Upload Image            =
  ====================================*/
  $scope.setProfileImage = function(fl) {

     var file = fl;
      //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
      var fd = new FormData();

      fd.append('fileUpload', file);

      file.upload = Upload.http({
        url: baseUrlSrvc.baseUrl + 'setProfilePhoto/' + $sessionStorage.adUserId,
        method: 'POST',
        headers: {
          'Content-Type': undefined
        },
        data: fd
      });

      file.upload.then(function (response) {
        file.result = response.data;
        GetImage(userImageListUrl);
        toaster.success({title: "Success", body:"Image Uploaded Successfully!",tapToDismiss: true,showCloseButton: true});
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      });

      file.upload.progress(function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
  }
  /*=====  End of Upload Image  ======*/
  
  
  
  /*===================================================
   =            User Data For Hidden Fields            =
   ===================================================*/
   var accountTypeListUrl = baseUrlSrvc.baseUrl + 'listadUserByadUserId/' + $sessionStorage.adUserId;
    var promiseAccountTypeGet = CRUD_SERVICE.getAllData(accountTypeListUrl);
    promiseAccountTypeGet.then(function(pl) {
        $scope.PassData = pl.data;
        $scope.cuPass = $scope.PassData[0].password; 
        //console.log("$scope.PassData",$scope.PassData);
    },
    function(errorPl) {
        $log.error('Some Error in Getting Records.', errorPl);
    });
   /*=====  End of User Data For Hidden Fields  ======*/
   
   /*================================================
   =            Update Password Function            =
   ================================================*/
   $scope.updatePasswordConfirm = function(data) {
      //console.log("data",data);
      //console.log("data.currentPassword",data.currentPassword);
      //console.log("$scope.cuPass",$scope.cuPass);
      if (data.currentPassword == $scope.cuPass) {
          $scope.rightMsg = "Correct Password";
          $scope.wrongMsg = "";
      } else {
         $scope.wrongMsg = "Wrong Password";
      }
      if (data.newPassword == data.confirmPassword) {
          $scope.errorMsg = "Passwords matched";
      } else {
        $scope.errorMsg = "Passwords do not match";
      }
      if (data.currentPassword == $scope.cuPass && data.newPassword == data.confirmPassword) {
        $scope.updatePassword(data);
        //console.log("save function");
        $scope.wrongMsg = "Correct Password";
        $scope.rightMsg = "";
        $scope.errorMsg = "Passwords matched";
      }
    }
   /*=====  End of Update Password Function  ======*/
   
   /*=======================================
   =            Update Password            =
   =======================================*/
   $scope.updatePassword = function (data) {
        //console.log("data",data);

            data.adUserId = $sessionStorage.adUserId;
            data.password = data.newPassword;

            data.password = data.newPassword;
            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'changePassword'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
                 toaster.success({title: "Success", body:"Password Changed Successfully!",tapToDismiss: true,showCloseButton: true});
                
                ClearModels();
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },3000);
            }, function (err) {
                toaster.error({title: "Error", body:"Error in Changing Password!",tapToDismiss: true,showCloseButton: true});
                 
                $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    });
                },3000);
            });
        //}
    };
   /*=====  End of Update Password  ======*/

   /*==================================
    =            Save User             =
    ==================================*/
    
    $scope.updateProfile = function (data) {

            data.adUserId = $sessionStorage.adUserId;

            var FormData = {
                formdata: data,
                url: baseUrlSrvc.baseUrl + 'updateUserDetails'
            };
            var promisePost = CRUD_SERVICE.post(FormData);
            promisePost.then(function (pl) {
               
               $timeout(function() {
                    $scope.$apply(function () {
                    $route.reload();
                    //GetAllRecords(urlList);
                    });
                },3000);
                 toaster.success({title: "Success", body:$scope.toasterUpdatedSuccess,tapToDismiss: true,showCloseButton: true});
                
                //ClearModels();
            }, function (err) {
                //console.log(err);
                
                $timeout(function() {
                    $scope.$apply(function () {
                    //$route.reload();
                    //GetAllRecords(urlList);
                    });
                },100);
                toaster.error({title: "Error", body:$scope.toasterUpdatedError,tapToDismiss: true,showCloseButton: true});
                 
                //ClearModels();
            });
       
    };
    /*=====  End of Save User   ======*/
   
   
});