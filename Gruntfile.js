module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				separator: ';\n'
			},
			all: {
				src: ['src/js/**/*.js'],
				dest: 'src/js/<%= pkg.name %>.min.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: 'src/js/<%= pkg.name %>.min.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		
		sass: {
			all: {
				options: {
					style: 'expanded'
				},
				files: {
					'src/style/mainStyle.css': 'src/style/mainStyle.scss'
				}
			}
		},
		
		copy: {
			all: {
				files: [
					{expand: true, cwd:'src/js/', src: ['**/*.js'], dest: 'dist/js/'},
					{expand: true, cwd:'src/style/', src: ['**'], dest: 'dist/style/'},
					{expand: true, cwd:'src/images/', src: ['**'], dest: 'dist/images/'},
					{expand: true, cwd:'src/view/', src: ['**'], dest: 'dist/view/'},
					{expand: true, cwd:'src/database/', src: ['**'], dest: 'dist/database/'},
					{expand: true, cwd:'src/', src: ['index.html'], dest: 'dist/'}
				]
			},
			dev: {
				files: [
					{expand: true, cwd:'src/js/', src: ['**/*.js'], dest: 'dist/js/'},
					{expand: true, cwd:'src/style/', src: ['**'], dest: 'dist/style/'},
					{expand: true, cwd:'src/view/', src: ['**'], dest: 'dist/view/'},
					{expand: true, cwd:'src/database/', src: ['**'], dest: 'dist/database/'},
					{expand: true, cwd:'src/', src: ['index.html'], dest: 'dist/'}
				]
			},
			style: {
				files: [
					{expand: true, cwd:'src/style/', src: ['**'], dest: 'CubeFusionPapertoys/style/'},
				]
			},
		},
		
		clean: {
			all: ['dist/*'],
			dev: ['dist/database/*','dist/js/*','dist/style/*','dist/view/*','dist/index.html'],
			allpost: ['src/style/mainStyle.css', 'src/js/<%= pkg.name %>.min.js'],
			commitpre: ['src/js/<%= pkg.name %>.min.js', 'src/style/mainStyle.css.map']
		},
		
		'http-server': {
			dev: {
				root: 'dist',
				port: 8081,
				host: '0.0.0.0',
				ext: 'html',
				runInBackground: false,
				openBrowser : true
			}
		},

		watch: {
		    files: ['src/**/*.html'],
		    tasks: ['dev']
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dev', ['clean:dev', 'concat', 'sass', 'copy:dev', 'clean:allpost']);
	grunt.registerTask('dist', ['clean:all', 'concat', 'uglify', 'sass', 'copy:all', 'clean:allpost']);

	// TODO Implement scripts for testing

	grunt.registerTask('start-server', ['http-server']);

	grunt.registerTask('prepare-commit', ['clean']);

	grunt.registerTask('default', ['dist']);
};
