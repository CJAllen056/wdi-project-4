module.exports = {
  port:     process.env.PORT || 3000,
  database: process.env.MONGOLAB_URI || "mongodb://localhost/passport-jwt-boilerplate",
  secret:   process.env.SECRET || "aB(^eEAdaa&&#ak@ahjb82#sa#£gpke2"
};
