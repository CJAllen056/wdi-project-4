angular
.module("sketchApp")
.service("CurrentUser", CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){
    var self = this;
    self.getUser = getUser;
    self.clearUser = clearUser;

    function getUser() {
        return TokenService.decodeToken();
    }

    function clearUser(){
      TokenService.removeToken();
    }
}
