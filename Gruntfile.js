module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      files: ['**/*.js', '!node_modules/**/*.js', '!public/js/lib/**/*'],
      options:{
        jshintrc:true,
        reporter: require('jshint-stylish')
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  })

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint']);
};