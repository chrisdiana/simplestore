 module.exports = function(grunt) {

 	/*
 	 * To build a release run 'grunt'
 	 * index.html has to be manually copied to 'release/' because of
 	 * reference differences (import.min.css, jquery)
 	 */

	var banner = '/* <%= pkg.name %> | Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> (<%= pkg.homepage %>) | <%= pkg.license %> license | v<%= pkg.version %> */';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

	 	uglify: {
			options: {
				banner: banner + '\n'
			},
	 		build: {
				files: {
					'js/simpleStore.min.js': 'js/simpleStore.js'
				}
			}
	 	},

		cssmin: {
			target: {
				files: {
					'css/simpleStore.min.css': 'css/simpleStore.css'
				}
			}
		},

		copy: {
			main: {
				files: [
					{src: 'css/simpleStore.min.css', dest: 'release/css/simpleStore.min.css'},
					{src: 'js/simpleStore.min.js', dest: 'release/js/simpleStore.min.js'},
					{src: 'js/simpleCart.min.js', dest: 'release/js/simpleCart.min.js'},
					{src: 'js/config.js', dest: 'release/js/config.js'},
					{src: 'products.json', dest: 'release/products.json'},
					{src: 'images/favicon.png', dest: 'release/images/favicon.png'}
				]
			},
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
 };
