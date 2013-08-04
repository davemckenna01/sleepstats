'use strict';

angular.module('fitbyteApp')
    .controller('StatsCtrl', function ($scope, $http, $q, apis) {
        $q.all([
            $http.get(apis.urls.fitbit.sleepAwakenings),
            $http.get(apis.urls.fitbit.sleepTimeToSleep)
        ])
        .then(function(data) {
            $scope.awakenings = data[0].data['sleep-awakeningsCount'];
            $scope.timeToSleep = data[1].data['sleep-minutesToFallAsleep'];
            $scope.dataLoaded = true;
        });

        $scope.dataLoaded = false;

        $scope.graphType = 'awakenings';

        $scope.showGraph = function(type) {
        	$scope.graphType = type;
        }
    });