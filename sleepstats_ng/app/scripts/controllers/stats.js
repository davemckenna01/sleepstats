'use strict';

angular.module('sleepstatsApp')
  .controller('StatsCtrl', function ($scope, $http, $q, apis, $window) {
    $scope.switchGraph = function(type) {
      $scope.graphType = type;
    };

    $scope.getData = function(type) {
      if (!$scope.dateSelect.$valid) {
        console.log('fix that shit');
        return false;
      }

      $scope.dataLoading = true;

      $q.all([
        $http.get(apis.urls.fitbit.sleepAwakenings +
                  '/' + $scope.from + '/' + $scope.to),
        $http.get(apis.urls.fitbit.sleepTimeToSleep +
                  '/' + $scope.from + '/' + $scope.to),
        $http.get(apis.urls.fitbit.sleepTimeInBed +
                  '/' + $scope.from + '/' + $scope.to)
      ])
      .then(
      function(data) {
        $scope.awakenings = data[0].data['sleep-awakeningsCount'];
        $scope.timeToSleep = data[1].data['sleep-minutesToFallAsleep'];
        $scope.timeInBed = data[2].data['sleep-timeInBed'];

        $scope.updateUI();
      },
      function(reason) {
        if (reason.status && reason.status === 401) {
          $window.location.href = apis.urls.fitbit.auth;
        }

        $scope.updateUI();
      }
      );
    };

    $scope.updateUI = function() {
      $scope.dataLoading = false;
      $scope.dataLoaded = true;
    }

    $scope.dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
    $scope.dataLoaded = false;
    $scope.graphType = 'awakenings';
  });