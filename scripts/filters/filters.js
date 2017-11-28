(function () {

  "use strict";

  var App = angular.module("App.filters",[]);

  /*==================================================
  =            Filter for Teacher Reports            =
  ==================================================*/
  App.filter('filterObj', filterObj);

	function filterObj() {
	  return function(collection, properties) {
	    var trace = [];
	    angular.forEach(collection, function(item) {
	      for (var i = 0; i < trace.length; i++) {
	         if (equalsPartial(item, trace[i], properties))
	           return;
	      }
	      trace.push(item);
	    });
	    return trace;
	  }

	    function equalsPartial(item,traceItem,properties){
	        for (var j = 0; j < properties.length; j++) {
	          if (item[properties[j]] !== traceItem[properties[j]])
	            return false;
	        }
	      return true;
	    }
	}
  /*=====  End of Filter for Teacher Reports  ======*/

  App.filter('selected', [
    '$filter',
    function($filter) {
      return function(files) {
        return $filter('filter')(files, {
          selected: true
        });
      };
    }
  ]);

 App.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

  App.filter('sumOfValue', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' && typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum = sum + parseInt(data[i][key]);
        }
        return sum;
    }
 });

  App.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
  
  // just copy paste the example above to add more filters


}());