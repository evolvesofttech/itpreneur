(function () {

    "use strict";

  
    var App = angular.module("App.controllers", []);

    App.controller("toggleCtrl", ["$scope", function($scope) {
        $scope.toggleClick = function() {
            $scope.boolChangeClass = $scope.boolChangeClass;
            // $scope.$apply();
        }

    }]);

    App.controller("menuCtrl", ["$scope", "$http", function ($scope, $http) {
        //$scope.MainHeader="test";
        $scope.forLeftMenu = function (jname, menuName) {

            $scope.MainHeader = menuName;
            //console.log($scope.MainHeader);
            $http.get("data/" + jname + ".json")
                .then(function (response) {


                    setTimeout(function () {
                        $scope.$watch(function () {
                            $scope.leftMenu = response.data;

                            //console.log($scope.leftMenu);
                        });
                    }, 2000);


                });
        }

  }]);



    // ==================================================For Registration===============================================

    App.controller("registerCtrl", function ($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc) {
        //console.log("register");
        $scope.registerArray = [];
        $scope.OperType = $routeParams.ID;

        //console.log($scope.OperType);
        //1 Mean New Entry
        var urlList = baseUrlSrvc.baseUrl + 'listRegistration';
        GetAllRecords(urlList);
        //To Get All Records
        function GetAllRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.register = pl.data;
                    $scope.registerArray.push($scope.register);
                    //console.log($scope.registerArray);
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }


        //To Create new record and Edit an existing Record.
        $scope.save = function (data) {
            //console.log(data);

            if ($scope.OperType === '0') {
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'registration'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function (pl) {
                    // $scope.boardId = pl.data.boardId;
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    // ClearModels();
                }, function (err) {
                    //console.log(err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            } else {
                //  //console.log(/edit);
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'registration'
                };
                //Edit the record
                // debugger;

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function (pl) {
                    $scope.Message = "Data Updated Successfuly";
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log("Some Error Occured." + err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            }
        };
    });

    // ===============================End of Registration=============================================

    App.controller("test", ["$scope", "$http", function ($scope, $http) {
        $scope.MainHeader = "test";
        $scope.forLeftMenu = function (jname, menuName) {

            $scope.MainHeader = menuName;
            //console.log($scope.MainHeader);
            $http.get("data/" + jname + ".json")
                .then(function (response) {


                    setTimeout(function () {
                        $scope.$watch(function () {
                            $scope.leftMenu = response.data;

                            //console.log($scope.leftMenu);
                        });
                    }, 1000);


                });
        }

  }]);




   
    //==================================For Student===================================

    App.controller("studentCtrl", function ($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc) {
        //console.log("student");
        //-----------------------------this is for state select options---------------------
        var stateListUrl = baseUrlSrvc.baseUrl + 'listState';
        var promiseStateGet = CRUD_SERVICE.getAllData(stateListUrl);
        promiseStateGet.then(function (pl) {
                $scope.State = pl.data;

                //console.log($scope.studentArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        //-----------------------------end of state select----------------------------------

        //-----------------------------this is for District select options---------------------
        var districtListUrl = baseUrlSrvc.baseUrl + 'listDistrict/stateId';
        var promiseDistrictGet = CRUD_SERVICE.getAllData(districtListUrl);
        promiseDistrictGet.then(function (pl) {
                $scope.District = pl.data;

                //console.log($scope.studentArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        //-----------------------------end of District select----------------------------------

        //-----------------------------this is for Taluka select options---------------------
        var talukaListUrl = baseUrlSrvc.baseUrl + 'listTaluka/2';
        var promiseTalukaGet = CRUD_SERVICE.getAllData(talukaListUrl);
        promiseTalukaGet.then(function (pl) {
                $scope.Taluka = pl.data;

                //console.log($scope.studentArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        //-----------------------------end of Taluka select----------------------------------

        //-----------------------------this is for Relegion select options---------------------
        var relegionListUrl = baseUrlSrvc.baseUrl + 'listReligion';
        var promiseRelegionGet = CRUD_SERVICE.getAllData(relegionListUrl);
        promiseRelegionGet.then(function (pl) {
                $scope.Relegion = pl.data;

                //console.log($scope.schoolArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        //-----------------------------end of Relegion select----------------------------------
        $scope.boardArray = [];
        $scope.OperType = $routeParams.ID;

        //console.log($scope.OperType);
        //1 Mean New Entry
        var urlList = baseUrlSrvc.baseUrl + 'listStudent';
        GetAllRecords(urlList);
        //To Get All Records
        function GetAllRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.student = pl.data;
                    $scope.boardArray.push($scope.student);
                    //console.log($scope.boardArray);
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }

        //To Clear all input controls.
        function ClearModels() {
            $scope.teacherData = {};
        }
        //console.log($scope.boardArray);
        if ($scope.OperType != '0') {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.teacher1 = pl.data;

                    for (var i = 0; i < $scope.teacher1.length; i++) {
                        if ($scope.teacher1[i].ad_teacher_id == $scope.OperType) {
                            $scope.teacherData = $scope.teacher1[i];
                        }
                    }

                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });

        }
        //To Create new record and Edit an existing Record.
        $scope.save = function (data) {
            //console.log(data);

            if ($scope.OperType === '0') {
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateStudent'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function (pl) {
                    $scope.ad_teacher_id = pl.data.ad_teacher_id;
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log(err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            } else {
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateStudent'
                };
                //Edit the record
                // debugger;

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function (pl) {
                    $scope.Message = "Data Updated Successfuly";
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log("Some Error Occured." + err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            }
        };

        //To Get Student Detail on the Base of Student ID
        $scope.get = function (Student) {
            var promiseGetSingle = CRUD_SERVICE.get(Student.StudentID);
            promiseGetSingle.then(function (pl) {
                    var res = pl.data;
                    $scope.StudentID = res.StudentID;
                    $scope.Name = res.Name;
                    $scope.Email = res.Email;
                    $scope.Class = res.Class;
                    $scope.EnrollYear = res.EnrollYear;
                    $scope.City = res.City;
                    $scope.Country = res.Country;
                    $scope.OperType = 0;
                },
                function (errorPl) {
                    //console.log('Some Error in Getting Details', errorPl);
                });
        }

        //To Delete Record
        $scope.delete = function (id) {
            //console.log(id);
            var FormData = {
                id: id,
                url: baseUrlSrvc.baseUrl + 'deleteStudent'
            };
            var promiseDelete = CRUD_SERVICE.delete(FormData);
            promiseDelete.then(function (pl) {
                $scope.Message = " Deleted Successfuly";
                GetAllRecords(urlList);
                $scope.success = true;
                $scope.danger = false;
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);
                $scope.success = false;
                $scope.danger = true;
            });
        }
    });



    //==================================end of student================================
    

    App.controller("scheduleCtrl", function ($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter) {
        //console.log("schedule");


        $scope.init = function(){
            $scope.status = true;
          }
          
          $scope.changeStatus = function(){
            $scope.status = !$scope.status;
          }
        //-----------------------------this is for board select options---------------------
        var instituteListUrl = baseUrlSrvc.baseUrl + 'listInstitute';
        var promiseInstituteGet = CRUD_SERVICE.getAllData(instituteListUrl);
        promiseInstituteGet.then(function (pl) {
                $scope.institute = pl.data;

                //console.log($scope.institute);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        //-----------------------------end of board select----------------------------------

         $scope.OnInstituteChange=function(id)
       {
         //console.log(id);
            var schoolListUrl = baseUrlSrvc.baseUrl + 'listSchool';
            var promiseSchoolGet = CRUD_SERVICE.getAllData(schoolListUrl);
                promiseSchoolGet.then(function (pl) {
                $scope.SchoolData = pl.data;

                $scope.School = $filter('filter')($scope.SchoolData, { "ad_institute_id": id });
                //console.log($scope.scheduleArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }


       $scope.OnSchoolChange=function(id)
       {
         //console.log(id);
            var classListUrl = baseUrlSrvc.baseUrl + 'listSchoolSettingbySchoolId/'+id;
            var promiseClassGet = CRUD_SERVICE.getAllData(classListUrl);
                promiseClassGet.then(function (pl) {
                $scope.ClassData = pl.data;

                $scope.Class = $filter('filter')($scope.ClassData, { "ad_school_id": id });
                //console.log($scope.Class);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }


       $scope.OnClassChange=function(id)
       {
         //console.log(id);
           var subjectListUrl = baseUrlSrvc.baseUrl + 'listSubject';
            var promiseSubjectGet = CRUD_SERVICE.getAllData(subjectListUrl);
            promiseSubjectGet.then(function (pl) {
                $scope.SubjectData = pl.data;

                $scope.Subject = $filter('filter')($scope.SubjectData, { "classRoomId": id });
                //console.log($scope.scheduleArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }


         $scope.OnSubjectChange=function(id)
       {
         //console.log(id);
          var publicationListUrl = baseUrlSrvc.baseUrl + 'listPublication';
            var promisePublicationGet = CRUD_SERVICE.getAllData(publicationListUrl);
            promisePublicationGet.then(function (pl) {
                $scope.PublicationData = pl.data;

                $scope.Publication = $filter('filter')($scope.PublicationData, { "subjectId": id });
                //console.log($scope.scheduleArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }

        $scope.OnPublicationChange=function(id)
       {
         //console.log(id);
         var chapterListUrl = baseUrlSrvc.baseUrl + 'listChapter';
            var promiseChapterGet = CRUD_SERVICE.getAllData(chapterListUrl);
            promiseChapterGet.then(function (pl) {
                $scope.ChapterData = pl.data;

                $scope.Chapter = $filter('filter')($scope.ChapterData, { "publicationId": id });               
                //console.log($scope.scheduleArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        }

        $scope.OnChapterChange=function(id)
       {
         //console.log(id);
          var topicListUrl = baseUrlSrvc.baseUrl + 'listTopic';
            var promiseTopicGet = CRUD_SERVICE.getAllData(topicListUrl);
            promiseTopicGet.then(function (pl) {
                $scope.TopicData = pl.data;

                $scope.Topic = $filter('filter')($scope.TopicData, { "chapterId": id });               
                //console.log($scope.scheduleArray);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });

        }
      

        $scope.scheduleArray = [];
        $scope.OperType = $routeParams.ID;

        //console.log($scope.OperType);
        //1 Mean New Entry
        var urlList = baseUrlSrvc.baseUrl + 'listSchoolSchedule'
        GetAllRecords(urlList);
        //To Get All Records
        function GetAllRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.school_schedule = pl.data;
                    $scope.scheduleArray.push($scope.school_schedule);
                    //console.log($scope.scheduleArray);
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }

         $scope.scheduleArray = [];
        $scope.OperType = $routeParams.ID;

        //console.log($scope.OperType);
        //1 Mean New Entry
        var urlList = baseUrlSrvc.baseUrl + 'listTopic'
        GetAllRecords(urlList);
        //To Get All Records
        function GetAllRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.school_schedule = pl.data;
                    $scope.scheduleArray.push($scope.school_schedule);
                    //console.log($scope.scheduleArray);
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }


        //To Clear all input controls.
        function ClearModels() {
            $scope.addschedule = {};
        }
        //console.log($scope.scheduleArray);
        if ($scope.OperType != '0') {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.schedule = pl.data;

                    for (var i = 0; i < $scope.schedule.length; i++) {
                        if ($scope.schedule[i].schoolScheduleId == $scope.OperType) {
                           // $scope.addschedule = $scope.schedule[i];
                        }
                    }

                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });

        }
        //To Create new record and Edit an existing Record.
        $scope.saveDate = function (data) {
            //console.log(data);

            if ($scope.OperType === '0') {
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateSchoolSchedule'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function (pl) {
                    $scope.schoolScheduleId = pl.data.schoolScheduleId;
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;

                    ClearModels();
                }, function (err) {
                    //console.log(err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            } else {
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateSchoolSchedule'
                };
                //Edit the record
                // debugger;

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function (pl) {
                    $scope.Message = "Data Updated Successfuly";
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log("Some Error Occured." + err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            }
        };
 
        //======================save schedule===============
         $scope.scheduleSubmit=function(topicID)
         {
            alert(topicID);
            //console.log($scope.addschedule);
                 $scope.addschedule.c_topic_id=topicID;
                 var FormData = {
                    formdata: $scope.addschedule,
                    url: baseUrlSrvc.baseUrl + 'addUpdateSchoolSchedule'
                };
                //Edit the record
                // debugger;

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function (pl) {
                    $scope.Message = "Data Updated Successfuly";
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log("Some Error Occured." + err);
                    $scope.success = false;
                    $scope.danger = true;
                });
         }
        //========================end schedule================
        //  $scope.saveDate = function (data) {
        //     //console.log(data);

        //     if ($scope.OperType === '0') {
        //         var FormData = {
        //             formdata: data,
        //             url: baseUrlSrvc.baseUrl + 'schoolScheduleUpdateDate'
        //         };
        //         var promisePost = CRUD_SERVICE.post(FormData);
        //         promisePost.then(function (pl) {
        //             $scope.schoolScheduleId = pl.data.schoolScheduleId;
        //             GetAllRecords(urlList);
        //             $scope.success = true;
        //             $scope.danger = false;

        //             ClearModels();
        //         }, function (err) {
        //             //console.log(err);
        //             $scope.success = false;
        //             $scope.danger = true;
        //         });
        //     } else {
        //         var FormData = {
        //             formdata: data,
        //             url: baseUrlSrvc.baseUrl + 'schoolScheduleUpdateDate'
        //         };
        //         //Edit the record
        //         // debugger;

        //         var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
        //         promisePut.then(function (pl) {
        //             $scope.Message = "Data Updated Successfuly";
        //             GetAllRecords(urlList);
        //             $scope.success = true;
        //             $scope.danger = false;
        //             ClearModels();
        //         }, function (err) {
        //             //console.log("Some Error Occured." + err);
        //             $scope.success = false;
        //             $scope.danger = true;
        //         });
        //     }
        // };


        //To Delete Record
        $scope.delete = function (id) {
            //console.log(id);
            var FormData = {
                id: id,
                url: baseUrlSrvc.baseUrl + 'deleteSchoolSchedule'
            };
            var promiseDelete = CRUD_SERVICE.delete(FormData);
            promiseDelete.then(function (pl) {
                $scope.Message = " Deleted Successfuly";
                GetAllRecords(urlList);
                $scope.success = true;
                $scope.danger = false;
                ClearModels();
            }, function (err) {
                //console.log("Some Error Occured." + err);
                $scope.success = false;
                $scope.danger = true;
            });
        }

    });

//============================================End for scheduling===============================

    // Role Controller
     App.controller("roleCtrl", function ($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter) {
        //console.log("role");
        $scope.roleArray = [];
        $scope.OperType = $routeParams.ID;

        //console.log($scope.OperType);
        //1 Mean New Entry
        var urlList = baseUrlSrvc.baseUrl + 'listRole';
        GetAllRecords(urlList);
        //To Get All Records
        function GetAllRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.roles = pl.data;
                    $scope.roleArray.push($scope.roles);
                    //console.log($scope.roleArray);
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }

        //To Clear all input controls.
        function ClearModels() {
            $scope.addRole = {};
        }
        //console.log($scope.roleArray);
        if ($scope.OperType != '0') {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.role1 = pl.data;

                    for (var i = 0; i < $scope.role1.length; i++) {
                        if ($scope.role1[i].ad_role_id == $scope.OperType) {
                            $scope.addRole = $scope.role1[i];

                        }
                    }

                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }

        //-----------------------------this is for institute select options---------------------
        var instituteListUrl = baseUrlSrvc.baseUrl + 'listInstitute';
        var promiseInstituteGet = CRUD_SERVICE.getAllData(instituteListUrl);
        promiseInstituteGet.then(function (pl) {
                $scope.Institute = pl.data;
                //console.log("Institute", $scope.Institute);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        //-----------------------------end of institute select----------------------------------

        //-----------------------------this is for school select options---------------------
        var schoolListUrl = baseUrlSrvc.baseUrl + 'listSchool';
        var promiseSchoolGet = CRUD_SERVICE.getAllData(schoolListUrl);
        promiseSchoolGet.then(function (pl) {
                $scope.School = pl.data;
                //console.log("School", $scope.School);
            },
            function (errorPl) {
                $log.error('Some Error in Getting Records.', errorPl);
            });
        //-----------------------------end of school select----------------------------------
        
        //To Create new record and Edit an existing Record.
        $scope.save = function (data) {
            //console.log(data);

            if ($scope.OperType === '0') {
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateRole'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function (pl) {
                    $scope.ad_role_id = pl.data.ad_role_id;
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log(err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            } else {
                //  //console.log(/edit);
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateRole'
                };
                //Edit the record
                // debugger;

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function (pl) {
                    $scope.Message = "Data Updated Successfuly";
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log("Some Error Occured." + err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            }
        };

    });

    //Window Controller
    App.controller("windowCtrl", function ($scope, $log, $routeParams, CRUD_SERVICE, baseUrlSrvc, $filter) {
        //console.log("role");
        $scope.windowArray = [];
        $scope.OperType = $routeParams.ID;

        //console.log($scope.OperType);
        //1 Mean New Entry
        var urlList = baseUrlSrvc.baseUrl + 'listWindows';
        GetAllRecords(urlList);
        //To Get All Records
        function GetAllRecords(url) {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.windows = pl.data;
                    $scope.roleArray.push($scope.windows);
                    //console.log($scope.roleArray);
                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }

        //To Clear all input controls.
        function ClearModels() {
            $scope.addRole = {};
        }
        //console.log($scope.roleArray);
        if ($scope.OperType != '0') {
            var promiseGet = CRUD_SERVICE.getAllData(urlList);
            promiseGet.then(function (pl) {
                    $scope.role1 = pl.data;

                    for (var i = 0; i < $scope.role1.length; i++) {
                        if ($scope.role1[i].ad_window_id == $scope.OperType) {
                            $scope.addRole = $scope.role1[i];

                        }
                    }

                },
                function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);
                });
        }
        
        //To Create new record and Edit an existing Record.
        $scope.save = function (data) {
            //console.log(data);

            if ($scope.OperType === '0') {
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateWindows'
                };
                var promisePost = CRUD_SERVICE.post(FormData);
                promisePost.then(function (pl) {
                    $scope.ad_window_id = pl.data.ad_window_id;
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log(err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            } else {
                //  //console.log(/edit);
                var FormData = {
                    formdata: data,
                    url: baseUrlSrvc.baseUrl + 'addUpdateWindows'
                };
                //Edit the record
                // debugger;

                var promisePut = CRUD_SERVICE.put($routeParams.ID, FormData);
                promisePut.then(function (pl) {
                    $scope.Message = "Data Updated Successfuly";
                    GetAllRecords(urlList);
                    $scope.success = true;
                    $scope.danger = false;
                    ClearModels();
                }, function (err) {
                    //console.log("Some Error Occured." + err);
                    $scope.success = false;
                    $scope.danger = true;
                });
            }
        };

    });




}());