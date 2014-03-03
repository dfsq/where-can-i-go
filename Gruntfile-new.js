module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		express: {
			options: {
				port: 9000
			},
			dev: {
				options: {
					script: 'server/server.js',
					background: false
				}
			}
		},

		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				imagesDir: '<%= yeoman.app %>/images',
				importPath: '<%= yeoman.app %>/bower_components',
				httpImagesPath: '/images',
				relativeAssets: false,
				assetCacheBuster: false,
				watch: false
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/*.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'app/scripts/**/*.js', 'test/spec/**/*.js'],
			options: {
				node: true,
				browser: true,
				esnext: true,
				bitwise: true,
				camelcase: true,
				curly: true,
				eqeqeq: true,
				immed: true,
				indent: 4,
				latedef: true,
				newcap: true,
				noarg: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				trailing: true,
				smarttabs: true,
				globals: {
					angular: false,
					app: true,
					MapTooltip: false
				}
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	// Register tasks
	grunt.registerTask('default', [
		'express'
	]);
};