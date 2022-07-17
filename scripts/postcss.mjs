import { promises as fs } from 'fs';
import postcss from 'postcss';
import cssNano from 'cssnano';

const postCss = async (cssFilePath, outputFilePath) => {
        const css = await fs.readFile(cssFilePath);
        const result = await postcss([cssNano])
                .process(css, { from: cssFilePath, to: outputFilePath })
        await fs.writeFile(outputFilePath, result.css);
        if ( result.map ) {
        await fs.writeFile(outputFilePath, result.map);
        }
};

await postCss('css/elementor-icons.css', 'css/elementor-icons.min.css');
