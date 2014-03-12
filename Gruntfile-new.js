module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		express: {
			dev: {
				options: {
					script: 'server/server.js'
				}
			}
		},

		watch: {
			express: {
				files: ['server/*.js'],
				tasks: ['express:dev'],
				options: {
					nospawn: true
				}
			}
		},

		concurrent: {
			server: [
				'compass:server'
			]
		},

		compass: {
			options: {
				sassDir: 'app/styles',
				cssDir: '.tmp/styles'
			},
			server: {
				options: {
					watch: true
				}
			}
		},

		concat: {
			libs: {
				src: [
					'app/bower_components/angular/angular.min.js',
					'app/bower_components/angular-route/angular-route.min.js'
				],
				dest: 'build/scripts/lib/modules.js'
			},
			dist: {
				src: ['app/scripts/*.js', 'app/scripts/**/*.js'],
				dest: 'build/scripts/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/scripts/*.js',
				dest: 'build/scripts/<%= pkg.name %>.min.js'
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
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	// Register tasks
	grunt.registerTask('server', [
		'express:dev',
		'concurrent:server',
		'watch'
	]);

	grunt.registerTask('build', [
		'concat',
		'uglify'
	]);
};