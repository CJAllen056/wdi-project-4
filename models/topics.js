var mongoose = require("mongoose");

var topicSchema = new mongoose.Schema({
  name:     { type: String },
  prompts:  { type: Array }
});

module.exports = mongoose.model("Topic", topicSchema);
