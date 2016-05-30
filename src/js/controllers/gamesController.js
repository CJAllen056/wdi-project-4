angular
.module("sketchApp")
.controller("GamesController", GamesController);

GamesController.$inject = ["Game", "$state"];
function GamesController(Game, $state) {
  var self = this;

  self.all      = [];
  self.getGames = getGames;

  function getGames() {
    Game.query(function(data) {
      self.all = data.games;
    });
  }
}
