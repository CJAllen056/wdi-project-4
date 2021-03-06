var passport  = require("passport");
var User      = require("../models/user");
var secret    = require("../config/config").secret;
var jwt       = require("jsonwebtoken");

function register(req, res, next) {
  var localStrategey = passport.authenticate("local-signup", function(err, user, info) {
    if (err) return res.status(500).json(err);
    if (info) return res.status(401).json(info);
    if (!user) return res.status(401).json(info);

    // var payload = { _id: user._id };
    var payload = {
      fName:    user.fName || "",
      lName:    user.lName || "",
      image:    user.image || "",
      username: user.username || "",
      _id:      user._id || ""
    };
    var token   = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success:  true,
      message:  "Thank you for authenticating",
      user:     user,
      token:    token
    });
  });

  return localStrategey(req, res, next);
}

function login(req, res, next) {
  User.findOne({
    "email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json({ message: "We were not able to log you in. Please try again" });
    if (!user) return res.status(403).json({ message: "No user with that email address found" });
    if (!user.validatePassword(req.body.password)) return res.status(403).json({ message: "Authentication failed" });

    var payload = {
      fName:    user.fName || "",
      lName:    user.lName || "",
      image:    user.image || "",
      username: user.username || "",
      _id:      user._id || ""
    };

    var token   = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success:  true,
      message:  "Welcome",
      user:     user,
      token:    token
    });
  });
}

module.exports = {
  login:    login,
  register: register
};
