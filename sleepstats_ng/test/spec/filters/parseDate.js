'use strict';

describe('Filter: parseDate', function () {

  // load the filter's module
  beforeEach(module('sleepstatsApp'));

  // initialize a new instance of the filter before each test
  var parseDate;
  beforeEach(inject(function ($filter) {
    parseDate = $filter('parseDate');
  }));

  it('should return a formatted date string from plain language', function () {
    var text;

    text = 'may 2013';
    expect(parseDate(text)).toBe('2013-05-01');
  });

  it('should return default text if input is nonsensical', function () {
    var text, defaultText;

    text = 'gibbbberish';
    defaultText = 'beautiful defaultness';

    expect(parseDate(text, defaultText)).toBe(defaultText);
  });

});
