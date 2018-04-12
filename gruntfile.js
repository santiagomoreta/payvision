module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // uglify
    uglify: {
      options: {
        mangle: false,
        compress: {
          drop_console: true
        }
      },
      js: {
        files: [{
          cwd: 'js/',  // ruta de nuestro javascript fuente
          expand: true,    // ingresar a las subcarpetas
          src: '*.js',     // patrón relativo a cwd
          dest: 'js/min'  // destino de los archivos compresos
        }]
      }
    },
  connect: {
    options: {
        port: 3000,
        hostname: 'localhost',
        keepalive: true,
    },
    serve: {
	    options: {
	        base: '.',
	        debug: false,
	        livereload: true,
	        open:
	        // false
	        {
	            target: 'http://localhost:3000/index.html'
	        }
	    }
	}   
}
 });
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['uglify']);	
	grunt.registerTask('start', ['uglify','connect:serve']);	

};