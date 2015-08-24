config = require 'config'
utils = require 'utils'

advisorServices = angular.module 'advisorServices', ['ngResource']

advisorServices.factory 'Advice', ['$resource',
  ($resource) ->
    $resource config.adviceUri
]
