angular
.module('logging')
.service('TokenService', TokenService);

TokenService.$inject = "$window";
function TokenService($window) {
  var self = this;

  self.setToken = setToken;
  self.getToken = getToken;
  self.removeToken = removeToken;
  self.decodeToken = decodeToken;

  function setToken(token){
    return $window.localStorage.setItem('auth-token', token);
  }

  function getToken() {
    return $window.localStorage['auth-token'];
  }

  function removeToken(){

  }

  function decodeToken(){

  }
}
