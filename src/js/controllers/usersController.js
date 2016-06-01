angular
.module("sketchApp")
.controller("UsersController", UsersController);

UsersController.$inject = ["User", "CurrentUser", "$state", "$uibModal"];
function UsersController(User, CurrentUser, $state, $uibModal){
  var self = this;

  self.all            = [];
  self.user           = null;
  self.currentUser    = CurrentUser.getUser();
  self.error          = null;
  self.getUsers       = getUsers;
  self.register       = register;
  self.login          = login;
  self.logout         = logout;
  self.openModal      = openModal;
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
    self.error = "Something went wrong";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function openModal(modal) {
    self.modalInstance = $uibModal.open({
      templateUrl:  "../views/authentications/" + modal + ".html",
      controller:   "UsersController",
      controllerAs: "users",
      size:         "md",
      resolve:      {
        items: function() {
          return self.items;
        }
      }
    });

    self.modalInstance.result.then(function(selectedItem) {
      self.selected = selectedItem;
    });
  }

  function closeModal() {
    $close(self.modalInstance);
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
