/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {'dist/js/main.min.js': ['dist/js/jquery.js', 'dist/js/main.js', 'dist/js/bootstrap.js']}
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/main.min.css': ['dist/css/bootstrap.css', 'dist/css/font-awesome.css', 'dist/css/main.css']
        }
      }
    },

    //bower
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {src: ['bower_components/bootstrap/dist/js/bootstrap.js']    , dest: 'dist/js/bootstrap.js'},
          {src: ['bower_components/bootstrap/dist/css/bootstrap.css']  , dest: 'dist/css/bootstrap.css'},
          {src: ['bower_components/font-awesome/fonts/**/*']              , dest: 'dist/fonts/', expand: true, flatten: true},
          {src: ['bower_components/font-awesome/css/font-awesome.css'] , dest: 'dist/css/font-awesome.css'},
          {src: ['bower_components/jquery/dist/jquery.js']             , dest: 'dist/js/jquery.js'},
          {src: ['css/main.css']                                       , dest: 'dist/css/main.css'},
          {src: ['js/main.js']                                         , dest: 'dist/js/main.js'},
          {src: ['index.html']                                         , dest: 'dist/index.html'}
        ],
      },
    },

    clean: {
      js:["dist/js/*.js","!dist/js/*.min.js"],
      css:["dist/css/*.css","!dist/css/*.min.css"] 
    }
  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', [ 'bower', 'copy', 'uglify','cssmin', 'clean']);

};
