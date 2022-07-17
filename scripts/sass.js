const fs = require('fs');
const sass = require('sass');

const renderResult = sass.compile('scss/elementor-icons.scss');

const resultsDir = 'css';

if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir);
}

fs.writeFileSync(`${resultsDir}/elementor-icons.css`, renderResult.css);