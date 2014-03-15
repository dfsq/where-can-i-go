'use strict';

module.exports = function(grunt) {

	var distPath = 'dist/app';

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
			libs: {
				src: [
					'app/bower_components/angular/angular.min.js',
					'app/bower_components/angular-route/angular-route.min.js'
				],
				dest: distPath + '/scripts/lib/modules.js'
			},
			scripts: {
				src: ['app/scripts/*.js', 'app/scripts/**/*.js'],
				dest: distPath + '/scripts/<%= pkg.name %>.js'
			},
			styles: {
				src: [distPath + '/styles/main.css', distPath + '/styles/map.css'],
				dest: distPath + '/styles/main.css'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: distPath + '/scripts/*.js',
				dest: distPath + '/scripts/<%= pkg.name %>.min.js'
			}
		},

		jshint: {
			all: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['Gruntfile-new.js', 'app/scripts/**/*.js']
			},
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js'] //'test/spec/**/*.js'
			}
		},

		clean: {
			build: ['.tmp', 'dist'],
			post: [
				distPath + '/scripts/<%= pkg.name %>.js',
				distPath + '/styles/map.css'
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
							'index.html'
						]
					}
				]
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


	// Register tasks
	grunt.registerTask('server', [
		'express:dev',
		'concurrent:server',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean',
		'compass:build',
		'concat',
		'copy:build',
		'uglify',
		'clean:post'
	]);
};