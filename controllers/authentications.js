var passport  = require("passport");
var User      = require("../models/user");
var secret    = require("../config/config").secret;

function register(req, res, next) {
  var localStrategey = passport.authenticate("local-signup", function(err, user, info) {
    if (err) return res.status(500).json(info);
    if (info) return res.status(401).json(info);
    if (!user) return res.status(401).json(info);

    return res.status(200).json({
      success:  true,
      message:  "Thank you for authenticating",
      user:     user
    });
  });

  return localStrategey(req, res, next);
}

function login(req, res, next) {
  User.findOne({
    "email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    if (!user) return res.status(403).json({ message: "No user with that email address found" });
    if (!user.validatePassword(req.body.password)) return res.status(403).json({ message: "Authentication failed" });

    return res.status(200).json({
      success:  true,
      message:  "Welcome",
      user:     user
    });
  });
}

module.exports
