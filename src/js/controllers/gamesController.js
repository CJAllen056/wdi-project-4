angular
.module("sketchApp")
.controller("GamesController", GamesController);

GamesController.$inject = ["Game", "$state", "CurrentUser", "User", "$uibModal"];
function GamesController(Game, $state, CurrentUser, User, $uibModal) {
  var self    = this;
  var socket  = io();

  self.all          = [];
  self.getGames     = getGames;
  self.joinGame     = joinGame;
  self.game         = {};

  function getGames() {
    Game.query(function(data) {
      self.all = data.games;
    });
  }

  function joinGame(game) {
    if (!!CurrentUser.getUser()) {
      User.get({ id: CurrentUser.getUser()._id }, function(data) {
        self.user = data.user;

        game.users.push(self.user);
        Game.update({ id: game._id }, game, function(data) {
          self.game = data.game;
        });
      });
      $state.go("canvas", { id: game._id });
    } else {
      self.modalInstance = $uibModal.open({
        templateUrl:  "../views/authentications/login-w-register.html",
        controller:   "UsersController",
        controllerAs: "users",
        size:         "md",
        resolve:      {
          items: function() {
            return self.items;
          }
        }
      });
    }
  }

  self.getGames();
}
