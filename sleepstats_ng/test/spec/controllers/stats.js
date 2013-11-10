'use strict';

describe('Controller: StatsCtrl', function () {

  // load the controller's module
  beforeEach(module('sleepstatsApp'));

  var StatsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatsCtrl = $controller('StatsCtrl', {
      $scope: scope
    });
  }));

  it('should set the default ui state', function () {
    expect(scope.dataLoaded).toBe(false);
    expect(scope.graphType).toBe('awakenings');
  });

  describe('StatsCtrl.switchGraph()', function () {
    it('should set the graphType on the scope', function () {
      scope.graphType = 'foo';
      scope.switchGraph('bar');
      expect(scope.graphType).toBe('bar');
    });
  });

  describe('StatsCtrl.setUIToLoaded()', function () {
    it('should change the UI state to loaded', function () {
      scope.dataLoading = true;
      scope.dataLoaded = false;
      scope.setUIToLoaded();
      expect(scope.dataLoading).toBe(false);
      expect(scope.dataLoaded).toBe(true);
    });
  });

  describe('StatsCtrl.setUIToLoading()', function () {
    it('should change the UI state to loading', function () {
      scope.dataLoading = false;
      scope.dataLoaded = true;
      scope.setUIToLoading();
      expect(scope.dataLoading).toBe(true);
      expect(scope.dataLoaded).toBe(false);
    });
  });

  describe('StatsCtrl.handleInput()', function () {
    it('should ??', function () {
    });
  });

  describe('StatsCtrl.getData()', function () {
    it('should call scope.setUIToLoading()', function () {
    });

    it('should make a bunch of http requests()', function () {
    });
  });
});
