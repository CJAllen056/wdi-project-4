var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {
  passport.use("local-signup", new LocalStrategy({
    usernameField:      "email",
    passwordField:      "password",
    passReqToCallback:  true,
    session:            false
  }, function(req, email, password, done) {
    User.findOne({ "email": email }, function(err, user) {
      if (err) return done(err, false, { message: "We were not able to retrieve your email, please try again" });
      if (user) return done(null, false, { messge: "That email is already registered, please choose another" });

      var newUser = new User({
        fName:    req.body.fName,
        lName:    req.body.lName,
        image:    req.body.image,
        username: req.body.username,
        email:    req.body.email,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      });

      newUser.save(function(err, user) {
        if (err) return done(err, false, { message: "We were not able to create a new user. Please try again." });
        return done(null, user);
      });
    });
  }));
};
