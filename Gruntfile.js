module.exports = function( grunt ) {
	'use strict';

	var pkgInfo = grunt.file.readJSON( 'package.json' );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("dd-mm-yyyy") %> */',

		sass: {
			dist: {
                options: {
                    sourcemap: 'none'
                },
				files: [ {
					expand: true,
					cwd: 'scss',
					src: '*.scss',
					dest: 'css',
					ext: '.css'
				} ]
			}
		},

		usebanner: {
			dist: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					src: [
						'css/*.min.css'
					]
				}
			}
		},

		postcss: {
			dev: {
				options: {
					processors: [
						require( 'autoprefixer' )( {
							browsers: 'last 2 versions'
						} )
					]
				},
				files: [ {
					src: [
						'css/*.css',
						'!css/*.min.css'
					]
				} ]
			},
			minify: {
				options: {
					processors: [
						require( 'cssnano' )()
					]
				},
				files: [ {
					expand: true,
					src: [
						'css/*.css',
						'!css/*.min.css'
					],
					ext: '.min.css'
				} ]
			}
		},

		watch:  {
			styles: {
				files: [
					'scss/**/*.scss'
				],
				tasks: [ 'styles' ]
			}
		}
	} );

	// Default task(s).
	grunt.registerTask( 'default', [
		'styles'
	] );

	grunt.registerTask( 'styles', [
		'sass',
		'postcss',
		'usebanner'
	] );
};
