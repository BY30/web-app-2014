var Database = require('../lib/database.js');
var db = new Database();

var crypto = require('crypto');

var login = function (req, res) {

	if (req.session.username)
		res.redirect('/admin');
	else {

		if (req.body.submit === undefined) {
			res.render('login', { title: 'BY30 - Login', status: 0 });
		} else {

			var md5sum = crypto.createHash('md5');

			var username = req.body.username;
			var password = md5sum.update(req.body.password.toString()).digest('hex');;

			console.log(username);
			console.log(password);

			db.findUser(username, function (err, data) {
				if (data.length > 0) {
					if (data[0].password == password) {
						req.session.username = username;
						res.redirect('/admin');
					} else {
						res.render('login', { title: 'BY30 - Login', status: -1 });
					}
				} else {
					res.render('login', { title: 'BY30 - Login', status: -1 });
				}
			});
		}
	}
};

module.exports = login;