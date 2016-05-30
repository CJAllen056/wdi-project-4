angular
.module("sketchApp", ["ngResource", "angular-jwt", "ui.router"])
.constant("API", "http://localhost:3000/api")
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
    .state("login", {
      url: "/login",
      templateUrl: "../views/authentications/login.html"
    })
    .state("register", {
      url: "/register",
      templateUrl: "../views/authentications/register.html"
    })
    .state("users", {
      url: "/users",
      templateUrl: "../views/users/index.html"
    })
    .state("user", {
      url: "/users/:id",
      templateUrl: "../views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    });

  $urlRouterProvider.otherwise("/");
}
