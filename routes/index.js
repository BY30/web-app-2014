var fs = require('fs');

exports.index = function(req, res) {
	var aboutData = fs.readFileSync('./data/about.dat');
	aboutData = JSON.parse(aboutData);
	
	res.render('index', { title: 'BY30', aboutData: aboutData});
};