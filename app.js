var config          = require("./config/config");
var express         = require("express");
var morgan          = require("morgan");
var methodOverride  = require("method-override");

var app     = express();

app.use(morgan("dev"));

app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.listen(config.port, function() {
  console.log("Sketch-off is running on port ", port);
});
