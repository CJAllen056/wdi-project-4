var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fName:        { type: String },
  lName:        { type: String },
  image:        { type: String },
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  passwordHash: { type: String }
}, {
  timestamps:   true
});

module.exports = mongoose.model("User", userSchema);
