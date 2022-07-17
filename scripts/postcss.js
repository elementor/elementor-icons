const fs = require('fs');
const postcss = require('postcss');
const cssNano = require('cssnano');


fs.readFile('css/elementor-icons.css', (err, css) => {
    postcss([cssNano])
        .process(css, { from: 'css/elementor-icons.css', to: 'css/elementor-icons.min.css' })
        .then(result => {
            fs.writeFile('css/elementor-icons.min.css', result.css, undefined, () => {});
            if ( result.map ) {
                fs.writeFile('css/elementor-icons.min.css', result.map);
            }
        });
});
