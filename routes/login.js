var login = function (req, res) {

	if (req.session.username)
		res.redirect('/admin');
	else {

		console.log(req.body.submit);


		if (req.body.submit != 'undefined') {

			var username = req.body.username;
			var password = req.body.password;

			console.log(username);
			console.log(password);

			if (username == 'cosmin_chirpac' && password == 'cosmin123') {
				console.log('logged in');
				req.session.username = 'cosmin_chirpac';
				res.redirect('/admin');
			} else {
				res.render('login', { title: 'BY30 - Login', status: -1 });
			}
		}

		res.render('login', { title: 'BY30 - Login', status: 0 });
	}
};

module.exports = login;