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
      "update": { method: "PUT" },
      "query":  { method: "GET", isArray: false},
    }
  );
}
