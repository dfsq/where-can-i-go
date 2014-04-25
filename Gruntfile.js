'use strict';

module.exports = function(grunt) {

	var distPath = 'dist/app';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		express: {
			dev: {
				options: {
					script: 'server/server.js',
					node_env: 'development'
				}
			}
		},

		watch: {
			express: {
				files: ['server/*.js'],
				tasks: ['express'],
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
			server: {
				options: {
					sassDir: 'app/styles',
					cssDir: '.tmp/styles',
					watch: true
				}
			},
			build: {
				options: {
					sassDir: 'app/styles',
					cssDir: distPath + '/styles',
					outputStyle: 'compressed'
				}
			}
		},

		concat: {
			scripts: {
				src: ['app/scripts/*.js', 'app/scripts/**/*.js'],
				dest: distPath + '/scripts/scripts.js'
			},
			libs: {
				src: [
					'app/bower_components/angular/angular.min.js',
					'app/bower_components/angular-route/angular-route.min.js'
				],
				dest: distPath + '/scripts/modules.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: distPath + '/scripts/scripts.js',
				dest: distPath + '/scripts/scripts.js'
			}
		},

		jshint: {
			all: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['Gruntfile.js', 'app/scripts/**/*.js']
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		clean: {
			build: ['.tmp', 'dist/app', 'dist/server', 'dist/package.json', 'dist/Procfile'],
			post: [
				distPath + '/scripts/<%= pkg.name %>.js'
			]
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'app/',
						dest: distPath,
						src: [
							'*.{ico,svg}',
							'images/**',
							'views/**',
							'index.html'
						]
					},
					{
						cwd: './',
						dest: distPath + '/../',
						src: [
							'server/**',
							'Procfile',
							'package.json'
						]
					}
				]
			}
		},

		usemin: {
			html: [distPath + '/index.html'],
			options: {
				assetsDirs: [distPath]
			}
		},

		// Test settings
		karma: {
			options: {
				autoWatch: false
			},
			unit: {
				configFile: 'karma.conf.js'
			},
			dist: {
				configFile: 'karma.dist.conf.js'
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
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-karma');


	// Default task is the server
	grunt.registerTask('default', ['server']);

	// Register tasks
	grunt.registerTask('server', [
		'express',
		'concurrent:server',
		'watch'
	]);

	// Karma configuration
	grunt.registerTask('test', ['karma', 'karma']);

	// Build aplication
	grunt.registerTask('build', [
		'clean',
		'compass:build',
		'concat',
		'copy:build',
		'uglify',
		'clean:post',
		'usemin',
		'karma:dist'
	]);
};