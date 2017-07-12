angular.module('websiteApp')
.directive('typedjs', function() {
  return {
    restrict: 'E',
    scope: {
      strings: '='
    },
    template: '<span id="typed-output"></span>',
    link: function($scope, $element, $attrs) {
      var options = {
        strings: $scope.strings,
        contentType: "html",
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 300,
        loop: true,
        loopCount: null,
        cursorChar: null,
      };

      $(function() {
        $("#typed-output").typed(options);
      });
    }
  };
});