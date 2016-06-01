var mongoose = require("mongoose");

var databaseURL = "mongodb://localhost/sketch-app";
mongoose.connect(databaseURL);

var Game = require("../models/game");

var game1 = new Game({
  topic:    "Films",
  prompts:  [
    "The Shawshank Redemption",
    "Snow White and the Seven Dwarves",
    "Titanic",
    "Apocalypse Now",
    "Gone with the Wind",
    
  ]
});

game1.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});
