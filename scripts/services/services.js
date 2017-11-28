(function() {

  "use strict";

  var App = angular.module("App.services",[]);

  App.value('version', '0.1');

/*===============================================
=            Get Course, Tech, Topic            =
===============================================*/
App.factory('courseTechtopic', function() {
  return {};
});
/*=====  End of Get Course, Tech, Topic  ======*/

/*===============================
=            Inst Id            =
===============================*/
App.factory('inst_id', function() {
  var idSet;

  var addInst_id = function(val) {
    idSet=val;
  }

  var getInst_id = function(){
    return idSet;
  }

  return {
    addInst_id : addInst_id,
    getInst_id : getInst_id 
  };
});
/*=====  End of Inst Id  ======*/

/*=======================================
=            For Notes Tabs            =
=======================================*/
App.factory('topic_id', function() {
  var idSet;

  var addTopic_id = function(val) {
    idSet=val;
  }

  var getTopic_id = function(){
    return idSet;
  }

  return {
    addTopic_id : addTopic_id,
    getTopic_id : getTopic_id 
  };
});
/*=====  End of For Notes Tabs    ======*/

/*==================================================
=            Form No. for Document Path            =
==================================================*/
App.factory('Form_no', function() {
  var idSet;

  var addForm_no = function(val) {
    idSet=val;
  }

  var getForm_no = function(){
    return idSet;
  }

  return {
    addForm_no : addForm_no,
    getForm_no : getForm_no 
  };
});
/*=====  End of Form No. for Document Path  ======*/

/*=========================================
=            Full Name Service            =
=========================================*/
App.service('firstNameService', function () {
     var idSet1;

      var addFirstName = function(val1) {
        idSet1=val1;
      }

      var getFirstName = function(){
        return idSet1;
      }

      return {
        addFirstName : addFirstName,
        getFirstName : getFirstName 
      };
});

App.service('middleNameService', function () {
     var idSet1;

      var addMiddleName = function(val1) {
        idSet1=val1;
      }

      var getMiddleName = function(){
        return idSet1;
      }

      return {
        addMiddleName : addMiddleName,
        getMiddleName : getMiddleName 
      };
});

App.service('lastNameService', function () {
     var idSet1;

      var addLastName = function(val1) {
        idSet1=val1;
      }

      var getLastName = function(){
        return idSet1;
      }

      return {
        addLastName : addLastName,
        getLastName : getLastName 
      };
});
/*=====  End of Full Name Service  ======*/


/*========================================
=            Feedback Service            =
========================================*/
App.factory('feedback_Cid', function() {
  var idSet;

  var addCourse_id = function(val) {
    idSet=val;
  }
  
  var getCourse_id = function(){
    return idSet;
  }
  return {
    addCourse_id : addCourse_id,
    getCourse_id : getCourse_id
    
  };
});

App.factory('feedback_Bid', function() {
  var idSet;

  
  var addBatch_id = function(val) {
    idSet=val;
  }

  var getBatch_id = function(){
    return idSet;
  }

  return {
    addBatch_id : addBatch_id,
    getBatch_id : getBatch_id
  };
});

App.factory('feedback_Eid', function() {
  var idSet;

  
  var addEnq_id = function(val) {
    idSet=val;
  }

  var getEnq_id = function(){
    return idSet;
  }

  return {
    addEnq_id : addEnq_id,
    getEnq_id : getEnq_id
  };
});
/*=====  End of Feedback Service  ======*/

/*======================================
=            Get Course Fee            =
======================================*/
App.factory('course_fee', function() {
  var idSet;

  
  var addCourse_fee = function(val) {
    idSet=val;
  }

  var getCourse_fee = function(){
    return idSet;
  }

  return {
    addCourse_fee : addCourse_fee,
    getCourse_fee : getCourse_fee
  };
});
/*=====  End of Get Course Fee  ======*/

/*======================================
=            Get average attendance            =
======================================*/
App.factory('avg_att', function() {
  var idSet;

  
  var addavg_att = function(val) {
    idSet=val;
  }

  var getavg_att = function(){
    return idSet;
  }

  return {
    addavg_att : addavg_att,
    getavg_att : getavg_att
  };
});
/*=====  End of Get average attendance  ======*/

/*=================================
=            Branch ID            =
=================================*/
App.factory('Branch_Id', function() {
  var idSet;

  
  var addBranch_Id = function(val) {
    idSet=val;
  }

  var getBranch_Id = function(){
    return idSet;
  }

  return {
    addBranch_Id : addBranch_Id,
    getBranch_Id : getBranch_Id
  };
});
/*=====  End of Branch ID  ======*/



/*===========================================
=            Branch Name Service            =
===========================================*/
App.factory('branch_name', function() {
  var idSet;

  var addBranch_name = function(val) {
    idSet=val;
  }

  var getBranch_name = function(){
    return idSet;
  }

  return {
    addBranch_name : addBranch_name,
    getBranch_name : getBranch_name 
  };
});


/*=====  End of Branch Name Service  ======*/


/*=======================================
=            For Teacher Tabs            =
=======================================*/
//to get school id in teacher report tabs
App.factory('schl_id', function() {
  var idSet;

  var addSchl_id = function(val) {
    idSet=val;
  }

  var getSchl_id = function(){
    return idSet;
  }

  return {
    addSchl_id : addSchl_id,
    getSchl_id : getSchl_id 
  };
});
/*=====  End of For Teacher Tabs  ======*/

/*===================================================
=            For Teacher ID in Image Tab            =
===================================================*/
App.factory('tch_id', function() {
  var idSet;

  var addTch_id = function(val) {
    idSet=val;
  }

  var getTch_id = function(){
    return idSet;
  }

  return {
    addTch_id : addTch_id,
    getTch_id : getTch_id 
  };
});
/*=====  End of For Teacher ID in Image Tab  ======*/


/*=======================================
=            For hide header Tabs            =
=======================================*/
//to hide header
App.factory('hideHeader', function() {
  var idSet;

  var addHeader = function(val) {
    idSet=val;
  }

  var getHeader = function(){
    return idSet;
  }

  return {
    addHeader : addHeader,
    getHeader : getHeader 
  };
});
/*=====  End of For School Tabs  ======*/

/*===========================================
=            For Scheduling ID's            =
===========================================*/
App.factory('scheduleID', function() {
  var idSetDiv,idSetSchool,idSetPub;
   
  var addScheduleDiv = function(val) {
      idSetDiv=val;
  }
  var addSchedulePub = function(val) {
      idSetPub=val;
  }
  var addScheduleSchool = function(val) {
      idSetSchool=val;
  }

  var getScheduleDiv = function(){
      return idSetDiv;
  }
   var getSchedulePub = function(){
      return idSetPub;
  }
   var getScheduleSchool = function(){
      return idSetSchool;
  }

  return {
    addScheduleDiv : addScheduleDiv,
    addSchedulePub : addSchedulePub,
    addScheduleSchool : addScheduleSchool,
    getScheduleDiv : getScheduleDiv,
     getSchedulePub : getSchedulePub, 
      getScheduleSchool : getScheduleSchool 
  };

});
/*=====  End of For Scheduling ID's  ======*/

/*======================================
=            Table Services            =
======================================*/
App.service('ngTableDataService', function() {

    var TableData = {
        cache: null,
        getData: function($defer, params, api) {
            // if no cache, request data and filter
            if (!TableData.cache) {
                if (api) {
                    api.get(function(data) {
                        TableData.cache = data;
                        filterdata($defer, params);
                    });
                }
            } else {
                filterdata($defer, params);
            }

            function filterdata($defer, params) {
                var from = (params.page() - 1) * params.count();
                var to = params.page() * params.count();
                var filteredData = TableData.cache.result.slice(from, to);

                params.total(TableData.cache.total);
                $defer.resolve(filteredData);
            }

        }
    };

    return TableData;

});
/*=====  End of Table Services  ======*/

/*====================================
  =            CRUD Service            =
  ====================================*/
App.service("CRUD_SERVICE", function ($http) {  
    //Create new record  
  
    this.post = function (Data) {  
     //console.log(Data.formdata);
        var request = $http({  
            method: "post",  
            url: Data.url,  
            data: JSON.stringify(Data.formdata)
      
        });  
        return request;  
    }  
  
    //Update the Record  
    this.put = function (ID,Data) {  
  //console.log(Data);
        debugger;  
        var request = $http({  
            method: "POST",  
            url:Data.url,  
            data: Data.formdata  
        });  
        return request;  
    }  
  
    this.getAllData = function (url) {  
      //console.log(url);
        return $http.get(url);  
    };  
  
    //Get Single Records  
    this.get = function (StudentID) {  
        return $http.get("http://localhost:27321/StudentService.svc/GetStudentDetails/" + StudentID);  
    }  
  
    //Delete the Record  
    this.delete = function (data) {  
        var request = $http({  
            method: "delete",  
            url: data.url + "/"+data.id  
        });  
        return request;  
    }  
});
/*=====  End of CRUD Service  ======*/

/*======================================
=            Schedule Modal            =
======================================*/
App.factory('alert', function($uibModal) {

    function show(action, event) {
      return $uibModal.open({
        templateUrl: 'view/pages/Schedule/schedule/modalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
         
          
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };

  });
/*=====  End of Schedule Modal  ======*/

/*====================================
=            CRUD Service            =
====================================*/
App.service("crudSrvc", function ($http, baseUrlSrvc) {
  return {
    saveForm: function(data) {

          var url = baseUrlSrvc.baseUrl + data.url;
          
          if (data.hasOwnProperty('id')) {
              url = baseUrlSrvc.baseUrl + data.url;
          }

          var postData = $.param({
              params: data.formData
          });

          var config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          };

          var boolIsInsert = false;

         $http.post(url, postData, config)

         .success(function (serverResponse, status, headers, config) {
             return serverResponse;
          })

         .error(function (serverResponse, status, headers, config) {
          });
       
    },

    getAllData : function(data) {

      var url = baseUrlSrvc.baseUrl + data.url + data.formData;
          $http.get(url).success(function (serverResponse) {
             
              return  serverResponse;
          });
    },

    getDataById : function(data) {

      var url = baseUrlSrvc.baseUrl +'/'+ data.url +'/'+ data.id;
          $http.get(url)
          success(function (serverResponse) {
             
              return  serverResponse;
          });
      
    },

    deleteDataById : function(data) {

       var url = erpSystem.baseUrl +'/'+ data.url + '/'+ data.id;
       $http.delete(url)
       .success(function (serverResponse) {
             
          });
      
    }

  }
});
/*=====  End of CRUD Service  ======*/

}());