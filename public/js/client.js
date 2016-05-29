var SketchApp = SketchApp || {};

SketchApp.ajaxRequest = function(method, url, data){
  return $.ajax({
    method: method,
    url: "http://localhost:3000/api" + url,
    data: data,
    beforeSend: this.setRequestHeader
  }).done(function(data){
    console.log(data);
    return SketchApp.saveTokenIfPresent(data);
  }).fail(function(){
    console.log(data.responseJSON.message);
  });
};

SketchApp.submitForm = function(){
  event.preventDefault();

  var method = $(this).attr('method');
  var url    = $(this).attr("action");
  var data   = $(this).serialize();

  return SketchApp.ajaxRequest(method, url, data);
};

SketchApp.getUsers = function(){
    return SketchApp.ajaxRequest("get", "/users");
};

SketchApp.setToken = function(token){
  return window.localStorage.setItem('token', token);
};

SketchApp.saveTokenIfPresent = function(data){
  if (data.token) return this.setToken(data.token);
    return false;
};

SketchApp.getToken = function(){
  return window.localStorage.getItem("token");
};

SketchApp.setRequestHeader = function(xhr, settings){
  var token = SketchApp.getToken();
  if (token) return xhr.setRequestHeader("Authorization", "Bearer " + token);
};

SketchApp.initialize = function() {
  $("form").on("submit", this.submitForm);
  $("#getUsers").on("click", this.getUsers);
};

$(SketchApp.initialize());
