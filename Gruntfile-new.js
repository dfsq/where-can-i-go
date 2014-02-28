module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Register tasks
	grunt.registerTask('default', ['uglify']);
};