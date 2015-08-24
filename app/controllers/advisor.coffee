config = require 'config'

advisorControllers = angular.module 'advisorControllers', []

getNewAdvice = ($scope, Advice, $timeout, timeoutPromise) ->
  return ->
    Advice.get().$promise.then (advice) ->
      return if $scope.ignoreResult
      $scope.firstTruth = false
      $scope.isLoading = false
      $scope.advice = advice
      $timeout.cancel timeoutPromise
    , ({status, statusText}) ->
      getNewAdvice($scope, Advice, $timeout, timeoutPromise)()

onAdviceClick = ($scope, Advice, $timeout) ->
  return ->
    return if $scope.isLoading
    $scope.isLoading = true
    $scope.ignoreResult = false
    timeoutPromise = $timeout fallbackAdvice($scope), config.fallbackDelay
    getNewAdvice($scope, Advice, $timeout, timeoutPromise)()

fallbackAdvice = ($scope) ->
  return ->
    $scope.isLoading = false
    $scope.ignoreResult = true
    $scope.firstTruth = false
    $scope.advice = {fortune: ['A penny saved is a penny earned.']}

advisorControllers.controller 'AdvisorViewController', ['$scope', 'Advice', '$timeout',
  ($scope, Advice, $timeout) ->
    $scope.isLoading = false
    $scope.firstTruth = true
    $scope.ignoreResult = false
    $scope.adviceClick = onAdviceClick($scope, Advice, $timeout)
]
