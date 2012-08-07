var path = require('path');

var htmlToText = require('../lib/html-to-text');

htmlToText.fromFile(path.join(__dirname, 'test.html'), {
	tables: ['invoice', 'address']
}, function(err, text) {
	if (err) return console.error(err);
	console.log(text);
});