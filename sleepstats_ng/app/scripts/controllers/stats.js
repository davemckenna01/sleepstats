'use strict';

angular.module('sleepstatsApp')
  .controller('StatsCtrl', function ($scope, $http, $filter, $q, apis, $window){

    $scope.handleInput = function() {
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
      } else {
        $scope.getData(from, to);
      }
    };

    $scope.getData = function(from, to) {
      $scope.setUIToLoading();

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

        $scope.setUIToLoaded();

        $window.ga('send', 'event',
                   'API-' + window.location.host, 'Response 200');
      },
      function(reason) {
        if (reason.status && reason.status === 401) {
          $window.location.href = apis.urls.fitbit.auth;
        }

        $scope.setUIToLoaded();
      }
      );
    };

    $scope.switchGraph = function(type) {
      $scope.graphType = type;
    };

    $scope.setUIToLoaded = function() {
      $scope.dataLoading = false;
      $scope.dataLoaded = true;
    };

    $scope.setUIToLoading = function() {
      $scope.dataLoading = true;
      $scope.dataLoaded = false;
    };
    
    $scope.dataLoaded = false;
    $scope.graphType = 'awakenings';
  });