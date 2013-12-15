'use strict';

describe('Controller: StatsCtrl', function () {

  // load the controller's module
  beforeEach(module('sleepstatsApp'));

  var StatsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $window) {
    scope = $rootScope.$new();
    StatsCtrl = $controller('StatsCtrl', {
      $scope: scope
    });

    // stub google analytics
    $window.ga = function(){};
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
    // beforeEach(inject(function ($controller, $rootScope) {
    //   scope = $rootScope.$new();
    //   StatsCtrl = $controller('StatsCtrl', {
    //     $scope: scope
    //   });
    // }));
    beforeEach(function () {
      // stub input form error handling
      scope.dateSelect = {
        $error: {
          required: false
        }
      }
    });

    it('should require correct date format', function () {
      var inputResult,
        invalidDate,
        validDate;

      invalidDate = 'foo';
      validDate = '2013-05-05';

      // stub ajax call
      scope.getData = function(){};

      scope.from = invalidDate;
      scope.to = invalidDate;
      inputResult = scope.handleInput();
      expect(inputResult).toBe(false);

      scope.from = validDate;
      scope.to = invalidDate;
      inputResult = scope.handleInput();
      expect(inputResult).toBe(false);

      scope.from = invalidDate;
      scope.to = validDate;
      inputResult = scope.handleInput();
      expect(inputResult).toBe(false);

      scope.from = validDate;
      scope.to = validDate;
      inputResult = scope.handleInput();
      expect(inputResult).toBe(true);
    });

    it('should call getData() with a date range', function () {
      var from, to;

      from = '2013-05-05';
      to = '2013-12-12';

      spyOn(scope, 'getData');

      scope.from = from;
      scope.to = to;

      scope.handleInput();

      expect(scope.getData).toHaveBeenCalledWith(from, to);
    });
  });

  describe('StatsCtrl.getData()', function () {
    var StatsCtrl,
      scope,
      $httpBackend,
      from,
      to,
      json1,
      json2,
      json3;

    from = '2013-05-05';
    to = '2013-12-12';

    json1 = [{foo: 'bar'}];
    json2 = [{baz: 'foo'}];
    json3 = [{bar: 'baz'}];

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, apis) {
      // mock the ajax calls
      $httpBackend = _$httpBackend_;

      $httpBackend
        .expectGET(apis.urls.fitbit.sleepAwakenings + '/' + from + '/' + to)
        .respond({"sleep-awakeningsCount":json1});

      $httpBackend
        .expectGET(apis.urls.fitbit.sleepTimeToSleep + '/' + from + '/' + to)
        .respond({"sleep-minutesToFallAsleep":json2});

      $httpBackend
        .expectGET(apis.urls.fitbit.sleepTimeInBed + '/' + from + '/' + to)
        .respond({"sleep-timeInBed":json3});

      scope = $rootScope.$new();

      StatsCtrl = $controller('StatsCtrl', {
        $scope: scope
      });
    }));

    it('should call scope.setUIToLoading()', function () {
      spyOn(scope, 'setUIToLoading');

      scope.getData(from, to);

      expect(scope.setUIToLoading).toHaveBeenCalled();
    });

    it('should make ajax calls and set json results on models', function () {
      scope.getData(from, to);
      $httpBackend.flush();

      expect(scope.awakenings).toBe(json1);
      expect(scope.timeToSleep).toBe(json2);
      expect(scope.timeInBed).toBe(json3);
    });

    it('should call scope.setUIToLoaded() after ajax success', function () {
      spyOn(scope, 'setUIToLoaded');

      scope.getData(from, to);
      $httpBackend.flush();

      expect(scope.setUIToLoaded).toHaveBeenCalled();
    });
  });
});
