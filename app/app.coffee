require 'controllers/advisor'
require 'services/advisor'
require 'animations/advisor'

marvelApp = angular.module 'advisorApp', [
  'ngRoute'
  'templates-main'
  'advisorControllers'
  'advisorServices'
  'advisorAnimations'
]

marvelApp.config ['$routeProvider',
  ($routeProvider) ->
    $routeProvider.
    when('/', {
      templateUrl: 'templates/advisor/index.html'
      controller: 'AdvisorViewController'
    }).
    otherwise {
      redirectTo: '/'
    }
]
