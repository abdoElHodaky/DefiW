module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{css,png,jpg,ico,html,json,txt}'
	],
	swDest: 'worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};