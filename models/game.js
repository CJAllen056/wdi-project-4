var mongoose  = require("mongoose");

var gameSchema = new mongoose.Schema({
  topic:    { type: String },
  prompts:  { type: Array },
  users:    [{ type: mongoose.Schema.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Game", gameSchema);
