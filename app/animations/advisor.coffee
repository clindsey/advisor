advisorAnimations = angular.module 'advisorAnimations', ['ngAnimate']

currentColor = '#fff'

wipeStart = (element, className, done) ->
  return unless className is 'loading'
  currentColor = randomColor {luminosity: 'light'}
  $('#dynamicStyles').text """
    .wipe:after { background-image: linear-gradient(135deg, rgba(0, 0, 0, 0) 50%, #{currentColor} 50%); }
  """
  done()
  angular.noop

wipeEnd = (element, className, done) ->
  return unless className is 'loading'
  $('html, body').css 'background-color': currentColor
  done()
  angular.noop

advisorAnimations.animation '.wipe', ->
  {
    addClass: wipeStart
    removeClass: wipeEnd
  }
