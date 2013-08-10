'use strict';

angular.module('sleepstatsApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/app/views/main.html',
        controller: 'MainCtrl'
      })
      .when('/stats', {
        templateUrl: 'static/app/views/stats.html',
        controller: 'StatsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
