var fs = require('fs');

var admin = function (req, res) {

	var aboutData = fs.readFileSync('./data/about.dat');
	aboutData = JSON.parse(aboutData);

	var venueData = fs.readFileSync('./data/venue.dat');
	venueData = JSON.parse(venueData);

	res.render('admin', { title: 'Admin', aboutData: aboutData, venueData: venueData});
};

module.exports = admin;