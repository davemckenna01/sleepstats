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
  })
  .value('apis', {
    urls: {
      fitbit: {
        sleepAwakenings: 'fitbit/sleepAwakenings/2013-05-04/2013-08-04',
        sleepTimeToSleep: 'fitbit/sleepTimeToSleep/2013-05-04/2013-08-04',
        sleepTimeInBed: 'fitbit/sleepTimeInBed/2013-05-04/2013-08-04',
        auth: 'fitbit/authorize'
        // sleepStartTime: 
        // sleepByDate:
      }
    }
    // authorized: {
    //   fitbit: eval('{{ fitbitAuthorized }}'.toLowerCase())
    // }
  });
