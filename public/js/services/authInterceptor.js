angular
.module('logging')
.factory('authInterceptor', AuthInterceptor);

AuthInterceptor.$inject = ["API"];
function AuthInterceptor(API) {
  return {
    request: function(config){
      return config;
    },

    response: function(res){
      console.log(res);

      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        console.log("***Interceptor***", res.data.token);
      }
      
      return res;
    }
  };
}
