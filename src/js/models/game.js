angular
.module("sketchApp")
.factory("Game", Game);

Game.$inject = ["$resource", "API"];
function Game($resource, API) {
  return $resource(
    API + "/games/:id", { id: "@_id" },
    {
      "get":    { method: "GET" },
      "save":   { method: "POST" },
      "query":  { method: "GET", isArray: false},
    }
  );
}
