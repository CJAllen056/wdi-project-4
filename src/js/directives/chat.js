angular
.module("sketchApp")
.directive("chatBox", postMessage);

postMessage.$inject = ["CurrentUser"];
function postMessage(CurrentUser) {
  return {
    restrict: "A",
    link: function(scope, element) {
      var $input    = $(".inputGuess");
      var $chatbox  = $(".chatArea");
      // var user      = CurrentUser.getUser().id;
      var user      = CurrentUser.getUser().username;

      $input.keyup(function(e) {
        if (e.keyCode === 13 && $input.val()) {
          var guess = $input.val();

          $chatbox.append("<p><strong>" + user + ":</strong> " + guess + "</p>");
          $input.val("");
        }
      });
    }
  };
}
