import { promises as fs } from 'fs';

const generateSvgIconsJson = async (configJsonPath, svgIconsJsonPath) => {
    const configJsonContent = JSON.parse( await fs.readFile( configJsonPath ) ),
        svgIconsJsonContent = {};

    configJsonContent.glyphs.forEach( ( obj ) => {
        // Currently there are no 'height' values in the config file.
        if ( ! obj.svg.height ) {
            obj.svg.height = obj.svg.width;
        }

        svgIconsJsonContent[ obj.css ] = obj.svg;
    } );

    fs.writeFile( svgIconsJsonPath, JSON.stringify( svgIconsJsonContent ) );
}

await generateSvgIconsJson('config.json', 'eicons.json');