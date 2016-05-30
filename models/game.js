var mongoose  = require("mongoose");

var gameSchema = new mongoose.Schema({
  topic: [{ type: mongoose.Schema.ObjectId, ref: "Topic" }],
  users: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Game", gameSchema);
