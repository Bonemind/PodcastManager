'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      js: {
        src: [
          "models/**/*.js",
          "collections/**/*.js",
          "controllers/**/*.js",
          "views/**/*.js",
        ],
        dest: "build/app.js"
      },
      html: {
	src: [
	  "main.html",
	  "templates/**/*.html",
	  "foot.html",
        ],
        dest: "index.html",
      },
    },
    watch: {
	  options: {
	    livereload: true,
	  },
	  scripts: {
	    files: ['**/*.js', '**/*.html','!build/*.js', '!index.html'],
	    tasks: ['concat'],
	  },
	},
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.registerTask("default", ["concat"]);
}
