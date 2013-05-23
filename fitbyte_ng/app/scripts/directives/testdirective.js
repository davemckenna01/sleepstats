'use strict';

angular.module('fitbyteApp')
  .directive('testdirective', function () {
    return {
      template: '<div><p></p></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the testdirective directive');
      }
    };
  })
  .directive('clickage', function () {
    // can just return a function if all you're doing is "link"-ing
    // can also ommit "restrict" prop... it defaults to attribute ("A")
    return function (scope, element) {
      element.bind('click', function(){
        console.log('you just clicked me');
      })
    }
  })
  .directive('enter', function () {
    return function (scope, element, attrs) {
      element.bind('mouseenter', function(){
        element.addClass(attrs.enter);
      })
    }
  })
  .directive('leave', function () {
    return function (scope, element, attrs) {
      element.bind('mouseleave', function(){
        element.removeClass(attrs.leave);
      })
    }
  })
