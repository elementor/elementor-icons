import { promises as fs, constants } from 'fs';
import sass from 'sass';

const compileSass = async (scssFilePath, resultsDir, cssFileName) => {
    const renderResult = sass.compile(scssFilePath);

    try {
        await fs.access(resultsDir);
    } catch (e) {
        await fs.mkdir(resultsDir);
    }

    await fs.writeFile(`${resultsDir}/${cssFileName}`, renderResult.css);
};

await compileSass('scss/elementor-icons.scss', 'css', 'elementor-icons.css');