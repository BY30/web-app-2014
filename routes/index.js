var fs = require('fs');

exports.index = function(req, res) {
	var aboutData = fs.readFileSync('./data/about.dat');
	aboutData = JSON.parse(aboutData);

	var venueData = fs.readFileSync('./data/venue.dat');
	venueData = JSON.parse(venueData);
	
	res.render('index', { title: 'BY30', aboutData: aboutData, venueData: venueData});
};