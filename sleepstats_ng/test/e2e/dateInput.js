'use strict';

describe('Date Range Input', function() {
  beforeEach(function () {
    browser().navigateTo('/ng/index-test.html#/');
  }); 

  it('should show date format when given plain language', function() {
    input('from').enter('may 2013');
    expect(element('input[ng-model="from"] ~ .date-parsed').text())
      .toEqual('2013-05-01');

    input('to').enter('june 2013');
    expect(element('input[ng-model="to"] ~ .date-parsed').text())
      .toEqual('2013-06-01');
  });

  it('should show a graph when entered', function() {
    var mockFrom,
        mockTo;

    // these are special dates that I'm listening for in the http backend mock
    mockFrom = '2013-01-01';
    mockTo = '2013-01-02';

    input('from').enter(mockFrom);
    input('to').enter(mockTo);
    element('#go').click();

    expect(element('ul#stat-menu li').count()).toEqual(3);
    expect(element('div[highchart="awakenings"] svg').count()).toEqual(1);
  });
});