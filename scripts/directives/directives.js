(function() {

  "use strict";

  var App = angular.module("App.directives",[]);

  App.directive('inputtext', function ($timeout) {
    return {
      restrict:'E',
      replace:true,
      template:'<input type="text"/>',
      scope: {
      	//if there were attributes it would be shown here
      },
      link:function (scope, element, attrs, ctrl) {
      	// DOM manipulation may happen here.
      }
    }
  });

App.directive('formWizard', ["$parse", function($parse){
  'use strict';

  return {
    restrict: 'EA',
    scope: true,
    link: function(scope, element, attribute) {
      var validate = $parse(attribute.validateSteps)(scope),
          wiz = new Wizard(attribute.steps, !!validate, element);
      scope.wizard = wiz.init();

    }
  };

  function Wizard (quantity, validate, element) {
    
    var self = this;
    self.quantity = parseInt(quantity,10);
    self.validate = validate;
    self.element = element;
    
    self.init = function() {
      self.createsteps(self.quantity);
      self.go(1); // always start at fist step
      return self;
    };

    self.go = function(step) {
      
      if ( angular.isDefined(self.steps[step]) ) {

        if(self.validate && step !== 1) {
          var form = $(self.element),
              group = form.children().children('div').get(step - 2);

          if (false === form.parsley().validate( group.id )) {
            return false;
          }
        }

        self.cleanall();
        self.steps[step] = true;
      }
    };

    self.active = function(step) {
      return !!self.steps[step];
    };

    self.cleanall = function() {
      for(var i in self.steps){
        self.steps[i] = false;
      }
    };

    self.createsteps = function(q) {
      self.steps = [];
      for(var i = 1; i <= q; i++) self.steps[i] = false;
    };

  }




}]);

/*====================================
=            Limit To Max            =
====================================*/
App.directive("limitToMax", function() {
  return {
    link: function(scope, element, attributes) {
      element.on("keydown keyup", function(e) {
    if (Number(element.val()) > Number(attributes.max) &&
          e.keyCode != 46 // delete
          &&
          e.keyCode != 8 // backspace
        ) {
          e.preventDefault();
          element.val(attributes.max);
        }
      });
    }
  };
});

App.directive("preventTypingGreater", function() {
  return {
    link: function(scope, element, attributes) {
      var oldVal = null;
      element.on("keydown keyup", function(e) {
    if (Number(element.val()) > Number(attributes.max) &&
          e.keyCode != 46 // delete
          &&
          e.keyCode != 8 // backspace
        ) {
          e.preventDefault();
          element.val(oldVal);
        } else {
          oldVal = Number(element.val());
        }
      });
    }
  };
});
/*=====  End of Limit To Max  ======*/

App.directive('validateForm', function() {
  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      var $elem = $($element);
      if($.fn.parsley)
        $elem.parsley();
    }]
  };
});

  App.directive('fileModel', ['$parse', function ($parse) {
     return {
         restrict: 'A',
         link: function(scope, element, attrs) {
             var model = $parse(attrs.fileModel);
             var modelSetter = model.assign;
             
             element.bind('change', function(){
                 scope.$apply(function(){
                     modelSetter(scope, element[0].files[0]);
                 });
             });
         }
     };
 }]);

// App.directive('checkFileSize', function() {
//   return {
//     link: function(scope, elem, attr, ctrl) {
//       function bindEvent(element, type, handler) {
//         if (element.addEventListener) {
//           element.addEventListener(type, handler, false);
//         } else {
//           element.attachEvent('on' + type, handler);
//         }
//       }

//       bindEvent(elem[0], 'change', function() {
//         alert('File size:' + this.files[0].size);
//         scope.imageFileSize=this.files[0].size;
//         //console.log("$scope.imageFileSize",scope.imageFileSize);
//       });
//     }
//   }
// });

