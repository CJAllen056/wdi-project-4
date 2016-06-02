angular
.module("sketchApp")
.controller("BoardController", BoardController);

BoardController.$inject = ["Game", "$stateParams"];
function BoardController(Game, $stateParams) {
  var self = this;
  var socket = io();

  self.currentGame  = currentGame;
  self.game         = {};

  self.color      = "";
  self.colors     = {
    black:  "black",
    red:    "#F53C3C",
    blue:   "#6676EA",
    green:  "#17BB17",
    yellow: "#E9EC0D",
    orange: "orange",
    purple: "#B32EB3",
    brown:  "#855D14",
    eraser: "white"
  };
  self.pickColor  = pickColor;

  self.size       = "";
  self.sizes      = {
    small:  2,
    medium: 15,
    large:  30
  };
  self.pickSize   = pickSize;

  self.clearBoard = clearBoard;

  function currentGame() {
    Game.get({ id:  $stateParams.id }, function(data) {
      self.game = data.game;
    });
  }

  function pickColor(color) {
    self.color = color;
    $(".toolbarSize > div").css("border-color", color);
  }

  function pickSize(size) {
    self.size = size;
  }

  function clearBoard() {
    socket.emit("clear board");
  }

  socket.on("clear board", function() {
    var ctx = $(".canvas")[0].getContext("2d");

    ctx.clearRect(0, 0, 660, 500);
  });

  self.currentGame();
}
