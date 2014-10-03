var Database = require('../lib/database.js');
var fs = require('fs');
var db = new Database();

var update = function (req, res) {

	if (req.session.username) {

		var data = req.body;


		var fileName = data.section + '.dat';
		var section = data.section;
		var fileData;

		if (data.section == 'about' || data.section == 'venue') {
			fileData = data.elements;
		} else if (data.section == 'team') {
			fileData = new Object();
			fileData.elements = data.elements;
			fileData.members = data.members;

			for (var i = fileData.members.length - 1; i >= 0; i--) {
				var buff = new Buffer(fileData.members[i].photo.split(',')[1], 'base64');
				fs.writeFileSync('public/images/team/' + fileData.members[i].id + '.jpg', buff);
				fileData.members[i].photo = '/images/team/' + fileData.members[i].id + '.jpg';
			};

		} else {
			fileData = data.sessions;
			for (var i = fileData.length - 1; i >= 0; i--) {
				var sessionName = fileData[i].date.replace(' ', '_') + '/';
				if (!fs.existsSync('public/images/speakers/' + sessionName))
					fs.mkdirSync('public/images/speakers/' + sessionName);
				for (var j = fileData[i].speakers.length - 1; j >= 0; j--) {
					// fileData[i].speakers[j]
					var buff = new Buffer(fileData[i].speakers[j].photo.split(',')[1], 'base64');
					fs.writeFileSync('public/images/speakers/' + sessionName + fileData[i].speakers[j].id + '.jpg', buff);
					fileData[i].speakers[j].photo = '/images/speakers/' + sessionName + fileData[i].speakers[j].id + '.jpg';
				};
			};
		}

		db.updateContent(section, fileData, function (err, count) {
			
			if (err) console.log(err);

			if (count > 0) {
				res.end(0);
			}
			else {

				db.addContent({
					section: section,
					data: fileData
				}, function (err, data) {
					if (err) console.log(err);

					res.end(0);
				});
			}
		});
	} else {
		res.redirect('/login');
	}

};

module.exports = update;