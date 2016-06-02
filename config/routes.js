var express = require("express");
var router  = express.Router();

var usersController           = require("../controllers/usersController");
var authenticationsController = require("../controllers/authenticationsController");
var gamesController           = require("../controllers/gamesController");

router.post("/login", authenticationsController.login);
router.post("/register", authenticationsController.register);

router.route("/users")
.get(usersController.index);

router.route("/users/:id")
.get(usersController.show)
.put(usersController.update)
.patch(usersController.update)
.delete(usersController.delete);

router.route("/games")
.get(gamesController.index)
.post(gamesController.create);

router.route("/games/:id")
.get(gamesController.show)
.put(gamesController.update);

module.exports = router;
