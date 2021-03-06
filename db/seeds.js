var mongoose = require("mongoose");

var databaseURL = process.env.MONGODB_URI || "mongodb://localhost/sketch-app";
mongoose.connect(databaseURL);

var Game = require("../models/game");

Game.collection.drop();

var game1 = new Game({
  topic:    "Films",
  prompts:  [
    "The Shawshank Redemption",
    "Snow White and the Seven Dwarfs",
    "Titanic",
    "Apocalypse Now",
    "Gone with the Wind",
    "Jaws",
    "Citizen Kane",
    "Casablanca",
    "The Godfather",
    "Lawrence of Arabia",
    "The Wizard of Oz",
    "The Graduate",
    "On the Waterfront",
    "Schindler's List",
    "Singin' in the Rain",
    "It's a Wonderful Life",
    "Ghostbusters",
    "Star Wars",
    "Psycho",
    "Chinatown",
    "One Flew Over the Cuckoo's Nest",
    "2001: A Space Odyssey",
    "Raging Bull",
    "E.T The Extra Terrestrial",
    "Dr. Strangelove",
    "Forrest Gump",
    "Rocky",
    "Midnight Cowboy",
    "Close Encounters of the Third Kind",
    "Taxi Driver",
    "King Kong",
    "Godzilla",
    "Frankenstein",
    "Dracula",
    "Fantasia",
    "The Lion King",
    "The Little Mermaid",
    "Beauty and the Beast",
    "Rebel Without a Cause",
    "Fargo",
    "Pulp Fiction",
    "Reservoir Dogs",
    "Easy Rider"
  ],
  roundLength:  120,
  users:        [],
  difficulty:   "Hard"
});

game1.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});

var game2 = new Game({
  topic:    "Animals",
  prompts:  [
    "Elephant",
    "Giraffe",
    "Dog",
    "Cat",
    "Mouse",
    "Armadillo",
    "Ant",
    "Vulture",
    "Velociraptor",
    "Swan",
    "Cobra",
    "Lion",
    "Tiger",
    "Bee",
    "Alsatian",
    "Gorilla",
    "Human",
    "Dodo",
    "Hyena",
    "Octopus",
    "Squid",
    "Barracuda",
    "Great White Shark",
    "Ostrich",
    "Platypus",
    "Emu",
    "Alien",
    "Coyote",
    "Buffalo",
    "Cow",
    "Fox",
    "Badger",
    "Squirrel"
  ],
  roundLength:  60,
  users:        [],
  difficulty:   "Easy"
});

game2.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});

var game3 = new Game({
  topic:    "General",
  prompts:  [
    "Baby",
    "Love",
    "Heart",
    "Sun",
    "Blossom",
    "Inside",
    "Willow",
    "Angel",
    "Frankenstein",
    "Orange Juice",
    "Telephone",
    "DVD",
    "Stalagmite",
    "Cereal",
    "Laptop",
    "Bridge",
    "Blackboard",
    "University",
    "Happy",
    "Fire Alarm",
    "President",
    "Guitarist",
    "Boyfriend",
    "Goat",
    "Bank",
    "Smoke",
    "Medicine",
    "Graduate",
    "Stiletto",
    "Anger",
    "Ginger",
    "Elf",
    "Pillow",
    "Right",
    "Bare",
    "Elbow",
    "Kraken",
    "Science",
    "Tube",
    "Ferry",
    "Trip",
    "America",
    "China",
    "Trump",
    "Cookie",
    "Microscope",
    "Kickboxing",
    "Blunderbuss",
    "Ancestor"
  ],
  roundLength: 90,
  users: [],
  difficulty: "Medium"
});

game3.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});

var game4 = new Game({
  topic:    "Disney",
  prompts:  [
    "Snow White and the Seven Dwarfs",
    "Snow White",
    "Doc",
    "Grumpy",
    "Happy",
    "Sleepy",
    "Bashful",
    "Sneezy",
    "Dopey",
    "Pinocchio",
    "Fantasia",
    "Dumbo",
    "Bambi",
    "Cinderella",
    "Alice in Wonderland",
    "Peter Pan",
    "Lady and the Tramp",
    "Sleeping Beauty",
    "One Hundred and One Dalmatians",
    "The Sword in the Stone",
    "Mary Poppins",
    "supercalifragilisticexpialidocious",
    "The Jungle Book",
    "Mowgli",
    "Bagheera",
    "Baloo",
    "Shere Khan",
    "The Aristocats",
    "Bedknobs and Broomsticks",
    "Robin Hood",
    "Maid Marian",
    "The Fox and the Hound",
    "The Black Cauldron",
    "Oliver and Company",
    "The Little Mermaid",
    "Ursula",
    "Beauty and the Beast",
    "Aladdin",
    "Jasmine",
    "The Lion King",
    "Simba",
    "Mufasa",
    "Scar",
    "Timon and Pumba",
    "Pocahontas",
    "Toy Story",
    "Woody",
    "Buzz Lightyear",
    "Mr. Potato Head",
    "The Hunchback of Notre Dame",
    "Hercules",
    "Mulan",
    "A Bug's Life",
    "Tarzan",
    "Toy Story 2",
    "The Emperor's New Groove",
    "Monsters Inc.",
    "Lilo and Stitch",
    "Finding Nemo",
    "Nemo",
    "Dory",
    "The Incredibles",
    "Cars",
    "Ratatouille",
    "WALL-E",
    "Bolt",
    "Up",
    "The Princess and the Frog",
    "Toy Story 3",
    "Tangled",
    "Cars 2",
    "Brave",
    "Wreck-It Ralph",
    "Monsters University",
    "Frozen",
    "Big Hero 6",
    "Inside Out",
    "The Good Dinosaur",
    "Zootopia",
    "Finding Dory",
    "Winnie the Pooh",
    "Piglet",
    "Tigger",
    "Eeyore"
  ],
  roundLength:  90,
  users:        [],
  difficulty:   "Medium"
});

game4.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});

var game5 = new Game({
  topic:    "General+",
  prompts:  [
    "Difficult",
    "Wonder",
    "Question",
    "Enticing",
  ],
  roundLength:  120,
  users:        [],
  difficulty:   "Hard"
});

game5.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});

var game6 = new Game({
  topic: "SpeedRound",
  prompts: [
    "Man",
    "Beach",
    "Building",
    "Hospital",
    "Cool"
  ],
  roundLength:  30,
  users:        [],
  difficulty:   "Fast"
});

game6.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});

var game7 = new Game({
  topic: "Music",
  prompts: [
    "Madonna",
    "Michael Jackson",
    "Elvis Presley",
    "The Beatles"
  ],
  roundLength:  60,
  users:        [],
  difficulty:   "Medium"
});

game7.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});

var game8 = new Game({
  topic: "Kids",
  prompts: [
    "Table",
    "House",
    "Dog",
    "Cat",
    "Pencil"
  ],
  roundLength:  90,
  users:        [],
  difficulty:   "Very Easy"
});

game8.save(function(err, game) {
  if (err) return console.log(err);
  console.log("game added: ", game);
});
