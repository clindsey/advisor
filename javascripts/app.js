window.require.register('animations/advisor', function(require, module) {
var advisorAnimations, currentColor, wipeEnd, wipeStart;

advisorAnimations = angular.module('advisorAnimations', ['ngAnimate']);

currentColor = '#fff';

wipeStart = function(element, className, done) {
  if (className !== 'loading') {
    return;
  }
  currentColor = randomColor({
    luminosity: 'light'
  });
  $('#dynamicStyles').text(".wipe:after { background-image: linear-gradient(135deg, rgba(0, 0, 0, 0) 50%, " + currentColor + " 50%); }");
  done();
  return angular.noop;
};

wipeEnd = function(element, className, done) {
  if (className !== 'loading') {
    return;
  }
  $('html, body').css({
    'background-color': currentColor
  });
  done();
  return angular.noop;
};

advisorAnimations.animation('.wipe', function() {
  return {
    addClass: wipeStart,
    removeClass: wipeEnd
  };
});

});

window.require.register('app', function(require, module) {
var marvelApp;

require('controllers/advisor');

require('services/advisor');

require('animations/advisor');

marvelApp = angular.module('advisorApp', ['ngRoute', 'templates-main', 'advisorControllers', 'advisorServices', 'advisorAnimations']);

marvelApp.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'templates/advisor/index.html',
      controller: 'AdvisorViewController'
    }).otherwise({
      redirectTo: '/'
    });
  }
]);

});

window.require.register('config', function(require, module) {
var utils;

utils = require('utils');

module.exports = {
  adviceUri: utils.rot13('uggc://ncv.npzr.vagreangvbany/sbeghar'),
  fallbackDelay: 1000 * 10
};

});

window.require.register('controllers/advisor', function(require, module) {
var advisorControllers, config, fallbackAdvice, getNewAdvice, onAdviceClick;

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

window.require.register('index', function(require, module) {

require('templates');

require('app');

});

window.require.register('services/advisor', function(require, module) {
var advisorServices, config, utils;

config = require('config');

utils = require('utils');

advisorServices = angular.module('advisorServices', ['ngResource']);

advisorServices.factory('Advice', [
  '$resource', function($resource) {
    return $resource(config.adviceUri);
  }
]);

});

window.require.register('utils', function(require, module) {

module.exports = {
  rot13: function(s) {
    return s.replace(/[a-zA-Z]/g, function(c) {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }
};

});
