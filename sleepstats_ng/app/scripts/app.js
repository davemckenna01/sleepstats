'use strict';

angular.module('sleepstatsApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .value('apis', {
    urls: {
      fitbit: {
        sleepAwakenings: '/fitbit/sleepAwakenings',
        sleepTimeToSleep: '/fitbit/sleepTimeToSleep',
        sleepTimeInBed: '/fitbit/sleepTimeInBed',
        auth: '/fitbit/authorize'
        // sleepStartTime: 
        // sleepByDate:
      }
    }
    // authorized: {
    //   fitbit: eval('{{ fitbitAuthorized }}'.toLowerCase())
    // }
  });