'use strict';

angular.module('fitbyteApp')
    .controller('StatsCtrl', function ($scope) {
        $scope.graphType = 'timesAwoken';
        
        $scope.showGraph = function(type) {
        	$scope.graphType = type;
        }
    });
