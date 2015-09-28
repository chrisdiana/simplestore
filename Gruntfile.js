 module.exports = function(grunt) {

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

		copy: {
			main: {
				files: [
					{src: 'css/simpleStore.min.css', dest: 'release/assets/css/simpleStore.min.css'},
					{src: 'js/simpleStore.min.js', dest: 'release/assets/js/simpleStore.min.js'},
					{src: 'js/config.js', dest: 'release/assets/js/config.js'},
					{src: 'js/products.json', dest: 'release/products.json'}
				]
			},
		},

		cssmin: {
			target: {
				files: {
					'css/simpleStore.min.css': 'css/simpleStore.css'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify', 'copy']);
 };
