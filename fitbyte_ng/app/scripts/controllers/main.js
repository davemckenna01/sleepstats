'use strict';

angular.module('fitbyteApp')
  .controller('MainCtrl', function ($scope, apis) {
    console.log(apis);
    $scope.fitbitAuthorized = apis.authorized.fitbit;
    $scope.fitbitURLs = apis.urls.fitbit;
  });
