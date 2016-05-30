module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      src: ["src/js/**/*.js"]
    },
    sass: {
      expanded: {
        options:  { outputStyle: "expanded" },
        files:    { "public/css/style.css": "src/scss/*.scss" }
      },
      compressed: {
        options:  { outputStyle: "compressed" },
        files:    { "public/css/style.min.css": "src/scss/*.scss" }
      }
    },
    concat: {
      dist: {
        src:  ["src/js/client.js", "src/js/**/*.js"],
        dest: "public/js/client.js"
      }
    },
    uglify: {
      "public/js/client.min.js": "public/js/client.js"
    },
    watch: {
      configFiles: {
        files:    ["Gruntfile.js", "package.json"],
        options:  { reload: true }
      },
      scss: {
        files:    ["src/scss/**/*.scss"],
        tasks:    ["sass"],
        options:  { liveReload: true }
      },
      js: {
        files:    ["src/js/**/*.js"],
        tasks:    ["jshint", "concat", "uglify"],
        options:  { liveReload: true }
      },
      index: {
        files:    ["index.html"],
        options:  { liveReload: true } 
      }
    }
  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("default", ["jshint", "sass", "concat", "uglify", "watch"]);
};
