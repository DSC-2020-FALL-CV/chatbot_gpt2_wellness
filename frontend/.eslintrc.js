module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['prettier'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'import/prefer-default-export': ['off'],
		'no-tabs': 'off',
		'no-unused-vars': 'warn',
		'object-shorthand': 'warn',
		'no-use-before-define': 'warn',
		'react/prop-types': 'off',
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js', '.jsx'],
			},
		],
		'prettier/prettier': [
			'error',
			{
				printWidth: 80,
				tabWidth: 4,
				useTabs: true,
				endOfLine: 'auto',
				singleQuote: true,
				arrowParens: 'always',
			},
		],
	},
};
