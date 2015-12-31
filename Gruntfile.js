module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          src: ['lib/**/*.js', 'index.js'],
          dest: 'dist/'
        }]
      }
    },

    clean: ['dist']
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['clean', 'babel']);
};
