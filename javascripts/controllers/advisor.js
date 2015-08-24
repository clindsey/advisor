window.require.register("controllers/advisor", function(require, module) {var advisorControllers, config, fallbackAdvice, getNewAdvice, onAdviceClick;

config = require('config');

advisorControllers = angular.module('advisorControllers', []);

getNewAdvice = function($scope, Advice, $timeout, timeoutPromise) {
  return function() {
    return Advice.get().$promise.then(function(advice) {
      if ($scope.ignoreResult) {
        return;
      }
      $scope.firstTruth = false;
      $scope.isLoading = false;
      $scope.advice = advice;
      return $timeout.cancel(timeoutPromise);
    }, function(_arg) {
      var status, statusText;
      status = _arg.status, statusText = _arg.statusText;
      return getNewAdvice($scope, Advice, $timeout, timeoutPromise)();
    });
  };
};

onAdviceClick = function($scope, Advice, $timeout) {
  return function() {
    var timeoutPromise;
    if ($scope.isLoading) {
      return;
    }
    $scope.isLoading = true;
    $scope.ignoreResult = false;
    timeoutPromise = $timeout(fallbackAdvice($scope), config.fallbackDelay);
    return getNewAdvice($scope, Advice, $timeout, timeoutPromise)();
  };
};

fallbackAdvice = function($scope) {
  return function() {
    $scope.isLoading = false;
    $scope.ignoreResult = true;
    $scope.firstTruth = false;
    return $scope.advice = {
      fortune: ['A penny saved is a penny earned.']
    };
  };
};

advisorControllers.controller('AdvisorViewController', [
  '$scope', 'Advice', '$timeout', function($scope, Advice, $timeout) {
    $scope.isLoading = false;
    $scope.firstTruth = true;
    $scope.ignoreResult = false;
    return $scope.adviceClick = onAdviceClick($scope, Advice, $timeout);
  }
]);
});
