var Database = require('../lib/database.js');
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
		} else {
			fileData = data.sessions;
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