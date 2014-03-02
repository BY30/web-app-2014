var fs = require('fs');

exports.index = function(req, res) {
	var aboutData = fs.readFileSync('./data/about.dat');
	aboutData = JSON.parse(aboutData);

	var venueData = fs.readFileSync('./data/venue.dat');
	venueData = JSON.parse(venueData);

	var teamData = fs.readFileSync('./data/team.dat');
	teamData = JSON.parse(teamData);
	
	res.render('index', { title: 'BY30',
		aboutData: aboutData,
		venueData: venueData,
		teamData: teamData
	});
};