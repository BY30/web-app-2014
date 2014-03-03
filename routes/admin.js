var fs = require('fs');

var admin = function (req, res) {

	if (req.session.username == 'cosmin_chirpac') {

		var aboutData = fs.readFileSync('./data/about.dat');
		aboutData = JSON.parse(aboutData);

		var venueData = fs.readFileSync('./data/venue.dat');
		venueData = JSON.parse(venueData);

		var teamData = fs.readFileSync('./data/team.dat');
		teamData = JSON.parse(teamData);

		var speakersData = fs.readFileSync('./data/speakers.dat');
		speakersData = JSON.parse(speakersData);

		res.render('admin', { title: 'Admin',
			aboutData: aboutData,
			venueData: venueData,
			teamData: teamData,
			speakersData: speakersData,
			username: req.session.username
		});
	} else {
		res.redirect('/login');
	}

};

module.exports = admin;