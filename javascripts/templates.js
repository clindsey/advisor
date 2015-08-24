window.require.register("templates", function(require, module) {angular.module('templates-main', ['templates/advisor/index.html']);

angular.module("templates/advisor/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/advisor/index.html",
    "<div class=\"wipe\" ng-class=\"{loading:isLoading}\">\n" +
    "  <div class=\"container advice-container\">\n" +
    "    <div ng-show=\"firstTruth\" class=\"lead text-center\">\n" +
    "      <h1>get advice: <button class=\"btn btn-default btn-lg\" ng-click=\"adviceClick()\">Truth</button></h1>\n" +
    "    </div>\n" +
    "    <h2 ng-repeat=\"fortune in advice.fortune\" class=\"advice-text\">{{fortune}}</h2>\n" +
    "  </div>\n" +
    "  <div class=\"footer\">\n" +
    "    <div class=\"container\">\n" +
    "      <p><a ng-hide=\"firstTruth\" ng-click=\"adviceClick()\">More Truth &rarr;</a></p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
});
