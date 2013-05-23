'use strict';

angular.module('fitbyteApp')

  // basic directive
  .directive('testdirective', function () {
    return {
      template: '<div><p></p></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the testdirective directive');
      }
    };
  })

  // gettng interactive with directives
  .directive('clickage', function () {
    // can just return a function if all you're doing is "link"-ing
    // can also ommit "restrict" prop... it defaults to attribute ("A")
    return function (scope, element) {
      element.bind('click', function(){
        console.log('you just clicked me');
      })
    }
  })

  // these next two are cool b/c the class to add/remove is decoupled
  // from the code (it's in tag attr)
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

  ///////////////////////////////////////////////////////////////
  // communication between directives and controllers

  // following is not a desirable style because you're assuming the directive
  // will be used in that controller's scope (i.e. you're assuming that the
  // scope passed in to the directive will have a "loadMoreTweets" method)
  .controller('someController', function($scope) {
    $scope.loadMoreTweets = function() {
      console.log('loading more tweets');
    }
  })
  .directive('loadmoretweetsonenter', function () {
    return function (scope, element, attrs) {
      element.bind('mouseenter', function(){
        scope.loadMoreTweets();
      })
    }
  })

  // following is apperently better, but I'm not 100% sure why. I guess it's
  // because you remove coupling the directive with a specific scope/controller
  // method.
  .controller('someController2', function($scope) {
    $scope.loadMoreTweets = function() {
      console.log('loading more tweets');
    }
    $scope.deleteTweets = function() {
      console.log('deleting tweets');
    }
  })
  .directive('dotweetthingonenter', function () {
    return function (scope, element, attrs) {
      element.bind('mouseenter', function(){
        scope.$apply(attrs.dotweetthingonenter);
      })
    }
  })

  // following is an example of directives communicating with each other
  .directive('superhero', function () {
    return {
      restrict: "E",
      scope: {}, // need to add this to create distinct scopes for
                 // each directive
      controller: function($scope) {
        $scope.abilities = [];

        this.addStrength = function() {
          $scope.abilities.push('strength');
        }

        this.addSpeed = function() {
          $scope.abilities.push('speed');
        }

        this.addFlight = function() {
          $scope.abilities.push('flight');
        }
      },

      link: function(scope, element) {
        element.bind('mouseenter', function() {
          console.log(scope.abilities);
        })
      }
    }
  })
  .directive('strength', function() {
    return {
      require: 'superhero',
      link: function(scope, element, attrs, superheroCtrl) {
        superheroCtrl.addStrength();
      }
    }
  })
  .directive('speed', function() {
    return {
      require: 'superhero',
      link: function(scope, element, attrs, superheroCtrl) {
        superheroCtrl.addSpeed();
      }
    }
  })
  .directive('flight', function() {
    return {
      require: 'superhero',
      link: function(scope, element, attrs, superheroCtrl) {
        superheroCtrl.addFlight();
      }
    }
  })

