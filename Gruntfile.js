module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      src: ["src/js/**/*.js", "!src/js/_bower.js"]
    },
    bower_concat: {
      all: {
        dest: {
          "js":   "src/js/_bower.js",
          "css":  "src/scss/_bower.scss"
        },
        mainFiles: {
          bootstrap: [
            "dist/js/bootstrap.js",
            "dist/css/bootstrap.css"
          ]
        },
        dependencies: {
          bootstrap: ["jquery"]
        }
      }
    },
    sass: {
      expanded: {
        options:  { outputStyle: "expanded" },
        files:    { "public/css/style.css": "src/scss/style.scss" }
      },
      compressed: {
        options:  { outputStyle: "compressed" },
        files:    { "public/css/style.min.css": "src/scss/style.scss" }
      }
    },
    concat: {
      dist: {
        src:  ["src/js/_bower.js", "src/js/client.js", "src/js/**/*.js"],
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
        files:    ["src/scss/*.scss"],
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

  grunt.registerTask("default", ["jshint", "bower_concat", "sass", "concat", "uglify", "watch"]);
};
