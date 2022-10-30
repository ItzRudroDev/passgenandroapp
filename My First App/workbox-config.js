module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{html,js,css}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};