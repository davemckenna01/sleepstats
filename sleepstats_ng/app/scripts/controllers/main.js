'use strict';

angular.module('sleepstatsNgApp')
  .controller('MainCtrl', function ($scope) {
  // .controller('MainCtrl', function ($scope, apis) {
  //   $scope.fitbitAuthorized = apis.authorized.fitbit;
    $scope.fitbitAuthorized = true;
  });
