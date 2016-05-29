var config  = require("./config/config");
var express = require("express");
var app     = express();

app.listen(config.port, function() {
  console.log("Sketch-off is running on port ", port);
});
