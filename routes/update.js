var fs = require('fs');

var update = function (req, res) {
	var data = req.body;
	var fileName = data.section + '.dat';

	var fileData;

	if (data.section == 'about' || data.section == 'venue') {
		fileData = data.elements;
	} else if (data.section == 'team') {
		fileData = new Object();
		fileData.elements = data.elements;
		fileData.members = data.members;
	}

	fs.writeFile('./data/' + fileName, JSON.stringify(fileData), function (err) {
		if (err)
			console.log(err);
		res.end(0);
	});
};

module.exports = update;