App.directive('countTo', ['$timeout', function ($timeout) {
    return {
        replace: false,
        scope: true,
        link: function (scope, element, attrs) {

            var e = element[0];
            var num, refreshInterval, duration, steps, step, countTo, value, increment;

            var calculate = function () {
                refreshInterval = 30;
                step = 0;
                scope.timoutId = null;
                countTo = parseInt(attrs.countTo) || 0;
                scope.value = parseInt(attrs.value, 10) || 0;
                duration = (parseFloat(attrs.duration) * 1000) || 0;

                steps = Math.ceil(duration / refreshInterval);
                increment = ((countTo - scope.value) / steps);
                num = scope.value;
            }

            var tick = function () {
                scope.timoutId = $timeout(function () {
                    num += increment;
                    step++;
                    if (step >= steps) {
                        $timeout.cancel(scope.timoutId);
                        num = countTo;
                        e.innerText = countTo;
                    } else {
                        e.innerText = Math.round(num);
                        tick();
                    }
                }, refreshInterval);

            }

            var start = function () {
                if (scope.timoutId) {
                    $timeout.cancel(scope.timoutId);
                }
                calculate();
                tick();
            }

            attrs.$observe('countTo', function (val) {
                if (val) {
                    start();
                }
            });

            attrs.$observe('value', function (val) {
                start();
            });

            return true;
        }
    }

}]);

(function(){
//export html table to pdf, excel or doc
var exportTable = function(){
var link = function($scope, elm, attr){
  
$scope.$on('export-pdf', function(e, d){
      elm.tableExport({type:'pdf',pdfFontSize:'4', escape:false});
 });
$scope.$on('export-excel', function(e, d){
       elm.tableExport({type:'excel', tableName:d.tableName,htmlContent:true, escape:false});
 });
$scope.$on('export-doc', function(e, d){
     elm.tableExport({type: 'doc', tableName:d.tableName, escape:false});
 });
$scope.$on('export-png', function(e, d){
     elm.tableExport({type: 'png', tableName:d.tableName, escape:false});
 });
$scope.$on('export-csv', function(e, d){
     elm.tableExport({type: 'csv', tableName:d.tableName,escape:false});
 });
}
return {
  restrict: 'C',
  link: link
   }
 }
App
 .directive('exportTable', exportTable);
})();

App.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show'); 
                    //console.log("sidebar");
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});

  App.directive('version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
//================================for flash message============
 // Directive for compiling dynamic html
    App.directive('dynamic', function($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, ele, attrs) {
                scope.$watch(attrs.dynamic, function(html) {
                    ele.html(html);
                    $compile(ele.contents())(scope);
                });
            }
        };
    });

    // Directive for closing the flash message
    App.directive('closeFlash', function($compile, Flash) {
        return {
            link: function(scope, ele) {
                ele.on('click', function() {
                   
                    Flash.dismiss();
                });
            }
        };
    });

    // Create flashMessage directive
    App.directive('flashMessage', function($compile, $rootScope) {
        return {
            restrict: 'A',
            template: '<div role="alert" ng-show="hasFlash" class="alert {{flash.addClass}} alert-{{flash.type}} alert-dismissible ng-hide alertIn alertOut "> <span dynamic="flash.text"></span> <button type="button" class="close" close-flash><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> </div>',
            link: function(scope, ele, attrs) {
                // get timeout value from directive attribute and set to flash timeout
                $rootScope.flash.timeout = parseInt(attrs.flashMessage, 10);
            }
        };
    });

    App.factory('Flash', ['$rootScope', '$timeout',
        function($rootScope, $timeout) {

            var dataFactory = {},
                timeOut;

            // Create flash message
            dataFactory.create = function(type, text, addClass) {
                var $this = this;
                $timeout.cancel(timeOut);
                $rootScope.flash.type = type;
                $rootScope.flash.text = text;
                $rootScope.flash.addClass = addClass;
                $timeout(function() {
                    $rootScope.hasFlash = true;
                }, 100);
                timeOut = $timeout(function() {
                    $this.dismiss();
                }, $rootScope.flash.timeout);
            };

            // Cancel flashmessage timeout function
            dataFactory.pause = function() {
                $timeout.cancel(timeOut);
            };

            // Dismiss flash message
            dataFactory.dismiss = function() {
                $timeout.cancel(timeOut);
                $timeout(function() {
                    $rootScope.hasFlash = false;
                });
            };
            return dataFactory;
        }
    ]);
