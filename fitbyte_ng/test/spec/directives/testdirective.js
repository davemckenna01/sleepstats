'use strict';

describe('Directive: testdirective', function () {
  beforeEach(module('fitbyteApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<testdirective></testdirective>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the testdirective directive');
  }));
});
