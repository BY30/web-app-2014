var fs = require('fs');

var update = function (req, res) {
	var data = req.body;
	var fileName = data.section + '.dat';

	fs.writeFile('./data/' + fileName, JSON.stringify(data.elements), function (err) {
		if (err)
			console.log(err);
		res.end(0);
	});
};

module.exports = update;