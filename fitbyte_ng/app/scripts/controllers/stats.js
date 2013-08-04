'use strict';

angular.module('fitbyteApp')
    .controller('StatsCtrl', function ($scope, $http, apis) {
        $http.get(apis.urls.fitbit.sleepAwakenings).success(function(data) {
            $scope.dataLoaded = true;
        });

        $scope.loading = false;

        $scope.graphType = 'timesAwoken';

        $scope.showGraph = function(type) {
        	$scope.graphType = type;
        }
    });