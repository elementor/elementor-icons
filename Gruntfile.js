const fs = require( 'fs' );
const path = require( 'path' );
const sass = require( 'node-sass' );

module.exports = function( grunt ) {
	'use strict';

	var pkgInfo = grunt.file.readJSON( 'package.json' );

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("dd-mm-yyyy") %> */',

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

	// Generating a JSON file that holds the icons SVG data, with each icon name as a key.
	grunt.registerTask( 'generate-svg-icons-json', () => {
		const rootPath = path.resolve( __dirname, './' ),
			svgIconsJsonPath = path.join( rootPath, 'eicons.json' ),
			configJsonPath = path.join( rootPath, 'config.json' ),
			configJsonContent = JSON.parse( fs.readFileSync( configJsonPath ) ),
			svgIconsJsonContent = {};

		configJsonContent.glyphs.forEach( ( obj ) => {
			// Currently there are no 'height' values in the config file.
			if ( ! obj.svg.height ) {
				obj.svg.height = obj.svg.width;
			}

			svgIconsJsonContent[ obj.css ] = obj.svg;
		} );

		fs.writeFileSync( svgIconsJsonPath, JSON.stringify( svgIconsJsonContent ) );
	} );

	// Default task(s).
	grunt.registerTask( 'default', [
		'styles',
		'generate-svg-icons-json'
	] );

	grunt.registerTask( 'styles', [
		'postcss',
		'usebanner'
	] );
};
