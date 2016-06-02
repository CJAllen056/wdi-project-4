var mongoose  = require("mongoose");

var gameSchema = new mongoose.Schema({
  topic:        { type: String },
  prompts:      { type: Array },
  users:        [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  roundLength:  { type: Number },
  difficulty:   { type: String }
});

module.exports = mongoose.model("Game", gameSchema);
