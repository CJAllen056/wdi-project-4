angular
.module("sketchApp")
.controller("GamesController", GamesController);

GamesController.$inject = ["Game", "$state"];
function GamesController(Game, $state) {
  var self = this;

  self.all        = [];
  self.getGames   = getGames;

  self.color      = "";
  self.colors     = {
    black:  "black",
    red:    "#F53C3C",
    blue:   "#6676EA",
    green:  "#17BB17",
    yellow: "#E9EC0D",
    orange: "orange",
    purple: "#B32EB3",
    eraser: "white"
  };
  self.pickColor  = pickColor;

  self.size       = "";
  self.sizes      = {
    small:  2,
    medium: 8,
    large:  15
  };
  self.pickSize   = pickSize;

  function getGames() {
    Game.query(function(data) {
      self.all = data.games;
    });
  }

  function pickColor(color) {
    self.color = color;
  }

  function pickSize(size) {
    self.size = size;
  }
}
