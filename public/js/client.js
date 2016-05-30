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

angular
.module("sketchApp")
.controller("UsersController", UsersController);

UsersController.$inject = ['User', 'CurrentUser', '$state'];
function UsersController(User, CurrentUser, $state){
  var self = this;

  self.all            = [];
  self.user           = null;
  self.currentUser    = null;
  self.error          = null;
  self.getUsers       = getUsers;
  self.register       = register;
  self.login          = login;
  self.logout         = logout;
  self.checkLoggedIn  = checkLoggedIn;

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('home');
    }
    self.currentUser = CurrentUser.getUser();
  }

  function handleError(err) {
    self.error = "Something went wrong!";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = [];
    self.currentUser = null;
    CurrentUser.clearUser();
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  if (checkLoggedIn()) {
    self.getUsers();
  }

  return self;
}

angular
.module("sketchApp")
.factory("User", User);

User.$inject = ["$resource", "API"];
function User($resource, API) {
  return $resource(
    API + "/users/:id", { id: "@_id" },
    {
      "get":      { method: "GET" },
      "save":     { method: "POST" },
      "query":    { method: "GET", isArray: false },
      "remove":   { method: "DELETE" },
      "delete":   { method: "DELETE" },
      "register": {
        url:    API + "/register",
        method: "POST"
      },
      "login":    {
        url:    API + "/login",
        method: "POST"
      }
    }
  );
}

angular
.module("sketchApp")
.factory("authInterceptor", AuthInterceptor);

AuthInterceptor.$inject = ["API", "TokenService"];
function AuthInterceptor(API, TokenService) {
  return {
    request: function(config){
      var token = TokenService.getToken();

      if (config.url.indexOf(API) === 0 && token) {
        config.headers.Authorization = "Bearer " + token;
      }
      
      return config;
    },

    response: function(res){
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        TokenService.setToken(res.data.token);
      }

      return res;
    }
  };
}

angular
.module("sketchApp")
.service("CurrentUser", CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){
    var self = this;
    self.getUser = getUser;
    self.clearUser = clearUser;
    self.user = getUser();

    function getUser() {
        return self.user ? self.user : TokenService.decodeToken();
    }

    function clearUser(){
      TokenService.removeToken();
      self.user = null;
    }
}

angular
.module("sketchApp")
.service("TokenService", TokenService);

TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper) {
  var self = this;

  self.setToken = setToken;
  self.getToken = getToken;
  self.removeToken = removeToken;
  self.decodeToken = decodeToken;

  function setToken(token){
    return $window.localStorage.setItem("auth-token", token);
  }

  function getToken() {
    return $window.localStorage["auth-token"];
  }

  function removeToken() {
    return $window.localStorage.removeItem("auth-token");
  }

  function decodeToken(){
    var token = self.getToken();
    if (token) {
      var decodedUser = jwtHelper.decodeToken(token);
      return token ? decodedUser._doc : null;
    }
  }
}
