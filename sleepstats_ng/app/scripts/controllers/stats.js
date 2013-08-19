'use strict';

angular.module('sleepstatsNgApp')
  .controller('StatsCtrl', function ($scope, $http, $q, apis) {
    $q.all([
      $http.get(apis.urls.fitbit.sleepAwakenings),
      $http.get(apis.urls.fitbit.sleepTimeToSleep),
      $http.get(apis.urls.fitbit.sleepTimeInBed)
    ])
    .then(function(data) {
      $scope.awakenings = data[0].data['sleep-awakeningsCount'];
      $scope.timeToSleep = data[1].data['sleep-minutesToFallAsleep'];
      $scope.timeInBed = data[2].data['sleep-timeInBed'];
      $scope.dataLoaded = true;
    });

    $scope.dataLoaded = false;

    $scope.graphType = 'awakenings';

    $scope.showGraph = function(type) {
      $scope.graphType = type;
    };
  });