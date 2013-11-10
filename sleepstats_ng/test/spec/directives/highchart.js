'use strict';

describe('Directive: highchart', function () {
  beforeEach(module('sleepstatsApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<highchart></highchart>');
    element = $compile(element)($rootScope);
    // expect(element.text()).toBe('this is the highchart directive');
  }));
});
