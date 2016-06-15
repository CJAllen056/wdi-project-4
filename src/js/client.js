angular
.module("sketchApp", ["ngResource", "angular-jwt", "ui.router", "ui.bootstrap"])
.constant("API", "http://nameless-lake-45770.herokuapp.com/api")
.config(mainRouter)
.config(function($httpProvider) {
  $httpProvider.interceptors.push("authInterceptor");
});

mainRouter.$inject = ["$stateProvider", "$urlRouterProvider"];
function mainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "../views/home.html"
    })
    .state("canvas", {
      url: "/game/:id",
      templateUrl: "../views/gameBoard.html",
      // controller: function($stateParams, Game) {
      //   Game.get({ id: $stateParams.id }, function(res) {
      //     // $scope.$parent.games.game = res.game;
      //   });
      // },
      onExit: function($stateParams, Game) {
        Game.get({ id: $stateParams.id }, function(res) {
          console.log(res.game.users);
          console.log($stateParams);
        });
      }
    });

  $urlRouterProvider.otherwise("/");
}
