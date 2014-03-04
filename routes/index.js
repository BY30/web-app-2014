var fs = require('fs');

var Database = require('../lib/database.js');
var db = new Database();

exports.index = function(req, res) {

	db.getContent(function (err, data) {
		if (err) console.log(err);

		var aboutData;
		var speakersData;
		var venueData;
		var teamData;

		for (var i = 0; i < data.length; i++) {
			if (data[i].section == 'about')
				aboutData = data[i].data;
			else if (data[i].section == 'speakers')
				speakersData = data[i].data;
			else if (data[i].section == 'venue')
				venueData = data[i].data;
			else
				teamData = data[i].data;
		};

		res.render('index', { title: 'BY30',
			aboutData: aboutData,
			venueData: venueData,
			teamData: teamData,
			speakersData: speakersData
		});
	});

};