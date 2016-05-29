angular
.module("sketchApp")
.controller("UsersController", UsersController);

UsersController.$inject = ["User", "CurrentUser"];
function UsersController(User, CurrentUser) {
  var self = this;

  self.all            = [];
  self.user           = null;
  self.currentUser    = null;
  self.error          = null;
  self.getUsers       = getUsers;
  self.register       = register;
  self.login          = login;
  self.logout         = logout;
  self.checkLoggedIn = checkLoggedIn;

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {

    }
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
