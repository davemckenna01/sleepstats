'use strict';

angular.module('sleepstatsApp')
  .controller('MainCtrl', function ($scope, apis) {
    $scope.fitbitAuthorized = apis.authorized.fitbit;
    $scope.fitbitURLs = apis.urls.fitbit;
  });
