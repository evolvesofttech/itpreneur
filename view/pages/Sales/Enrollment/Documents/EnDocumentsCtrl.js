/*=========================================
=            Technology Controller            =
=========================================*/
angular.module('theGuru').controller("documentCtrl", function($rootScope, $scope, $log, 
    $routeParams, $http,
  $route,CRUD_SERVICE, baseUrlSrvc, $filter, $sessionStorage, 
  $timeout, ngTableParams, Flash, toaster, Form_no, pdfDelegate, 
  firstNameService, middleNameService, lastNameService, Upload) {
       
      //console.log("documentCtrl");
      
      $scope.thisInstituteId = $sessionStorage.userData1.inInstituteId;
     $scope.documentArray = [];
      $scope.OperType = $routeParams.ID;
      $scope.FormNumber =Form_no.getForm_no();
      //console.log("$scope.FormNumber",$scope.FormNumber);
 
      
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


     var f_name =firstNameService.getFirstName();
      var m_name =middleNameService.getMiddleName();
      var l_name =lastNameService.getLastName();


       $scope.fullName = f_name + ' ' + m_name + ' ' + l_name;
      //console.log($scope.fullName);

      /*==============================================
      =            Get Qualification List            =
      ==============================================*/
      var urlQuaList = baseUrlSrvc.baseUrl + 'listQualificationByEnquiryFormId/' + $scope.OperType;
      GetAllQualificationRecords(urlQuaList);

      //To Get All Records
      function GetAllQualificationRecords(url) {
          $scope.quaMasterArray = [];
          //console.log("List Call");
          var promiseGet = CRUD_SERVICE.getAllData(url);
          promiseGet.then(function (pl) {
                  $scope.StudentQualificationDocuments = pl.data;
              },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
      }
      /*=====  End of Get Qualification List  ======*/

      

      /*=========================================
      =            Get Document List            =
      =========================================*/
      var urlDocumentList = baseUrlSrvc.baseUrl + 'listDocumentByEnquiryFormId/' + $scope.OperType;
      GetAllDocumentRecords(urlDocumentList);

      //To Get All Records
      function GetAllDocumentRecords(url) {
          $scope.documentArray = [];
          var promiseGet = CRUD_SERVICE.getAllData(url);
          promiseGet.then(function (pl) {
                  $scope.Documents = pl.data;

                  /*======================================
                  =            Get List source            =
                  ======================================*/
                  var urlQuaList = baseUrlSrvc.baseUrl + 'listQualificationByEnquiryFormId/' + $scope.OperType;
                  GetAllQualificationRecords(urlQuaList);

                  //To Get All Records
                  function GetAllQualificationRecords(url) {
                      $scope.quaMasterArray = [];
                      var promiseGet = CRUD_SERVICE.getAllData(url);
                      promiseGet.then(function (pl) {
                              $scope.Qualification_a = pl.data;

                              //console.log("$scope.Qualification_a",$scope.Qualification_a);
                          },
                          function (errorPl) {
                              $log.error('Some Error in Getting Records.', errorPl);
                          });
                  }
                  /*=====  End of Get List source  ======*/


                  $timeout(function() {
                        $scope.$apply(function () {

                          

                          //console.log("$scope.Documents",$scope.Documents);

                          $timeout(function() {
                        $scope.$apply(function () {
                          $scope.SSCAdded = false;
                          $scope.HSCAdded = false;
                          $scope.GraduationAdded = false;
                          $scope.PostGraduationAdded = false;
                          $scope.DiplomaAdded = false;


                          //console.log("$scope.Qualification_a.length", $scope.Qualification_a.length);
                          for(var i=0;i<$scope.Qualification_a.length;i++) {

                            if ($scope.Qualification_a[i].qualificationname == 'SSC') {
                              $scope.SSCAdded = true;
                              //console.log("SSC 1st For",$scope.SSCAdded);
                            } 
                            // else {
                            //   $scope.SSCAdded = false;
                            //   //console.log("SSC 1st For",$scope.SSCAdded);
                            // }

                            if ($scope.Qualification_a[i].qualificationname == 'HSC') {
                              $scope.HSCAdded = true;
                            } 
                            // else {
                            //   $scope.HSCAdded = false;
                            // }

                            if ($scope.Qualification_a[i].qualificationname == 'Graduation') {
                              $scope.GraduationAdded = true;
                              //console.log("$scope.GraduationAdded",$scope.GraduationAdded);
                            } 
                            // else {
                            //   $scope.GraduationAdded = false;
                            //   //console.log("$scope.GraduationAdded",$scope.GraduationAdded);
                            // }

                            if ($scope.Qualification_a[i].qualificationname == 'Post Graduation') {
                              $scope.PostGraduationAdded = true;
                            } 
                            // else {
                            //   $scope.PostGraduationAdded = false;
                            // }

                            if ($scope.Qualification_a[i].qualificationname == 'Diploma') {
                              $scope.DiplomaAdded = true;
                              
                            } 
                            // else {
                            //   $scope.DiplomaAdded = false;
                            //   //console.log("$scope.DiplomaAdded",$scope.DiplomaAdded);
                            // }

                          }

                          });
                        },500);


                          $timeout(function() {
                        $scope.$apply(function () {
                          
                          if ($scope.Documents.length != 0) {
                            //console.log("For starts");
                            

                            for (var i = 0; i < $scope.Documents.length; i++) {

                              if ($scope.Documents[i].documentname == 'SSC Marksheet') {
                              
                                if ($scope.Documents[i].documentname == 'SSC Marksheet' && $scope.SSCAdded == true) {
                                    //console.log("1st SSC IF");
                                    $scope.hideSSC = true;
                                    //console.log("$scope.hideSSC",$scope.hideSSC);
                                    break;
                                }
                                if ($scope.Documents[i].documentname != 'SSC Marksheet' && $scope.SSCAdded == true) {
                                    $scope.hideSSC = false;
                                    //console.log("2nd SSC IF");
                                    //console.log("$scope.hideSSC",$scope.hideSSC);
                                    break;
                                }
                                if ($scope.Documents[i].documentname != 'SSC Marksheet' && $scope.SSCAdded == false) {
                                    $scope.hideSSC = true;
                                    //console.log("3rd SSC IF");
                                    //console.log("$scope.hideSSC",$scope.hideSSC);
                                    break;
                                }
                                ////console.log("SSC",$scope.SSCAdded);
                              } else {

                                //console.log("SSC ELse 1");

                                if ($scope.SSCAdded == true) {
                                  $scope.hideSSC = false;
                                } else {
                                  $scope.hideSSC = true;
                                  
                                }

                              }
                              
                           }
                           
                           for (var i = 0; i < $scope.Documents.length; i++) {

                            if ($scope.Documents[i].documentname == 'HSC Marksheet') {

                                //console.log("HSC For Loop Documents");
                                if ($scope.Documents[i].documentname == 'HSC Marksheet' && $scope.HSCAdded == true) {
                                    ////console.log("HSC");
                                    $scope.hideHSC = true;
                                    //console.log("1 HSC IF");
                                    break;
                                  }

                                  if ($scope.Documents[i].documentname != 'HSC Marksheet' && $scope.HSCAdded == true) {
                                    ////console.log("HSC");
                                    $scope.hideHSC = false;
                                    //console.log("2 HSC IF");
                                    break;
                                  }
                                  if ($scope.Documents[i].documentname != 'HSC Marksheet' && $scope.HSCAdded == false) {
                                    $scope.hideHSC = true;
                                    //console.log("3rd HSC IF");
                                    ////console.log("$scope.hideSSC",$scope.hideSSC);
                                    break;
                                  }
                                } else {

                                  if ($scope.HSCAdded == true) {
                                    $scope.hideHSC = false;
                                  } else {
                                    $scope.hideHSC = true;
                                  }
                                  
                                }


                              }

                           for (var i = 0; i < $scope.Documents.length; i++) {
                              if ($scope.Documents[i].documentname == 'Photo') {
                                  //console.log("Photo");
                                  $scope.hidePhoto = true;

                                }
                            }
                           for (var i = 0; i < $scope.Documents.length; i++) {
                              if ($scope.Documents[i].documentname == 'ID Proof') {
                                  //console.log("ID Proof");
                                  $scope.hideIDP = true;
                                }
                            }
                           for (var i = 0; i < $scope.Documents.length; i++) {
                              if ($scope.Documents[i].documentname == 'Address Proof') {
                                  //console.log("Address Proof");
                                  $scope.hideAdd = true;
                                }
                                }
                           for (var i = 0; i < $scope.Documents.length; i++) {
                              if ($scope.Documents[i].documentname == 'Resume') {
                                  //console.log("Resume");
                                  $scope.hideRes = true;
                                }
                            }
                           for (var i = 0; i < $scope.Documents.length; i++) {
                              if ($scope.Documents[i].documentname == 'Experience') {
                                  //console.log("Experience");
                                  $scope.hideExp = true;
                                }
                            }

                           for (var i = 0; i < $scope.Documents.length; i++) {

                              if ($scope.Documents[i].documentname == 'Graduation Marksheet') {

                                if ($scope.Documents[i].documentname == 'Graduation Marksheet' && $scope.GraduationAdded == true) {
                                    //console.log("If Graduation Marksheet");
                                    $scope.hideGraduation = true;
                                    break;
                                  }

                                  if ($scope.Documents[i].documentname != 'Graduation Marksheet' && $scope.GraduationAdded == true) {
                                    //console.log("Else Graduation Marksheet");
                                    $scope.hideGraduation = false;
                                    break;
                                  }

                                  if ($scope.Documents[i].documentname != 'Graduation Marksheet' && $scope.GraduationAdded == false) {
                                    $scope.hideGraduation = true;
                                    break;
                                  }

                                } else {

                                  if ($scope.GraduationAdded == true) {
                                    $scope.hideGraduation = false;
                                  } else {
                                    $scope.hideGraduation = true;
                                  }
                                  
                                }


                            }

                           for (var i = 0; i < $scope.Documents.length; i++) {

                              if ($scope.Documents[i].documentname == 'Post Graduation Marksheet') {
                                if ($scope.Documents[i].documentname == 'Post Graduation Marksheet' && $scope.PostGraduationAdded == true) {
                                    //console.log("if Post Graduation Marksheet 0");
                                    $scope.hidePostGraduation = true;
                                    break;
                                  }

                                  if ($scope.Documents[i].documentname != 'Post Graduation Marksheet' && $scope.PostGraduationAdded == true) {
                                    //console.log("if Post Graduation Marksheet 1");
                                    $scope.hidePostGraduation = false;
                                    break;
                                  }

                                  if ($scope.Documents[i].documentname != 'Post Graduation Marksheet' && $scope.PostGraduationAdded == false) {
                                    //console.log("if Post Graduation Marksheet 2");
                                    $scope.hidePostGraduation = true;
                                    break;
                                  }
                                } else {
                                  //console.log("Else PG");

                                  if ($scope.PostGraduationAdded == true) {
                                    $scope.hidePostGraduation = false;
                                  } else {
                                    $scope.hidePostGraduation = true;
                                  }
                                  
                                }
                            }
                           for (var i = 0; i < $scope.Documents.length; i++) {
                              

                              if ($scope.Documents[i].documentname == 'Diploma Marksheet') {

                                if ($scope.Documents[i].documentname == 'Diploma Marksheet' && $scope.DiplomaAdded == true) {
                                    //console.log("Diploma Marksheet");
                                    $scope.hideDiploma = true;
                                    break;
                                  }
                                  if ($scope.Documents[i].documentname != 'Diploma Marksheet' && $scope.DiplomaAdded == true) {
                                    //console.log("Diploma Marksheet");
                                    $scope.hideDiploma = false;
                                    break;
                                  }

                                  if ($scope.Documents[i].documentname != 'Diploma Marksheet' && $scope.DiplomaAdded == false) {
                                    //console.log("Diploma Marksheet");
                                    $scope.hideDiploma = true;
                                    break;
                                  }

                                } else {
                                  
                                  if ($scope.DiplomaAdded == true) {
                                    $scope.hideDiploma = false;
                                  } else {
                                    $scope.hideDiploma = true;
                                  }

                                }

                            } //for ends
                            //console.log("For ends");
                          } else {
                              //console.log("Else Starts");


                              if ($scope.SSCAdded == true) {
                                ////console.log("HSC");
                                $scope.hideSSC = false;
                                //console.log("1 SSC if");
                              } else {
                                $scope.hideSSC = true;
                              } //SSC Ends


                            if ($scope.HSCAdded == true) {
                                ////console.log("HSC");
                                $scope.hideHSC = false;
                                //console.log("1 HSC if");
                              } else {
                                $scope.hideHSC = true;
                              } //HSC Ends

                              if ($scope.GraduationAdded == true) {
                                ////console.log("HSC");
                                $scope.hideGraduation = false;
                                //console.log("1 hideGraduation if");
                              } else {
                                $scope.hideGraduation = true;
                              } //Graduation Ends

                              if ($scope.PostGraduationAdded == true) {
                                ////console.log("HSC");
                                $scope.hidePostGraduation = false;
                                //console.log("1 hidePostGraduation if");
                              } else {
                                $scope.hidePostGraduation = true;
                              } //PostGraduation Ends

                              if ($scope.DiplomaAdded == true) {
                                ////console.log("HSC");
                                $scope.hideDiploma = false;
                                //console.log("1 hideDiploma if");
                              } else {
                                $scope.hideDiploma = true;
                              } //Diploma Ends





                          } //else ends

                          });
                        },1000);

                  });
                },2000); //timeout ends



                  $scope.documentArray.push($scope.Documents);

                  $scope.usersTable_Document = new ngTableParams({
                      page: 1,
                      count: 10
                  }, {
                     total: $scope.Documents.length, 
                      getData: function ($defer, params) {

                        if (params.settings().$scope == null) {
                                params.settings().$scope = $scope;
                              }
                      
                          $scope.data_Documents = params.sorting() ? $filter('orderBy')($scope.documentArray[0], params.orderBy()) : $scope.documentArray[0];
                          $scope.data_Documents = params.filter() ? $filter('filter')($scope.data_Documents, params.filter()) : $scope.data_Documents;
                         $scope.data_Documents = $scope.data_Documents.slice((params.page() - 1) * params.count(), params.page() * params.count());
                         $defer.resolve($scope.data_Documents)
                      }
                  });
                  $scope.usersTable_Document.reload();

                  
              },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
        }
      
      
      /*=====  End of Get Document List  ======*/

      // $scope.hideSSC = true;
      // $scope.hideHSC = true;
      // $scope.hideGraduation = true;
      // $scope.hidePostGraduation = true;
      // $scope.hideDiploma = true;





    

      /*=====================================
      =            Add Doc Click            =
      =====================================*/
      $scope.addDocClick = function() {

        $scope.picFile = "";
        $scope.picFile.progress = 0;
        $scope.picFile1 = "";
        $scope.picFile1.progress = 0;
        $scope.picFile2 = "";
        $scope.picFile2.progress = 0;
        $scope.picFile3 = "";
        $scope.picFile3.progress = 0;
        $scope.picFile4 = "";
        $scope.picFile4.progress = 0;
        $scope.picFile5 = "";
        $scope.picFile5.progress = 0;
        $scope.picFile6 = "";
        $scope.picFile6.progress = 0;
        $scope.picFile7 = "";
        $scope.picFile7.progress = 0;
        $scope.picFile8 = "";
        $scope.picFile8.progress = 0;
        $scope.picFile9 = "";
        $scope.picFile9.progress = 0;
      }
      /*=====  End of Add Doc Click  ======*/

      $scope.HSCHardcopy= function(data){
          //console.log(data);
          // data.enquiryformno = $scope.currentBranchInitials + $scope.currentYear;
          data.inInstituteId = $sessionStorage.inInstituteId;
          data.createdby = $sessionStorage.createdby;
          data.updatedby = $sessionStorage.updatedby;
          data.bBranchIdSession = $sessionStorage.bBranchId;
          data.adUserId = $sessionStorage.adUserId;
          data.documentname = "HSC Marksheet";
          data.documenttype = "Hardcopy";
        
          var FormData = {
              formdata: data,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisePut.then(function(pl) {
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }

      /*=====================================
      =            View Document            =
      =====================================*/
      $scope.viewDocument = function(id, path, pdata) {
        //console.log(path);
        $scope.selectedImagePath = path;

        $scope.urlFIle = $scope.selectedImagePath;

        $scope.DocUrl="https://docs.google.com/gview?url="+ $scope.urlFIle+"&embedded=true";

        //console.log("urlFIle",$scope.DocUrl);

        $scope.fileExtension = $scope.urlFIle.substr($scope.urlFIle.lastIndexOf(".") + 1);

        //console.log("$scope.fileExtension",$scope.fileExtension);

        $scope.temp_var_d = $filter('filter')(pdata, { "eDocumentId": id });
        //console.log("$scope.temp_var_d",$scope.temp_var_d);

         $scope.viewSelectedDocumentData= {
            "eDocumentId": $scope.temp_var_d[0].eDocumentId,
            "documentname": $scope.temp_var_d[0].documentname
         };

         //console.log("$scope.viewSelectedDocumentData",$scope.viewSelectedDocumentData);
      }
      /*=====  End of View Document  ======*/

      /*=========================================
      =            Save SSC Hardcopy            =
      =========================================*/
      $scope.saveSSCHardcopy = function(data) {

        //console.log("savehardcopy",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "SSC Marksheet";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
        
    
      /*=====  End of Save SSC Hardcopy  ======*/
      
      
      /*================================
      =            Save Doc            =
      ================================*/
      $scope.saveDocument = function(data3, ind, my) {
        //console.log("data3", data3);
        //console.log("ind", ind);
        //console.log("my", my);
        var index = JSON.stringify(ind);
        $scope.documentname = data3.qualificationname;
        //console.log($scope.documentname);
        
        // $scope.myFile = $scope.myFile + index;
        // //console.log($scope.myFile);

        var file1 = $scope.myFile01;
        var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd1 = new FormData();

        fd1.append('file', file1);
        fd1.append('documentname',$scope.documentname);
        fd1.append('documenttype',$scope.dType);
        fd1.append('eEnquiryFormId',$scope.OperType);
        fd1.append('inInstituteId',$sessionStorage.inInstituteId);
        fd1.append('bBranchId',$sessionStorage.bBranchId);
        fd1.append('createdby',$sessionStorage.createdby);
        fd1.append('updatedby',$sessionStorage.updatedby);
        fd1.append('enquiryformno',$scope.FormNumber);

         
        $http.post(uploadUrl, fd1, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).success(function() {
            //console.log('success');
            $timeout(function() {
                $scope.$apply(function () {
                GetAllDocumentRecords(urlDocumentList);
                toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
                });
            },100);
        }).error(function() {
            //console.log('error');
            $timeout(function() {
                $scope.$apply(function () {
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
                });
            },100);
        });
      }
      /*=====  End of Save Doc  ======*/
      
      $scope.dType = "Softcopy";
      //console.log("dType", $scope.dType);

      /*====================================
      =            SSC Checkbox            =
      ====================================*/
      $scope.checkSSC = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType = "Hardcopy";
            //console.log("dType", $scope.dType);
        } else {
            $scope.dType = "Softcopy";
            //console.log("dType", $scope.dType);
        }   
      }
      /*=====  End of SSC Checkbox  ======*/

      /*================================
      =            Save SSC            =
      ================================*/
      $scope.saveSSC = function(sscData, fl) {
        ////console.log("sscData", sscData);
        
        $scope.documentname = "SSC Marksheet";
        ////console.log("dType", $scope.dType);

        var file = fl;
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        fd.append('file', file);
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     ////console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     ////console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Save SSC  ======*/

      
      /*=========================================
      =            Save HSC Hardcopy           =
      =========================================*/
      $scope.saveHSCHardcopy = function(data) {

        //console.log("savehardcopy",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "HSC Marksheet";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
        
      /*=====  End of Save HSC Hardcopy  ======*/
      


      /*================================
      =            Save HSC            =
      ================================*/
      $scope.dType1 = "Softcopy";

      $scope.checkHSC = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType1 = "Hardcopy";
        } else {
            $scope.dType1 = "Softcopy";
        }   
      }

      $scope.saveHSC = function(hscData, fl) {
        ////console.log("hscData", hscData);
        ////console.log($scope.dType1);
        
        
        $scope.documentname = "HSC Marksheet";

        //if ($scope.dType1 = "Softcopy") {
         //var file = $scope.myFile1;
          var file = fl;
        //}
        
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        //if ($scope.dType1 = "Softcopy") {
          fd.append('file', file);
        //}
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType1);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Save HSC  ======*/

      /*==================================
      =            Save Photo            =
      ==================================*/
      $scope.savePhotoHardcopy = function(data) {

        //console.log("",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "Photo";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      $scope.dType6 = "Softcopy";

      $scope.checkPhoto = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType6 = "Hardcopy";
        } else {
            $scope.dType6 = "Softcopy";
        }   
      }

      $scope.savePhoto = function(photoData, fl) {
        // //console.log("photoData", photoData);
        // //console.log($scope.dType6);
        
        
        $scope.documentname = "Photo";

        //if ($scope.dType6 = "Softcopy") {
        var file = fl;
        //}
        
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        //if ($scope.dType6 = "Softcopy") {
          fd.append('file', file);
        //}
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType6);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Save Photo  ======*/

      /*============================================
      =            Graduation Marksheet            =
      ============================================*/
      $scope.saveGraduationHardcopy = function(data) {

        //console.log("",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "Graduation Marksheet";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      $scope.dType7 = "Softcopy";

      $scope.checkGraduation = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType7 = "Hardcopy";
        } else {
            $scope.dType7 = "Softcopy";
        }   
      }

      $scope.saveGraduation = function(graduationData, fl) {
        ////console.log("graduationData", graduationData);
        ////console.log($scope.dType7);
        
        
        $scope.documentname = "Graduation Marksheet";

        //if ($scope.dType7 = "Softcopy") {
          var file = fl;
        //}
        
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        //if ($scope.dType7 = "Softcopy") {
        fd.append('file', file);
        //}
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType7);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Graduation Marksheet  ======*/
      
      /*=================================================
      =            Post Graduation Marksheet            =
      =================================================*/
      $scope.savePostGraduationHardcopy = function(data) {

        //console.log("",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "Post Graduation Marksheet";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      $scope.dType8 = "Softcopy";

      $scope.checkPostGraduation = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType8 = "Hardcopy";
        } else {
            $scope.dType8 = "Softcopy";
        }   
      }

      $scope.savePostGraduation = function(postgraduationData, fl) {
        ////console.log("postgraduationData", postgraduationData);
        ////console.log($scope.dType8);
        
        
        $scope.documentname = "Post Graduation Marksheet";

        //if ($scope.dType8 = "Softcopy") {
          var file = fl;
        //}
        
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        //if ($scope.dType8 = "Softcopy") {
          fd.append('file', file);
        //}
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType8);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Post Graduation Marksheet  ======*/

      /*============================================
      =            Graduation Marksheet            =
      ============================================*/
      $scope.saveDiplomaHardcopy = function(data) {

        //console.log("",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "Diploma Marksheet";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      $scope.dType9 = "Softcopy";

      $scope.checkDiploma = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType9 = "Hardcopy";
        } else {
            $scope.dType9 = "Softcopy";
        }   
      }

      $scope.saveDiploma = function(diplomaData, fl) {
        ////console.log("diplomaData", diplomaData);
        ////console.log($scope.dType9);
        
        
        $scope.documentname = "Diploma Marksheet";

        //if ($scope.dType9 = "Softcopy") {
        var file = fl;
        //}
        
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        //if ($scope.dType9 = "Softcopy") {
          fd.append('file', file);
        //}
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType9);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Graduation Marksheet  ======*/
      


      /*========================================
      =            Save ID Hardcopy            =
      ========================================*/
      $scope.saveIDHardcopy = function(data) {

        //console.log("savehardcopy",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "ID Proof";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      
      /*=====  End of Save ID Hardcopy  ======*/
      

      /*===============================
      =            Save ID            =
      ===============================*/
      $scope.dType2 = "Softcopy";

      $scope.checkID = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType2 = "Hardcopy";
        } else {
            $scope.dType2 = "Softcopy";
        }   
      }

      $scope.saveID = function(idData, fl) {
        ////console.log("idData", idData);
        
        $scope.documentname = "ID Proof";

        var file = fl;
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        fd.append('file', file);
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType2);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Save ID  ======*/

      /*====================================
      =            Save Address            =
      ====================================*/
      $scope.dType3 = "Softcopy";

      $scope.checkAddess = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType3 = "Hardcopy";
        } else {
            $scope.dType3 = "Softcopy";
        } 
      }

      $scope.saveAddress = function(addData, fl) {
        ////console.log("addData", addData);
        
        $scope.documentname = "Address Proof";

        var file = fl;
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        fd.append('file', file);
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType3);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('adUserId',$sessionStorage.adUserId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Save Address  ======*/


      /*========================================
      =            Save Address Hardcopy            =
      ========================================*/
      $scope.saveAddressHardcopy = function(data) {

        //console.log("savehardcopy",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "Address Proof";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      
      /*=====  End of Save Address Hardcopy  ======*/
      


      /*===================================
      =            Save Resume            =
      ===================================*/
      $scope.dType4 = "Softcopy";

      $scope.checkResume = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType4 = "Hardcopy";
        } else {
            $scope.dType4 = "Softcopy";
        } 
      }

      $scope.saveResume = function(resData, fl) {
        ////console.log("resData", resData);
        
        $scope.documentname = "Resume";

        var file = fl;
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        fd.append('file', file);
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType4);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Save Resume  ======*/

      /*========================================
      =            Save Resume Hardcopy            =
      ========================================*/
      $scope.saveResumeHardcopy = function(data) {

        //console.log("savehardcopy",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "Resume";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      
      /*=====  End of  Save Resume Hardcopy  ======*/

      /*================================
      =            Save Exp            =
      ================================*/
      $scope.dType5 = "Softcopy";

      $scope.checkExp = function(val) {
        //console.log(val);
        if (val == true) {
            $scope.dType5 = "Hardcopy";
        } else {
            $scope.dType5 = "Softcopy";
        } 
      }

      $scope.saveExp = function(expData, fl) {
        ////console.log("expData", expData);
        
        $scope.documentname = "Experience";

        var file = fl;
        //var uploadUrl = baseUrlSrvc.baseUrl + 'documentupload';
        var fd = new FormData();

        fd.append('file', file);
        fd.append('documentname',$scope.documentname);
        fd.append('documenttype',$scope.dType5);
        fd.append('eEnquiryFormId',$scope.OperType);
        fd.append('inInstituteId',$sessionStorage.inInstituteId);
        fd.append('bBranchId',$sessionStorage.bBranchId);
        fd.append('createdby',$sessionStorage.createdby);
        fd.append('updatedby',$sessionStorage.updatedby);
        fd.append('enquiryformno',$scope.FormNumber);

        file.upload = Upload.http({
          url: baseUrlSrvc.baseUrl + 'documentupload',
          method: 'POST',
          headers: {
            'Content-Type': undefined
          },
          data: fd
        });

        file.upload.then(function (response) {
          file.result = response.data;
          GetAllDocumentRecords(urlDocumentList);
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        });

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });

         
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {
        //         'Content-Type': undefined
        //     }
        // }).success(function() {
        //     //console.log('success');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //         GetAllDocumentRecords(urlDocumentList);
        //         toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // }).error(function() {
        //     //console.log('error');
        //     $timeout(function() {
        //         $scope.$apply(function () {
        //        toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
        //         });
        //     },100);
        // });
      }
      /*=====  End of Save Exp  ======*/


      /*========================================
      =            Save Experience Hardcopy            =
      ========================================*/
      $scope.saveExpHardcopy = function(data) {

        //console.log("savehardcopy",data);
        var array={};
        array.inInstituteId = $sessionStorage.inInstituteId;
          array.createdby = $sessionStorage.createdby;
          array.updatedby = $sessionStorage.updatedby;
          array.bBranchIdSession = $sessionStorage.bBranchId;
          array.eEnquiryFormId = $scope.OperType;
          array.bBranchId = $sessionStorage.bBranchId;
          array.adUserId = $sessionStorage.adUserId;
          array.documentname = "Experience";
          array.documenttype = data;
        
          var FormData = {
              formdata: array,
              url: baseUrlSrvc.baseUrl + 'addUpdateDocument'
          };

          var promisessc = CRUD_SERVICE.put($routeParams.ID, FormData);
          promisessc.then(function(pl) {
            $scope.eDocumentId = pl.data.eDocumentId;
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.success({title: "Success", body:$scope.toasterAddedSuccess,tapToDismiss: true,showCloseButton: true});
          }, function(err) {
              //console.log("Some Error Occured." + err);
              $timeout(function() {
                  $scope.$apply(function () {
                  GetAllDocumentRecords(urlDocumentList);
                  });
              },100);
               toaster.error({title: "Error", body:$scope.toasterAddedError,tapToDismiss: true,showCloseButton: true});
          });
      }
      
      
      /*=====  End of  Save Experience Hardcopy  ======*/

      /*=======================================
      =            Delete Document            =
      =======================================*/
      $scope.delDocument = function(id, ddata) {
           //console.log(id); 

         
          $scope.temp_var_a = $filter('filter')(ddata, { "eDocumentId": id });

             $scope.deleteDocumentData= {
                "eDocumentId": $scope.temp_var_a[0].eDocumentId,
                "documentname": $scope.temp_var_a[0].documentname,
                "path": $scope.temp_var_a[0].path
             };
          }

          $scope.deleteDocument = function(id, doc) {
          //console.log(id);
          //console.log(doc);

            if (doc == 'SSC Marksheet') {
              $scope.hideSSC = false;
            }

            if (doc == 'HSC Marksheet') {
              $scope.hideHSC = false;
            }

            if (doc == 'ID Proof') {
              $scope.hideIDP = false;
            }

            if (doc == 'Address Proof') {
              $scope.hideAdd = false;
            }

            if (doc == 'Resume') {
              $scope.hideRes = false;
            }

            if (doc == 'Experience') {
              $scope.hideExp = false;
            }

            if (doc == 'Photo') {
              $scope.hidePhoto = false;
            }

            if (doc == 'Graduation Marksheet') {
              $scope.hideGraduation = false;
            }

            if (doc == 'Post Graduation Marksheet') {
              $scope.hidePostGraduation = false;
            }

            if (doc == 'Diploma Marksheet') {
              $scope.hideDiploma = false;
            }


              var FormData = {
                  id: id,
                  url: baseUrlSrvc.baseUrl + 'deleteDocument'
              };
              var promiseDelete = CRUD_SERVICE.delete(FormData);
              promiseDelete.then(function(pl) {
                 $timeout(function() {
                          $scope.$apply(function () {
                          GetAllDocumentRecords(urlDocumentList);
                          });
                      },100);
                       toaster.success({title: "Success", body:$scope.toasterDeletedSuccess,tapToDismiss: true,showCloseButton: true});
              }, function(err) {
                  //console.log("Some Error Occured." + err);
                  $timeout(function() {
                          $scope.$apply(function () {
                          GetAllDocumentRecords(urlDocumentList);
                          });
                      },100);
                       toaster.error({title: "Error", body:$scope.toasterDeletedError,tapToDismiss: true,showCloseButton: true});
              });
          }
      
      
      /*=====  End of Delete Document  ======*/
      
     
});
/*=====  End of School Controller  ======*/