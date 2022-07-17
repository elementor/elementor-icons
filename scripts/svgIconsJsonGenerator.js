const fs = require('fs');

const svgIconsJsonPath = 'eicons.json',
    configJsonPath = 'config.json',
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
