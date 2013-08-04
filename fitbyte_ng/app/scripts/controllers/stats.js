'use strict';

angular.module('fitbyteApp')
    .controller('StatsCtrl', function ($scope, $http, apis) {
        $http.get(apis.urls.fitbit.sleepAwakenings).success(function(data) {
        });
        $http.get(apis.urls.fitbit.sleepTimeToSleep).success(function(data) {
        });
        $http.get(apis.urls.fitbit.sleepTimeInBed).success(function(data) {
        });
        $http.get(apis.urls.fitbit.sleepStartTime).success(function(data) {
        });

        $scope.dataLoaded = true;

        $scope.graphType = 'timesAwoken';

        $scope.showGraph = function(type) {
        	$scope.graphType = type;
        }
    });