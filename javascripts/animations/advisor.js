window.require.register("animations/advisor", function(require, module) {var advisorAnimations, currentColor, wipeEnd, wipeStart;

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
