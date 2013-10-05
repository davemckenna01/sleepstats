'use strict';

angular.module('sleepstatsApp')
  .filter('parseDate', function () {
    return function (input, defaultText) {
      var dateFormat,
          date;

      dateFormat = 'yyyy-MM-dd';
      date = Date.parse(input);

      if (date) {
        return date.toString(dateFormat);
      } else {
        return 'e.g. "' + defaultText + '"';
      }
    };
  });
