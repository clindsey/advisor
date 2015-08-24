window.require.register("services/advisor", function(require, module) {var advisorServices, config, utils;

config = require('config');

utils = require('utils');

advisorServices = angular.module('advisorServices', ['ngResource']);

advisorServices.factory('Advice', [
  '$resource', function($resource) {
    return $resource(config.adviceUri);
  }
]);
});
