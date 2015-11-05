 module.exports = function(grunt) {

 	/*
 	 * To build a release run 'grunt'
 	 * index.html has to be manually copied to 'release/' because of
 	 * reference differences (import.min.css, jquery)
 	 */

	var minBanner = '/* <%= pkg.name %> | Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %> (<%= pkg.homepage %>) | <%= pkg.license %> license | v<%= pkg.version %> */';
	var largeBanner = '/*' + '\n' +
		'* <%= pkg.name %> v<%= pkg.version %>' + '\n' +
		'* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>' + '\n' +
		'* <%= pkg.homepage %>' + '\n' +
		'* Free to use under the MIT license.' + '\n' +
		'* http://www.opensource.org/licenses/mit-license.php' + '\n' +
		'*/' + '\n';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

	 	uglify: {
			options: {
				banner: minBanner + '\n'
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

		file_append: {
			default_options: {
				files: [
					{prepend: minBanner + '\n', input: 'css/simpleStore.min.css'}
				]
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
	grunt.loadNpmTasks('grunt-file-append');

	grunt.registerTask('default', ['uglify', 'cssmin', 'file_append', 'copy']);
 };
