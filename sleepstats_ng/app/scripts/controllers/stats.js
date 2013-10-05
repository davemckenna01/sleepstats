'use strict';

angular.module('sleepstatsApp')
  .controller('StatsCtrl', function ($scope, $http, $filter, $q, apis, $window){
    $scope.switchGraph = function(type) {
      $scope.graphType = type;
    };

    $scope.getData = function() {
      var from,
          to,
          dateFormat;

      dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
      from = $filter('parseDate')($scope.from);
      to = $filter('parseDate')($scope.to);

      if ($scope.dateSelect.$error.required ||
          !dateFormat.test(from) ||
          !dateFormat.test(to)) {
        return false;
      }

      $scope.dataLoading = true;
      $scope.dataLoaded = false;

      $q.all([
        $http.get(apis.urls.fitbit.sleepAwakenings +
                  '/' + from + '/' + to),
        $http.get(apis.urls.fitbit.sleepTimeToSleep +
                  '/' + from + '/' + to),
        $http.get(apis.urls.fitbit.sleepTimeInBed +
                  '/' + from + '/' + to)
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
    };
    
    $scope.dataLoaded = false;
    $scope.graphType = 'awakenings';
  });