(function() {

"use strict";

 var App = angular.module("App.routes",[]);

/*==============================
=            Routes            =
==============================*/
 App.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      /*======================================
      =            Authentication            =
      ======================================*/
      .when('/', {
           templateUrl: 'view/authentication/login.html',
           hideHeader:true
      })
      .when('/forgotpassword/:ID', {
           templateUrl: 'view/authentication/fpassword.html',
       })
      .when('/login', {
           templateUrl: 'view/authentication/login.html',
           controller: 'loginCtrl'
       })
       .when('/branch', {
           templateUrl: 'view/pages/Masters/branch/branch.html',
       })
      /*=====  End of Authentication  ======*/

      /*================================
      =            Settings            =
      ================================*/
      .when('/Role', {
          templateUrl:'view/pages/Settings/role/role.html',

      })
      .when('/Window', {
        templateUrl: 'view/pages/Settings/window/window.html',
          
      })
      .when('/Menu', {
          templateUrl:'view/pages/Settings/menu/menu.html',
          
      })
      .when('/usersetting', {
           templateUrl: 'view/pages/Settings/settings/usersetting.html',
           
       })
      .when('/User Roles', {
           templateUrl: 'view/pages/Settings/UserRole/UserRole.html',
           
       })
      .when('/EditRole/:ID', {
           templateUrl: 'view/pages/Settings/role/editrole.html',
           
       })
      .when('/Email Setting', {
           templateUrl: 'view/pages/Settings/Email Setting/EmailSetting.html',
           
       })
      /*=====  End of Settings  ======*/

      /*===============================
      =            Profile            =
      ===============================*/
      .when('/Profile', {
          templateUrl:'view/pages/Profile/Profile.html',
      })
      /*=====  End of Profile  ======*/
      

      /*=================================
      =            Institute            =
      =================================*/
      .when('/Institute', {
          templateUrl:'view/pages/Institute/Institute.html',
      })

      .when('/editinstitute/:ID', {
             templateUrl: 'view/pages/Institute/EditInstitute.html',
       })
      /*=====  End of Institute  ======*/

      /*================================
      =            Schedule            =
      ================================*/
      .when('/Schedule', {
          templateUrl:'view/pages/Schedule/Schedule.html',
      })
      .when('/Edit Schedule/:ID', {
          templateUrl:'view/pages/Schedule/EditSchedule.html',
      })
      /*=====  End of Schedule  ======*/
      

      /*==============================
      =            Client            =
      ==============================*/
      .when('/Client Info', {
          templateUrl:'view/pages/Client/Client.html',
      })

      .when('/Client Activity', {
          templateUrl:'view/pages/Client/Client Activity/CActivity.html',
      })

      .when('/Editclient/:ID', {
          templateUrl:'view/pages/Client/EditClient.html',
      })

      .when('/Editjobprofile/:ID', {
          templateUrl:'view/pages/Client/JobSpecification/EditJobSpecification.html',
      })
      /*=====  End of Client  ======*/
      
      /*===================================
      =            Accept Link            =
      ===================================*/
      .when('/Accept Invitation/:ID/:ID1/:ID2', {
          templateUrl:'view/pages/Accept/Accept.html',
      })
      /*=====  End of Accept Link  ======*/

      /*==============================
      =            Master            =
      ==============================*/
      .when('/Branch', {
          templateUrl:'view/pages/Masters/Branch/Branch.html',

      })
       .when('/Bank Details', {
          templateUrl:'view/pages/Masters/Bank/Bank.html',

      })
      .when('/Status', {
          templateUrl:'view/pages/Masters/Status/Status.html',

      })
      .when('/Courses', {
          templateUrl:'view/pages/Masters/Courses/Courses.html',

      })
      .when('/EditCourses/:ID', {
          templateUrl:'view/pages/Masters/Courses/EditCourses.html',

      })
      .when('/Hear About Us', {
          templateUrl:'view/pages/Masters/Aboutus/Aboutus.html',

      })
     
      .when('/Department', {
          templateUrl:'view/pages/Masters/Department/Department.html',

      })
      .when('/Designation', {
          templateUrl:'view/pages/Masters/Designation/Designation.html',

      })

      .when('/Qualification', {
          templateUrl:'view/pages/Masters/Qualification/Qualification.html',

      })

      .when('/Technology', {
          templateUrl:'view/pages/Masters/Technology/TechnologyMaster.html',

      })

      .when('/Degree', {
          templateUrl:'view/pages/Masters/Degree/Degree.html',

      })

      .when('/Degree Specialisation', {
          templateUrl:'view/pages/Masters/Degree Specification/Degreespecification.html',

      })

      .when('/Vendor', {
          templateUrl:'view/pages/Masters/Vendor/Vendor.html',

      })

      .when('/Widgets', {
          templateUrl:'view/pages/Masters/Widgets/Widgets.html',

      })

      .when('/GL Items', {
          templateUrl:'view/pages/Masters/GL items/Gl.html',

      })

      .when('/Email Template', {
          templateUrl:'view/pages/Masters/Email/EmailTemplate.html',
      })

      .when('/Email Tags', {
          templateUrl:'view/pages/Masters/Email/EmailTags.html',
      })

      .when('/Lead Source', {
          templateUrl:'view/pages/Masters/Lead Source/Leadsource.html',
      })

      .when('/Edit Email Template/:ID', {
          templateUrl:'view/pages/Masters/Email/EditEmailTemplate.html',
      })

      .when('/Topic', {
          templateUrl:'view/pages/Masters/Topic/Topic.html',
      })

      .when('/View Topic/:ID/:ID1', {
          templateUrl:'view/pages/Masters/Topic/ViewTopics.html',
      })

      .when('/Edit Topic/:ID', {
          templateUrl:'view/pages/Masters/Topic/EditTopic.html',
      })

      .when('/View Video/:ID', {
           templateUrl: 'view/pages/Masters/Topic/Video/ViewVideo.html',
          // controller: 'videoCtrl'
      })

      .when('/View Question/:ID/:ID1/:ID2/:ID3', {
           templateUrl: 'view/pages/Masters/Topic/Test/TestQuestion.html',
           
       })
        
      /*=====  End of Master  ======*/

      /*====================================
      =            Student Test            =
      ====================================*/
      .when('/Test', {
           templateUrl: 'view/pages/Student/Test/test.html',
      })
      .when('/Instruction/:ID', {
           templateUrl: 'view/pages/Student/Test/instruction.html',
      })

      .when('/Start Test/:ID', {
           templateUrl: 'view/pages/Student/Test/starttest.html',
      })
      .when('/Summary/:ID', {
           templateUrl: 'view/pages/Student/Test/summary.html',
      })
      .when('/Video', {
           templateUrl: 'view/pages/Student/Student Content/studentvideo.html',
      })
      .when('/Edit Video/:ID/:ID1/:ID2', {
           templateUrl: 'view/pages/Student/Student Content/editstudentvideo.html',
      })
      .when('/Notes', {
           templateUrl: 'view/pages/Student/Student Content/studentnotes.html',
      })
      .when('/View Notes/:ID/:ID1/:ID2', {
           templateUrl: 'view/pages/Student/Student Content/editstudentnotes.html',
      })
      /*=====  End of Student Test  ======*/

      /*=============================
      =            Sales            =
      =============================*/
      .when('/Enquiry Form', {
           templateUrl: 'view/pages/Sales/Enquiry/Enquiry.html',
          
       })
      .when('/editenquiry/:ID', {
           templateUrl: 'view/pages/Sales/Enquiry/Editenquiry.html',
          
       })

      .when('/Lead Form', {
           templateUrl: 'view/pages/Sales/Lead Form/Leadinformation.html',
          
       })
      .when('/Editleadinformation/:ID', {
           templateUrl: 'view/pages/Sales/Lead Form/Editleadinformation.html',
          
       })
      .when('/Tabenquiry', {
           templateUrl: 'view/pages/Sales/Enquiry/Editenquiry.html',
          
       })
      .when('/Admission Form', {
           templateUrl: 'view/pages/Sales/Admission/Admission.html',
          
       })
      .when('/editadmission/:ID', {
           templateUrl: 'view/pages/Sales/Admission/Editadmission.html',
          
       })
      .when('/Activity Form', {
           templateUrl: 'view/pages/Sales/Activity/Activity.html',
          
       })
      .when('/EditActivity/:ID', {
           templateUrl: 'view/pages/Sales/Activity/EditActivity.html',
          
       })
      /*=====  End of Sales  ======*/

      /*=============================
      =            Users            =
      =============================*/
      .when('/Create User', {
           templateUrl: 'view/pages/Users/Sales/CreateUser.html',
           
       })
      .when('/EditUser/:ID', {
           templateUrl: 'view/pages/Users/Sales/EditUser.html',
           
       })
      /*=====  End of Users  ======*/

      /*==================================
      =            Enrollment            =
      ==================================*/
      
      .when('/Admission Form', {
           templateUrl: 'view/pages/Sales/Enrollment/Enrollment.html',
           
       })
      .when('/editenrollment/:ID', {
           templateUrl: 'view/pages/Sales/Enrollment/Editenrollment.html',
           
       })
      
      /*=====  End of Enrollment  ======*/

      /*==================================
      =            Registration            =
      ==================================*/
      
      .when('/Application Form', {
           templateUrl: 'view/pages/Sales/Registration/Registration.html',
           
       })
      .when('/editregistration/:ID', {
           templateUrl: 'view/pages/Sales/Registration/Editregistration.html',
           
       })
      
      /*=====  End of Registration  ======*/
      
      /*=============================
      =            Placement            =
      =============================*/
      .when('/Job Activity', {
           templateUrl: 'view/pages/Placement/Job Activity/Jobactivity.html',
           
       })
      .when('/Jobs', {
           templateUrl: 'view/pages/Placement/Jobs/Jobs.html',
           
       })
      .when('/Search Candidates', {
           templateUrl: 'view/pages/Placement/Search Candidates/Searchcandidates.html',
           
       })

       .when('/Placement Activity', {
           templateUrl: 'view/pages/Placement Activity/Placement.html',
           
       })

       .when('/Placement Status', {
           templateUrl: 'view/pages/Placement Activity/PlacementStatus.html',
           
       })

       .when('/Interview Schedule', {
           templateUrl: 'view/pages/Placement Activity/InterviewSchedule.html',
           
       })
      /*=====  End of Placement  ======*/

      /*=============================
      =            Reports            =
      =============================*/
      .when('/Admission Reports Executivewise', {
           templateUrl: 'view/pages/Reports/Sales/Admission/Admission Executive/AdmissionReports.html',
       })
      .when('/Admission Reports Executivewise/Coursewise', {
           templateUrl: 'view/pages/Reports/Sales/Admission/Admission Course/AdmissionReportsCourse.html',
       })
      .when('/Studentwise Call Reports', {
           templateUrl: 'view/pages/Reports/Sales/Activity/Student Call/StudentCallReport.html',
       })
      .when('/Lead Generation Reports of Executive', {
           templateUrl: 'view/pages/Reports/Sales/Lead/Lead Executive/LeadGenerationExecutive.html',
       })
      .when('/Lead Generation Report of Source of Lead', {
           templateUrl: 'view/pages/Reports/Sales/Lead/Lead Source/LeadGenerationSource.html',
       })
      .when('/Student/Executive Wise Payment Reports', {
           templateUrl: 'view/pages/Reports/Payment/StudentExecutiveWise/PaymentDueReport.html',
       })
      .when('/Course/Batch Wise Payment Reports', {
           templateUrl: 'view/pages/Reports/Payment/CourseBatchWise/cPaymentDueReport.html',
       })
      .when('/Student Placed Reports Executivewise', {
           templateUrl: 'view/pages/Reports/Placement/Student/studentplacement.html',
       })
      .when('/Executivewise Client Activity Reports', {
           templateUrl: 'view/pages/Reports/Placement/Activity/ExecutivewisePlacementActivity.html',
       })
      .when('/Executivewise Sales Activity Reports', {
           templateUrl: 'view/pages/Reports/Sales/Activity/SalesActivity/ExecutivewiseSalesActivity.html',
       })
      /*=====  End of Reports  ======*/
      
      /*=================================
      =            Dashboard            =
      =================================*/
      .when('/dashboard', {
           templateUrl: 'view/dashboard/dashboard.html',
      })
      /*=====  End of Dashboard  ======*/

      /*========================================
      =            Trainer Feedback            =
      ========================================*/
      .when('/Trainer Feedback', {
           templateUrl: 'view/pages/Sales/Trainer Feedback/Trainerfeedback.html',
      })
      /*=====  End of Trainer Feedback  ======*/

       /*=================================
      =            Region Setting            =
      =================================*/
      .when('/District', {
           templateUrl: 'view/pages/RegionSetting/District/district.html',
      })

      .when('/State', {
           templateUrl: 'view/pages/RegionSetting/State/state.html',
      })

      .when('/Taluka', {
           templateUrl: 'view/pages/RegionSetting/Taluka/taluka.html',
      })
      /*=====  End of Region Setting  ======*/

       
      /*=============================================
      =            Payment Form           =
      =============================================*/

      .when('/Payment Outward', {
           templateUrl: 'view/pages/Payment/Paymentoutward.html',
           
       })
      .when('/Payment Inward', {
           templateUrl: 'view/pages/Payment/Paymentinward.html',
           
       })

      .when('/Payment Reconciliation', {
           templateUrl: 'view/pages/Payment/Paymentreconciliation.html',
           
       })
      
      .when('/Editpaymentreconciliation/:ID', {
           templateUrl: 'view/pages/Payment/Editpaymentreconciliation.html',
           
       })
      /*=====  End of Payment Form  ======*/

      /*=======================================
      =            Student Profile            =
      =======================================*/
      .when('/Studentprofile/:ID',{
        templateUrl: 'view/pages/Studentprofile.html',
      })
      /*=====  End of Student Profile  ======*/

      /*==================================
      =            Attendance            =
      ==================================*/
      .when('/Attendance',{
        templateUrl: 'view/pages/Attendance/attendance.html'
      })
      .when('/View Attendance',{
        templateUrl: 'view/pages/Attendance/viewattendance.html'
      })
      /*=====  End of Attendance  ======*/
      
      /*=================================
      =            Otherwise            =
      =================================*/
      .otherwise({redirectTo : '/'});
      /*=====  End of Otherwise  ======*/
      
  });
/*=====  End of Routes  ======*/

}());
