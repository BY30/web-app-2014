var fs = require('fs');

var admin = function (req, res) {

	var aboutData = fs.readFileSync('./data/about.dat');
	aboutData = JSON.parse(aboutData);

	res.render('admin', { title: 'Admin', aboutData: aboutData});
};

module.exports = admin;