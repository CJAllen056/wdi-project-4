var mongoose  = require("mongoose");
var bcrypt    = require("bcrypt-nodejs");
var validator = require("validator");

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

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash, null);
};

userSchema.virtual("password")
.set(function(password) {
  this._password    = password;
  this.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

userSchema.virtual("passwordConfirmation")
.set(function(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
});

userSchema.path("passwordHash")
.validate(function() {
  if (this.isNew) {
    if (!this._password) {
      this.invalidate("password", "A password is required");
    }
    if (this._password.length < 8) {
      this.invalidate("password", "Passwords must be 8 characters or more");
    }
    if (this._password !== this._passwordConfirmation) {
      this.invalidate("passwordConfirmation", "The password confirmation and password do not match");
    }
  }
});

userSchema.path("email")
.validate(function(email) {
  if (!validator.isEmail(email)) {
    this.invalidate("email", "This is not a valid email");
  }
});

userSchema.set("toJSON", {
  tranform: function(doc, ret, options) {
    delete ret.passwordHash;
    return ret;
  }
});

module.exports = mongoose.model("User", userSchema);