//=================================end of flash message========
  App.directive('uploadVideoPopup', function ($timeout) {
    return {
      restrict:'E',
      replace:true,
      templateUrl:'view/forms/video/uploadVideoPopup.html',
      scope: {
        //if there were attributes it would be shown here
      },
      link:function (scope, element, attrs, ctrl) {
        // DOM manipulation may happen here.
        
          
          scope.medium        = 0;
          scope.class         = 0;
          scope.subject       = 0;
          scope.publlication  = 0;
          scope.section       = 0;
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 0;
          scope.board         = 1;

        scope.showBoard = function(){

          
          scope.medium        = 0;
          scope.class         = 0;
          scope.subject       = 0;
          scope.publlication  = 0;
          scope.section       = 0;
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 0;
          scope.board         = 1;

        }  

        scope.showMedium = function(){
 
          scope.board         = 0;
         
          scope.class         = 0;
          scope.subject       = 0;
          scope.publlication  = 0;
          scope.section       = 0;
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 0;
           scope.medium        = 1;
      
        }

        scope.showClass = function(){
 
          scope.board         = 0;
          scope.medium        = 0;
          
          scope.subject       = 0;
          scope.publlication  = 0;
          scope.section       = 0;
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 0;
          scope.class         = 1;
      
        }

        scope.showSubject = function(){
 
          scope.board         = 0;
          scope.medium        = 0;
          scope.class         = 0;
          
          scope.publlication  = 0;
          scope.section       = 0;
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 0;
          scope.subject       = 1;
      
        }

        scope.showPubllication = function(){
 
          scope.board         = 0;
          scope.medium        = 0;
          scope.class         = 0;
          scope.subject       = 0;
          
          scope.section       = 0;
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 0;
          scope.publlication  = 1;
      
        }

        scope.showSection = function(){
 
          scope.board         = 0;
          scope.medium        = 0;
          scope.class         = 0;
          scope.subject       = 0;
          scope.publlication  = 0;
          
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 0;
          scope.section       = 1;
      
        }

        scope.showChapter = function(){
 
          scope.board         = 0;
          scope.medium        = 0;
          scope.class         = 0;
          scope.subject       = 0;
          scope.publlication  = 0;
          scope.section       = 0;
          
          scope.topic         = 0;
          scope.level         = 0;
          scope.chapter       = 1;
      
        }

        scope.showTopic = function(){
 
          scope.board         = 0;
          scope.medium        = 0;
          scope.class         = 0;
          scope.subject       = 0;
          scope.publlication  = 0;
          scope.section       = 0;
          scope.chapter       = 0;
          
          scope.level         = 0;
          scope.topic         = 1;
      
        }
        scope.showLevel = function(){
 
          scope.board         = 0;
          scope.medium        = 0;
          scope.class         = 0;
          scope.subject       = 0;
          scope.publlication  = 0;
          scope.section       = 0;
          scope.chapter       = 0;
          scope.topic         = 0;
          scope.level         = 1;
      
        }




      }
    }
  });

App.directive('notification', function($timeout){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '='
    },
    template: '<div class="alert fade" bs-alert="ngModel"></div>',
    link: function(scope, element, attrs) {
      $timeout(function(){
        element.hide();
      }, 3000);
    }
  }
});

App.directive('restrictTo', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var re = RegExp(attrs.restrictTo);
            var exclude = /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;

            element[0].addEventListener('keydown', function(event) {
                if (!exclude.test(event.key) && !re.test(event.key)) {
                    event.preventDefault();
                }
            });
        }
    }
});

// you may add as much directives as you want below
}());