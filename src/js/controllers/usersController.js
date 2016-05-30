angular
.module("sketchApp")
.controller("UsersController", UsersController);

UsersController.$inject = ["User", "CurrentUser", "$state"];
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
      self.currentUser = CurrentUser.getUser();
      $state.go("home");
    }
  }

  function handleError(err) {
    self.error = err;
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
    return !!self.currentUser;
  }

  if (checkLoggedIn()) {
    self.getUsers();
  }

  return self;
}
