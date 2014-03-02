var mail = require('nodemailer').mail;

var contact = function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var content = req.body.content;

	mail({
		from: email,
		to: 'onea.alex@gmail.com',
		subject: 'BY30 enquiry from ' + name + ' [sent via form]',
		text: content
	});

	res.end(0);
};

module.exports = contact;