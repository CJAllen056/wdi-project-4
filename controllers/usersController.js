var User = require("../models/user");

function usersIndex(req, res) {
  User.find(function(err, users) {
    if (err) return res.status(404).json({ message: "Request for users failed" });
    res.status(200).json({ users: users });
  });
}

function usersShow(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(404).json({ message: "Request for user failed" });
    res.status(200).json({ user: user });
  });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body.user, { new: true }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(404).json(err);
    res.status(200).json({ user: user });
  });
}

function usersDelete(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function(err) {
    if (err) return res.status(404).json({ message: "The request to delete the user failed" });
    res.status(200).json({ message: "User deleted" });
  });
}

module.exports = {
  index:  usersIndex,
  show:   usersShow,
  update: usersUpdate,
  delete: usersDelete
};
