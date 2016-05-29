module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      src: ["src/js"]
    }
  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("default", []);
};
