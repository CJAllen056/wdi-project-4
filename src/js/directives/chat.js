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
      var user      = CurrentUser.getUser();
      var socket    = io();

      $input.keyup(function(e) {
        if (e.keyCode === 13 && $input.val()) {
          socket.emit("chat message", { text: $input.val(), username: user.username });
          $input.val("");

          return false;
        }
      });
      socket.on("chat message", function(msg) {
        $chatbox.append("<p><strong>" + msg.username + ":</strong> " + msg.text + "</p>");
      });
    }
  };
}
