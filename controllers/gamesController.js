var Game = require("../models/game");

function gamesIndex(req, res) {
  Game.find(function(err, games) {
    if (err) return res.status(404).json({ message: "Request for games failed" });
    res.status(200).json({ games: games });
  });
}

function gamesCreate(req, res) {
  Game.create(req.body.game, function(err, game) {
    if (err) return res.status(404).json({ message: "Unable to create new game" });
    return res.status(201).json({ game: game });
  });
}

function gamesUpdate(req, res) {
  Game.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, game) {
    if(err) return res.status(500).json({ message: "Unable to update game" });
    res.status(200).send(game);
  });
}

function gamesShow(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if (err) return res.status(404).json({ message: "Request for game failed" });
    res.status(200).json({ game: game });
  });
}

module.exports = {
  create: gamesCreate,
  index:  gamesIndex,
  update: gamesUpdate,
  show:   gamesShow
};
