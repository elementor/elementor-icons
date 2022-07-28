module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended-with-formatting',
	],
	plugins: [],
	globals: {
	},
	parserOptions: {
		ecmaVersion: 2017,
		requireConfigFile: false,
		sourceType: 'module',
	},
	rules: {
	},
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
};
