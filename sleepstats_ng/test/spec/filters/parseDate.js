'use strict';

describe('Filter: parseDate', function () {

  // load the filter's module
  beforeEach(module('sleepstatsApp'));

  // initialize a new instance of the filter before each test
  var parseDate;
  beforeEach(inject(function ($filter) {
    parseDate = $filter('parseDate');
  }));

  it('should return the input prefixed with "parseDate filter:"', function () {
    var text = 'angularjs';
    expect(parseDate(text)).toBe('parseDate filter: ' + text);
  });

});
